'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "../contex/AppContext";

const TICKER_WORDS = [
  "WBK", "NEWS", "DUNYO BELBOGLI KURASH", "NEWS", "WORLD CHAMPIONSHIP 2026",
  "NEWS", "TOSHKENT GRAND PRIX", "NEWS", "KURASH YANGILIKLARI", "NEWS",
  "SPORT XABARLARI", "NEWS", "UWF RASMIY SAYTI", "NEWS",
];

const FEATURED = {
  category: { uz: "Musobaqa",       en: "Tournament",     ru: "Турнир"        },
  readTime: { uz: "3 daq",          en: "3 min",          ru: "3 мин"         },
  title:    { uz: "2026 Dunyo Chempionati saralash bosqichi boshlandi", en: "2026 World Championship qualification stage has started", ru: "Начался отборочный этап Чемпионата мира 2026" },
  excerpt:  {
    uz: "48 davlat, bitta taxt. Osiyo, Yevropa va Amerika qit'alaridan eng kuchli kurashchilar jahon sahnasiga chiqish uchun raqobatlashmoqda. Bu yilgi musobaqa rekord darajadagi ishtirokchilar soni bilan tarixga kirishi kutilmoqda.",
    en: "48 countries, one throne. The strongest wrestlers from Asia, Europe and the Americas are competing for a place on the world stage. This year's tournament is expected to set a record number of participants.",
    ru: "48 стран, один трон. Сильнейшие борцы Азии, Европы и Америки борются за место на мировой арене. Ожидается, что этот турнир установит рекорд по числу участников.",
  },
  mainNews: { uz: "Asosiy yangilik", en: "Featured",       ru: "Главное"       },
  readMore: { uz: "Batafsil o'qish →", en: "Read more →",  ru: "Читать далее →" },
  newsPage: { uz: "Yangiliklar sahifasi", en: "News page", ru: "Страница новостей" },
};

const MONTHS = {
  uz: ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"],
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  ru: ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"],
};

export default function News() {
  const { darkMode, language } = useApp();
  const all = [...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS];
  const [hov, setHov]           = useState(false);
  const [btnHov, setBtnHov]     = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now   = new Date();
    const day   = now.getDate();
    const month = MONTHS[language][now.getMonth()];
    const year  = now.getFullYear();
    setCurrentDate(`${day} ${month} ${year}`);
  }, [language]);

  // dark mode colors
  const sectionBg  = darkMode ? "bg-[#0a1628]"   : "bg-[#f7f5f2]";
  const cardBg     = darkMode ? "bg-[#0d1f3c]"   : "bg-white";
  const contentBg  = darkMode ? "bg-gradient-to-br from-[#0d1f3c] to-[#0a1628]" : "bg-gradient-to-br from-blue-50 to-white";
  const titleColor = darkMode ? "text-blue-100"   : "text-blue-900";
  const textColor  = darkMode ? "text-blue-200/70": "text-slate-500";
  const dividerBg  = darkMode ? "bg-blue-800"     : "bg-blue-100";
  const shadow     = hov
    ? darkMode ? "0 28px 72px rgba(30,64,175,0.4)"   : "0 28px 72px rgba(96,165,250,0.22)"
    : darkMode ? "0 4px 28px rgba(30,64,175,0.2)"    : "0 4px 28px rgba(96,165,250,0.09)";

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
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

      {/* ── Ticker ── */}
      <div className={`${darkMode ? "bg-blue-900 border-blue-800" : "bg-blue-400 border-blue-500"} overflow-hidden py-2.5 border-y transition-colors duration-300`}>
        <div className="ticker-track flex gap-6 sm:gap-8 md:gap-10 whitespace-nowrap">
          {all.map((word, i) => (
            <span key={i}
              className={`select-none font-extrabold tracking-wider uppercase text-[12px] sm:text-xs md:text-sm ${
                word === "NEWS"
                  ? darkMode ? "text-blue-300" : "text-blue-900"
                  : "text-white"
              }`}>
              {word === "NEWS" ? `✦ ${word} ✦` : word}
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured Card ── */}
      <div className={`${sectionBg} px-4 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-12 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto">
          <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            className={`grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden ${cardBg} cursor-pointer transition-colors duration-300`}
            style={{ boxShadow: shadow, transition: "box-shadow .4s ease" }}
          >
            {/* Image panel */}
            <div className="relative overflow-hidden h-52 sm:h-72 lg:h-auto" style={{ minHeight: "unset" }}>
              <div className="hidden lg:block absolute inset-0">
                <img src="/img-5.jpg" alt={FEATURED.title[language]} className="w-full h-full object-cover"
                  style={{ transform: hov ? "scale(1.06)" : "scale(1)", transition: "transform .65s cubic-bezier(.25,1,.5,1)" }} />
              </div>
              <img src="/img-5.jpg" alt={FEATURED.title[language]} className="lg:hidden w-full h-full object-cover"
                style={{ transform: hov ? "scale(1.06)" : "scale(1)", transition: "transform .65s cubic-bezier(.25,1,.5,1)" }} />

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/55 via-transparent to-transparent" />

              <span className="absolute top-4 left-4 bg-blue-400 text-white text-[9px] sm:text-[10px] font-black tracking-[2px] sm:tracking-[3px] uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg">
                {FEATURED.category[language]}
              </span>
              <span className="absolute bottom-4 left-4 bg-white/15 backdrop-blur-md border border-white/30 text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-3 py-1 sm:py-1.5 rounded-full">
                ⭐ {FEATURED.mainNews[language]}
              </span>
            </div>

            {/* Content panel */}
            <div className={`flex flex-col justify-between p-5 sm:p-7 lg:p-10 ${contentBg} transition-colors duration-300`}>
              <div>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="text-blue-400 font-bold text-xs sm:text-sm">{currentDate}</span>
                  <span className={`${darkMode ? "text-blue-600" : "text-blue-200"} text-xs`}>•</span>
                  <span className={`${darkMode ? "text-blue-400" : "text-blue-300"} text-xs sm:text-sm`}>
                    ⏱ {FEATURED.readTime[language]}
                  </span>
                </div>

                <h2 className={`font-bold ${titleColor} leading-tight mb-3 sm:mb-4`}
                  style={{ fontFamily: "Georgia, serif", fontSize: "clamp(18px, 2.8vw, 38px)" }}>
                  {FEATURED.title[language]}
                </h2>

                <div className={`h-0.5 ${dividerBg} mb-4 sm:mb-5 origin-left transition-all duration-500`}
                  style={{ width: hov ? "100%" : "40%" }} />

                <p className={`${textColor} text-xs sm:text-sm leading-relaxed mb-5 sm:mb-8 line-clamp-3 sm:line-clamp-none`}>
                  {FEATURED.excerpt[language]}
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
                    {FEATURED.readMore[language]}
                  </button>
                </Link>
                <Link href="/newsPage"
                  className="text-blue-400 font-bold text-xs sm:text-sm hover:underline underline-offset-4 transition-colors whitespace-nowrap">
                  {FEATURED.newsPage[language]}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}