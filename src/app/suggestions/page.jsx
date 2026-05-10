"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function Suggestions() {
  const [report, setReport] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    setIsPaid(localStorage.getItem("linkedin_rewrite_paid") === "true");

    try {
      const storedReport = localStorage.getItem("linkedin_audit_report");
      setReport(storedReport ? JSON.parse(storedReport) : null);
    } catch {
      setReport(null);
    }
  }, []);

  const topSuggestions = useMemo(() => report?.suggestions?.slice(0, 6) || [], [report]);
  const subScores = useMemo(() => Object.entries(report?.subScores || {}), [report]);

  if (!report) {
    return (
      <main className="min-vh-100 d-flex align-items-center justify-content-center p-4">
        <div className="text-center" style={{ maxWidth: 620 }}>
          <h1 className="mb-3">No paid rewrite report found</h1>
          <p className="text-muted mb-4">
            Please run your LinkedIn profile audit first, then complete payment to unlock rewrite suggestions.
          </p>
          <Link href="/linkedin-profile-audit" className="cs_btn cs_style_1">
            <span>Run LinkedIn Audit</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-vh-100 p-4" style={{ background: "#f8fafc" }}>
      <div className="container py-5">
        <div className="bg-white rounded-4 shadow-sm p-4 p-lg-5 mb-4">
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-4">
            <div>
              <p className="text-primary fw-semibold mb-2">QCS LinkedIn Profile Rewrite</p>
              <h1 className="mb-3">Your paid rewrite workspace is ready.</h1>
              <p className="text-muted mb-0">
                We generated this from your latest role-based audit. Use the recommendations below to rewrite your profile toward a stronger QCS score.
              </p>
            </div>
            <div className="text-lg-end">
              <div className="display-5 fw-bold text-black">{report.overallScore || 0}</div>
              <p className="text-muted mb-0">Current QCS score</p>
              <span className={`badge ${isPaid ? "bg-success" : "bg-warning text-dark"}`}>
                {isPaid ? "Payment verified" : "Payment not verified"}
              </span>
            </div>
          </div>
        </div>

        {report.makeover && (
          <div className="row g-4 mb-4">
            <div className="col-lg-6">
              <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                <h2 className="h4 mb-3">Headline rewrite</h2>
                <p className="text-muted mb-0">{report.makeover.headline || "No headline rewrite was generated."}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                <h2 className="h4 mb-3">About rewrite</h2>
                <p className="text-muted mb-0" style={{ whiteSpace: "pre-line" }}>
                  {report.makeover.about || "No about rewrite was generated."}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="bg-white rounded-4 shadow-sm p-4 h-100">
              <h2 className="h4 mb-4">Priority fixes</h2>
              {topSuggestions.length ? (
                <div className="d-flex flex-column gap-3">
                  {topSuggestions.map((item) => (
                    <div key={item.id} className="border rounded-3 p-3">
                      <div className="d-flex justify-content-between gap-3 mb-2">
                        <strong>{item.finding}</strong>
                        <span className="badge bg-primary">{item.impact}</span>
                      </div>
                      <p className="text-muted mb-0">{item.recommendation}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No priority suggestions were generated.</p>
              )}
            </div>
          </div>

          <div className="col-lg-5">
            <div className="bg-white rounded-4 shadow-sm p-4 h-100">
              <h2 className="h4 mb-4">Score breakdown</h2>
              {subScores.length ? (
                <div className="d-flex flex-column gap-3">
                  {subScores.map(([key, value]) => (
                    <div key={key}>
                      <div className="d-flex justify-content-between mb-1">
                        <span>{value.label || key}</span>
                        <strong>{value.score || 0}</strong>
                      </div>
                      <div className="progress" role="progressbar" aria-valuenow={value.score || 0} aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{ width: `${value.score || 0}%` }}></div>
                      </div>
                      {value.description && <small className="text-muted">{value.description}</small>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No score breakdown was generated.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
