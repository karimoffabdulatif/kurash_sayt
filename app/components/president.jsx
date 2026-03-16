"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useApp } from "../contex/AppContext";

const T = {
  label:  { uz: "Rasmiy Murojaat",           en: "Official Address",              ru: "Официальное обращение"       },
  name:   { uz: "Shavkat Mirziyoyev",         en: "Shavkat Mirziyoyev",            ru: "Шавкат Мирзиёев"             },
  role1:  { uz: "O'zbekiston Respublikasi Prezidenti", en: "President of the Republic of Uzbekistan", ru: "Президент Республики Узбекистан" },
  role2:  { uz: "Xalqaro Kurash assotsiatsiyasining Faxriy prezidenti", en: "Honorary President of the International Kurash Association", ru: "Почётный президент Международной ассоциации Кураш" },
  quote1: { uz: "Qit'amiz sportchilari O'zbek kurashi bo'yicha Yozgi Osiyo o'yinlarida musobaqa o'tkazmoqdalar.", en: "Athletes of our continent are competing in Uzbek Kurash at the Asian Summer Games.", ru: "Спортсмены нашего континента соревнуются на Летних Азиатских играх по узбекскому курашу." },
  quote2: { uz: "Sport ta'limidagi yana bir yangilik — Kurash mahorat maktablari bo'ladi!", en: "Another innovation in sports education — Kurash skill schools will be established!", ru: "Ещё одно нововведение в спортивном образовании — будут созданы школы мастерства по курашу!" },
};

function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return v;
}

// Har bir element uchun animatsiya stili
function fadeUp(active, delay = 0) {
  return {
    opacity:    active ? 1 : 0,
    transform:  active ? "translateY(0)" : "translateY(28px)",
    transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
  };
}
function fadeLeft(active, delay = 0) {
  return {
    opacity:    active ? 1 : 0,
    transform:  active ? "translateX(0)" : "translateX(-32px)",
    transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
  };
}
function fadeRight(active, delay = 0) {
  return {
    opacity:    active ? 1 : 0,
    transform:  active ? "translateX(0)" : "translateX(32px)",
    transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
  };
}
function scaleIn(active, delay = 0) {
  return {
    opacity:    active ? 1 : 0,
    transform:  active ? "scale(1)" : "scale(0.88)",
    transition: `opacity .8s ease ${delay}s, transform .8s cubic-bezier(.34,1.56,.64,1) ${delay}s`,
  };
}

export default function President() {
  const { darkMode, language } = useApp();
  const [imgError, setImgError] = useState(false);
  const sectionRef = useRef(null);
  const iv = useInView(sectionRef);

  const bg     = darkMode ? "bg-[#0a1628]"    : "bg-[#f8f9fc]";
  const titleC = darkMode ? "text-white"       : "text-[#0f2a5e]";
  const textC  = darkMode ? "text-blue-200/60" : "text-slate-500";
  const labelC = darkMode ? "text-blue-400"    : "text-blue-500";
  const gridColor = darkMode ? "rgba(96,165,250,0.06)" : "rgba(15,42,94,0.06)";

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden transition-colors duration-300 ${bg}`}
    >
      {/* Mayda kataklar */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }} />

      {/* Chap aksent */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${darkMode ? "bg-blue-500/30" : "bg-[#0f2a5e]/15"}`}
        style={{
          transform: iv ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "top",
          transition: "transform 1s ease",
        }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-14 sm:py-20 lg:py-24">

        {/* Label — fade up */}
        <div className="flex items-center gap-3 mb-10 sm:mb-14" style={fadeUp(iv, 0)}>
          <div className={`h-px w-8 ${darkMode ? "bg-blue-400" : "bg-[#0f2a5e]"}`} />
          <span className={`${labelC} text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase`}>
            {T.label[language]}
          </span>
        </div>

        {/* ── MOBILE ── */}
        <div className="flex flex-col lg:hidden items-center gap-8">

          {/* Rasm — scale in */}
          <div className="relative flex-shrink-0" style={scaleIn(iv, 0.1)}>
            <div className={`relative w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 ${
              darkMode ? "border-blue-500/30" : "border-[#0f2a5e]/20"
            } shadow-lg`}>
              {imgError ? (
                <div className="w-full h-full bg-gradient-to-br from-[#1a3a6b] to-[#0f2a5e] flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">Ш</span>
                </div>
              ) : (
                <Image src="/pres3.jpg" alt="Shavkat Mirziyoyev" fill className="object-cover object-top" onError={() => setImgError(true)} />
              )}
            </div>
          </div>

          {/* Ism — fade up */}
          <div className="text-center" style={fadeUp(iv, 0.25)}>
            <h3 className={`${titleC} font-black text-[16px] sm:text-[18px] mb-1`}>{T.name[language]}</h3>
            <p className={`${textC} text-[11px] sm:text-[12px] leading-relaxed`}>
              {T.role1[language]}<br />{T.role2[language]}
            </p>
            <div className="flex gap-1.5 mt-3 justify-center">
              <span className={`w-1.5 h-1.5 rounded-full ${darkMode ? "bg-blue-400" : "bg-[#0f2a5e]"}`} />
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
              <span className={`w-1.5 h-1.5 rounded-full ${darkMode ? "bg-blue-400/30" : "bg-[#0f2a5e]/30"}`} />
            </div>
          </div>

          {/* Quote — fade up, kechikish bilan */}
          <div className="w-full max-w-lg" style={fadeUp(iv, 0.4)}>
            <div className={`text-[56px] leading-none ${darkMode ? "text-blue-400/20" : "text-[#0f2a5e]/10"} font-serif select-none -mb-1`}>"</div>
            <blockquote>
              <p className={`${titleC} font-bold text-[17px] sm:text-[20px] leading-snug mb-4 text-center`}>
                {T.quote1[language]}
              </p>
              <p className={`${textC} text-[13px] sm:text-[14px] leading-relaxed italic text-center`}>
                {T.quote2[language]}
              </p>
            </blockquote>
            <div className="flex items-center gap-3 mt-6 justify-center" style={fadeUp(iv, 0.55)}>
              <div className="h-0.5 bg-red-500/70" style={{
                width: iv ? "40px" : "0px",
                transition: "width .6s ease .6s",
              }} />
              <div className={`h-0.5 ${darkMode ? "bg-blue-400/30" : "bg-[#0f2a5e]/20"}`} style={{
                width: iv ? "20px" : "0px",
                transition: "width .6s ease .75s",
              }} />
            </div>
          </div>
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden lg:grid lg:grid-cols-[220px_1px_1fr] gap-12 xl:gap-16 items-center">

          {/* Rasm — chapdan + scale */}
          <div className="flex flex-col items-center text-center" style={fadeLeft(iv, 0.1)}>
            <div className="relative mb-6">
              <div className={`relative w-[200px] h-[200px] xl:w-[220px] xl:h-[220px] rounded-full overflow-hidden border-2 ${
                darkMode ? "border-blue-500/30" : "border-[#0f2a5e]/20"
              } shadow-lg`} style={scaleIn(iv, 0.15)}>
                {imgError ? (
                  <div className="w-full h-full bg-gradient-to-br from-[#1a3a6b] to-[#0f2a5e] flex items-center justify-center">
                    <span className="text-white text-5xl font-bold">Ш</span>
                  </div>
                ) : (
                  <Image src="/pres3.jpg" alt="Shavkat Mirziyoyev" fill className="object-cover object-top" onError={() => setImgError(true)} />
                )}
              </div>
            </div>

            <h3 className={`${titleC} font-black text-[15px] xl:text-[16px] mb-2`} style={fadeUp(iv, 0.3)}>
              {T.name[language]}
            </h3>
            <p className={`${textC} text-[11px] xl:text-[12px] leading-relaxed`} style={fadeUp(iv, 0.35)}>
              {T.role1[language]}
            </p>
            <p className={`${textC} text-[11px] xl:text-[12px] leading-relaxed mt-1`} style={fadeUp(iv, 0.4)}>
              {T.role2[language]}
            </p>
            <div className="flex gap-1.5 mt-4" style={fadeUp(iv, 0.45)}>
              <span className={`w-1.5 h-1.5 rounded-full ${darkMode ? "bg-blue-400" : "bg-[#0f2a5e]"}`} />
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
              <span className={`w-1.5 h-1.5 rounded-full ${darkMode ? "bg-blue-400/30" : "bg-[#0f2a5e]/30"}`} />
            </div>
          </div>

          {/* Vertikal divider — yuqoridan pastga chiziladi */}
          <div className={`self-stretch bg-gradient-to-b from-transparent ${darkMode ? "via-blue-400/20" : "via-[#0f2a5e]/15"} to-transparent`}
            style={{
              transform: iv ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top",
              transition: "transform .8s ease .2s",
            }} />

          {/* Quote — o'ngdan */}
          <div style={fadeRight(iv, 0.2)}>
            {/* Katta qo'shtirnoq */}
            <div className={`text-[100px] xl:text-[120px] leading-[0.75] ${
              darkMode ? "text-blue-400/12" : "text-[#0f2a5e]/8"
            } font-serif select-none -mb-2 -ml-2`}
              style={fadeUp(iv, 0.1)}>"</div>

            <blockquote className="space-y-5">
              <p className={`${titleC} font-bold text-[22px] xl:text-[28px] leading-snug tracking-tight`}
                style={fadeUp(iv, 0.3)}>
                {T.quote1[language]}
              </p>
              <p className={`${textC} text-[14px] xl:text-[16px] leading-relaxed italic`}
                style={fadeUp(iv, 0.4)}>
                {T.quote2[language]}
              </p>
            </blockquote>

            {/* Pastki chiziqlar — kengayib chiqadi */}
            <div className="flex items-center gap-4 mt-8">
              <div className="h-0.5 bg-red-500/70" style={{
                width: iv ? "56px" : "0px",
                transition: "width .6s ease .55s",
              }} />
              <div className={`h-0.5 ${darkMode ? "bg-blue-400/30" : "bg-[#0f2a5e]/20"}`} style={{
                width: iv ? "28px" : "0px",
                transition: "width .6s ease .7s",
              }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}