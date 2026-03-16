"use client";

import { useRef, useEffect, useState } from "react";
import { useApp } from "../contex/AppContext";

// ... (MEMBERS va T o'zgarishsiz qoladi)

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center" style={{ width: "180px", height: "180px" }}>
        <img
          src="/ramka.png"
          alt=""
          style={{
            position: "absolute",
            width: "180px",
            height: "180px",
            animation: "spin 4s linear infinite",
            zIndex: 20,
          }}
        />
        <img
          src="/orta.png"
          alt="loader"
          style={{
            width: "250px",
            height: "250px",
            objectFit: "contain",
            position: "relative",
            zIndex: 10,
          }}
        />
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}