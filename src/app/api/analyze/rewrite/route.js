const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-4.1-mini";
const LINKEDIN_LIMITS = {
  headline: 220,
  about: 2600,
  experienceRoleDescription: 2000,
  experienceBullet: 600,
};
const PROJECTED_REWRITE_SCORE = 100;

const REWRITE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    headlineOptions: {
      type: "array",
      items: { type: "string", maxLength: LINKEDIN_LIMITS.headline },
    },
    aboutRewrite: { type: "string", maxLength: LINKEDIN_LIMITS.about },
    experienceBulletSuggestions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          roleTitle: { type: "string" },
          company: { type: "string" },
          suggestedBullets: {
            type: "array",
            items: { type: "string", maxLength: LINKEDIN_LIMITS.experienceBullet },
          },
        },
        required: ["roleTitle", "company", "suggestedBullets"],
      },
    },
    featuredPlan: {
      type: "array",
      items: { type: "string" },
    },
    priorityFixes: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          priority: { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] },
          recommendation: { type: "string" },
        },
        required: ["id", "title", "priority", "recommendation"],
      },
    },
    assumptions: {
      type: "array",
      items: { type: "string" },
    },
    projectedScore: { type: "number" },
  },
  required: ["headlineOptions", "aboutRewrite", "experienceBulletSuggestions", "featuredPlan", "priorityFixes", "assumptions", "projectedScore"],
};

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body?.paymentVerified) {
      return Response.json(
        { success: false, message: "Payment verification is required before generating an AI-enhanced rewrite." },
        { status: 402 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { success: false, message: "OpenAI API key is not configured for AI-enhanced rewrites." },
        { status: 503 }
      );
    }

    const report = body?.report || {};
    const profile = body?.profile || {};
    const fallback = buildRuleBasedRewrite({ report, profile });
    const aiRewrite = await generateAiRewrite({ report, profile, fallback });

    return Response.json({
      success: true,
      source: "openai",
      rewrite: enforceRewriteLimits(mergeRewrite(aiRewrite)),
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message || "Unable to generate AI-enhanced profile rewrite" },
      { status: 500 }
    );
  }
}

async function generateAiRewrite({ report, profile, fallback }) {
  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_REWRITE_MODEL || DEFAULT_MODEL,
      instructions: [
        "You are a senior LinkedIn profile strategist for QCS Studio.",
        "Rewrite only from provided facts. Do not invent exact numbers, employers, clients, certifications, degrees, or outcomes.",
        "If proof is missing, use bracketed placeholders such as [insert verified metric] and explain the assumption.",
        `Hard limits: every headline <= ${LINKEDIN_LIMITS.headline} characters, About <= ${LINKEDIN_LIMITS.about} characters, each experience bullet <= ${LINKEDIN_LIMITS.experienceBullet} characters, each role's combined bullets <= ${LINKEDIN_LIMITS.experienceRoleDescription} characters.`,
        `Set projectedScore to ${PROJECTED_REWRITE_SCORE} because the paid rewrite is the target 100% QCS profile plan.`,
        "Keep copy direct, premium, and conversion-focused. Return JSON that matches the schema exactly.",
      ].join("\n"),
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify({
                task: "Create a paid LinkedIn rewrite workspace output.",
                profile: summarizeProfile(profile),
                audit: summarizeReport(report),
                deterministicFallback: fallback,
                requiredCharacterLimits: LINKEDIN_LIMITS,
                requiredProjectedScore: PROJECTED_REWRITE_SCORE,
              }),
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "linkedin_profile_rewrite",
          strict: true,
          schema: REWRITE_SCHEMA,
        },
      },
      max_output_tokens: 2500,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "OpenAI rewrite generation failed.");
  }

  const text = extractOutputText(data);
  if (!text) throw new Error("OpenAI rewrite response was empty.");
  return JSON.parse(text);
}

function buildRuleBasedRewrite({ report, profile }) {
  const persona = report?.persona || "job_seeker";
  const currentRole = first(profile?.experience) || {};
  const currentTitle = clean(currentRole.title) || clean(profile?.headline) || labelForPersona(persona);
  const company = clean(currentRole.company);
  const keywords = firstNonEmptyArray(report?.debug?.detectedKeywords, profile?.skills?.map((skill) => skill?.name)).slice(0, 4);
  const proofPlaceholder = "[insert verified metric, client result, hiring result, project, or case study]";
  const targetAudience = audienceForPersona(persona);
  const outcome = outcomeForPersona(persona);

  return {
    headlineOptions: [
      compactText([currentTitle, keywords.slice(0, 2).join(" + "), `Helping ${targetAudience} achieve ${outcome}`]).join(" | "),
      compactText([labelForPersona(persona), `Helping ${targetAudience} solve [specific problem]`, proofPlaceholder]).join(" | "),
      compactText([currentTitle, company && `@ ${company}`, `${outcome} with ${keywords[0] || "clear positioning"}`]).join(" | "),
    ].filter(Boolean).slice(0, 3),
    aboutRewrite: buildRuleBasedAbout({ profile, persona, currentTitle, company, keywords, targetAudience, outcome, proofPlaceholder }),
    experienceBulletSuggestions: buildRuleBasedBullets(profile),
    featuredPlan: [
      `Add one Featured asset that proves ${outcome}: a case study, portfolio/project link, client story, hiring win, or short PDF.`,
      `Add a proof-first CTA: “Message me about [specific goal]” or link to a booking/website page if available.`,
    ],
    priorityFixes: buildPriorityFixes(report),
    assumptions: buildAssumptions({ profile, report }),
    projectedScore: PROJECTED_REWRITE_SCORE,
  };
}

function buildRuleBasedAbout({ profile, persona, currentTitle, company, keywords, targetAudience, outcome, proofPlaceholder }) {
  const name = clean(profile?.name) || "[Your name]";
  const keywordPhrase = keywords.length ? keywords.slice(0, 3).join(", ") : "[core skills/category keywords]";
  const roleLine = compactText([currentTitle, company && `at ${company}`]).join(" ");
  const opening = persona === "recruiter_talent"
    ? `I am ${name}, ${roleLine}. I help ${targetAudience} connect the right talent with the right opportunities using ${keywordPhrase}.`
    : `I am ${name}, ${roleLine}. I help ${targetAudience} achieve ${outcome} using ${keywordPhrase}.`;

  return [
    opening,
    `My work focuses on [core capability], [audience pain point], and measurable outcomes. Add proof here: ${proofPlaceholder}.`,
    `If you are working on [relevant goal], connect or message me with context so we can see whether there is a fit.`,
  ].join("\n\n");
}

function buildRuleBasedBullets(profile) {
  return (profile?.experience || []).slice(0, 2).map((role, index) => ({
    roleTitle: clean(role?.title) || `Role ${index + 1}`,
    company: clean(role?.company) || "[company]",
    suggestedBullets: [
      `Owned [responsibility/project] for ${clean(role?.company) || "[company]"}, improving [verified business metric] by [insert result].`,
      `Partnered with [stakeholder/team] to deliver [initiative], resulting in [measurable outcome].`,
      `Used [tools/skills] to solve [problem] for [audience], creating [proof/result].`,
    ],
  }));
}

function buildPriorityFixes(report) {
  const mapped = (report?.suggestions || []).slice(0, 6).map((item, index) => ({
    id: item?.id || `fix-${index + 1}`,
    title: item?.reason || item?.finding || item?.title || "Improve a high-impact profile section.",
    priority: ["HIGH", "MEDIUM", "LOW"].includes(item?.priority) ? item.priority : impactLabel(item?.impactScore),
    recommendation: item?.suggestionText || item?.recommendation || "Rewrite this section with clearer audience, proof, keywords, and a direct next step.",
  }));

  if (mapped.length) return mapped;

  return [
    { id: "headline", title: "Make the headline specific to the audience and outcome.", priority: "HIGH", recommendation: "Use role/category + target audience + outcome + proof signal instead of a generic job title." },
    { id: "about", title: "Rewrite About with positioning, proof, and CTA.", priority: "HIGH", recommendation: "Open with who you help, name the problem, add verified proof, and end with one clear action." },
    { id: "proof", title: "Add visible proof assets.", priority: "HIGH", recommendation: "Add case studies, recommendations, project links, metrics, Featured media, or portfolio examples without inventing results." },
  ];
}

function mergeRewrite(aiRewrite) {
  const rewrite = {
    headlineOptions: validArray(aiRewrite?.headlineOptions, []).slice(0, 3),
    aboutRewrite: clean(aiRewrite?.aboutRewrite),
    experienceBulletSuggestions: validArray(aiRewrite?.experienceBulletSuggestions, []).slice(0, 3),
    featuredPlan: validArray(aiRewrite?.featuredPlan, []).slice(0, 4),
    priorityFixes: validArray(aiRewrite?.priorityFixes, []).slice(0, 6),
    assumptions: validArray(aiRewrite?.assumptions, []).slice(0, 5),
    projectedScore: PROJECTED_REWRITE_SCORE,
    characterLimits: LINKEDIN_LIMITS,
  };

  if (!rewrite.headlineOptions.length || !rewrite.aboutRewrite || !rewrite.priorityFixes.length) {
    throw new Error("OpenAI rewrite response did not include the required paid rewrite sections.");
  }

  return rewrite;
}

function enforceRewriteLimits(rewrite) {
  return {
    ...rewrite,
    headlineOptions: validArray(rewrite.headlineOptions, []).map((headline) => limitText(headline, LINKEDIN_LIMITS.headline)).slice(0, 3),
    aboutRewrite: limitText(rewrite.aboutRewrite, LINKEDIN_LIMITS.about),
    experienceBulletSuggestions: validArray(rewrite.experienceBulletSuggestions, []).map((role) => limitRoleBullets(role)),
    projectedScore: PROJECTED_REWRITE_SCORE,
    characterLimits: LINKEDIN_LIMITS,
  };
}

function limitRoleBullets(role) {
  const bullets = validArray(role?.suggestedBullets, [])
    .map((bullet) => limitText(bullet, LINKEDIN_LIMITS.experienceBullet))
    .filter(Boolean);
  const limitedBullets = [];
  let total = 0;

  for (const bullet of bullets) {
    const nextTotal = total + bullet.length + (limitedBullets.length ? 1 : 0);
    if (nextTotal <= LINKEDIN_LIMITS.experienceRoleDescription) {
      limitedBullets.push(bullet);
      total = nextTotal;
    }
  }

  return {
    roleTitle: limitText(role?.roleTitle || "Current role", 120),
    company: limitText(role?.company || "", 120),
    suggestedBullets: limitedBullets,
  };
}

function limitText(value, limit) {
  const text = clean(value);
  if (text.length <= limit) return text;
  const trimmed = text.slice(0, Math.max(0, limit - 1)).trimEnd();
  return `${trimmed}…`.slice(0, limit);
}

function summarizeProfile(profile) {
  return {
    name: clean(profile?.name),
    headline: clean(profile?.headline),
    about: truncate(clean(profile?.about), 1800),
    location: clean(profile?.location),
    industry: clean(profile?.industry),
    experience: (profile?.experience || []).slice(0, 3).map((role) => ({
      title: clean(role?.title),
      company: clean(role?.company),
      description: truncate(clean(role?.description), 900),
    })),
    skills: (profile?.skills || []).slice(0, 20).map((skill) => clean(skill?.name)).filter(Boolean),
    featured: (profile?.featured || []).slice(0, 5).map((item) => clean(item?.title || item?.description)).filter(Boolean),
    activity: (profile?.activity || []).slice(0, 5).map((item) => truncate(clean(item?.text), 400)).filter(Boolean),
  };
}

function summarizeReport(report) {
  return {
    persona: report?.persona,
    overallScore: report?.overallScore,
    scoreBand: report?.scoreBand,
    subScores: report?.subScores,
    strengths: report?.strengths,
    risks: report?.risks,
    suggestions: report?.suggestions?.slice(0, 8),
    detectedKeywords: report?.debug?.detectedKeywords,
    missingKeywords: report?.debug?.missingKeywords,
  };
}

function extractOutputText(data) {
  if (typeof data?.output_text === "string") return data.output_text;
  return (data?.output || [])
    .flatMap((item) => item?.content || [])
    .map((content) => content?.text || "")
    .join("")
    .trim();
}

function buildAssumptions({ profile, report }) {
  const assumptions = [];
  if (!profile?.about) assumptions.push("Current About section was missing or unavailable, so the rewrite uses placeholders for audience, problem, and proof.");
  if (!profile?.experience?.length) assumptions.push("Experience history was missing or unavailable, so bullet rewrites use generic achievement placeholders.");
  if (!report?.debug?.detectedKeywords?.length) assumptions.push("Few target keywords were detected, so keyword suggestions are inferred from persona and visible role data.");
  if (!assumptions.length) assumptions.push("Rewrite uses only scraped profile facts and bracketed placeholders where proof must be verified by the user.");
  return assumptions;
}

function first(items) {
  return Array.isArray(items) ? items[0] : undefined;
}

function firstNonEmptyArray(...arrays) {
  for (const array of arrays) {
    const values = (array || []).map(clean).filter(Boolean);
    if (values.length) return values;
  }
  return [];
}

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function compactText(values) {
  return values.map(clean).filter(Boolean);
}

function truncate(value, maxLength) {
  if (!value) return "";
  return value.length > maxLength ? `${value.slice(0, maxLength)}…` : value;
}

function validArray(value, fallback) {
  return Array.isArray(value) && value.length ? value : fallback;
}

function impactLabel(score) {
  if (score >= 80) return "HIGH";
  if (score >= 55) return "MEDIUM";
  return "LOW";
}

function labelForPersona(persona) {
  const labels = {
    job_seeker: "Role-focused professional",
    founder_ceo: "Founder / CEO",
    sales_sdr_ae: "B2B sales partner",
    consultant_coach: "Consultant / Coach",
    recruiter_talent: "Recruiter / Talent partner",
  };
  return labels[persona] || labels.job_seeker;
}

function audienceForPersona(persona) {
  const audiences = {
    job_seeker: "hiring teams understand my fit faster",
    founder_ceo: "buyers and partners",
    sales_sdr_ae: "target accounts and buyers",
    consultant_coach: "clients in my niche",
    recruiter_talent: "candidates and hiring teams",
  };
  return audiences[persona] || audiences.job_seeker;
}

function outcomeForPersona(persona) {
  const outcomes = {
    job_seeker: "a clearer role match",
    founder_ceo: "stronger pipeline and market trust",
    sales_sdr_ae: "more relevant sales conversations",
    consultant_coach: "clearer decisions and better outcomes",
    recruiter_talent: "faster, higher-trust hiring decisions",
  };
  return outcomes[persona] || outcomes.job_seeker;
}
