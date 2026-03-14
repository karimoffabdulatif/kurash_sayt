"use client";

import { useRef, useEffect, useState } from "react";
import { useApp } from "../contex/AppContext";

const MEMBERS = [
  {
    id: 1, img: "/isoqov.jpg", initials: "IR", color: "#0f2a5e",
    role: { uz: "Ijroiya qo'mita raisi", en: "Executive Committee Chairman", ru: "Председатель Исполкома" },
    name: { uz: "Isaqov Rustambek Mo'ydinovich", en: "Isakov Rustambek Moydinovich", ru: "Исаков Рустамбек Муйдинович" },
    org:  { uz: "Butunjahon Belbog'li Kurash va Bel Olish Kurash Assotsiatsiyasi", en: "World Kurash Belt Wrestling Association", ru: "Всемирная Ассоциация Борьбы Кураш" },
    featured: true,
  },
  { id: 2, img: null,               initials: "ZM", color: "#1e40af",
    role: { uz: "Prezident",          en: "President",         ru: "Президент"             },
    name: { uz: "Zaripov Marufjon Muzaffarovich",    en: "Zaripov Marufjon Muzaffarovich",    ru: "Зарипов Маруфжон Музаффарович" },
    org:  { uz: "Assotsiatsiya",      en: "Association",       ru: "Ассоциация"            },
  },
  { id: 3, img: "/arraboyev.jpg",   initials: "AZ", color: "#1e3a8a",
    role: { uz: "Bosh kotib",         en: "Secretary General", ru: "Генеральный секретарь" },
    name: { uz: "Arabboev Ziyodilloh Isroilovich",   en: "Arabboev Ziyodulloh Isroilovich",   ru: "Арабоев Зиёдуллох Исроилович" },
    org:  { uz: "Assotsiatsiya",      en: "Association",       ru: "Ассоциация"            },
  },
  { id: 4, img: "/joraboyevich.jpg", initials: "NA", color: "#1d4ed8", country: "🇰🇿",
    role: { uz: "Vitse-prezident",    en: "Vice President",    ru: "Вице-президент"        },
    name: { uz: "Niyozov Anvar Jo'raboyevich",       en: "Niyozov Anvar Juraboyevich",       ru: "Ниязов Анвар Журабоевич"     },
    org:  { uz: "Qozog'iston",        en: "Kazakhstan",        ru: "Казахстан"             },
  },
  { id: 5, img: "/muhammadf.jpg",   initials: "MF", color: "#2563eb", country: "🇮🇷",
    role: { uz: "Vitse-prezident",    en: "Vice President",    ru: "Вице-президент"        },
    name: { uz: "Muhammad Farshod Shadham",          en: "Muhammad Farshod Shadham",          ru: "Мухаммад Фаршод Шадхам"      },
    org:  { uz: "Eron Islom Respublikasi", en: "Islamic Republic of Iran", ru: "Исламская Республика Иран" },
  },
  { id: 6, img: "/mirzayev.jpg",    initials: "MA", color: "#1e40af",
    role: { uz: "Sport direktori",    en: "Sports Director",   ru: "Спортивный директор"   },
    name: { uz: "Mirzayev Abdulhamit Marifovich",    en: "Mirzaev Abdulhamit Marifovich",    ru: "Мирзаев Абдулхамит Марифович" },
    org:  { uz: "Assotsiatsiya",      en: "Association",       ru: "Ассоциация"            },
  },
  { id: 7, img: null,               initials: "AZ", color: "#1e3a8a",
    role: { uz: "Sport direktori",    en: "Sports Director",   ru: "Спортивный директор"   },
    name: { uz: "Artiqov Zohidjon Sobirovich",       en: "Artikov Zohidjon Sobirovich",       ru: "Артиков Зохиджон Собирович"  },
    org:  { uz: "Assotsiatsiya",      en: "Association",       ru: "Ассоциация"            },
  },
  { id: 8, img: null,               initials: "AN", color: "#1d4ed8",
    role: { uz: "Sport direktori",    en: "Sports Director",   ru: "Спортивный директор"   },
    name: { uz: "Azizov Nosir Holmatovich",          en: "Azizov Nosir Holmatovich",          ru: "Азизов Носир Холматович"     },
    org:  { uz: "Assotsiatsiya",      en: "Association",       ru: "Ассоциация"            },
  },
  { id: 9, img: "/karimov.jpg",     initials: "KA", color: "#2563eb",
    role: { uz: "Media markaz rahbari", en: "Media Center Head", ru: "Руководитель медиацентра" },
    name: { uz: "Karimov Abdulatif",                 en: "Karimov Abdulatif",                 ru: "Каримов Абдулатиф"           },
    org:  { uz: "Assotsiatsiya",      en: "Association",       ru: "Ассоциация"            },
  },
];

const T = {
  title: { uz: "Assotsiatsiya rasmiylar", en: "Association Officials", ru: "Официальные лица" },
  sub:   { uz: "Butunjahon Belbog'li Kurash va Bel Olish Kurash Assotsiatsiyasi", en: "World Kurash Belt Wrestling Association", ru: "Всемирная Ассоциация Борьбы Кураш" },
};

function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.05 });
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
      style={{ opacity: iv ? 1 : 0, transform: iv ? "none" : "translateY(24px)", transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

/* ── Featured Hero ── */
function FeaturedCard({ member, darkMode, language }) {
  const [hov, setHov] = useState(false);
  const cardBg  = darkMode ? "bg-[#0d1f3c]" : "bg-white";
  const borderC = darkMode ? "border-blue-900/60" : "border-gray-100";
  const titleC  = darkMode ? "text-white" : "text-[#0f2a5e]";
  const textC   = darkMode ? "text-blue-200/60" : "text-slate-400";

  return (
    <Reveal>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border ${borderC} ${cardBg} transition-all duration-500`}
        style={{ boxShadow: hov ? "0 24px 64px rgba(15,42,94,0.16)" : "0 6px 24px rgba(15,42,94,0.07)" }}
      >
        {/* MOBILE: Rasm ustida matn (overlay) */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden" style={{ height: "320px" }}>
            {member.img ? (
              <img src={member.img} alt={member.name[language]}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                style={{ objectPosition: "center 15%", transform: hov ? "scale(1.04)" : "scale(1)" }} />
            ) : (
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(150deg, ${member.color}, #0f172a)` }} />
            )}
            {/* Gradient overlay pastdan */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.5) 50%, rgba(10,22,40,0.1) 100%)" }} />

            {/* Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="w-6 h-px bg-blue-400" />
              <span className="text-blue-400 text-[10px] font-black tracking-[0.3em]">01</span>
            </div>

            {/* Matn overlay — pastda */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <p className="text-blue-400 text-[10px] font-black tracking-[0.25em] uppercase mb-2">
                {member.role[language]}
              </p>
              <h2 className="text-white font-black text-[20px] sm:text-[26px] leading-tight mb-1">
                {member.name[language]}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-px w-8 bg-blue-400" />
                <p className="text-white/50 text-[11px]">{member.org[language]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP: Yonma-yon */}
        <div className="hidden lg:grid lg:grid-cols-2">
          {/* Rasm */}
          <div className="relative overflow-hidden" style={{ minHeight: "460px" }}>
            {member.img ? (
              <img src={member.img} alt={member.name[language]}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                style={{ objectPosition: "center 15%", transform: hov ? "scale(1.04)" : "scale(1)" }} />
            ) : (
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(150deg, ${member.color}, #0f172a)` }} />
            )}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to right, transparent 60%, " + (darkMode ? "#0d1f3c" : "white") + " 100%)" }} />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, " + (darkMode ? "#0d1f3c" : "white") + " 0%, transparent 25%)" }} />
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="w-8 h-px bg-blue-400" />
              <span className="text-blue-400 text-[11px] font-black tracking-[0.3em]">01</span>
            </div>
          </div>

          {/* Matn */}
          <div className="relative flex flex-col justify-center px-10 xl:px-14 py-12">
            <div className="absolute top-0 left-0 w-px h-full opacity-15"
              style={{ background: "linear-gradient(to bottom, transparent, #60a5fa, transparent)" }} />
            <p className="text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-blue-400" />{member.role[language]}
            </p>
            <h2 className={`${titleC} font-black leading-[1.1] mb-5`}
              style={{ fontSize: "clamp(24px, 2.8vw, 38px)" }}>
              {member.name[language]}
            </h2>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-0.5 w-12 bg-blue-400" />
              <div className="h-0.5 w-3 bg-blue-400/30" />
            </div>
            <p className={`${textC} text-sm leading-relaxed max-w-xs`}>{member.org[language]}</p>
            {member.country && <span className="text-2xl mt-5">{member.country}</span>}
            <div className="absolute bottom-6 right-8 text-[80px] font-black leading-none select-none pointer-events-none"
              style={{ color: darkMode ? "rgba(96,165,250,0.05)" : "rgba(15,42,94,0.04)" }}>01</div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Small Card ── */
function SmallCard({ member, index, darkMode, language, delay }) {
  const [hov, setHov] = useState(false);
  const num = String(index + 2).padStart(2, "0");

  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer"
        style={{
          height: "clamp(220px, 38vw, 340px)",
          boxShadow: hov ? "0 16px 48px rgba(15,42,94,0.22)" : "0 3px 16px rgba(15,42,94,0.08)",
          transition: "box-shadow .4s ease",
        }}
      >
        {/* Fon */}
        {member.img ? (
          <img src={member.img} alt={member.name[language]}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
            style={{ objectPosition: "center 15%", transform: hov ? "scale(1.07)" : "scale(1)" }} />
        ) : (
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(150deg, ${member.color} 0%, #0f172a 100%)` }}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 30% 30%, rgba(96,165,250,0.5) 0%, transparent 65%)" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-black select-none"
              style={{ fontSize: "clamp(48px, 10vw, 72px)", opacity: 0.1 }}>{member.initials}</div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: "linear-gradient(to top, rgba(8,18,36,0.97) 0%, rgba(8,18,36,0.55) 50%, rgba(8,18,36,0.08) 100%)",
            opacity: hov ? 1 : 0.82,
          }} />

        {/* Raqam */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 z-10">
          <span className="w-4 h-px bg-blue-400/70" />
          <span className="text-blue-400/70 text-[9px] sm:text-[10px] font-black tracking-[0.25em]">{num}</span>
        </div>

        {/* Davlat bayrog'i */}
        {member.country && (
          <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-base sm:text-lg z-10">{member.country}</span>
        )}

        {/* Matn pastda */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 z-10 transition-transform duration-400"
          style={{ transform: hov ? "translateY(-3px)" : "translateY(0)" }}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="h-px bg-blue-400/60 transition-all duration-500 flex-shrink-0"
              style={{ width: hov ? "24px" : "12px" }} />
            <span className="text-blue-400/80 text-[9px] font-black tracking-[0.2em] uppercase truncate">
              {member.role[language]}
            </span>
          </div>
          <h3 className="text-white font-bold leading-snug text-[12px] sm:text-[13px] lg:text-[14px]">
            {member.name[language]}
          </h3>
          <p className="text-white/45 text-[10px] sm:text-[11px] mt-0.5 truncate transition-opacity duration-400"
            style={{ opacity: hov ? 0.8 : 0.45 }}>
            {member.org[language]}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function DirectingPage() {
  const { darkMode, language } = useApp();

  const bg     = darkMode ? "bg-[#0a1628]"    : "bg-[#f8f9fc]";
  const titleC = darkMode ? "text-white"       : "text-[#0f2a5e]";
  const textC  = darkMode ? "text-blue-300/40" : "text-slate-400";
  const divC   = darkMode ? "bg-blue-900/60"   : "bg-gray-200";

  const featured = MEMBERS.find(m => m.featured);
  const rest     = MEMBERS.filter(m => !m.featured);

  return (
    <main className={`${bg} min-h-screen transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-20 sm:pt-24 lg:pt-28 pb-14 sm:pb-20">

        {/* ── Header ── */}
        <Reveal className="mb-8 sm:mb-12 lg:mb-16">
          {/* Mobile: vertikal, Desktop: yonma-yon */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
            <div>
              <p className={`${textC} text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3`}>
                <span className="w-6 sm:w-8 h-px bg-current" />WBK & BOKA
              </p>
              <h1 className={`${titleC} font-black leading-none tracking-tight`}
                style={{ fontSize: "clamp(26px, 7vw, 60px)" }}>
                {T.title[language]}
              </h1>
            </div>
            <p className={`${textC} text-[11px] sm:text-xs max-w-[220px] sm:max-w-xs sm:text-right leading-relaxed hidden sm:block`}>
              {T.sub[language]}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-6">
            <div className={`h-px flex-1 ${divC}`} />
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-400" />
            <div className={`h-px w-8 sm:w-12 ${divC}`} />
          </div>
        </Reveal>

        {/* ── Featured ── */}
        {featured && (
          <div className="mb-4 sm:mb-6">
            <FeaturedCard member={featured} darkMode={darkMode} language={language} />
          </div>
        )}

        {/* ── Grid ──
            Mobile:  2 ustun
            Tablet:  2 ustun (sm)
            Desktop: 4 ustun (lg)
        */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {rest.map((member, i) => (
            <SmallCard
              key={member.id}
              member={member}
              index={i}
              darkMode={darkMode}
              language={language}
              delay={i * 0.05}
            />
          ))}
        </div>

      </div>
    </main>
  );
}