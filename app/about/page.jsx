"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaTrophy, FaGlobe, FaHandshake, FaScroll } from "react-icons/fa";
import { useApp } from "../contex/AppContext";

const T = {
badge: {
  uz: "Biz haqimizda",
  ru: "О нас",
  en: "About Us"
},
subtitle: {
  uz: "Butunjahon Belbog'li Kurash va Bel Olish Kurash Assotsiatsiyasi",
  en: "World Belt Wrestling and Bel Olish Wrestling Association",
  ru: "Всемирная ассоциация борьбы на поясах и борьбы «бел олиш»",
},
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
  missionLabel: { uz: "Missiya",         en: "Mission",    ru: "Миссия"      },
  missionTitle: { uz: "Nima uchun biz?", en: "Why us?",    ru: "Почему мы?"  },
  missions: [
    { icon: "trophy",    uz: "Xalqaro turnirlar",           en: "International tournaments",  ru: "Международные турниры",         desc: { uz: "Har yili dunyoning turli mamlakatlarida yirik musobaqalar tashkil etamiz.", en: "Every year we organize major competitions in different countries around the world.", ru: "Каждый год мы организуем крупные соревнования в разных странах мира." } },
    { icon: "globe",     uz: "Global tarqalish",            en: "Global spread",              ru: "Глобальное распространение",    desc: { uz: "Belbog'li kurash sportini 5 qit'aning 100 dan ortiq mamlakatiga yoyish.", en: "Spreading and popularizing belt wrestling in more than 100 countries across 5 continents.", ru: "Распространение и популяризация борьбы на поясах в более чем 100 странах на 5 континентах." } },
    { icon: "handshake", uz: "Sportchi qo'llab-quvvatlash", en: "Athlete support",            ru: "Поддержка спортсменов",         desc: { uz: "Har bir kurashchi uchun eng zamonaviy tayyorgarlik sharoitlarini yaratish.", en: "Creating the most modern training conditions for every wrestler.", ru: "Создание современных условий подготовки для каждого борца." } },
    { icon: "scroll",    uz: "Rasmiy qoidalar",             en: "Official rules",             ru: "Официальные правила",           desc: { uz: "Xalqaro standartlarga mos keladigan yagona sport qoidalarini ishlab chiqish.", en: "Developing unified sports rules that meet international standards.", ru: "Разработка единых спортивных правил, соответствующих международным стандартам." } },
  ],
  statsLabel: { uz: "Raqamlarda",     en: "In numbers",  ru: "В цифрах"   },
  stats: [
    { n: "100+", uz: "Davlat",         en: "Countries",   ru: "Стран"      },
    { n: "50+",  uz: "Xalqaro turnir", en: "Tournaments", ru: "Турниров"   },
    { n: "10K+", uz: "Sportchi",       en: "Athletes",    ru: "Спортсменов"},
    { n: "2008", uz: "Tashkil topgan", en: "Founded",     ru: "Основана"   },
  ],
  contact: { uz: "Bog'lanish",         en: "Contact us",  ru: "Связаться"  },
  back:    { uz: "← Bosh sahifaga",    en: "← Home",      ru: "← На главную" },
};

const IMAGES = ["/img-5.jpg", "/img-2.jpg", "/img-3.jpg", "/img-6.jpg"];

const ICONS = {
  trophy:    <FaTrophy    className="text-white text-xl" />,
  globe:     <FaGlobe     className="text-white text-xl" />,
  handshake: <FaHandshake className="text-white text-xl" />,
  scroll:    <FaScroll    className="text-white text-xl" />,
};

function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.07 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return v;
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const iv  = useInView(ref);
  return (
    <div ref={ref} className={className}
      style={{ opacity: iv ? 1 : 0, transform: iv ? "none" : "translateY(20px)", transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

/* ── Loader (Home page bilan bir xil stil) ── */
function Loader() {
  return (
    <div
      style={{ zIndex: 99999 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-white"
    >
      <div className="relative flex items-center justify-center">

        {/* Shadow doirasi */}
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
  );
}

export default function AboutPage() {
  const { darkMode, language } = useApp();
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

  const bg      = darkMode ? "bg-[#0a1628]"    : "bg-[#f8f9fc]";
  const cardBg  = darkMode ? "bg-[#0d1f3c]"   : "bg-white";
  const borderC = darkMode ? "border-blue-900" : "border-gray-100";
  const titleC  = darkMode ? "text-white"      : "text-[#0f2a5e]";
  const textC   = darkMode ? "text-blue-200/70": "text-slate-500";
  const subC    = darkMode ? "text-blue-400"   : "text-blue-500";

  return (
    <>
      {loading && <Loader />}

      <main className={`${bg} min-h-screen transition-colors duration-300`}>

        {/* ── HERO ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-20 sm:pt-16 lg:pt-30 pb-10 sm:pb-14">

          {/* MOBILE: avval title, keyin rasm */}
          <div className="lg:hidden">
            <Reveal className="mb-8">
              <h1 className={`${titleC} font-black text-center lg:text-start text-[36px] sm:text-[52px] leading-none tracking-tight mb-2`}>
                WBK<span className="text-blue-400">&</span>BOKA
              </h1>
              <p className={`${subC} text-sm text-center lg:text-start font-medium mb-4`}>{T.subtitle[language]}</p>
              <p className={`${textC} text-sm leading-relaxed mb-3`}>{T.desc1[language]}</p>
              <p className={`${textC} text-sm leading-relaxed mb-6`}>{T.desc2[language]}</p>
            </Reveal>

            <Reveal>
              {/* Tablet (sm): 2x2 grid */}
              <div className="hidden sm:grid grid-cols-2 gap-3">
                <div className="row-span-2 rounded-2xl overflow-hidden h-[340px]">
                  <img src={IMAGES[0]} alt="kurash" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-2xl overflow-hidden h-[162px]">
                  <img src={IMAGES[1]} alt="kurash" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-2xl overflow-hidden h-[162px]">
                  <img src={IMAGES[2]} alt="kurash" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="col-span-2 rounded-2xl overflow-hidden h-[160px]">
                  <img src={IMAGES[3]} alt="kurash" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>

              {/* Mobile: 1ta katta + 2ta kichik */}
              <div className="sm:hidden space-y-2">
                <div className="rounded-2xl overflow-hidden h-52">
                  <img src={IMAGES[0]} alt="kurash" className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-2xl overflow-hidden h-36">
                    <img src={IMAGES[1]} alt="kurash" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden h-36">
                    <img src={IMAGES[2]} alt="kurash" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden h-40">
                  <img src={IMAGES[3]} alt="kurash" className="w-full h-full object-cover" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* DESKTOP: yonma-yon */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <Reveal>
              <div className="grid grid-cols-2 gap-3">
                <div className="row-span-2 rounded-2xl overflow-hidden h-[420px]">
                  <img src={IMAGES[0]} alt="kurash" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-2xl overflow-hidden h-[200px]">
                  <img src={IMAGES[1]} alt="kurash" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-2xl overflow-hidden h-[200px]">
                  <img src={IMAGES[2]} alt="kurash" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="col-span-2 rounded-2xl overflow-hidden h-[180px]">
                  <img src={IMAGES[3]} alt="kurash" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className={`${subC} text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 flex items-center gap-2`}>
                <span className="w-6 h-px bg-current" />{T.badge[language]}
              </p>
              <h1 className={`${titleC} font-black text-[52px] lg:text-[60px] leading-none tracking-tight mb-2`}>
                WBK<span className="text-blue-400">&</span>BOKA
              </h1>
              <p className={`${subC} text-sm font-medium mb-5`}>{T.subtitle[language]}</p>
              <div className="w-10 h-0.5 bg-blue-400 mb-5" />
              <p className={`${textC} text-base leading-relaxed mb-4`}>{T.desc1[language]}</p>
              <p className={`${textC} text-base leading-relaxed mb-8`}>{T.desc2[language]}</p>
              <a href="mailto:info@kurash.uz"
                className={`inline-block border ${darkMode ? "border-blue-700 text-blue-300 hover:bg-blue-900" : "border-[#0f2a5e] text-[#0f2a5e] hover:bg-[#0f2a5e] hover:text-white"} text-[11px] font-bold tracking-[0.2em] uppercase px-7 py-3 rounded-sm transition-all duration-300`}>
                {T.contact[language]} →
              </a>
            </Reveal>
          </div>
        </section>

        {/* ── STATISTIKA ── */}
        <section className="bg-[#0f2a5e] py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
            <Reveal>
              <p className="text-blue-300 text-[11px] font-semibold tracking-[0.25em] uppercase mb-6 sm:mb-8 flex items-center gap-2">
                <span className="w-6 h-px bg-current" />{T.statsLabel[language]}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-blue-800/40">
                {T.stats.map((s, i) => (
                  <div key={i} className="bg-[#0f2a5e] px-4 sm:px-6 py-6 sm:py-8 text-center">
                    <p className="text-white font-black text-[28px] sm:text-[44px] leading-none mb-1">{s.n}</p>
                    <p className="text-blue-300 text-[10px] sm:text-[11px] font-medium tracking-widest uppercase">{s[language]}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── MISSIYA ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20">
          <Reveal className="mb-8 sm:mb-10">
            <p className={`${subC} text-[11px] font-semibold tracking-[0.25em] uppercase mb-3 flex items-center gap-2`}>
              <span className="w-6 h-px bg-current" />{T.missionLabel[language]}
            </p>
            <h2 className={`${titleC} font-black text-[22px] sm:text-[32px] lg:text-[36px] leading-tight`}>
              {T.missionTitle[language]}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {T.missions.map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className={`${cardBg} border ${borderC} rounded-2xl p-5 sm:p-6 h-full hover:shadow-lg transition-shadow duration-300`}>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0f2a5e] flex items-center justify-center mb-3 sm:mb-4 shadow-md">
                    {ICONS[m.icon]}
                  </div>
                  <h3 className={`${titleC} font-bold text-[14px] sm:text-[15px] mb-2`}>{m[language]}</h3>
                  <p className={`${textC} text-[12px] sm:text-[13px] leading-relaxed`}>{m.desc[language]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── ALOQA ── */}
        <section className={`${darkMode ? "bg-[#0d1f3c]" : "bg-white"} py-10 sm:py-16 transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
            <Reveal>
              <div className={`border ${borderC} rounded-2xl p-5 sm:p-10 lg:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6`}>
                <div>
                  <p className={`${subC} text-[11px] font-semibold tracking-[0.25em] uppercase mb-2`}>WBK & BOKA</p>
                  <h3 className={`${titleC} font-black text-[20px] sm:text-[28px] lg:text-[32px] leading-tight`}>
                    {T.contact[language]}
                  </h3>
                  <p className={`${textC} text-sm mt-2`}>info@belboglikurash.uz</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <a href="mailto:info@belboglikurash.uz"
                    className="bg-[#0f2a5e] hover:bg-blue-800 text-white text-[11px] font-bold tracking-[0.2em] uppercase px-6 sm:px-8 py-3 rounded-sm transition-colors text-center">
                    Email →
                  </a>
                  <a href="https://t.me/belboglikurash" target="_blank" rel="noopener noreferrer"
                    className={`border ${darkMode ? "border-blue-700 text-blue-300 hover:bg-blue-900" : "border-[#0f2a5e] text-[#0f2a5e] hover:bg-[#0f2a5e] hover:text-white"} text-[11px] font-bold tracking-[0.2em] uppercase px-6 sm:px-8 py-3 rounded-sm transition-all text-center`}>
                    Telegram →
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="mt-6 sm:mt-8 text-center">
              <Link href="/" className={`${subC} text-[12px] font-medium hover:underline underline-offset-4 transition-colors`}>
                {T.back[language]}
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}