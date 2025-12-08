"use client";

import React from "react";

const boxStyle: React.CSSProperties = {
  width: "100px",
  height: "100px",
  background: "#888",
  marginBottom: "20px",
};

const cardStyle: React.CSSProperties = {
  background: "#e6e6e6",
  color: "#000",
};

export default function PipelineSection() {
  return (
    <section className="py-5 my-5" style={{ background: "#1d1d1f", color: "#fff" }}>
      <div className="container">
        {/* Heading */}
        <h1 className="fw-bold mb-2 text-white">
          Your Pipeline Is Underperforming. You Know It.
        </h1>

        <p className="text-white mb-4" style={{ fontSize: "14px" }}>
          This is not marketing.{" "}
          <span className="text-white">This is Growth Engineering.</span>
        </p>

        <div className="row g-4">
          {/* Old Model */}
          <div className="col-md-6 ">
            <div className="p-4 rounded pipeline-box" style={cardStyle}>
              {/* Grey Box */}
              <div style={boxStyle}></div>

              <h5 className="fw-bold">The Old Model</h5>
              <hr />

              <ul style={{ lineHeight: "1.8" }}>
                <li>Post often</li>
                <li>Hope buyers notice</li>
                <li>Send polite DMs</li>
                <li>Outsource to content agencies</li>
                <li>Wait for leads to appear</li>
              </ul>
            </div>
          </div>

          {/* New Model */}
          <div className="col-md-6 ">
            <div className="p-4 rounded pipeline-box" style={cardStyle}>
              {/* Grey Box */}
              <div style={boxStyle}></div>

              <h5 className="fw-bold">
                The New Model (Elite Growth Firms Use This):
              </h5>
              <hr />

              <ul style={{ lineHeight: "1.8" }}>
                <li>Strategic positioning that commands attention</li>
                <li>Precision segmentation: decision-makers only</li>
                <li>Message flows designed for response psychology</li>
                <li>Manual outbound with controlled touchpoints</li>
                <li>Weekly optimization based on conversion patterns</li>
                <li>Governance, dashboards, accountability</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
