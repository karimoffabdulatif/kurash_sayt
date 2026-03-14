'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";

const TICKER_WORDS = [
  "WBK", "NEWS", "DUNYO BELBOGLI KURASH", "NEWS", "WORLD CHAMPIONSHIP 2026",
  "NEWS", "TOSHKENT GRAND PRIX", "NEWS", "KURASH YANGILIKLARI", "NEWS",
  "SPORT XABARLARI", "NEWS", "UWF RASMIY SAYTI", "NEWS",
];

const FEATURED = {
  category: "Musobaqa",
  readTime: "3 daq",
  title: "2026 Dunyo Chempionati saralash bosqichi boshlandi",
  excerpt:
    "48 davlat, bitta taxt. Osiyo, Yevropa va Amerika qit'alaridan eng kuchli kurashchilar jahon sahnasiga chiqish uchun raqobatlashmoqda. Bu yilgi musobaqa rekord darajadagi ishtirokchilar soni bilan tarixga kirishi kutilmoqda.",
  img: "/img-5.jpg",
};

export default function News() {
  const all = [...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS];
  const [hov, setHov] = useState(false);
  const [btnHov, setBtnHov] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const months = [
      "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
      "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
    ];
    const now = new Date();
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    setCurrentDate(`${day} ${month} ${year}`);
  }, []);

  return (
    <section>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .ticker-track {
          animation: ticker 7s linear infinite;
          will-change: transform;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Ticker ── */}
      <div className="bg-blue-400 overflow-hidden py-2.5 border-y border-blue-500">
        <div className="ticker-track flex gap-6 sm:gap-8 md:gap-10 whitespace-nowrap">
          {all.map((word, i) => (
            <span
              key={i}
              className={`select-none font-extrabold tracking-wider uppercase text-[12px] sm:text-xs md:text-sm ${
                word === "NEWS" ? "text-blue-900" : "text-white"
              }`}
            >
              {word === "NEWS" ? `✦ ${word} ✦` : word}
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured Card ── */}
      <div className="bg-[#f7f5f2] px-4 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-12">
        <div className="max-w-6xl mx-auto">

          <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden bg-white cursor-pointer"
            style={{
              boxShadow: hov
                ? "0 28px 72px rgba(96,165,250,0.22)"
                : "0 4px 28px rgba(96,165,250,0.09)",
              transition: "box-shadow .4s ease",
            }}
          >
            {/* ── Image panel ── */}
            <div
              className="relative overflow-hidden h-52 sm:h-72 lg:h-auto"
              style={{ minHeight: "unset" }}
            >
              <div className="hidden lg:block absolute inset-0">
                <img
                  src={FEATURED.img}
                  alt={FEATURED.title}
                  className="w-full h-full object-cover"
                  style={{
                    transform: hov ? "scale(1.06)" : "scale(1)",
                    transition: "transform .65s cubic-bezier(.25,1,.5,1)",
                  }}
                />
              </div>
              <img
                src={FEATURED.img}
                alt={FEATURED.title}
                className="lg:hidden w-full h-full object-cover"
                style={{
                  transform: hov ? "scale(1.06)" : "scale(1)",
                  transition: "transform .65s cubic-bezier(.25,1,.5,1)",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/55 via-transparent to-transparent" />

              <span className="absolute top-4 left-4 bg-blue-400 text-white text-[9px] sm:text-[10px] font-black tracking-[2px] sm:tracking-[3px] uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg">
                {FEATURED.category}
              </span>

              <span className="absolute bottom-4 left-4 bg-white/15 backdrop-blur-md border border-white/30 text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-3 py-1 sm:py-1.5 rounded-full">
                ⭐ Asosiy yangilik
              </span>
            </div>

            {/* ── Content panel ── */}
            <div className="flex flex-col justify-between p-5 sm:p-7 lg:p-10 bg-gradient-to-br from-blue-50 to-white">
              <div>
                {/* Meta — sana endi dinamik */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="text-blue-400 font-bold text-xs sm:text-sm">{currentDate}</span>
                  <span className="text-blue-200 text-xs">•</span>
                  <span className="text-blue-300 text-xs sm:text-sm">⏱ {FEATURED.readTime}</span>
                </div>

                {/* Title */}
                <h2
                  className="font-bold text-blue-900 leading-tight mb-3 sm:mb-4"
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(18px, 2.8vw, 38px)",
                  }}
                >
                  {FEATURED.title}
                </h2>

                {/* Animated divider */}
                <div
                  className="h-0.5 bg-blue-100 mb-4 sm:mb-5 origin-left transition-all duration-500"
                  style={{ width: hov ? "100%" : "40%" }}
                />

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-8 line-clamp-3 sm:line-clamp-none">
                  {FEATURED.excerpt}
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link href="/newsPage">
                  <button
                    onMouseEnter={() => setBtnHov(true)}
                    onMouseLeave={() => setBtnHov(false)}
                    className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full transition-all duration-300 whitespace-nowrap"
                    style={{ transform: btnHov ? "translateX(4px)" : "none" }}
                  >
                    Batafsil o'qish →
                  </button>
                </Link>

                <Link
                  href="/newsPage"
                  className="text-blue-400 font-bold text-xs sm:text-sm hover:underline underline-offset-4 transition-colors whitespace-nowrap"
                >
                  Yangiliklar sahifasi
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}