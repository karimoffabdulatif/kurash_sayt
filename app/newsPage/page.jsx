"use client";
import { getReadTime } from '../lib/timeUtils';

import { useState, useRef, useEffect } from "react";
import { useApp } from "../contex/AppContext";
import { HiStar } from "react-icons/hi";
import { FiArrowUpRight, FiEye, FiX } from "react-icons/fi";
import { MdArrowForward, MdKeyboardArrowUp } from "react-icons/md";
import { incrementView } from "../lib/newsService";

const CATS = {
  uz: ["Barchasi", "Musobaqa", "Rekord", "Tashkilot", "Intervyu", "Turnir", "Xalqaro"],
  en: ["All", "Tournament", "Record", "Organization", "Interview", "Tournament", "International"],
  ru: ["Все", "Турнир", "Рекорд", "Организация", "Интервью", "Турнир", "Международный"],
};

const T = {
  heading:     { uz: "Yangiliklar",            en: "News",                  ru: "Новости"            },
  empty:       { uz: "Xozircha yangilik yo'q.", en: "No news for now.",      ru: "Пока новостей нет." },
  featured:    { uz: "Asosiy yangilik",         en: "Featured",              ru: "Главное"            },
  read:        { uz: "Batafsil o'qish",         en: "Read more",             ru: "Читать далее"       },
  close:       { uz: "Yopish",                  en: "Close",                 ru: "Закрыть"            },
  subTitle:    { uz: "Xabardor bo'lib turing",  en: "Stay informed",         ru: "Будьте в курсе"     },
  newsletter:  { uz: "Yangiliklar xabarnomasi", en: "Newsletter",            ru: "Новостная рассылка" },
  placeholder: { uz: "Email manzilingiz",       en: "Your email address",    ru: "Ваш email"          },
  subscribe:   { uz: "Obuna",                   en: "Subscribe",             ru: "Подписаться"        },
  views:       { uz: "ko'rish",                 en: "views",                 ru: "просмотров"         },
};

/* ─── Hooks ─────────────────────────────────────────────────────────────── */

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

function useViewTracker(newsId) {
  const ref     = useRef(null);
  const tracked = useRef(false);
  useEffect(() => {
    if (!newsId || tracked.current) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          incrementView(newsId);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [newsId]);
  return ref;
}

/* ─── ViewBadge ─────────────────────────────────────────────────────────── */

function ViewBadge({ views, darkMode, small = false }) {
  const formatted =
    (views ?? 0) >= 1000
      ? `${((views ?? 0) / 1000).toFixed(1)}k`
      : (views ?? 0);
  return (
    <span className={`flex items-center gap-1 ${small ? "text-[10px]" : "text-[11px]"} ${
      darkMode ? "text-blue-400/60" : "text-slate-400"
    }`}>
      <FiEye className={small ? "w-3 h-3" : "w-3.5 h-3.5"} />
      {formatted}
    </span>
  );
}

/* ─── Accordion Content (kengaygan qism) ────────────────────────────────── */

function AccordionBody({ item, darkMode, language, onClose }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      setTimeout(() => {
        bodyRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 80);
    }
  }, []);

  const dividerC = darkMode ? "border-blue-900/60" : "border-gray-100";
  const textC    = darkMode ? "text-blue-100/80"   : "text-slate-600";

  /* Faqat to'liq matn — excerpt yoki content */
  const fullText = item.content?.[language] || item.excerpt?.[language] || "";

  return (
    <div
      ref={bodyRef}
      className={`overflow-hidden border-t ${dividerC}`}
      style={{ animation: "accordionOpen .35s ease forwards" }}
    >
      <style>{`
        @keyframes accordionOpen {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="px-5 py-5 sm:px-8 sm:py-6">

        {/* Faqat to'liq matn */}
        <div className={`${textC} text-sm sm:text-[15px] leading-relaxed space-y-3`}>
          {fullText
            .split("\n")
            .filter(Boolean)
            .map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))
          }
        </div>

        {/* Yopish tugmasi */}
        <button
          onClick={onClose}
          className={`mt-6 flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all px-4 py-2.5 rounded-xl border ${
            darkMode
              ? "border-blue-800 text-blue-400 hover:bg-blue-900/50 hover:text-white"
              : "border-gray-200 text-slate-500 hover:bg-gray-50 hover:text-[#0f2a5e]"
          }`}
        >
          <MdKeyboardArrowUp className="w-4 h-4" />
          {T.close[language]}
        </button>

      </div>
    </div>
  );
}

/* ─── Loader ─────────────────────────────────────────────────────────────── */

function Loader() {
  return (
    <div style={{ zIndex: 99999 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        <div style={{
          width: "clamp(160px, 35vw, 280px)", height: "clamp(160px, 35vw, 280px)",
          borderRadius: "50%", position: "absolute",
          boxShadow: "0 0 0 3px #60a5fa, 0 0 16px 4px #3b82f6", zIndex: 20,
        }} />
        <div style={{
          width: "clamp(160px, 35vw, 280px)", height: "clamp(160px, 35vw, 280px)",
          backgroundImage: "url('/ramka.png')", backgroundSize: "cover",
          backgroundPosition: "center", borderRadius: "50%", position: "absolute",
          animation: "spin 10s linear infinite", zIndex: 21,
        }} />
        <div style={{
          width: "clamp(110px, 24vw, 210px)", height: "clamp(110px, 24vw, 210px)",
          borderRadius: "50%", overflow: "hidden", position: "relative", zIndex: 22,
        }}>
          <img src="/orta.png" alt="loader"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

/* ─── Featured Card (accordion bilan) ───────────────────────────────────── */

function FeaturedCard({ item, darkMode, language, expanded, onToggle }) {
  const revealRef = useRef(null);
  const iv        = useInView(revealRef);
  const viewRef   = useViewTracker(item.id);
  const [hov, setHov] = useState(false);

  const cardBg   = darkMode ? "bg-[#0d1f3c]" : "bg-white";
  const titleC   = darkMode ? "text-white"    : "text-[#0f2a5e]";
  const textC    = darkMode ? "text-blue-200/70" : "text-slate-500";
  const metaC    = darkMode ? "text-blue-400"    : "text-blue-500";
  const dividerC = darkMode ? "bg-blue-800"      : "bg-gray-100";
  const borderC  = darkMode ? "border-blue-900"  : "border-gray-100";

  const setRefs = (el) => { revealRef.current = el; viewRef.current = el; };

  return (
    <div
      ref={setRefs}
      className={`rounded-2xl overflow-hidden ${cardBg} border ${borderC} transition-all duration-300`}
      style={{
        boxShadow: expanded
          ? darkMode ? "0 24px 70px rgba(30,64,175,0.35)" : "0 24px 70px rgba(15,42,94,0.15)"
          : hov
            ? darkMode ? "0 20px 60px rgba(30,64,175,0.3)" : "0 20px 60px rgba(15,42,94,0.12)"
            : darkMode ? "0 4px 20px rgba(30,64,175,0.15)" : "0 4px 20px rgba(15,42,94,0.06)",
        opacity:   iv ? 1 : 0,
        transform: iv ? "translateY(0)" : "translateY(24px)",
        transition: "opacity .6s ease, transform .6s ease, box-shadow .3s",
      }}
    >
      {/* Karta asosiy qismi */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-64 sm:h-80 lg:h-auto" style={{ minHeight: 380 }}>
          <img src={item.img} alt={item.title[language]}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: item.imgPosition || "center",
              transform: hov && !expanded ? "scale(1.04)" : "scale(1)",
              transition: "transform .6s ease",
            }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a5e]/70 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 bg-[#0f2a5e] text-white text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-sm">
            {item.category?.[language] ?? ""}
          </span>
          <span className="absolute bottom-4 left-4 bg-white/15 backdrop-blur-md border border-white/20 text-white text-[9px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-sm flex items-center gap-1.5">
            <HiStar className="w-3 h-3 text-yellow-300" />
            {T.featured[language]}
          </span>
          <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <FiEye className="w-3 h-3" /> {item.views ?? 0}
          </div>
        </div>

        {/* Content */}
        <div className={`flex flex-col justify-between p-6 sm:p-8 ${cardBg}`}>
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`${metaC} text-xs font-medium`}>{item[`date_${language}`] || item.date}</span>
              <span className={darkMode ? "text-blue-700" : "text-gray-200"}>•</span>
              <span className={`${darkMode ? "text-blue-400/70" : "text-slate-400"} text-xs`}>
                {getReadTime(item.postedAt, language)}
              </span>
              <span className={darkMode ? "text-blue-700" : "text-gray-200"}>•</span>
              <ViewBadge views={item.views} darkMode={darkMode} />
            </div>
            <h2 className={`font-bold ${titleC} leading-snug mb-3 line-clamp-3 text-[20px] sm:text-[26px] lg:text-[30px]`}>
              {item.title[language]}
            </h2>
            <div className={`h-px ${dividerC} mb-4 transition-all duration-500`}
              style={{ width: hov || expanded ? "100%" : "40%" }} />
            <p className={`${textC} text-sm leading-relaxed line-clamp-4`}>
              {item.excerpt[language]}
            </p>
          </div>

          {/* Read more tugmasi */}
          <button
            onClick={onToggle}
            className={`mt-6 flex items-center gap-2 text-sm font-semibold transition-all duration-300 w-fit cursor-pointer ${
              darkMode ? "text-blue-400 hover:text-blue-300" : "text-[#0f2a5e] hover:text-blue-600"
            }`}
          >
            {expanded ? (
              <>
                {T.close[language]}
                <MdKeyboardArrowUp className="w-4 h-4 transition-transform" />
              </>
            ) : (
              <>
                {T.read[language]}
                <MdArrowForward className="w-4 h-4 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Accordion qismi */}
      {expanded && (
        <AccordionBody
          item={item}
          darkMode={darkMode}
          language={language}
          onClose={onToggle}
        />
      )}
    </div>
  );
}

/* ─── Small Card (accordion bilan) ──────────────────────────────────────── */

function NewsCard({ item, index, darkMode, language, expanded, onToggle }) {
  const revealRef = useRef(null);
  const iv        = useInView(revealRef);
  const viewRef   = useViewTracker(item.id);
  const [hov, setHov] = useState(false);

  const cardBg  = darkMode ? "bg-[#0d1f3c]" : "bg-white";
  const titleC  = darkMode ? "text-white"    : "text-[#0f2a5e]";
  const textC   = darkMode ? "text-blue-200/60" : "text-slate-400";
  const metaC   = darkMode ? "text-blue-400"    : "text-blue-500";
  const borderC = darkMode ? "border-blue-900"  : "border-gray-100";

  const setRefs = (el) => { revealRef.current = el; viewRef.current = el; };

  return (
    <div
      ref={setRefs}
      className={`${cardBg} border ${borderC} rounded-2xl overflow-hidden flex flex-col transition-all duration-300`}
      style={{
        boxShadow: expanded
          ? darkMode ? "0 16px 50px rgba(30,64,175,0.3)" : "0 16px 50px rgba(15,42,94,0.13)"
          : hov
            ? darkMode ? "0 12px 40px rgba(30,64,175,0.25)" : "0 12px 40px rgba(15,42,94,0.10)"
            : "none",
        opacity:   iv ? 1 : 0,
        transform: iv ? "translateY(0)" : "translateY(20px)",
        transition: `opacity .5s ease ${index * 0.07}s, transform .5s ease ${index * 0.07}s, box-shadow .3s`,
      }}
    >
      {/* Karta asosiy qismi */}
      <div
        className="flex flex-col"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-52 sm:h-60 flex-shrink-0">
          <img src={item.img} alt={item.title[language]}
            className="w-full h-full object-cover"
            style={{
              objectPosition: item.imgPosition || "center",
              transform: hov && !expanded ? "scale(1.05)" : "scale(1)",
              transition: "transform .5s ease",
            }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a5e]/50 to-transparent" />
          <span className="absolute top-3 left-3 bg-[#0f2a5e] text-white text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-sm">
            {item.category?.[language] ?? ""}
          </span>
          <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
            <FiEye className="w-3 h-3" /> {item.views ?? 0}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            <span className={`${metaC} text-[11px] font-medium`}>{item[`date_${language}`] || item.date}</span>
            <span className={darkMode ? "text-blue-700" : "text-gray-200"}>•</span>
            <span className={`${darkMode ? "text-blue-400/60" : "text-slate-400"} text-[11px]`}>
              {getReadTime(item.postedAt, language)}
            </span>
            <span className={darkMode ? "text-blue-700" : "text-gray-200"}>•</span>
            <ViewBadge views={item.views} darkMode={darkMode} small />
          </div>

          <h3 className={`font-bold ${titleC} leading-snug mb-2 line-clamp-2 min-h-[44px] text-[14px] sm:text-[15px]`}>
            {item.title[language]}
          </h3>

          <p className={`${textC} text-xs leading-relaxed line-clamp-2 min-h-[32px] mb-4`}>
            {item.excerpt[language]}
          </p>

          <div
            onClick={onToggle}
            className={`flex items-center justify-between pt-3 border-t ${borderC} mt-auto cursor-pointer select-none`}
          >
            <span className={`text-xs font-semibold ${darkMode ? "text-blue-400" : "text-[#0f2a5e]"}`}>
              {expanded ? T.close[language] : T.read[language]}
            </span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all duration-300"
              style={{
                background: expanded || hov ? "#0f2a5e" : darkMode ? "#1e3a5f" : "#f0f4ff",
                color:      expanded || hov ? "#fff"    : darkMode ? "#60a5fa" : "#0f2a5e",
                transform:  expanded ? "rotate(90deg)" : hov ? "rotate(-45deg)" : "none",
              }}
            >
              {expanded
                ? <MdKeyboardArrowUp className="w-4 h-4" />
                : <FiArrowUpRight className="w-4 h-4" />
              }
            </div>
          </div>
        </div>
      </div>

      {/* Accordion qismi */}
      {expanded && (
        <AccordionBody
          item={item}
          darkMode={darkMode}
          language={language}
          onClose={onToggle}
        />
      )}
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */

export default function NewsPage() {
  const { darkMode, language, newsList } = useApp();
  const headerRef = useRef(null);
  const iv        = useInView(headerRef);
  const [cat, setCat]         = useState(0);
  const [loading, setLoading] = useState(true);

  /* expandedId — qaysi yangilik ochiq, null = hech biri */
  const [expandedId, setExpandedId] = useState(null);

  const toggle = (id) => setExpandedId(prev => prev === id ? null : id);

  useEffect(() => {
    if (loading) document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 2500);
    return () => { clearTimeout(timer); document.body.style.overflow = ""; };
  }, []);

  const allCats  = CATS[language];
  const filtered = cat === 0
    ? newsList
    : newsList.filter((n) => n.category?.uz === CATS.uz[cat]);

  const featured = filtered[0];
  const rest     = filtered.slice(1);

  const bg             = darkMode ? "bg-[#0a1628]"  : "bg-[#f8f9fc]";
  const headingC       = darkMode ? "text-white"     : "text-[#0f2a5e]";
  const subC           = darkMode ? "text-blue-400"  : "text-blue-500";
  const dividerC       = darkMode ? "bg-blue-900"    : "bg-gray-200";
  const filterActive   = "bg-[#0f2a5e] text-white border-[#0f2a5e]";
  const filterInactive = darkMode
    ? "bg-transparent text-blue-300 border-blue-800 hover:border-blue-500"
    : "bg-transparent text-slate-500 border-gray-200 hover:border-[#0f2a5e] hover:text-[#0f2a5e]";
  const nlBg     = darkMode ? "bg-[#0d1f3c]"   : "bg-white";
  const nlBorder = darkMode ? "border-blue-900" : "border-gray-100";
  const nlInput  = darkMode
    ? "bg-[#0a1628] text-white placeholder-blue-400/50"
    : "bg-white text-slate-700 placeholder-slate-400";

  return (
    <>
      {loading && <Loader />}

      <section className={`${bg} min-h-screen transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-16 lg:py-24">

          {/* ── Header ── */}
          <div ref={headerRef} className="mb-10 sm:mb-12" style={{
            opacity: iv ? 1 : 0, transform: iv ? "none" : "translateY(16px)",
            transition: "opacity .6s ease, transform .6s ease",
          }}>
            <h1 className={`${headingC} font-black text-[32px] sm:text-[44px] lg:text-[56px] leading-tight tracking-tight`}>
              {T.heading[language]}
            </h1>
          </div>

          {/* ── Category filter ── */}
          <div className="flex flex-wrap gap-2 mb-6">
            {allCats.map((c, i) => (
              <button key={i} onClick={() => { setCat(i); setExpandedId(null); }}
                className={`text-[11px] font-semibold tracking-wide px-4 py-1.5 rounded-full border transition-all duration-200 ${
                  cat === i ? filterActive : filterInactive
                }`}>
                {c}
              </button>
            ))}
          </div>

          <div className={`h-px ${dividerC} mb-10`} />

          {/* ── Cards ── */}
          {filtered.length === 0 ? (
            <div className={`text-center py-24 ${darkMode ? "text-blue-400/40" : "text-slate-400"} text-lg`}>
              {T.empty[language]}
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <div className="mb-6">
                  <FeaturedCard
                    item={featured}
                    darkMode={darkMode}
                    language={language}
                    expanded={expandedId === featured.id}
                    onToggle={() => toggle(featured.id)}
                  />
                </div>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((item, i) => (
                    <NewsCard
                      key={item.id}
                      item={item}
                      index={i}
                      darkMode={darkMode}
                      language={language}
                      expanded={expandedId === item.id}
                      onToggle={() => toggle(item.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── Newsletter ── */}
          <div className={`mt-16 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border ${nlBg} ${nlBorder}`}>
            <div className="flex-shrink-0">
              <p className={`${subC} text-[11px] font-semibold tracking-[0.2em] uppercase mb-1`}>
                {T.subTitle[language]}
              </p>
              <h3 className={`${headingC} font-bold text-lg sm:text-xl`}>
                {T.newsletter[language]}
              </h3>
            </div>
            <div className={`flex rounded-lg overflow-hidden border w-full sm:w-auto sm:min-w-[320px] ${
              darkMode ? "border-blue-800" : "border-gray-200"
            }`}>
              <input type="email" placeholder={T.placeholder[language]}
                className={`text-sm px-4 py-3 outline-none flex-1 min-w-0 border-0 ${nlInput}`} />
              <button className="bg-[#0f2a5e] hover:bg-blue-800 active:bg-blue-900 text-white text-[11px] font-bold tracking-wide uppercase transition-colors whitespace-nowrap flex-shrink-0 px-5 py-3">
                {T.subscribe[language]} →
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}