"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PulseLoader } from "react-spinners";
import { scoreLinkedInProfilePayload } from "@/scoring/linkedinProfileScoring";


const EXTENSION_DETECTION_WINDOW_MS = 6000;
const SCRAPE_RESPONSE_TIMEOUT_MS = 12000;

const isExtensionReadyMessage = (data) => {
  if (!data) return false;
  if (data === "EXTENSION_RUNNING" || data === "QCS_LINKEDIN_AUDIT_READY") return true;

  if (typeof data !== "object") return false;

  const type = String(data.type || data.event || "").toUpperCase();
  const from = String(data.from || data.source || "").toUpperCase();

  if (from === "QCS_LINKEDIN_AUDIT_PAGE") return false;

  return (
    from.includes("LINKEDIN_AUDIT_EXT") ||
    from.includes("QCS_LINKEDIN_AUDIT_EXTENSION") ||
    type === "EXTENSION_RUNNING" ||
    type === "EXTENSION_READY" ||
    type === "PONG_EXTENSION" ||
    type === "PONG" ||
    type === "QCS_LINKEDIN_AUDIT_READY"
  );
};

const postExtensionPing = () => {
  window.postMessage("PING_EXTENSION", "*");
  window.postMessage({ type: "PING_EXTENSION", from: "QCS_LINKEDIN_AUDIT_PAGE" }, "*");
  window.postMessage({ type: "QCS_LINKEDIN_AUDIT_PING", from: "QCS_LINKEDIN_AUDIT_PAGE" }, "*");
};

const getScoreTone = (score) => {
  if (score >= 85) return { label: "Excellent", color: "#16a34a", status: "Best-practice aligned" };
  if (score >= 70) return { label: "Strong", color: "#22c55e", status: "Good foundation" };
  if (score >= 50) return { label: "Average", color: "#f59e0b", status: "Needs optimization" };
  return { label: "Needs work", color: "#dc2626", status: "Conversion risk" };
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
  const [checkingExtension, setCheckingExtension] = useState(true);

  const [isExtensionReady, setIsExtensionReady] = useState(false);

  const extensionDetectedRef = useRef(false);

  const markExtensionReady = useCallback(() => {
    if (extensionDetectedRef.current) return;

    extensionDetectedRef.current = true;
    setIsExtensionReady(true);
    setCheckingExtension(false);
    setShowExtensionPopup(false);
    localStorage.removeItem("audit_waiting_for_extension");
  }, []);

  // ================= EXTENSION CHECK =================
  useEffect(() => {
    let pingInterval;
    let detectionTimeout;

    const handler = (e) => {
      if (isExtensionReadyMessage(e.data)) {
        markExtensionReady();
      }
    };

    const pingExtension = () => {
      if (!extensionDetectedRef.current) {
        postExtensionPing();
      }
    };

    window.addEventListener("message", handler);
    pingExtension();
    pingInterval = setInterval(pingExtension, 700);

    detectionTimeout = setTimeout(() => {
      if (!extensionDetectedRef.current) {
        setCheckingExtension(false);
      }
    }, EXTENSION_DETECTION_WINDOW_MS);

    return () => {
      clearInterval(pingInterval);
      clearTimeout(detectionTimeout);
      window.removeEventListener("message", handler);
    };
  }, [markExtensionReady]);


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
      if (!e.data || typeof e.data !== "object") return;

      if (isExtensionReadyMessage(e.data)) {
        markExtensionReady();
      }

      if (e.data.from !== "LINKEDIN_AUDIT_EXT") return;

      if (e.data.type === "SCRAPE_RESULT") {
        setLoading(false);
        setResult(e.data.payload);
        setShowResultModal(true);
      }

      if (e.data.type === "SCRAPE_ERROR") {
        setLoading(false);
        setShowExtensionPopup(true);
      }
    };

    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [markExtensionReady]);

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

    if (checkingExtension) {
      postExtensionPing();
    }

    const finalUrl = normalizeLinkedInUrl(url);

    if (!finalUrl.includes("linkedin.com/")) {
      return alert("Please enter a valid LinkedIn profile URL");
    }

    localStorage.setItem("linkedin_audit_url", finalUrl);
    localStorage.setItem("linkedin_audit_role", role);

    setLoading(true);
    setShowExtensionPopup(false);

    window.postMessage(
      {
        type: "START_SCRAPE",
        from: "QCS_LINKEDIN_AUDIT_PAGE",
        url: finalUrl,
        role,
        accepted,
        sameTab: true,
        scoringModel: "QCS LinkedIn-aware persona scoring v2026-05",
      },
      "*"
    );

    window.setTimeout(() => {
      if (!extensionDetectedRef.current) {
        setLoading(false);
        setShowExtensionPopup(true);
      }
    }, SCRAPE_RESPONSE_TIMEOUT_MS);
  };

  const auditSummary = useMemo(() => {
    const report = result ? scoreLinkedInProfilePayload(result, role) : null;
    const overallScore = report?.overallScore || 0;

    return {
      report,
      overallScore,
      tone: getScoreTone(overallScore),
      suggestions: report?.suggestions?.slice(0, 3) || [],
    };
  }, [result, role]);

  const handleRewritePayment = useCallback(() => {
    localStorage.setItem("linkedin_audit_score", String(auditSummary.overallScore));
    localStorage.setItem("linkedin_audit_report", JSON.stringify(auditSummary.report));
    localStorage.setItem("linkedin_paid_service", "profile-rewrite-100-score");
    localStorage.setItem("linkedin_paid_amount", "49");
    window.location.href = "/payment";
  }, [auditSummary]);

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

        <p className="audit-note" style={{ marginTop: 12 }}>
          {isExtensionReady
            ? "Extension detected. You can run the audit now."
            : checkingExtension
              ? "Checking for the extension in the background. You can still click Audit My Profile."
              : "If the extension is installed, click Audit My Profile. We will only show setup help if it does not respond."}
        </p>

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
                We could not receive a response from the QCS LinkedIn Audit extension in this Chrome tab. If it is already installed, refresh this page, make sure the extension is enabled for qcsstudio.com, and try the audit again.
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
                style={{ borderColor: auditSummary.tone.color, boxShadow: `0 0 0 10px ${auditSummary.tone.color}22` }}
              >
                <div className="progress-text" style={{ color: auditSummary.tone.color }}>
                  {auditSummary.overallScore}%
                </div>
              </div>

              <p style={{ textAlign: "center", margin: "18px 0 8px", color: auditSummary.tone.color, fontWeight: 700 }}>
                {auditSummary.tone.label} · {auditSummary.tone.status} · {auditSummary.report?.persona?.replaceAll("_", " ")}
              </p>
              <p style={{ textAlign: "center", marginBottom: 18 }}>
                This score is aligned with known LinkedIn profile best practices. It is designed to improve clarity, trust, search visibility, and post-click conversion — not to guarantee rankings, jobs, or leads.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 18 }}>
                <div className="rounded-3 p-2" style={{ background: "#f7f8fb" }}>
                  <strong>{auditSummary.report?.searchVisibilityScore || 0}%</strong>
                  <p className="mb-0" style={{ fontSize: 12 }}>Search Visibility</p>
                </div>
                <div className="rounded-3 p-2" style={{ background: "#f7f8fb" }}>
                  <strong>{auditSummary.report?.postClickConversionScore || 0}%</strong>
                  <p className="mb-0" style={{ fontSize: 12 }}>Post-Click Conversion</p>
                </div>
                <div className="rounded-3 p-2" style={{ background: "#f7f8fb" }}>
                  <strong>{auditSummary.report?.trustScore || 0}%</strong>
                  <p className="mb-0" style={{ fontSize: 12 }}>Trust & Proof</p>
                </div>
              </div>

              {auditSummary.report?.subScores && (
                <div style={{ textAlign: "left", marginBottom: 20 }}>
                  <strong>Section scores</strong>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginTop: 8 }}>
                    {Object.entries(auditSummary.report.subScores).slice(0, 6).map(([key, item]) => (
                      <div key={key} className="rounded-3 p-2" style={{ background: "#fff", border: "1px solid #eee" }}>
                        <span style={{ fontSize: 12 }}>{item.label}</span>
                        <strong style={{ float: "right" }}>{item.score}%</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {auditSummary.suggestions.length > 0 && (
                <div style={{ textAlign: "left", marginBottom: 20 }}>
                  <strong>Top priority fixes</strong>
                  <ul style={{ paddingLeft: 18, marginTop: 8 }}>
                    {auditSummary.suggestions.map((item) => (
                      <li key={item.id} style={{ marginBottom: 6 }}>
                        <span style={{ fontWeight: 700 }}>{item.priority}:</span> {item.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {auditSummary.report?.makeover?.headlineOptions?.[0] && (
                <p style={{ textAlign: "left", fontSize: 13, background: "#f7f8fb", padding: 12, borderRadius: 12 }}>
                  <strong>Makeover preview:</strong> {auditSummary.report.makeover.headlineOptions[0]}
                </p>
              )}

              <button type="button" onClick={handleRewritePayment} className="audit-main-btn">
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
