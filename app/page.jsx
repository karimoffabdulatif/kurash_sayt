"use client";

import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import MainSection from "./components/MainSection";
import News from "./components/news";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    }

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {loading && (
        <div
          style={{ zIndex: 99999 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-white"
        >
          <div className="relative flex items-center justify-center">

            {/* Shadow doirasi - faqat tashqi chet */}
            <div
              style={{
                width: "clamp(160px, 35vw, 280px)",
                height: "clamp(160px, 35vw, 280px)",
                borderRadius: "50%",
                position: "absolute",
                boxShadow: "0 0 0 3px #60a5fa, 0 0 16px 4px #3b82f6",
                zIndex: 20,
              }}
            />

            {/* Aylanuvchi tashqi ramka */}
            <div
              style={{
                width: "clamp(160px, 35vw, 280px)",
                height: "clamp(160px, 35vw, 280px)",
                backgroundImage: "url('/ramka.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "50%",
                position: "absolute",
                animation: "spin 10s linear infinite",
                zIndex: 21,
              }}
            />

            {/* O'rtadagi statik rasm */}
            <div
              style={{
                width: "clamp(110px, 24vw, 210px)",
                height: "clamp(110px, 24vw, 210px)",
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                zIndex: 22,
              }}
            >
              <img
                src="/orta.png"
                alt="loader"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      <Hero />
      <MainSection />
      <News />
    </>
  );
}