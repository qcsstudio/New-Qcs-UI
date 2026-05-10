import { LINKEDIN_PROFILE_STANDARDS } from "../config/linkedinProfileStandards";
import { generateProfileMakeover } from "../makeover/generateMakeover";
import type { LinkedInProfileSnapshot, Persona, ProfileScoreResult, ProfileSuggestion, ProfileTargetContext } from "./types/linkedinProfile";
import { normalizeLinkedInProfile, inferTargetContext, personaFromRole } from "./normalizeLinkedInProfile";
import { countChars, countWords, detectGenericBuzzwords, detectOutcomeLanguage, detectStandardTitle, hasClearCTA, hasQuantifiedProof, scoreLengthRange, clamp } from "./utils/textAnalysis";
import { detectKeywordStuffing, distributedKeywordCoverage, keywordMatchScore } from "./utils/keywordAnalysis";
import { completenessScore, detectICP, detectOffer, hasAnyVerification, hasRecentActivity } from "./utils/profileSignals";

const PERSONA_WEIGHTS: Record<Persona, Record<string, number>> = {
  job_seeker: {
    keywordRelevance: 0.35,
    completenessAndOpenToWork: 0.20,
    experienceAlignment: 0.15,
    skillsDepthAndFocus: 0.15,
    recruiterConversion: 0.10,
    activityAndRecency: 0.05,
  },
  founder_ceo: {
    positioningAndICP: 0.25,
    offerClarity: 0.20,
    authorityAndProof: 0.20,
    keywordAndCategoryFit: 0.15,
    trustAndVerification: 0.10,
    activityAndThoughtLeadership: 0.10,
  },
  sales_sdr_ae: {
    buyerTrustAndCredibility: 0.25,
    icpAndOfferAlignment: 0.20,
    headlineAndPositioning: 0.15,
    proofAndSocialValidation: 0.15,
    activityAndEngagement: 0.15,
    completenessAndContactability: 0.10,
  },
  consultant_coach: {
    nichePositioning: 0.25,
    offerAndOutcomeClarity: 0.20,
    authorityProof: 0.20,
    conversionAssets: 0.15,
    keywordCategoryFit: 0.10,
    activityAndTrust: 0.10,
  },
  recruiter_talent: {
    trustAndVerification: 0.25,
    recruitingNicheClarity: 0.20,
    talentAttraction: 0.20,
    clientCredibility: 0.15,
    activityAndMarketInsight: 0.10,
    completenessAndContactability: 0.10,
  },
};

const addSuggestion = (suggestions: ProfileSuggestion[], suggestion: ProfileSuggestion) => {
  if (!suggestions.some((item) => item.id === suggestion.id)) suggestions.push(suggestion);
};

export const scoreLinkedInProfilePayload = (payload: unknown, selectedRole?: string): ProfileScoreResult => {
  const profile = normalizeLinkedInProfile(payload);
  const persona = personaFromRole(selectedRole);
  const context = inferTargetContext(profile, persona);
  return scoreLinkedInProfile(profile, context);
};

export const scoreLinkedInProfile = (profile: LinkedInProfileSnapshot, context: ProfileTargetContext): ProfileScoreResult => {
  switch (context.persona) {
    case "founder_ceo": return scoreFounderCeoProfile(profile, context);
    case "sales_sdr_ae": return scoreSalesProfile(profile, context);
    case "consultant_coach": return scoreConsultantProfile(profile, context);
    case "recruiter_talent": return scoreRecruiterProfile(profile, context);
    case "job_seeker":
    default: return scoreJobSeekerProfile(profile, context);
  }
};

const buildBaseDiagnostics = (profile: LinkedInProfileSnapshot, context: ProfileTargetContext) => {
  const text = `${profile.headline || ""}\n${profile.about || ""}\n${(profile.experience || []).map((item) => `${item.title || ""} ${item.description || ""}`).join("\n")}`;
  const keywords = context.categoryKeywords?.length ? context.categoryKeywords : inferDefaultKeywords(profile, context.persona);
  const stuffingFlags = [
    { field: "headline", ...detectKeywordStuffing(profile.headline || "") },
    { field: "about", ...detectKeywordStuffing(profile.about || "") },
  ].filter((item) => item.isStuffed);
  const missingSections = [
    !profile.headline && "headline",
    !profile.about && "about",
    !(profile.experience || []).length && "experience",
    !(profile.skills || []).length && "skills",
  ].filter(Boolean) as string[];

  return {
    text,
    keywords,
    stuffingFlags,
    missingSections,
    keywordCoverage: distributedKeywordCoverage(profile, keywords),
    headlineLengthScore: scoreLengthRange(countChars(profile.headline), LINKEDIN_PROFILE_STANDARDS.headline.idealChars.min, LINKEDIN_PROFILE_STANDARDS.headline.idealChars.max, LINKEDIN_PROFILE_STANDARDS.headline.maxCharsObserved),
    aboutLengthScore: scoreLengthRange(countWords(profile.about), LINKEDIN_PROFILE_STANDARDS.about.idealWords.min, LINKEDIN_PROFILE_STANDARDS.about.idealWords.max),
    skillsCount: (profile.skills || []).length,
    hasVerification: hasAnyVerification(profile),
    hasProof: hasQuantifiedProof(text) || Boolean(profile.featured?.length || profile.recommendationsReceived?.length),
    hasCTA: hasClearCTA(`${profile.about || ""} ${profile.contact?.website || ""} ${profile.contact?.customButtonUrl || ""} ${profile.contact?.calendarUrl || ""}`),
    hasActivity: hasRecentActivity(profile),
    hasICP: detectICP(text, context),
    hasOffer: detectOffer(text, context),
    hasOutcome: detectOutcomeLanguage(text),
    buzzwords: detectGenericBuzzwords(text),
  };
};

const scoreJobSeekerProfile = (profile: LinkedInProfileSnapshot, context: ProfileTargetContext): ProfileScoreResult => {
  const d = buildBaseDiagnostics(profile, context);
  const weights = PERSONA_WEIGHTS.job_seeker;
  const standardTitleScore = Math.max(...(profile.experience || [{ title: profile.headline }]).map((item) => detectStandardTitle(item.title || "", context.targetRoleTitles || [])), 0);
  const openToWorkScore = profile.openToWork ? 100 : 45;
  const skillsScore = scoreSkills(profile, d.keywords, true);
  const recruiterConversion = clamp((d.aboutLengthScore * 0.35) + (standardTitleScore * 0.25) + (d.hasCTA ? 15 : 0) + (d.hasVerification ? 15 : 0) + (d.hasProof ? 10 : 0));
  const subScores = {
    keywordRelevance: sub(d.keywordCoverage, "Keyword relevance", "Keyword coverage across headline, About, experience, and skills."),
    completenessAndOpenToWork: sub(clamp(completenessScore(profile) * 0.6 + openToWorkScore * 0.4), "Completeness & Open to Work", "Completeness plus Open to Work/job-preference visibility."),
    experienceAlignment: sub(standardTitleScore, "Experience alignment", "Current title and experience clarity for recruiter search."),
    skillsDepthAndFocus: sub(skillsScore, "Skills depth & focus", "Relevant skills count, ordering, and keyword fit. LinkedIn supports up to 100 skills, but relevance matters more than volume."),
    recruiterConversion: sub(recruiterConversion, "Recruiter conversion", "About quality, CTA, proof, and verification for recruiter reading."),
    activityAndRecency: sub(d.hasActivity ? 82 : 35, "Activity & recency", "Recent role-relevant activity and comments."),
  };
  return finishScore(profile, context, subScores, weights, d);
};

const scoreFounderCeoProfile = (profile: LinkedInProfileSnapshot, context: ProfileTargetContext): ProfileScoreResult => {
  const d = buildBaseDiagnostics(profile, context);
  const subScores = {
    positioningAndICP: sub(clamp((d.hasICP ? 45 : 10) + d.headlineLengthScore * 0.35 + (d.hasOutcome ? 20 : 0)), "Positioning & ICP", "Headline/About should say who you help and what outcome you create."),
    offerClarity: sub(clamp((d.hasOffer ? 65 : 25) + (d.hasCTA ? 20 : 0) + (d.hasOutcome ? 15 : 0)), "Offer clarity", "Profile should make the offer and next step obvious."),
    authorityAndProof: sub(scoreProof(profile, d), "Authority & proof", "Proof from metrics, recommendations, case studies, Featured, or Experience media."),
    keywordAndCategoryFit: sub(d.keywordCoverage, "Keyword & category fit", "Natural category keywords without stuffing."),
    trustAndVerification: sub(clamp((d.hasVerification ? 75 : 35) + (profile.profilePictureUrl ? 10 : 0) + (profile.bannerUrl ? 10 : 0)), "Trust & verification", "Verification and complete visual trust signals."),
    activityAndThoughtLeadership: sub(d.hasActivity ? 82 : 38, "Activity & thought leadership", "Recent content or engagement around ICP problems."),
  };
  return finishScore(profile, context, subScores, PERSONA_WEIGHTS.founder_ceo, d);
};

const scoreSalesProfile = (profile: LinkedInProfileSnapshot, context: ProfileTargetContext): ProfileScoreResult => {
  const d = buildBaseDiagnostics(profile, context);
  const subScores = {
    buyerTrustAndCredibility: sub(clamp(scoreProof(profile, d) * 0.55 + (d.hasVerification ? 30 : 10) + (d.buzzwords.length ? -10 : 10)), "Buyer trust & credibility", "Outbound profile must feel credible, specific, and non-spammy."),
    icpAndOfferAlignment: sub(clamp((d.hasICP ? 45 : 10) + (d.hasOffer ? 35 : 10) + (d.hasOutcome ? 20 : 0)), "ICP & offer alignment", "Buyer, problem, and offer clarity for outbound."),
    headlineAndPositioning: sub(clamp(d.headlineLengthScore * 0.65 + keywordMatchScore(profile.headline || "", d.keywords) * 0.35), "Headline & positioning", "Headline should say who you help, not only job title."),
    proofAndSocialValidation: sub(scoreProof(profile, d), "Proof & social validation", "Metrics, recommendations, case studies, or useful proof assets."),
    activityAndEngagement: sub(d.hasActivity ? 82 : 35, "Activity & engagement", "Relevant comments/posts in the buyer niche."),
    completenessAndContactability: sub(clamp(completenessScore(profile) * 0.75 + (d.hasCTA ? 25 : 0)), "Completeness & contactability", "Complete profile plus clear CTA/contact path."),
  };
  return finishScore(profile, context, subScores, PERSONA_WEIGHTS.sales_sdr_ae, d);
};

const scoreConsultantProfile = (profile: LinkedInProfileSnapshot, context: ProfileTargetContext): ProfileScoreResult => {
  const d = buildBaseDiagnostics(profile, context);
  const subScores = {
    nichePositioning: sub(clamp((d.hasICP ? 45 : 10) + keywordMatchScore(profile.headline || "", d.keywords) * 0.35 + (d.hasOutcome ? 20 : 0)), "Niche positioning", "Clear niche and audience promise."),
    offerAndOutcomeClarity: sub(clamp((d.hasOffer ? 55 : 20) + (d.hasOutcome ? 30 : 0) + (d.hasCTA ? 15 : 0)), "Offer & outcome clarity", "Consultant profile should sell a clear expertise-to-outcome path."),
    authorityProof: sub(scoreProof(profile, d), "Authority proof", "Testimonials, recommendations, case studies, frameworks, or quantified outcomes."),
    conversionAssets: sub(clamp((d.hasCTA ? 45 : 10) + (profile.featured?.length ? 25 : 10) + (profile.contact?.website || profile.contact?.calendarUrl ? 30 : 5)), "Conversion assets", "CTA, proof asset, website, calendar, or custom button."),
    keywordCategoryFit: sub(d.keywordCoverage, "Keyword category fit", "Natural category terms across key sections."),
    activityAndTrust: sub(clamp((d.hasActivity ? 55 : 25) + (d.hasVerification ? 25 : 10) + (profile.recommendationsReceived?.length ? 20 : 5)), "Activity & trust", "Expertise content plus trust signals."),
  };
  return finishScore(profile, context, subScores, PERSONA_WEIGHTS.consultant_coach, d);
};

const scoreRecruiterProfile = (profile: LinkedInProfileSnapshot, context: ProfileTargetContext): ProfileScoreResult => {
  const d = buildBaseDiagnostics(profile, context);
  const subScores = {
    trustAndVerification: sub(clamp((d.hasVerification ? 75 : 30) + (profile.recommendationsReceived?.length ? 15 : 0) + (profile.profilePictureUrl ? 10 : 0)), "Trust & verification", "Recruiters benefit strongly from verification and candidate/client trust proof."),
    recruitingNicheClarity: sub(clamp((d.hasICP ? 45 : 15) + keywordMatchScore(profile.headline || "", d.keywords) * 0.35 + (context.recruitingNiche ? 20 : 0)), "Recruiting niche clarity", "Roles, industry, region, and seniority should be obvious."),
    talentAttraction: sub(clamp(d.aboutLengthScore * 0.45 + (d.hasCTA ? 20 : 0) + (profile.openToWorkRoles?.length ? 10 : 0) + (d.hasOutcome ? 25 : 0)), "Talent attraction", "Candidate-facing clarity and approachability."),
    clientCredibility: sub(scoreProof(profile, d), "Client credibility", "Client/candidate outcomes, roles handled, recommendations, and proof."),
    activityAndMarketInsight: sub(d.hasActivity ? 82 : 35, "Activity & market insight", "Hiring insights, market updates, and active role commentary."),
    completenessAndContactability: sub(clamp(completenessScore(profile) * 0.75 + (d.hasCTA ? 25 : 0)), "Completeness & contactability", "Complete profile and contact route for candidates/clients."),
  };
  return finishScore(profile, context, subScores, PERSONA_WEIGHTS.recruiter_talent, d);
};

const finishScore = (
  profile: LinkedInProfileSnapshot,
  context: ProfileTargetContext,
  subScores: ProfileScoreResult["subScores"],
  weights: Record<string, number>,
  diagnostics: ReturnType<typeof buildBaseDiagnostics>
): ProfileScoreResult => {
  const stuffingPenalty = diagnostics.stuffingFlags.length ? 8 : 0;
  const overallScore = clamp(Object.entries(weights).reduce((total, [key, weight]) => total + ((subScores[key]?.score || 0) * weight), 0) - stuffingPenalty);
  const suggestions = buildSuggestions(profile, context, diagnostics, subScores);
  const resultWithoutMakeover: Omit<ProfileScoreResult, "makeover"> = {
    persona: context.persona,
    overallScore,
    scoreBand: getScoreBand(overallScore),
    subScores,
    searchVisibilityScore: clamp((diagnostics.keywordCoverage + (subScores.keywordRelevance?.score || subScores.keywordAndCategoryFit?.score || subScores.keywordCategoryFit?.score || 0)) / 2),
    postClickConversionScore: clamp(((diagnostics.hasCTA ? 80 : 35) + diagnostics.aboutLengthScore + (diagnostics.hasOffer ? 80 : 30)) / 3),
    trustScore: clamp(((diagnostics.hasVerification ? 90 : 40) + scoreProof(profile, diagnostics)) / 2),
    strengths: buildStrengths(profile, diagnostics),
    risks: buildRisks(diagnostics, suggestions),
    suggestions,
    debug: {
      detectedKeywords: diagnostics.keywords,
      missingKeywords: diagnostics.keywords.filter((keyword) => keywordMatchScore(diagnostics.text, [keyword]) === 0),
      keywordStuffingFlags: diagnostics.stuffingFlags.map(({ field, reason, repeatedTerms }) => ({ field, reason, repeatedTerms })),
      missingSections: diagnostics.missingSections,
      standardsVersion: LINKEDIN_PROFILE_STANDARDS.version,
    },
  };
  return { ...resultWithoutMakeover, makeover: generateProfileMakeover(profile, context, resultWithoutMakeover) };
};

const buildSuggestions = (profile: LinkedInProfileSnapshot, context: ProfileTargetContext, d: ReturnType<typeof buildBaseDiagnostics>, subScores: ProfileScoreResult["subScores"]) => {
  const suggestions: ProfileSuggestion[] = [];
  if (!profile.headline) addSuggestion(suggestions, suggestion(context.persona, "missing-headline", "headline", "SearchVisibility", "HIGH", 95, 25, "Headline is missing.", headlineSuggestion(context.persona)));
  if (profile.headline && keywordMatchScore(profile.headline, d.keywords) < 35) addSuggestion(suggestions, suggestion(context.persona, "headline-keyword-fit", "headline", "SearchVisibility", "HIGH", 90, 35, "Headline lacks clear target role/category keywords.", headlineSuggestion(context.persona), [profile.headline]));
  if (!profile.about || countWords(profile.about) < 80) addSuggestion(suggestions, suggestion(context.persona, "about-too-short", "about", "Positioning", "HIGH", 92, 45, "About section is missing or too short for trust and conversion.", "Rewrite About with role/category keywords, ICP or recruiter audience, proof, and a clear next step."));
  if (!d.hasProof && ["founder_ceo", "sales_sdr_ae", "consultant_coach"].includes(context.persona)) addSuggestion(suggestions, suggestion(context.persona, "missing-proof", "trust", "Credibility", "HIGH", 88, 40, "Profile lacks visible proof signals.", "Add verified metrics, recommendations, case studies, customer outcomes, Experience media, or a proof link. Use placeholders until metrics are verified."));
  if (!profile.skills?.length) addSuggestion(suggestions, suggestion(context.persona, "missing-skills", "skills", "SearchVisibility", "HIGH", 85, 25, "Skills section is missing.", "Add relevant skills and prioritize the top 3. LinkedIn supports up to 100 skills, but relevance, order, and endorsements matter more than volume."));
  if ((profile.skills?.length || 0) > 70) addSuggestion(suggestions, suggestion(context.persona, "skills-prune", "skills", "BrandCoherence", "MEDIUM", 65, 30, "Skills list may be too broad.", "Prune or reorder irrelevant skills so the top skills match your persona and target opportunity."));
  if (context.persona === "job_seeker" && !profile.openToWork) addSuggestion(suggestions, suggestion(context.persona, "open-to-work", "profile_completeness", "RecruiterConversion", "HIGH", 90, 15, "Open to Work is not visible in the scraped data.", "If actively job-seeking, enable Open to Work. Consider recruiters-only visibility if privacy matters; India users can add availability/notice period and expected salary if comfortable."));
  if (["founder_ceo", "sales_sdr_ae", "recruiter_talent"].includes(context.persona) && !d.hasVerification) addSuggestion(suggestions, suggestion(context.persona, "verification-trust", "verification", "BuyerTrust", "MEDIUM", 78, 20, "No visible verification was detected.", "Add identity, workplace, education, or recruiter verification where available to improve trust."));
  if (!d.hasActivity) addSuggestion(suggestions, suggestion(context.persona, "activity-dormant", "activity", "Activity", "MEDIUM", 72, 45, "No recent activity was detected in the scraped data.", "Add simple weekly persona-specific activity: useful comments, proof posts, market insights, or candidate/client advice."));
  if (!d.hasCTA) addSuggestion(suggestions, suggestion(context.persona, "missing-cta", "contact", "OfferClarity", "MEDIUM", 70, 25, "No clear CTA/contact path was detected.", "Add a clear next step in About or Contact: message, email, website, portfolio, booking link, or custom button where available."));
  if (d.stuffingFlags.length) addSuggestion(suggestions, suggestion(context.persona, "keyword-stuffing", "positioning", "BrandCoherence", "HIGH", 86, 40, "Keyword stuffing detected.", "Rewrite keyword-heavy text into natural buyer/recruiter language. One to three meaningful mentions are useful; repeated dumps reduce clarity."));
  return suggestions.sort((a, b) => b.impactScore - a.impactScore).slice(0, 12);
};

const scoreSkills = (profile: LinkedInProfileSnapshot, keywords: string[], jobSeeker = false) => {
  const skills = profile.skills || [];
  const countScore = scoreLengthRange(skills.length, LINKEDIN_PROFILE_STANDARDS.skills.minimumHealthyCount, LINKEDIN_PROFILE_STANDARDS.skills.idealRelevantCount.max, LINKEDIN_PROFILE_STANDARDS.skills.linkedinMax);
  const relevance = keywordMatchScore(skills.map((skill) => skill.name).join(" "), keywords);
  const endorsements = skills.some((skill) => (skill.endorsementCount || 0) > 0) ? 12 : 0;
  return clamp(countScore * (jobSeeker ? 0.45 : 0.35) + relevance * (jobSeeker ? 0.45 : 0.5) + endorsements);
};

const scoreProof = (profile: LinkedInProfileSnapshot, d: ReturnType<typeof buildBaseDiagnostics>) => clamp(
  (d.hasProof ? 45 : 15) +
  (profile.recommendationsReceived?.length ? 20 : 0) +
  (profile.featured?.length ? 15 : 5) +
  (profile.experience?.some((item) => hasQuantifiedProof(item.description || "")) ? 20 : 0)
);

const buildStrengths = (profile: LinkedInProfileSnapshot, d: ReturnType<typeof buildBaseDiagnostics>) => [
  profile.headline && "Headline is present.",
  profile.about && "About section is present.",
  (profile.skills?.length || 0) >= LINKEDIN_PROFILE_STANDARDS.skills.minimumHealthyCount && "Healthy skills foundation detected.",
  d.hasProof && "Proof signal detected.",
  d.hasVerification && "Verification trust signal detected.",
  d.hasActivity && "Activity signal detected.",
].filter(Boolean) as string[];

const buildRisks = (d: ReturnType<typeof buildBaseDiagnostics>, suggestions: ProfileSuggestion[]) => [
  ...d.missingSections.map((section) => `Missing ${section} section.`),
  d.stuffingFlags.length ? "Keyword stuffing may reduce clarity." : undefined,
  ...suggestions.filter((item) => item.priority === "HIGH").slice(0, 3).map((item) => item.reason),
].filter(Boolean) as string[];

const sub = (score: number, label: string, explanation: string, evidence?: string[]) => ({ score: clamp(score), label, explanation, evidence });
const getScoreBand = (score: number): ProfileScoreResult["scoreBand"] => score >= 85 ? "excellent" : score >= 70 ? "strong" : score >= 50 ? "average" : "weak";
const inferDefaultKeywords = (profile: LinkedInProfileSnapshot, persona: Persona) => Array.from(new Set([
  ...(profile.headline || "").split(/[|,•\-]/).map((item) => item.trim()).filter(Boolean),
  ...(profile.skills || []).slice(0, 8).map((skill) => skill.name),
  persona.replace(/_/g, " "),
])).slice(0, 10);

const headlineSuggestion = (persona: Persona) => ({
  job_seeker: "Use: [Target Role] | [Core Skills] | [Domain].",
  founder_ceo: "Use: Founder @ [Company] | We help [ICP] achieve [Outcome].",
  sales_sdr_ae: "Use: [Role] at [Company] | Helping [ICP] solve [Problem].",
  consultant_coach: "Use: [Niche Consultant] | Helping [ICP] achieve [Outcome].",
  recruiter_talent: "Use: [Niche Recruiter] | Hiring [Roles] for [Industry/Region].",
}[persona]);

const suggestion = (
  persona: Persona,
  id: string,
  section: ProfileSuggestion["section"],
  category: ProfileSuggestion["category"],
  priority: ProfileSuggestion["priority"],
  impactScore: number,
  effortScore: number,
  reason: string,
  suggestionText: string,
  evidence?: string[]
): ProfileSuggestion => ({ id, persona, section, category, priority, impactScore, effortScore, reason, suggestionText, evidence });
