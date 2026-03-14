"use client";

import { useState, useRef, useEffect } from "react";
import { useApp } from "../contex/AppContext";

const TICKER_WORDS = [
  "NEWS", "WBK", "DUNYO BELBOGLI KURASH", "WBK", "WORLD CHAMPIONSHIP 2026",
  "WBK", "TOSHKENT GRAND PRIX", "WBK", "KURASH YANGILIKLARI", "WBK",
  "SPORT XABARLARI", "WBK", "UWF RASMIY SAYTI", "WBK",
];

const CATS = {
  uz: ["Barchasi", "Musobaqa", "Rekord", "Tashkilot", "Intervyu", "Turnir", "Xalqaro"],
  en: ["All",      "Tournament","Record", "Organization","Interview","Tournament","International"],
  ru: ["Все",      "Турнир",   "Рекорд", "Организация", "Интервью", "Турнир",   "Международный"],
};

const T = {
  label:      { uz: "WBK & BOKA Rasmiy Yangiliklari", en: "WBK & BOKA Official News",       ru: "Официальные новости WBK & BOKA" },
  heading1:   { uz: "So'nggi",     en: "Latest",       ru: "Последние"   },
  heading2:   { uz: "Yangiliklar", en: "News",          ru: "Новости"     },
  empty:      { uz: "Bu kategoriyada yangilik mavjud emas.", en: "No news in this category.", ru: "В этой категории нет новостей." },
  featured:   { uz: "Asosiy yangilik", en: "Featured",  ru: "Главное"     },
  read:       { uz: "Batafsil o'qish", en: "Read more", ru: "Читать далее"},
  subTitle:   { uz: "Xabardor bo'lib turing", en: "Stay informed",        ru: "Будьте в курсе"     },
  newsletter: { uz: "Yangiliklar xabarnomasi", en: "Newsletter",          ru: "Новостная рассылка" },
  placeholder:{ uz: "Email manzilingiz", en: "Your email address",        ru: "Ваш email"          },
  subscribe:  { uz: "Obuna →",     en: "Subscribe →",  ru: "Подписаться →"},
  stats: [
    { n: "48",  uz: "Davlat",     en: "Countries",  ru: "Стран"      },
    { n: "2026",uz: "Yil",        en: "Year",       ru: "Год"        },
    { n: "∞",   uz: "Sharaf",     en: "Honor",      ru: "Честь"      },
    { n: "01",  uz: "Tashkilot",  en: "Organization",ru: "Организация"},
  ],
};

function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return v;
}

/* ── Featured Card ── */
function FeaturedCard({ item, darkMode, language }) {
  const ref = useRef(null);
  const iv  = useInView(ref);
  const [hov, setHov] = useState(false);

  const cardBg    = darkMode ? "bg-[#0d1f3c]" : "bg-white";
  const contentBg = darkMode ? "bg-gradient-to-br from-[#0d1f3c] to-[#0a1628]" : "bg-gradient-to-br from-blue-50 to-white";
  const titleC    = darkMode ? "text-blue-100" : "text-blue-900";
  const textC     = darkMode ? "text-blue-200/70" : "text-slate-500";

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`grid md:grid-cols-2 rounded-3xl overflow-hidden ${cardBg} cursor-pointer transition-colors duration-300`}
      style={{
        boxShadow: hov
          ? darkMode ? "0 32px 80px rgba(30,64,175,0.4)" : "0 32px 80px rgba(30,64,175,0.25)"
          : darkMode ? "0 4px 32px rgba(30,64,175,0.2)"  : "0 4px 32px rgba(30,64,175,0.10)",
        opacity: iv ? 1 : 0,
        transform: iv ? "translateY(0) scale(1)" : "translateY(32px) scale(0.98)",
        transition: "opacity .7s ease, transform .7s ease, box-shadow .4s ease",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ minHeight: 320 }}>
        <img src={item.img} alt={item.title[language]}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: hov ? "scale(1.07)" : "scale(1)", transition: "transform .6s cubic-bezier(.25,1,.5,1)" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
        <span className="absolute top-4 left-4 bg-blue-400 text-white text-[10px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full shadow-lg">
          {item.category[language]}
        </span>
        <span className="absolute bottom-4 left-4 bg-white/15 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
          ⭐ {T.featured[language]}
        </span>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-between p-6 sm:p-8 ${contentBg} transition-colors duration-300`}>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-400 font-bold text-sm">{item[`date_${language}`] || item.date}</span>
            <span className={darkMode ? "text-blue-600" : "text-blue-200"}>•</span>
            <span className={`${darkMode ? "text-blue-400" : "text-blue-300"} text-sm`}>⏱ {item.readTime[language]}</span>
          </div>
          <h2 className={`font-bold ${titleC} leading-tight mb-4 line-clamp-3`}
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(20px,2.6vw,36px)" }}>
            {item.title[language]}
          </h2>
          <p className={`${textC} text-sm leading-relaxed mb-8 line-clamp-3`}>
            {item.excerpt[language]}
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-white font-bold text-sm px-7 py-3 rounded-full w-fit transition-all duration-300"
          style={{ transform: hov ? "translateX(6px)" : "none" }}
        >
          {T.read[language]} <span>→</span>
        </button>
      </div>
    </div>
  );
}

/* ── Small Card ── */
function NewsCard({ item, index, darkMode, language }) {
  const ref = useRef(null);
  const iv  = useInView(ref);
  const [hov, setHov] = useState(false);

  const cardBg = darkMode ? "bg-[#0d1f3c]" : "bg-white";
  const titleC = darkMode ? "text-blue-100" : "text-blue-900";
  const textC  = darkMode ? "text-blue-200/70" : "text-slate-400";

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`${cardBg} rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-colors duration-300`}
      style={{
        boxShadow: hov
          ? darkMode ? "0 16px 48px rgba(30,64,175,0.35)" : "0 16px 48px rgba(30,64,175,0.18)"
          : darkMode ? "0 2px 16px rgba(30,64,175,0.15)"  : "0 2px 16px rgba(30,64,175,0.06)",
        opacity: iv ? 1 : 0,
        transform: iv ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .6s ease ${index * 0.08}s, transform .6s ease ${index * 0.08}s, box-shadow .3s`,
      }}
    >
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <img src={item.img} alt={item.title[language]} className="w-full h-full object-cover"
          style={{ transform: hov ? "scale(1.08)" : "scale(1)", transition: "transform .5s cubic-bezier(.25,1,.5,1)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
        <span className="absolute top-3 left-3 bg-blue-400 text-white text-[9px] font-black tracking-[0.18em] uppercase px-3 py-1 rounded-full">
          {item.category[language]}
        </span>
      </div>

      <div className={`flex flex-col flex-1 p-5 ${cardBg} transition-colors duration-300`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-blue-400 text-xs font-semibold">{item[`date_${language}`] || item.date}</span>
          <span className={darkMode ? "text-blue-600 text-xs" : "text-blue-200 text-xs"}>•</span>
          <span className={`${darkMode ? "text-blue-400" : "text-blue-300"} text-xs`}>⏱ {item.readTime[language]}</span>
        </div>
        <h3 className={`font-bold ${titleC} leading-snug mb-2 flex-1 line-clamp-2 min-h-[44px]`}
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(14px,1.8vw,18px)" }}>
          {item.title[language]}
        </h3>
        <p className={`${textC} text-xs leading-relaxed mb-4 line-clamp-2 min-h-[32px]`}>
          {item.excerpt[language]}
        </p>
        <div className={`flex items-center justify-between pt-3 border-t ${darkMode ? "border-blue-800" : "border-blue-50"}`}>
          <span className="text-blue-400 text-xs font-bold">{T.read[language]}</span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300"
            style={{
              background: hov ? "#60a5fa" : darkMode ? "#1e3a5f" : "#eff6ff",
              color: hov ? "#fff" : "#60a5fa",
              transform: hov ? "rotate(-45deg)" : "none",
            }}>
            ↗
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function NewsPage() {
  const { darkMode, language, newsList } = useApp();
  const headerRef = useRef(null);
  const iv = useInView(headerRef);
  const [cat, setCat] = useState(0); // index of CATS

  const allCats = CATS[language];

  // Kategoriya filter — uz tilidagi category bilan solishtir (barqaror)
  const filtered = cat === 0
    ? newsList
    : newsList.filter((n) => n.category.uz === CATS.uz[cat]);

  const featured = filtered[0];
  const rest     = filtered.slice(1);

  const bg         = darkMode ? "bg-[#0a1628]"  : "bg-blue-400";
  const headerText = darkMode ? "text-blue-300"  : "text-blue-100";
  const statsBg    = darkMode ? "bg-[#0d1f3c]/60" : "bg-blue-500/40";
  const filterActive   = darkMode ? "bg-white text-blue-900 border-white" : "bg-white text-blue-500 border-white";
  const filterInactive = darkMode ? "bg-transparent text-blue-200 border-blue-700 hover:border-blue-400 hover:bg-blue-800/30" : "bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10";

  return (
    <section className={`${bg} min-h-screen transition-colors duration-300`}>
      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        .ticker-track { animation: ticker 45s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

      {/* Ticker */}
      <div className={`${darkMode ? "bg-blue-900 border-blue-800" : "bg-blue-500 border-blue-400"} overflow-hidden py-2.5 border-y`}>
        <div className="ticker-track flex gap-10 whitespace-nowrap">
          {[...TICKER_WORDS,...TICKER_WORDS,...TICKER_WORDS].map((word, i) => (
            <span key={i} className={`text-xs font-extrabold tracking-[0.2em] uppercase select-none ${word === "WBK" ? darkMode ? "text-blue-400" : "text-blue-200" : "text-white"}`}>
              {word === "WBK" ? `✦ ${word} ✦` : word}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Header */}
        <div ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
          style={{ opacity: iv ? 1 : 0, transform: iv ? "none" : "translateY(24px)", transition: "opacity .7s ease, transform .7s ease" }}>
          <div>
            <p className={`${headerText} text-[11px] font-black tracking-[0.25em] uppercase mb-2`}>
              — {T.label[language]}
            </p>
            <h2 className="font-black text-white leading-[0.88]"
              style={{ fontFamily: "Georgia, serif", fontSize: "clamp(42px,9vw,100px)" }}>
              {T.heading1[language]}
              <br />
              <span className={`${darkMode ? "text-blue-400" : "text-blue-900"} italic`}>{T.heading2[language]}</span>
            </h2>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 gap-px ${darkMode ? "bg-blue-800/30" : "bg-blue-300/30"} rounded-2xl overflow-hidden border ${darkMode ? "border-blue-800/20" : "border-blue-300/20"} shrink-0`}>
            {T.stats.map((s) => (
              <div key={s.n} className={`${statsBg} backdrop-blur-sm px-5 py-4 text-center`}>
                <div className="text-white font-black text-2xl" style={{ fontFamily: "Georgia, serif" }}>{s.n}</div>
                <div className={`${headerText} text-[10px] tracking-widest uppercase mt-0.5`}>{s[language]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allCats.map((c, i) => (
            <button key={i} onClick={() => setCat(i)}
              className={`text-xs font-bold tracking-wide px-4 py-2 rounded-full border-2 transition-all duration-200 ${cat === i ? filterActive : filterInactive}`}>
              {c}
            </button>
          ))}
        </div>

        <div className={`h-px ${darkMode ? "bg-gradient-to-r from-blue-700 via-blue-900 to-transparent" : "bg-gradient-to-r from-white/50 via-white/10 to-transparent"} mb-10`} />

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-white/40 text-xl italic" style={{ fontFamily: "Georgia, serif" }}>
            {T.empty[language]}
          </div>
        ) : (
          <>
            {featured && (
              <div className="mb-6">
                <FeaturedCard item={featured} darkMode={darkMode} language={language} />
              </div>
            )}
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((item, i) => (
                  <NewsCard key={item.id} item={item} index={i} darkMode={darkMode} language={language} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Newsletter */}
        <div className={`mt-16 ${darkMode ? "bg-blue-900/40 border-blue-800/30" : "bg-blue-900/40 border-white/10"} backdrop-blur-sm rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border`}>
          <div>
            <p className={`${headerText} text-[10px] font-black tracking-[0.25em] uppercase mb-1`}>{T.subTitle[language]}</p>
            <h3 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "Georgia, serif" }}>{T.newsletter[language]}</h3>
          </div>
          <div className={`flex rounded-full overflow-hidden border ${darkMode ? "border-blue-700" : "border-white/20"} w-full sm:w-auto`}>
            <input type="email" placeholder={T.placeholder[language]}
              className="bg-white/10 text-white placeholder-blue-300 text-sm px-5 py-3 outline-none flex-1 sm:w-56" />
            <button className="bg-white text-blue-500 font-black text-xs tracking-widest uppercase px-5 sm:px-6 py-3 hover:bg-blue-50 transition-colors whitespace-nowrap">
              {T.subscribe[language]}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}