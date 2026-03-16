'use client';

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useApp } from "../contex/AppContext";

const images = [
  { src: "img-5.jpg", alt: "Kurash musobaqasi" },
  { src: "img-2.jpg", alt: "Kurash turniri"    },
  { src: "img-3.jpg", alt: "Kurash sport"      },
  { src: "img-6.jpg", alt: "Kurash festivali"  },
];

const T = {
  desc1: {
    uz: "Butunjahon Belbog'li Kurash va Bel Olish Kurash Assotsiatsiyasi — xalqimizning ko'p asrlik tarixini o'zida mujassam etgan, milliy madaniy merosimiz va qadriyatlarimizning ajralmas qismi bo'lgan belbog'li kurash hamda bel olish kurashini butun dunyo miqyosida qayta tiklash, rivojlantirish va ommalashtirishni o'z oldiga ustuvor maqsad qilib qo'ygan.",
    en: "The World Belt Wrestling and \"Bel Olish\" Wrestling Association — its primary mission is to revive, develop, and popularize belt wrestling and \"bel olish\" wrestling worldwide. These sports embody the centuries-old history of our people and constitute an integral part of our national cultural heritage and values.",
    ru: "Всемирная ассоциация борьбы на поясах и борьбы «бел олиш» — ставит своей приоритетной целью возрождение, развитие и популяризацию во всем мире борьбы на поясах и борьбы «бел олиш», которые воплощают в себе многовековую историю нашего народа и являются неотъемлемой частью нашего национального культурного наследия и ценностей.",
  },
  desc2: {
    uz: "Biz har bir sportchi uchun eng yaxshi sharoitlarni yaratib,belbog'li kurash sportini jahon miqyosida yangi bosqichga olib chiqamiz.",
    en: "By creating the best conditions for every athlete, we are taking belt wrestling to a new level on the global stage.",
    ru: "Создавая наилучшие условия для каждого спортсмена, мы выводим борьбу на поясах на новый мировой уровень.",
  },
  btn: { uz: "Batafsil →", en: "Learn more →", ru: "Подробнее →" },
};

export default function MainSection() {
  const { darkMode, language } = useApp();
  const sectionRef = useRef(null);
  const [iv, setIv] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIv(true); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const bg     = darkMode ? "#0d1f3c"               : "#eef2f8";
  const dotClr = darkMode ? "rgba(96,165,250,0.15)"  : "rgba(15,42,94,0.1)";
  const titC   = darkMode ? "text-white"             : "text-[#0f2a5e]";
  const txtC   = darkMode ? "text-blue-200/65"       : "text-slate-500";

  const fadeUp    = (d = 0) => ({ opacity: iv ? 1 : 0, transform: iv ? "none" : "translateY(32px)",  transition: `opacity .7s ease ${d}s, transform .7s cubic-bezier(.22,1,.36,1) ${d}s` });
  const fadeRight = (d = 0) => ({ opacity: iv ? 1 : 0, transform: iv ? "none" : "translateX(40px)",  transition: `opacity .7s ease ${d}s, transform .7s cubic-bezier(.22,1,.36,1) ${d}s` });
  const scaleIn   = (d = 0) => ({ opacity: iv ? 1 : 0, transform: iv ? "none" : "scale(0.88)",       transition: `opacity .8s ease ${d}s, transform .8s cubic-bezier(.34,1.56,.64,1) ${d}s` });

  const dividerStyle = (delay) => ({
    width: iv ? "48px" : "0px",
    transition: `width .7s ease ${delay}s`,
  });

  const btnClass = darkMode
    ? "border-blue-400/50 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400"
    : "border-[#0f2a5e]/40 text-[#0f2a5e] hover:bg-[#0f2a5e] hover:text-white";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;600&display=swap');
        .font-cg { font-family: 'Cormorant Garamond', serif; }
        .img-h { overflow: hidden; }
        .img-h img { transition: transform .7s ease, filter .7s ease; filter: brightness(.88); }
        .img-h:hover img { transform: scale(1.06); filter: brightness(1); }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 transition-colors duration-300"
        style={{ backgroundColor: bg }}
      >
        {/* Nuqtalar foni */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, ${dotClr} 1.5px, transparent 1.5px)`,
          backgroundSize: "22px 22px",
        }} />

        {/* Diagonal aksent */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: darkMode
            ? "linear-gradient(135deg, transparent 55%, rgba(30,64,175,0.07) 100%)"
            : "linear-gradient(135deg, transparent 55%, rgba(15,42,94,0.04) 100%)",
        }} />

        {/* Chap vertikal chiziq */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[3px] ${darkMode ? "bg-blue-500/25" : "bg-[#0f2a5e]/12"}`}
          style={{ transform: iv ? "scaleY(1)" : "scaleY(0)", transformOrigin: "top", transition: "transform 1s ease .05s" }}
        />

        {/* O'ng pastda glow */}
        <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full pointer-events-none" style={{
          background: darkMode
            ? "radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(15,42,94,0.05) 0%, transparent 70%)",
        }} />

        <div className="relative max-w-7xl mx-auto w-full">

          {/* ── DESKTOP ── */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-14 items-center">

            {/* Rasmlar */}
            <div className="grid grid-cols-2 gap-2.5" style={{ gridTemplateRows: "220px 220px 190px" }}>
              <div className="img-h rounded-lg overflow-hidden row-span-2" style={scaleIn(0.1)}>
                <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" />
              </div>
              <div className="img-h rounded-lg overflow-hidden" style={fadeUp(0.2)}>
                <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover" />
              </div>
              <div className="img-h rounded-lg overflow-hidden" style={fadeUp(0.3)}>
                <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover" />
              </div>
              <div className="img-h rounded-lg overflow-hidden col-span-2" style={fadeUp(0.4)}>
                <img src={images[3].src} alt={images[3].alt} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Matn */}
            <div className="pl-4">
              <h2 className={`font-cg text-[52px] lg:text-[68px] font-semibold ${titC} leading-none tracking-wide`} style={fadeRight(0.2)}>
                WBK<span className="text-blue-400">&</span>BOKA
              </h2>
              <div className="mt-6 mb-6 h-px bg-blue-400" style={dividerStyle(0.35)} />
              <p className={`text-sm font-light leading-[1.9] ${txtC} mb-4 max-w-sm`} style={fadeRight(0.4)}>{T.desc1[language]}</p>
              <p className={`text-sm font-light leading-[1.9] ${txtC} mb-8 max-w-sm`} style={fadeRight(0.48)}>{T.desc2[language]}</p>
              <div style={fadeRight(0.55)}>
                <Link href="/about">
                  <button className={`text-[11px] font-semibold tracking-[0.2em] uppercase border px-10 py-3 rounded-sm transition-all duration-300 ${btnClass}`}>
                    {T.btn[language]}
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* ── TABLET ── */}
          <div className="hidden md:flex lg:hidden flex-col gap-10">
            <div className="flex flex-col items-center text-center">
              <h2 className={`font-cg text-[56px] font-semibold ${titC} leading-none tracking-wide`} style={fadeUp(0.1)}>
                WBK<span className="text-blue-400">&</span>BOKA
              </h2>
              <div className="mt-5 mb-5 h-px bg-blue-400 mx-auto" style={dividerStyle(0.28)} />
              <p className={`text-sm font-light leading-[1.9] ${txtC} mb-3 max-w-sm`} style={fadeUp(0.32)}>{T.desc1[language]}</p>
              <p className={`text-sm font-light leading-[1.9] ${txtC} mb-6 max-w-sm`} style={fadeUp(0.4)}>{T.desc2[language]}</p>
              <div style={fadeUp(0.47)}>
                <Link href="/about">
                  <button className={`text-[11px] font-semibold tracking-[0.2em] uppercase border px-10 py-3 rounded-sm transition-all duration-300 ${btnClass}`}>
                    {T.btn[language]}
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {images.map((img, i) => (
                <div key={i} className="img-h h-52 rounded-lg overflow-hidden" style={fadeUp(0.15 + i * 0.08)}>
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* ── MOBILE ── */}
          <div className="flex md:hidden flex-col gap-5">
            <div className="flex flex-col items-center text-center">
              <h2 className={`font-cg text-[44px] sm:text-[52px] font-semibold ${titC} leading-none tracking-wide`} style={fadeUp(0.05)}>
                WBK<span className="text-blue-400">&</span>BOKA
              </h2>
              <div className="mt-5 mb-5 h-px bg-blue-400 mx-auto" style={dividerStyle(0.22)} />
              <p className={`text-sm font-light leading-[1.9] ${txtC} mb-3 max-w-xs`} style={fadeUp(0.25)}>{T.desc1[language]}</p>
              <p className={`text-sm font-light leading-[1.9] ${txtC} mb-5 max-w-xs`} style={fadeUp(0.32)}>{T.desc2[language]}</p>
              <div style={fadeUp(0.38)}>
                <Link href="/about">
                  <button className={`text-[11px] font-semibold tracking-[0.2em] uppercase border px-8 py-3 rounded-sm transition-all duration-300 ${btnClass}`}>
                    {T.btn[language]}
                  </button>
                </Link>
              </div>
            </div>

            <div className="img-h h-56 rounded-lg overflow-hidden" style={scaleIn(0.15)}>
              <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="img-h h-36 rounded-lg overflow-hidden" style={fadeUp(0.22)}>
                <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover" />
              </div>
              <div className="img-h h-36 rounded-lg overflow-hidden" style={fadeUp(0.28)}>
                <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="img-h h-44 rounded-lg overflow-hidden" style={fadeUp(0.34)}>
              <img src={images[3].src} alt={images[3].alt} className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}