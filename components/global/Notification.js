"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Notification = ({ message, status, switchShowOff }) => {
  const router = useRouter();

  const color =
    status === "error" ? "#ff3333" : status === "success" ? "#4BB543" : "var(--blue-70)";

  // REMOVE NOTIFICATION AFTER 30SECS
  setTimeout(() => {
    switchShowOff();
  }, 10000);

  return (
    <div className="notify-box" style={{ backgroundColor: color }}>
      <div className="icon">
        {status === "error" ? (
          <i className="bx bx-x-circle"></i>
        ) : status === "success" ? (
          <i className="bx bx-check-circle"></i>
        ) : (
          <i className="bx bx-info-circle"></i>
        )}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
