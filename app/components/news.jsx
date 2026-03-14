'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "../contex/AppContext";

const TICKER_WORDS = [
  "WBK", "NEWS", "DUNYO BELBOGLI KURASH", "NEWS", "WORLD CHAMPIONSHIP 2026",
  "NEWS", "TOSHKENT GRAND PRIX", "NEWS", "KURASH YANGILIKLARI", "NEWS",
  "SPORT XABARLARI", "NEWS", "UWF RASMIY SAYTI", "NEWS",
];

const T = {
  mainNews: { uz: "Asosiy yangilik", en: "Featured",          ru: "Главное"            },
  readMore: { uz: "Batafsil o'qish →", en: "Read more →",     ru: "Читать далее →"     },
  newsPage: { uz: "Yangiliklar sahifasi", en: "News page",     ru: "Страница новостей"  },
};

const MONTHS = {
  uz: ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"],
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  ru: ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"],
};

export default function News() {
  const { darkMode, language, newsList } = useApp();
  const all = [...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS];
  const [hov, setHov]           = useState(false);
  const [btnHov, setBtnHov]     = useState(false);
  const [hovSmall, setHovSmall] = useState(null);

  const now = new Date();
  const currentDate = `${now.getDate()} ${MONTHS[language][now.getMonth()]} ${now.getFullYear()}`;

  // Context dan kelgan yangiliklar — birinchisi featured, keyingi 2 tasi kichik kart
  const featured  = newsList[0];
  const smallNews = newsList.slice(1, 3);

  const sectionBg  = darkMode ? "bg-[#0a1628]"  : "bg-[#f7f5f2]";
  const cardBg     = darkMode ? "bg-[#0d1f3c]"  : "bg-white";
  const contentBg  = darkMode ? "bg-gradient-to-br from-[#0d1f3c] to-[#0a1628]" : "bg-gradient-to-br from-blue-50 to-white";
  const titleColor = darkMode ? "text-blue-100"  : "text-blue-900";
  const textColor  = darkMode ? "text-blue-200/70" : "text-slate-500";
  const dividerBg  = darkMode ? "bg-blue-800"    : "bg-blue-100";

  const shadow = (active) => active
    ? darkMode ? "0 28px 72px rgba(30,64,175,0.4)"  : "0 28px 72px rgba(96,165,250,0.22)"
    : darkMode ? "0 4px 28px rgba(30,64,175,0.2)"   : "0 4px 28px rgba(96,165,250,0.09)";

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
      <div className={`${sectionBg} px-4 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-12 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto space-y-6">

          {/* ── Featured Card ── */}
          <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            className={`grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden ${cardBg} cursor-pointer transition-colors duration-300`}
            style={{ boxShadow: shadow(hov), transition: "box-shadow .4s ease" }}
          >
            {/* Image */}
            <div className="relative overflow-hidden h-52 sm:h-72 lg:h-auto">
              <div className="hidden lg:block absolute inset-0">
                <img src={featured.img} alt={featured.title[language]} className="w-full h-full object-cover"
                  style={{ transform: hov ? "scale(1.06)" : "scale(1)", transition: "transform .65s cubic-bezier(.25,1,.5,1)" }} />
              </div>
              <img src={featured.img} alt={featured.title[language]} className="lg:hidden w-full h-full object-cover"
                style={{ transform: hov ? "scale(1.06)" : "scale(1)", transition: "transform .65s cubic-bezier(.25,1,.5,1)" }} />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/55 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 bg-blue-400 text-white text-[9px] sm:text-[10px] font-black tracking-[2px] uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg">
                {featured.category[language]}
              </span>
              <span className="absolute bottom-4 left-4 bg-white/15 backdrop-blur-md border border-white/30 text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-3 py-1 sm:py-1.5 rounded-full">
                ⭐ {T.mainNews[language]}
              </span>
            </div>

            {/* Content */}
            <div className={`flex flex-col justify-between p-5 sm:p-7 lg:p-10 ${contentBg} transition-colors duration-300`}>
              <div>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="text-blue-400 font-bold text-xs sm:text-sm inline-block min-w-[120px]">{featured[`date_${language}`] || featured.date}</span>
                  <span className={`${darkMode ? "text-blue-600" : "text-blue-200"} text-xs`}>•</span>
                  <span className={`${darkMode ? "text-blue-400" : "text-blue-300"} text-xs sm:text-sm`}>
                    ⏱ {featured.readTime[language]}
                  </span>
                </div>
                <h2 className={`font-bold ${titleColor} leading-tight mb-3 sm:mb-4 line-clamp-3 min-h-[72px]`}
                  style={{ fontFamily: "Georgia, serif", fontSize: "clamp(18px, 2.8vw, 38px)" }}>
                  {featured.title[language]}
                </h2>
                <div className={`h-0.5 ${dividerBg} mb-4 sm:mb-5 origin-left transition-all duration-500`}
                  style={{ width: hov ? "100%" : "40%" }} />
                <p className={`${textColor} text-xs sm:text-sm leading-relaxed mb-5 sm:mb-8 line-clamp-3`}>
                  {featured.excerpt[language]}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link href="/newsPage">
                  <button
                    onMouseEnter={() => setBtnHov(true)}
                    onMouseLeave={() => setBtnHov(false)}
                    className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full transition-all duration-300 whitespace-nowrap"
                    style={{ transform: btnHov ? "translateX(4px)" : "none" }}
                  >
                    {T.readMore[language]}
                  </button>
                </Link>
                <Link href="/newsPage" className="text-blue-400 font-bold text-xs sm:text-sm hover:underline underline-offset-4 whitespace-nowrap">
                  {T.newsPage[language]}
                </Link>
              </div>
            </div>
          </div>

          {/* ── 2 kichik karta ── */}
          {smallNews.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {smallNews.map((news, i) => (
                <Link href="/newsPage" key={news.id}>
                  <div
                    onMouseEnter={() => setHovSmall(i)}
                    onMouseLeave={() => setHovSmall(null)}
                    className={`rounded-2xl overflow-hidden ${cardBg} cursor-pointer transition-all duration-300`}
                    style={{ boxShadow: shadow(hovSmall === i) }}
                  >
                    {/* Rasm */}
                    <div className="relative overflow-hidden h-44 sm:h-48">
                      <img
                        src={news.img}
                        alt={news.title[language]}
                        className="w-full h-full object-cover transition-transform duration-700"
                        style={{ transform: hovSmall === i ? "scale(1.06)" : "scale(1)" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 bg-blue-400 text-white text-[9px] font-black tracking-[2px] uppercase px-3 py-1 rounded-full shadow">
                        {news.category[language]}
                      </span>
                    </div>

                    {/* Kontent */}
                    <div className={`p-4 sm:p-5 ${darkMode ? "bg-[#0d1f3c]" : "bg-white"} transition-colors duration-300`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-400 font-bold text-[11px] inline-block min-w-[100px]">{news[`date_${language}`] || news.date}</span>
                        <span className={`${darkMode ? "text-blue-600" : "text-blue-200"} text-xs`}>•</span>
                        <span className={`${darkMode ? "text-blue-400" : "text-blue-300"} text-[11px]`}>⏱ {news.readTime[language]}</span>
                      </div>
                      <h3 className={`font-bold ${titleColor} leading-snug mb-2 line-clamp-2 min-h-[48px]`}
                        style={{ fontFamily: "Georgia, serif", fontSize: "clamp(15px, 2vw, 20px)" }}>
                        {news.title[language]}
                      </h3>
                      <div className={`h-0.5 ${dividerBg} mb-3 transition-all duration-500`}
                        style={{ width: hovSmall === i ? "100%" : "35%" }} />
                      <p className={`${textColor} text-[12px] sm:text-[13px] leading-relaxed line-clamp-2 min-h-[40px]`}>
                        {news.excerpt[language]}
                      </p>
                      <span className="inline-block mt-3 text-blue-400 font-bold text-[12px] hover:underline underline-offset-4">
                        {T.readMore[language]}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}