"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { PulseLoader } from "react-spinners";
import { scoreLinkedInProfilePayload } from "@/scoring/linkedinProfileScoring";

const getScoreTone = (score) => {
  if (score >= 85) return { label: "Excellent", color: "#16a34a", status: "Best-practice aligned" };
  if (score >= 70) return { label: "Strong", color: "#22c55e", status: "Good foundation" };
  if (score >= 50) return { label: "Average", color: "#f59e0b", status: "Needs optimization" };
  return { label: "Needs work", color: "#dc2626", status: "Conversion risk" };
};

const ROLE_SCORE_WEIGHTS = {
  "Job Seeker": { headline: 20, about: 18, experience: 22, skills: 16, proof: 12, activity: 12 },
  "Founder / CEO": { headline: 22, about: 18, experience: 16, skills: 10, proof: 16, activity: 18 },
  "Sales / SDR / AE": { headline: 20, about: 16, experience: 18, skills: 12, proof: 16, activity: 18 },
  "Consultant / Coach": { headline: 22, about: 20, experience: 14, skills: 10, proof: 18, activity: 16 },
  "Recruiter / Talent": { headline: 18, about: 16, experience: 18, skills: 16, proof: 12, activity: 20 },
};

const clampScore = (score) => Math.max(0, Math.min(100, Math.round(Number(score) || 0)));

const countWords = (value) => {
  if (!value) return 0;
  const text = Array.isArray(value) ? value.join(" ") : String(value);
  return text.trim().split(/\s+/).filter(Boolean).length;
};

const getProfile = (payload) => payload?.profile || payload?.original?.profile || payload || {};

const scoreText = (text, minWords, maxWords) => {
  const words = countWords(text);
  if (!words) return 0;
  if (words >= minWords && words <= maxWords) return 1;
  if (words > maxWords) return 0.85;
  return Math.min(0.85, words / minWords);
};

const calculateLinkedInScore = (payload, selectedRole) => {
  const explicitScore = payload?.baseScore || payload?.score?.total || payload?.original?.score?.total;
  if (explicitScore) return clampScore(String(explicitScore).replace("%", ""));

  const profile = getProfile(payload);
  const weights = ROLE_SCORE_WEIGHTS[selectedRole] || ROLE_SCORE_WEIGHTS["Job Seeker"];
  const headlineScore = scoreText(profile.headline, 8, 28);
  const aboutScore = scoreText(profile.about, selectedRole === "Founder / CEO" ? 55 : 45, 180);
  const experienceCount = Array.isArray(profile.experience) ? profile.experience.length : profile.experience ? 1 : 0;
  const experienceScore = Math.min(1, experienceCount / 2);
  const skillsCount = Array.isArray(profile.skills) ? profile.skills.length : countWords(profile.skills);
  const skillsScore = Math.min(1, skillsCount / 12);
  const proofSignals = [profile.connections, profile.education, profile.certifications, profile.recommendations, profile.featured].filter(Boolean).length;
  const proofScore = Math.min(1, proofSignals / 3);
  const activitySignals = [profile.posts, profile.activity, profile.creator_mode, profile.followers].filter(Boolean).length;
  const activityScore = Math.min(1, activitySignals / 2);

  return clampScore(
    headlineScore * weights.headline +
    aboutScore * weights.about +
    experienceScore * weights.experience +
    skillsScore * weights.skills +
    proofScore * weights.proof +
    activityScore * weights.activity
  );
};

const getScoreTone = (score) => {
  if (score >= 90) return { label: "Green", color: "#16a34a", status: "Excellent" };
  if (score >= 60) return { label: "Yellow", color: "#f59e0b", status: "Needs Optimization" };
  return { label: "Red", color: "#dc2626", status: "Revenue Leak" };
};

export default function AuditSection() {
  // ================= STATES =================
  const [url, setUrl] = useState("");
  const [role, setRole] = useState("Job Seeker");
  const [accepted, setAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [showResultModal, setShowResultModal] = useState(false);
  const [showExtensionPopup, setShowExtensionPopup] = useState(false);

  const [isExtensionReady, setIsExtensionReady] = useState(false);

  const extensionDetectedRef = useRef(false);

  // ================= EXTENSION CHECK =================
  useEffect(() => {
    let pingInterval;

    const handler = (e) => {
      if (e.data === "EXTENSION_RUNNING") {
        if (extensionDetectedRef.current) return;

        extensionDetectedRef.current = true;
        setIsExtensionReady(true);
        setShowExtensionPopup(false);
        clearInterval(pingInterval);
        localStorage.removeItem("audit_auto_reloaded");
      }
    };

    window.addEventListener("message", handler);

    pingInterval = setInterval(() => {
      if (!extensionDetectedRef.current) {
        window.postMessage("PING_EXTENSION", "*");
      }
    }, 700);

    const hasReloaded = localStorage.getItem("audit_auto_reloaded");

    if (!hasReloaded) {
      localStorage.setItem("audit_auto_reloaded", "true");

      setTimeout(() => {
        if (!extensionDetectedRef.current) {
          window.location.reload();
        }
      }, 1200);
    }

    return () => {
      clearInterval(pingInterval);
      window.removeEventListener("message", handler);
    };
  }, []);


  useEffect(() => {
    const onFocus = () => {
      const waiting = localStorage.getItem("audit_waiting_for_extension");

      if (waiting && !extensionDetectedRef.current) {
        localStorage.removeItem("audit_waiting_for_extension");
        window.location.reload();
      }
    };

    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);



  // ================= LISTEN SCRAPE RESULT =================
  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.from !== "LINKEDIN_AUDIT_EXT") return;

      if (e.data.type === "SCRAPE_RESULT") {
        setLoading(false);
        setResult(e.data.payload);
        setShowResultModal(true);
      }
    };

    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // ================= HELPERS =================
  const normalizeLinkedInUrl = (rawUrl) => {
    let finalUrl = rawUrl.trim();
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }
    return finalUrl;
  };

  // ================= START AUDIT =================
  const startAudit = () => {
    if (!url) return alert("Enter LinkedIn profile URL");
    if (!accepted) return alert("Please accept Terms & Privacy Policy");

    //  EXTENSION NOT INSTALLED
    if (!isExtensionReady) {
      setShowExtensionPopup(true);
      return;
    }

    const finalUrl = normalizeLinkedInUrl(url);

    if (!finalUrl.includes("linkedin.com/")) {
      return alert("Please enter a valid LinkedIn profile URL");
    }

    localStorage.setItem("linkedin_audit_url", finalUrl);
    localStorage.setItem("linkedin_audit_role", role);

    setLoading(true);

    window.postMessage(
      {
        type: "START_SCRAPE",
        url: finalUrl,
        role,
        accepted,
        sameTab: true,
        scoringModel: "QCS LinkedIn-aware persona scoring v2026-05",
      },
      "*"
    );
  };

  function handleextensionInstall() {

    if (isExtensionReady || extensionDetectedRef.current) {
      return;
    }

    setShowExtensionPopup(true);
  }


  const scoreResult = result ? scoreLinkedInProfilePayload(result, role) : null;
  const auditScore = scoreResult?.overallScore || 0;
  const scoreTone = getScoreTone(auditScore);
  const topSuggestions = scoreResult?.suggestions?.slice(0, 3) || [];

  const startRewritePayment = () => {
    localStorage.setItem("linkedin_audit_score", String(auditScore));
    localStorage.setItem("linkedin_audit_report", JSON.stringify(scoreResult));
    localStorage.setItem("linkedin_paid_service", "profile-rewrite-100-score");
    localStorage.setItem("linkedin_paid_amount", "49");
    window.location.href = "/payment";
  };

  // ================= UI =================
  return (
    <div className="audit-hero" id="linkedinaudit">
      <div className="audit-inner">

        {/* TRUST with image and star */}
        <div className="audit-trust">
          <Image
            src="/assets/img/Images/auditimage.png"
            alt="users"
            width={124}
            height={40}
          />
          <div>
            <span className="text-warning">★★★★★</span>
            <p>Trusted by 200+ Professionals</p>
          </div>
        </div>

        {/* HEADING */}
        <h2 className="audit-heading">
          Audit Your LinkedIn <span>{`{Profile}`}</span> Score <br />
          <strong>Before We Rewrite It to 100%</strong>
        </h2>

        <p className="audit-desc">
          Enter your LinkedIn profile URL in this Chrome tab, stay logged in to LinkedIn,
          choose your profile type, and get a role-based audit score.
        </p>

        {/* INPUTS */}
        <div className="audit-input-row">
          <input
            placeholder="LINKEDIN PROFILE URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={handleextensionInstall}
            // className="border"
            required
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Job Seeker">Job Seeker</option>
            <option value="Founder / CEO">Founder / CEO</option>
            <option value="Sales / SDR / AE">Sales / SDR / AE</option>
            <option value="Consultant / Coach">Consultant / Coach</option>
            <option value="Recruiter / Talent">Recruiter / Talent</option>
          </select>
        </div>

        {/* BUTTON */}
        <button
          className="audit-main-btn"
          onClick={startAudit}
          disabled={loading}
        >
          {loading ? <PulseLoader size={10} color="#fff" /> : "Audit My Profile →"}
        </button>

        {/* TERMS */}
        <label className="terms">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span>
            I accept the{" "}
            <Link href="/terms-condition" target="_blank">Terms</Link> &{" "}
            <Link href="/privacy-policy" target="_blank">Privacy Policy</Link>
          </span>
        </label>

        <p className="audit-note">
          Keep LinkedIn logged in on this same Chrome browser tab. The extension reads visible profile data and sends it to our role-based scoring model.
        </p>

        <p className="audit-secure">
          No passwords · No contacts · No messages · Rule-based, explainable scoring · ₹49 paid rewrite available after score
        </p>

        {/* ================= EXTENSION POPUP ================= */}
        {showExtensionPopup && (
          <div className="audit-overlay">
            <div className="audit-popup">
              <h2 className="audit-title">
                Install Our <span>Chrome Extension</span>
              </h2>

              <p style={{ textAlign: "center", marginBottom: 20 }}>
                To audit your LinkedIn profile, install our secure Chrome extension and stay logged in to LinkedIn in this same Chrome browser. It only reads visible profile data needed for scoring.
              </p>
              <p style={{ textAlign: "center", marginBottom: "40px" }}>
                 Please make sure you are logged in to LinkedIn on this Chrome browser.

              </p>

              <Link
                href="https://chromewebstore.google.com/detail/fongccbjkdphnmdigpkbphnjaiodmlek?utm_source=item-share-cb"
                target="_blank"
                rel="noopener noreferrer"
                className="audit-main-btn"
                onClick={() => {
                  localStorage.setItem("audit_waiting_for_extension", "true");
                }}
              >
                Add Extension →
              </Link>


              <button
                className="audit-close"
                onClick={() => setShowExtensionPopup(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* ================= RESULT POPUP ================= */}
        {showResultModal && result && (
          <div className="audit-overlay">
            <div className="audit-popup">
              <h2 className="audit-title">
                Your LinkedIn <span>Audit</span> Is Ready
              </h2>

              <div
                className="progress-ring"
                style={{ borderColor: scoreTone.color, boxShadow: `0 0 0 10px ${scoreTone.color}22` }}
              >
                <div className="progress-text" style={{ color: scoreTone.color }}>
                  {auditScore}%
                </div>
              </div>

              <p style={{ textAlign: "center", margin: "18px 0 8px", color: scoreTone.color, fontWeight: 700 }}>
                {scoreTone.label} · {scoreTone.status} · {scoreResult?.persona?.replaceAll("_", " ")}
              </p>
              <p style={{ textAlign: "center", marginBottom: 18 }}>
                This score is aligned with known LinkedIn profile best practices. It is designed to improve clarity, trust, search visibility, and post-click conversion — not to guarantee rankings, jobs, or leads.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 18 }}>
                <div className="rounded-3 p-2" style={{ background: "#f7f8fb" }}>
                  <strong>{scoreResult?.searchVisibilityScore || 0}%</strong>
                  <p className="mb-0" style={{ fontSize: 12 }}>Search Visibility</p>
                </div>
                <div className="rounded-3 p-2" style={{ background: "#f7f8fb" }}>
                  <strong>{scoreResult?.postClickConversionScore || 0}%</strong>
                  <p className="mb-0" style={{ fontSize: 12 }}>Post-Click Conversion</p>
                </div>
                <div className="rounded-3 p-2" style={{ background: "#f7f8fb" }}>
                  <strong>{scoreResult?.trustScore || 0}%</strong>
                  <p className="mb-0" style={{ fontSize: 12 }}>Trust & Proof</p>
                </div>
              </div>

              {scoreResult?.subScores && (
                <div style={{ textAlign: "left", marginBottom: 20 }}>
                  <strong>Section scores</strong>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginTop: 8 }}>
                    {Object.entries(scoreResult.subScores).slice(0, 6).map(([key, item]) => (
                      <div key={key} className="rounded-3 p-2" style={{ background: "#fff", border: "1px solid #eee" }}>
                        <span style={{ fontSize: 12 }}>{item.label}</span>
                        <strong style={{ float: "right" }}>{item.score}%</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {topSuggestions.length > 0 && (
                <div style={{ textAlign: "left", marginBottom: 20 }}>
                  <strong>Top priority fixes</strong>
                  <ul style={{ paddingLeft: 18, marginTop: 8 }}>
                    {topSuggestions.map((item) => (
                      <li key={item.id} style={{ marginBottom: 6 }}>
                        <span style={{ fontWeight: 700 }}>{item.priority}:</span> {item.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {scoreResult?.makeover?.headlineOptions?.[0] && (
                <p style={{ textAlign: "left", fontSize: 13, background: "#f7f8fb", padding: 12, borderRadius: 12 }}>
                  <strong>Makeover preview:</strong> {scoreResult.makeover.headlineOptions[0]}
                </p>
              )}

              <button type="button" onClick={startRewritePayment} className="audit-main-btn">
                Rewrite My Profile With Makeover Plan — Pay ₹49 →
              </button>

              <button
                className="audit-close"
                onClick={() => setShowResultModal(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
