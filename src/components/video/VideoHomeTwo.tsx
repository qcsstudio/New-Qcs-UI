"use client";
import React, { useState } from "react";

const VideoHomeTwo = () => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <>
      <div className="cs_height_100 cs_height_lg_60"></div>

      <div className="cs_parallax">

        {/* --- Image Block (Click → Play Video) --- */}
        {!playVideo && (
          <div
            className="cs_digital_agency cs_video_block cs_style1 cs_video_open cs_bg cs_parallax_bg"
            style={{
              backgroundImage: `url(/assets/img/video_block_2.jpg)`,
              cursor: "pointer",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
            onClick={() => setPlayVideo(true)}
          >
            <span
              className="cs_player_btn cs_accent_color"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span></span>
            </span>
          </div>
        )}

        {/* --- Video Block (Same Height as Image) --- */}
        {playVideo && (
          <div
            className="cs_digital_agency cs_video_block cs_style1 cs_video_open cs_bg cs_parallax_bg"
            style={{
              position: "relative",
            }}
          >
            <video
              src="/assets/video/QCS.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            ></video>
          </div>
        )}

      </div>
    </>
  );
};

export default VideoHomeTwo;
