"use client";

import Image from "next/image";
import React from "react";

const boxStyle: React.CSSProperties = {
  width: "100px",
  height: "100px",
  // background: "#888",
  // marginBottom: "20px",
};

const cardStyle: React.CSSProperties = {
  background: "#101010",
  color: "#000",
};

export default function PipelineSection() {
  return (
    <section className="py-5 my-5" style={{ background: "#101010", color: "#fff" }}>
      <div className="container">
        {/* Heading */}
        <h1 className="fw-bold mb-2 text-white">
          The Market Has Changed. Most Founders Haven’t.
        </h1>

        <p className="text-white mb-4" style={{ fontSize: "14px" }}>
          This is not marketing.{" "}
          <span className="text-white">This is Growth Engineering.</span>
        </p>

        <div className="row g-2">
          {/* Old Model */}
          <div className="col-md-6 ">
            <div className="p-4 rounded pipeline-box" style={cardStyle}>
              {/* Grey Box */}
              <div style={boxStyle}>
                <Image
                  src="/assets/img/Images/Old Model.png"
                  alt="Old Model"
                  width={100}
                  height={100}
                />  
              </div>

              <h5 className="fw-bold text-white mt-5">The Old Model</h5>
              <hr />

              <ul style={{ lineHeight: "1.8", color: "#ffffff" ,marginTop:"10px",listStyle:"none" ,padding:"0"}}>
                <li style={{display:"flex",gap:"10px"}}> <Image src="/assets/img/Images/button-icon-list.svg" alt="Post often" width={12} height={12} /> <span>Post often</span></li>
                <li style={{display:"flex",gap:"10px"}}> <Image src="/assets/img/Images/button-icon-list.svg" alt="Post often" width={12} height={12} /> <span>Hope buyers notice </span></li>
                <li style={{display:"flex",gap:"10px"}}> <Image src="/assets/img/Images/button-icon-list.svg" alt="Post often" width={12} height={12} /> <span>Send polite DMs </span></li>
                <li style={{display:"flex",gap:"10px"}}> <Image src="/assets/img/Images/button-icon-list.svg" alt="Post often" width={12} height={12} /> <span>Outsource to content agencies </span></li>
                <li style={{display:"flex",gap:"10px"}}> <Image src="/assets/img/Images/button-icon-list.svg" alt="Post often" width={12} height={12} /> <span>Wait for leads to appear </span></li>
              </ul>
            </div>
          </div>

          {/* New Model */}
          <div className="col-md-6 ">
            <div className="p-4 rounded pipeline-box" style={cardStyle}>
              {/* Grey Box */}
              <div style={boxStyle}>
                <Image
                  src="/assets/img/Images/New Model.png"
                  alt="Old Model"
                  width={100}
                  height={100}
                />  
              </div>

              <h5 className="fw-bold text-white mt-5">
                The New Model (Elite Growth Firms Use This):
              </h5>
              <hr />

              <ul style={{ lineHeight: "1.8", color: "#ffffff",marginTop:"10px" }}>
                <li style={{display:"flex",gap:"10px"}}> <Image src="/assets/img/Images/button-icon-list.svg" alt="Post often" width={12} height={12} /> <span>Strategic positioning that commands attention </span></li>
                <li style={{display:"flex",gap:"10px"}}> <Image src="/assets/img/Images/button-icon-list.svg" alt="Post often" width={12} height={12} /> <span>Precision segmentation: decision-makers only </span></li>
                <li style={{display:"flex",gap:"10px"}}> <Image src="/assets/img/Images/button-icon-list.svg" alt="Post often" width={12} height={12} /> <span>Message flows designed for response psychology </span></li>
                <li style={{display:"flex",gap:"10px"}}> <Image src="/assets/img/Images/button-icon-list.svg" alt="Post often" width={12} height={12} /> <span>Manual outbound with controlled touchpoints </span></li>
                <li style={{display:"flex",gap:"10px"}}> <Image src="/assets/img/Images/button-icon-list.svg" alt="Post often" width={12} height={12} /> <span>Weekly optimization based on conversion patterns </span></li>
                <li style={{display:"flex",gap:"10px"}}> <Image src="/assets/img/Images/button-icon-list.svg" alt="Post often" width={12} height={12} /> <span>Governance, dashboards, accountability </span></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
