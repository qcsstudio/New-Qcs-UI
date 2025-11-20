"use client";
import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const ModalVideo = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <div onClick={onOpenModal}>{children}</div>
   <Modal
  open={open}
  onClose={onCloseModal}
  center
  styles={{ modal: { padding: "0px", width: "800px", maxWidth: "90vw" ,borderRadius:"20px"} }}
>
  <div
    style={{
      position: "relative",
      width: "100%",
      paddingBottom: "56.25%", // 16:9 aspect ratio
      height: 0,
      overflow: "hidden",
    }}
  >
    <video
      src="/assets/video/QCS.mp4"
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "fill",
      }}
      controls
    ></video>
  </div>
</Modal>

    </div>
  );
};

export default ModalVideo;
