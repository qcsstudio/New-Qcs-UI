"use client";
import React, { useEffect, useState } from "react";

export default function AuditSection() {
  const [url, setUrl] = useState("");
  const [role, setRole] = useState("job_seeker");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      if (e.data.type === "SCRAPE_RESULT") {
        setResult(e.data.payload);
        setLoading(false);
        setShowModal(true);
      }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const startAudit = () => {
    if (!url) return alert("Enter LinkedIn profile URL");
    setLoading(true);
    // send message to extension (content_script picks it and forwards)
    window.postMessage({ type: "START_SCRAPE", url, role }, "*");

    setTimeout(() => {
      if (loading) {
        setLoading(false);
        alert("Extension did not respond. Make sure extension is installed.");
      }
    }, 8000);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card p-4 text-center">
            <h1 className="mb-3">Audit Your LinkedIn <span className="text-warning">{role === "job_seeker" ? "(Profile)" : "(Company)"}</span></h1>
            <p className="mb-4">Enter profile URL and select profile type</p>

            <div className="mb-3 text-start">
              <label className="form-label">LinkedIn Profile</label>
              <input className="form-control" placeholder="https://www.linkedin.com/in/username" value={url} onChange={e => setUrl(e.target.value)} />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Profile Type</label>
              <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
                <option value="job_seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
                <option value="company">Company</option>
              </select>
            </div>

            <button className="btn btn-warning btn-lg" onClick={startAudit} disabled={loading}>
              {loading ? "Starting..." : "Audit My Profile →"}
            </button>

            {showModal && result && (
              <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog modal-md modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Your LinkedIn Audit Is Ready</h5>
                      <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                      <div style={{fontSize:48, fontWeight:700}}>{result.score}%</div>
                      <p className="mt-2">{result.summary || "Detailed breakdown below"}</p>

                      <div className="text-start mt-3">
                        <h6>Basic</h6>
                        <p><strong>Username:</strong> {result.data?.username || "-"}</p>
                        <p><strong>Headline:</strong> {result.data?.headline || "-"}</p>
                        <p><strong>Location:</strong> {result.data?.location || "-"}</p>

                        <h6>Experience ({result.data?.experience?.length || 0})</h6>
                        {result.data?.experience?.map((e, i) => (
                          <div key={i} className="mb-2">
                            <strong>{e.title || "-"}</strong> — {e.company || "-"}
                            <div className="small text-muted">{e.duration || ""} • {e.location || ""}</div>
                          </div>
                        ))}

                        <h6>Skills</h6>
                        <div>{(result.data?.skills || []).length ? (result.data.skills.slice(0,20).join(", ")) : "-"}</div>
                      </div>

                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
