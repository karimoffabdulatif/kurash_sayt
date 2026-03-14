'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "../contex/AppContext";
import { HiStar } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";

const TICKER_WORDS = [
  "WBK", "NEWS", "DUNYO BELBOGLI KURASH", "NEWS", "WORLD CHAMPIONSHIP 2026",
  "NEWS", "TOSHKENT GRAND PRIX", "NEWS", "KURASH YANGILIKLARI", "NEWS",
  "SPORT XABARLARI", "NEWS", "UWF RASMIY SAYTI", "NEWS",
];

const T = {
  mainNews: { uz: "Asosiy yangilik",    en: "Featured",        ru: "Главное"           },
  readMore: { uz: "Batafsil o'qish",    en: "Read more",       ru: "Читать далее"      },
  newsPage: { uz: "Barcha yangiliklar", en: "All news",        ru: "Все новости"       },
  label:    { uz: "So'nggi yangiliklar",en: "Latest news",     ru: "Последние новости" },
};

export default function News() {
  const { darkMode, language, newsList } = useApp();
  const all = [...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS];

  const [hov, setHov]           = useState(false);
  const [hovSmall, setHovSmall] = useState(null);

  const featured  = newsList[0];
  const smallNews = newsList.slice(1, 3);

  const bg      = darkMode ? "bg-[#0a1628]"    : "bg-[#f8f9fc]";
  const cardBg  = darkMode ? "bg-[#0d1f3c]"   : "bg-white";
  const borderC = darkMode ? "border-blue-900" : "border-gray-100";
  const titleC  = darkMode ? "text-white"      : "text-[#0f2a5e]";
  const textC   = darkMode ? "text-blue-200/70": "text-slate-500";
  const metaC   = darkMode ? "text-blue-400"   : "text-blue-500";
  const dividerC = darkMode ? "bg-blue-900"    : "bg-gray-100";
  const subC    = darkMode ? "text-blue-400"   : "text-blue-500";

  const shadow = (active) => active
    ? darkMode ? "0 20px 60px rgba(30,64,175,0.3)"  : "0 20px 60px rgba(15,42,94,0.12)"
    : darkMode ? "0 4px 20px rgba(30,64,175,0.15)"  : "0 4px 20px rgba(15,42,94,0.06)";

  if (!featured) return null;

  return (
    <section>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .ticker-track { animation: ticker 7s linear infinite; will-change: transform; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

      {/* Ticker */}
      <div className={`${darkMode ? "bg-blue-900 border-blue-800" : "bg-blue-400 border-blue-500"} overflow-hidden py-2.5 border-y transition-colors duration-300`}>
        <div className="ticker-track flex gap-6 sm:gap-8 md:gap-10 whitespace-nowrap">
          {all.map((word, i) => (
            <span key={i} className={`select-none font-extrabold tracking-wider uppercase text-[12px] sm:text-xs md:text-sm ${word === "NEWS" ? darkMode ? "text-blue-300" : "text-blue-900" : "text-white"}`}>
              {word === "NEWS" ? `✦ ${word} ✦` : word}
            </span>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className={`${bg} px-4 sm:px-8 lg:px-16 py-10 sm:py-12 lg:py-14 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto">
          <div className="space-y-5">

            {/* ── Featured Card ── */}
            <div
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
              className={`grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden ${cardBg} border ${borderC} cursor-pointer transition-all duration-300`}
              style={{ boxShadow: shadow(hov) }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-64 sm:h-80 lg:h-auto" style={{ minHeight: "420px" }}>
                <div className="hidden lg:block absolute inset-0">
                  <img src={featured.img} alt={featured.title[language]} className="w-full h-full object-cover"
                    style={{ objectPosition: featured.imgPosition || "center", transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform .6s ease" }} />
                </div>
                <img src={featured.img} alt={featured.title[language]} className="lg:hidden w-full h-full object-cover"
                  style={{ objectPosition: featured.imgPosition || "center", transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform .6s ease" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a5e]/70 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-[#0f2a5e] text-white text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-sm">
                  {featured.category[language]}
                </span>
                <span className="absolute bottom-4 left-4 bg-white/15 backdrop-blur-md border border-white/20 text-white text-[9px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                  <HiStar className="w-3 h-3 text-yellow-300" />
                  {T.mainNews[language]}
                </span>
              </div>

              {/* Content */}
              <div className={`flex flex-col justify-between p-6 sm:p-8 lg:p-10 ${cardBg} transition-colors duration-300`}>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`${metaC} text-xs font-medium inline-block min-w-[110px]`}>
                      {featured[`date_${language}`] || featured.date}
                    </span>
                    <span className={darkMode ? "text-blue-700" : "text-gray-200"}>•</span>
                    <span className={`${darkMode ? "text-blue-400/70" : "text-slate-400"} text-xs`}>
                      {featured.readTime[language]}
                    </span>
                  </div>
                  <h2 className={`font-bold ${titleC} leading-snug mb-3 line-clamp-3 min-h-[72px] text-[20px] sm:text-[24px] lg:text-[28px]`}>
                    {featured.title[language]}
                  </h2>
                  <div className={`h-px ${dividerC} mb-4 transition-all duration-500`}
                    style={{ width: hov ? "100%" : "40%" }} />
                  <p className={`${textC} text-sm leading-relaxed line-clamp-4`}>
                    {featured.excerpt[language]}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <Link href="/newsPage">
                    <button
                      className={`text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                        darkMode ? "text-blue-400 hover:text-blue-300" : "text-[#0f2a5e] hover:text-blue-600"
                      }`}
                      style={{ transform: hov ? "translateX(4px)" : "none" }}
                    >
                      {T.readMore[language]}
                      <MdArrowForward className="w-4 h-4" />
                    </button>
                  </Link>
                  <span className={darkMode ? "text-blue-800" : "text-gray-200"}>|</span>
                  <Link href="/newsPage"
                    className={`text-xs font-medium transition-colors ${darkMode ? "text-blue-400/60 hover:text-blue-300" : "text-slate-400 hover:text-[#0f2a5e]"}`}>
                    {T.newsPage[language]}
                  </Link>
                </div>
              </div>
            </div>

            {/* ── 2 kichik karta ── */}
            {smallNews.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {smallNews.map((news, i) => (
                  <Link href="/newsPage" key={news.id}>
                    <div
                      onMouseEnter={() => setHovSmall(i)}
                      onMouseLeave={() => setHovSmall(null)}
                      className={`rounded-2xl overflow-hidden ${cardBg} border ${borderC} cursor-pointer transition-all duration-300`}
                      style={{ boxShadow: shadow(hovSmall === i) }}
                    >
                      <div className="relative overflow-hidden h-52 sm:h-60">
                        <img src={news.img} alt={news.title[language]} className="w-full h-full object-cover"
                          style={{ objectPosition: news.imgPosition || "center", transform: hovSmall === i ? "scale(1.05)" : "scale(1)", transition: "transform .5s ease" }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a5e]/50 to-transparent" />
                        <span className="absolute top-3 left-3 bg-[#0f2a5e] text-white text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-sm">
                          {news.category[language]}
                        </span>
                      </div>

                      <div className={`p-4 sm:p-5 ${cardBg} transition-colors duration-300`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`${metaC} text-[11px] font-medium inline-block min-w-[100px]`}>
                            {news[`date_${language}`] || news.date}
                          </span>
                          <span className={darkMode ? "text-blue-700" : "text-gray-200"}>•</span>
                          <span className={`${darkMode ? "text-blue-400/60" : "text-slate-400"} text-[11px]`}>
                            {news.readTime[language]}
                          </span>
                        </div>
                        <h3 className={`font-bold ${titleC} leading-snug mb-2 line-clamp-2 min-h-[44px] text-[15px] sm:text-[16px]`}>
                          {news.title[language]}
                        </h3>
                        <div className={`h-px ${dividerC} mb-3 transition-all duration-500`}
                          style={{ width: hovSmall === i ? "100%" : "35%" }} />
                        <p className={`${textC} text-[12px] leading-relaxed line-clamp-2 min-h-[36px]`}>
                          {news.excerpt[language]}
                        </p>

                        <div className={`flex items-center justify-between pt-3 mt-2 border-t ${borderC}`}>
                          <span className={`text-xs font-semibold flex items-center gap-1 ${darkMode ? "text-blue-400" : "text-[#0f2a5e]"}`}>
                            {T.readMore[language]}
                          </span>
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                              background: hovSmall === i ? "#0f2a5e" : darkMode ? "#1e3a5f" : "#f0f4ff",
                              color: hovSmall === i ? "#fff" : darkMode ? "#60a5fa" : "#0f2a5e",
                              transform: hovSmall === i ? "rotate(-45deg)" : "none",
                            }}
                          >
                            <FiArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}