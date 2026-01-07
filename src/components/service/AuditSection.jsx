"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { PulseLoader } from "react-spinners";

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
    let detected = false;
    let pingInterval;

    const handler = (e) => {
      if (e.data === "EXTENSION_RUNNING") {
        if (extensionDetectedRef.current) return; 

        console.log("✅ Extension detected (once)");
        extensionDetectedRef.current = true;
        detected = true;

        setIsExtensionReady(true);
        setShowExtensionPopup(false);

        // 🛑 stop pinging
        clearInterval(pingInterval);

        // cleanup reload flag
        localStorage.removeItem("audit_auto_reloaded");
      }
    };

    window.addEventListener("message", handler);

    pingInterval = setInterval(() => {
      if (!extensionDetectedRef.current) {
        window.postMessage("PING_EXTENSION", "*");
      }
    }, 1000);

    const reloadTimeout = setTimeout(() => {
      const hasReloaded = localStorage.getItem("audit_auto_reloaded");

      if (!detected && !hasReloaded) {
        console.log("🔁 Auto reloading page once to inject extension");
        localStorage.setItem("audit_auto_reloaded", "true");
        window.location.reload();
      }
    }, 4000);

    return () => {
      clearInterval(pingInterval);
      clearTimeout(reloadTimeout);
      window.removeEventListener("message", handler);
    };
  }, []);
console.log("result: ", result);

useEffect(() => {
  const onFocus = () => {
    const waiting = localStorage.getItem("audit_waiting_for_extension");

    if (waiting && !extensionDetectedRef.current) {
      console.log("🔁 User returned after extension install, reloading...");
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

      if (e.data.type === "DEBUG_DATA") {
        console.log("🔥 DEBUG:", e.data.payload);
      }

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

    localStorage.setItem("linkedin_audit_url ", finalUrl);
    localStorage.setItem("linkedin_audit_role", role);

    setLoading(true);

    window.postMessage(
      {
        type: "START_SCRAPE",
        url: finalUrl,
        role,
        accepted,
      },
      "*"
    );
  };

  function handleextensionInstall() {
     const scraper = localStorage.getItem("audit_waiting_for_extension");
    
    if (scraper) {
      setShowExtensionPopup(false);
    }
    else{
      setShowExtensionPopup(true);
    }
  }

  // ================= UI =================
  return (
    <div className="audit-hero" id="linkedinaudit">
      <div className="audit-inner">

        {/* TRUST */}
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
        <h1 className="audit-heading">
          Audit Your LinkedIn <span>{`{Profile}`}</span> to Unlock <br />
          <strong>Your Full Potential</strong>
        </h1>

        <p className="audit-desc">
          See how decision-makers truly perceive your profile and unlock actions
          that turn visibility into business.
        </p>

        {/* INPUTS */}
        <div className="audit-input-row">
          <input
            placeholder="LINKEDIN PROFILE"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={handleextensionInstall()}
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
          We only analyze what’s already publicly visible on your profile.
        </p>

        <p className="audit-secure">
          No passwords · No contacts · No messages · Ever
        </p>

        {/* ================= EXTENSION POPUP ================= */}
        {showExtensionPopup && (
          <div className="audit-overlay">
            <div className="audit-popup">
              <h2 className="audit-title">
                Install Our <span>Chrome Extension</span>
              </h2>

              <p style={{ textAlign: "center", marginBottom: 20 }}>
                To audit your LinkedIn profile, please install our secure Chrome
                extension. It only reads public profile data.
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

              <div className="progress-ring">
                <div className="progress-text">
                  {result.baseScore}
                </div>
              </div>

              <Link href="/signup" className="audit-main-btn">
                Access Full Audit →
              </Link>

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
