"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

export default function AuditSection() {
  //state for handle url and role 
  const [url, setUrl] = useState("");
  const [role, setRole] = useState("Job Seeker");
  const [accepted, setAccepted] = useState(false);

  //state for loading and get result from background
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  //state for show modal
  const [showModal, setShowModal] = useState(false);
  console.log("result", result);
  useEffect(() => {
    const handler = (e) => {
      if (e.data === "EXTENSION_RUNNING") {
        console.log("✅ EXTENSION_RUNNING");
      }
    };

    window.addEventListener("message", handler);

    // Check extension
    window.postMessage("PING_EXTENSION", "*");

    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    function onMsg(e) {
      if (!e.data) return;
      if (e.data.from !== "LINKEDIN_AUDIT_EXT") return;

      // 🔥 DEBUG DATA
      if (e.data.type === "DEBUG_DATA") {
        console.log("🔥 DATA SENT TO BACKEND:", e.data.payload);
      }

      if (e.data.type === "SCRAPE_RESULT") {
        setLoading(false);
        setResult(e.data.payload);
        setShowModal(true); // 🔥 IMPORTANT
      }

    }

    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const normalizeLinkedInUrl = (rawUrl) => {
    let url = rawUrl.trim();

    // agar user ne http / https nahi dala
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    return url;
  };


  const startAudit = () => {
    if (!url) return alert("Enter LinkedIn profile URL");

    if (!accepted) {
      return alert("Please accept Terms & Privacy Policy");
    }


    const finalUrl = normalizeLinkedInUrl(url);

    // basic linkedin validation (optional but recommended)
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
      },
      "*"
    );

  };



  return (
    <div className="audit-hero" id="linkedinaudit">
      <div className="audit-inner">

        {/* Trust */}
        <div className="audit-trust">
          <Image src="/assets/img/Images/auditimage.png" alt="users" width={124} height={40} />
          <div className="text-start">
            <span className="text-warning">★★★★★</span><br />
            <p>Trusted by 200+ Professionals</p>
          </div>
        </div>

        {/* Heading */}
        <h1 className="audit-heading">
          Audit Your LinkedIn <span>{`{Profile}`}</span> to Unlock<br />
          <strong>Your Full Potential</strong>
        </h1>

        <p className="audit-desc">
          See how decision-makers truly perceive your profile and unlock actions
          that turn visibility into business.
        </p>

        {/* Inputs */}
        <div className="audit-input-row">
          <input
            placeholder="LINKEDIN PROFILE"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Job Seeker">Job Seeker</option>
            <option value="Founder / CEO">Founder / CEO</option>
            <option value="Sales / SDR / AE">Sales/SDR/AE</option>
            <option value="Consultant / Coach">Consultant/Coach</option>
            <option value="Recruiter / Talent">Recruiter/Talent</option>
          </select>
        </div>

        {/* Button */}
        <button className="audit-main-btn" onClick={startAudit} disabled={loading || !accepted}>
          {loading ? <PulseLoader color={"#ffffff"} size={10} />: "Audit My Profile →"}
        </button><br />
        <label className="terms">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span>
            I accept the{" "}
            <Link href="/terms-condition" target="_blank">Terms & Conditions</Link>{" "}
            and{" "}
            <Link href="/privacy-policy" target="_blank">Privacy Policy</Link>
          </span>
        </label>
        <p className="audit-note">
          We only analyze what’s already publicly visible on your profile.
        </p>

        <p className="audit-secure">
          No passwords · No contacts · No messages · Ever
        </p>

        {/* ============= POPUP ================*/}
        {showModal && result && (
          <div className="audit-overlay">
            <div className="audit-popup">

              <h2 className="audit-title">
                Your LinkedIn <span>Audit</span> Is Ready
              </h2>

              <div className="progress-ring">

                <div className="progress-text">{result.baseScore}</div>
              </div>

              <Link href='/signup' className="" >Access Full Audit →</Link>

              <button
                className="audit-close"
                onClick={() => setShowModal(false)}
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

