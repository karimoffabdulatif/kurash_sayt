"use client";
import { getReadTime } from '../lib/timeUtils';

import { useState, useRef, useEffect } from "react";
import { useApp } from "../contex/AppContext";
import { HiStar } from "react-icons/hi";
import { FiArrowUpRight, FiEye } from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";
import { incrementView } from "../lib/newsService";

const CATS = {
  uz: ["Barchasi", "Musobaqa", "Rekord", "Tashkilot", "Intervyu", "Turnir", "Xalqaro"],
  en: ["All", "Tournament", "Record", "Organization", "Interview", "Tournament", "International"],
  ru: ["Все", "Турнир", "Рекорд", "Организация", "Интервью", "Турнир", "Международный"],
};

const T = {
  label:       { uz: "Rasmiy Yangiliklar",            en: "Official News",             ru: "Официальные новости"      },
  heading:     { uz: "Yangiliklar",                    en: "News",                      ru: "Новости"                  },
  empty:       { uz: "Bu kategoriyada yangilik yo'q.", en: "No news in this category.", ru: "Нет новостей в этой категории." },
  featured:    { uz: "Asosiy yangilik",                en: "Featured",                  ru: "Главное"                  },
  read:        { uz: "Batafsil o'qish",                en: "Read more",                 ru: "Читать далее"             },
  subTitle:    { uz: "Xabardor bo'lib turing",         en: "Stay informed",             ru: "Будьте в курсе"           },
  newsletter:  { uz: "Yangiliklar xabarnomasi",        en: "Newsletter",                ru: "Новостная рассылка"       },
  placeholder: { uz: "Email manzilingiz",              en: "Your email address",        ru: "Ваш email"                },
  subscribe:   { uz: "Obuna →",                        en: "Subscribe →",               ru: "Подписаться →"            },
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

function ViewBadge({ views, darkMode, small = false }) {
  const formatted = (views ?? 0) >= 1000 ? `${((views ?? 0) / 1000).toFixed(1)}k` : (views ?? 0);
  return (
    <span className={`flex items-center gap-1 ${small ? "text-[10px]" : "text-[11px]"} ${darkMode ? "text-blue-400/60" : "text-slate-400"}`}>
      <FiEye className={small ? "w-3 h-3" : "w-3.5 h-3.5"} />
      {formatted}
    </span>
  );
}

/* ── Featured Card ── */
function FeaturedCard({ item, darkMode, language }) {
  const revealRef = useRef(null);
  const iv        = useInView(revealRef);
  const viewRef   = useViewTracker(item.id);
  const [hov, setHov] = useState(false);

  const cardBg   = darkMode ? "bg-[#0d1f3c]"    : "bg-white";
  const titleC   = darkMode ? "text-white"       : "text-[#0f2a5e]";
  const textC    = darkMode ? "text-blue-200/70" : "text-slate-500";
  const metaC    = darkMode ? "text-blue-400"    : "text-blue-500";
  const dividerC = darkMode ? "bg-blue-800"      : "bg-gray-100";
  const borderC  = darkMode ? "border-blue-900"  : "border-gray-100";

  const setRefs = (el) => {
    revealRef.current = el;
    viewRef.current   = el;
  };

  return (
    <div
      ref={setRefs}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden ${cardBg} border ${borderC} cursor-pointer transition-all duration-300`}
      style={{
        boxShadow: hov
          ? darkMode ? "0 20px 60px rgba(30,64,175,0.3)" : "0 20px 60px rgba(15,42,94,0.12)"
          : darkMode ? "0 4px 20px rgba(30,64,175,0.15)" : "0 4px 20px rgba(15,42,94,0.06)",
        opacity: iv ? 1 : 0,
        transform: iv ? "translateY(0)" : "translateY(24px)",
        transition: "opacity .6s ease, transform .6s ease, box-shadow .3s",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-64 sm:h-80 lg:h-auto" style={{ minHeight: 440 }}>
        <img src={item.img} alt={item.title[language]}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: item.imgPosition || "center",
            transform: hov ? "scale(1.04)" : "scale(1)",
            transition: "transform .6s ease",
          }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a5e]/70 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 bg-[#0f2a5e] text-white text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-sm">
          {item.category[language]}
        </span>
        <span className="absolute bottom-4 left-4 bg-white/15 backdrop-blur-md border border-white/20 text-white text-[9px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-sm flex items-center gap-1.5">
          <HiStar className="w-3 h-3 text-yellow-300" />
          {T.featured[language]}
        </span>
        <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <FiEye className="w-3 h-3" />
          {item.views ?? 0}
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-between p-6 sm:p-8 ${cardBg}`}>
        <div>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`${metaC} text-xs font-medium`}>{item[`date_${language}`] || item.date}</span>
            <span className={darkMode ? "text-blue-700" : "text-gray-200"}>•</span>
            <span className={`${darkMode ? "text-blue-400/70" : "text-slate-400"} text-xs`}>{getReadTime(item.postedAt, language)}</span>
            <span className={darkMode ? "text-blue-700" : "text-gray-200"}>•</span>
            <ViewBadge views={item.views} darkMode={darkMode} />
          </div>
          <h2 className={`font-bold ${titleC} leading-snug mb-3 line-clamp-3 text-[20px] sm:text-[26px] lg:text-[32px]`}>
            {item.title[language]}
          </h2>
          <div className={`h-px ${dividerC} mb-4 transition-all duration-500`}
            style={{ width: hov ? "100%" : "40%" }} />
          <p className={`${textC} text-sm leading-relaxed line-clamp-4`}>
            {item.excerpt[language]}
          </p>
        </div>
        <button
          className={`mt-6 flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
            darkMode ? "text-blue-400 hover:text-blue-300" : "text-[#0f2a5e] hover:text-blue-600"
          }`}
          style={{ transform: hov ? "translateX(5px)" : "none" }}
        >
          {T.read[language]} <MdArrowForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ── Small Card ── */
function NewsCard({ item, index, darkMode, language }) {
  const revealRef = useRef(null);
  const iv        = useInView(revealRef);
  const viewRef   = useViewTracker(item.id);
  const [hov, setHov] = useState(false);

  const cardBg  = darkMode ? "bg-[#0d1f3c]"    : "bg-white";
  const titleC  = darkMode ? "text-white"       : "text-[#0f2a5e]";
  const textC   = darkMode ? "text-blue-200/60" : "text-slate-400";
  const metaC   = darkMode ? "text-blue-400"    : "text-blue-500";
  const borderC = darkMode ? "border-blue-900"  : "border-gray-100";
  const dividerC = darkMode ? "bg-blue-900"     : "bg-gray-100";

  const setRefs = (el) => {
    revealRef.current = el;
    viewRef.current   = el;
  };

  return (
    <div
      ref={setRefs}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`${cardBg} border ${borderC} rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300`}
      style={{
        boxShadow: hov
          ? darkMode ? "0 12px 40px rgba(30,64,175,0.25)" : "0 12px 40px rgba(15,42,94,0.10)"
          : "none",
        opacity: iv ? 1 : 0,
        transform: iv ? "translateY(0)" : "translateY(20px)",
        transition: `opacity .5s ease ${index * 0.07}s, transform .5s ease ${index * 0.07}s, box-shadow .3s`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52 sm:h-60">
        <img src={item.img} alt={item.title[language]}
          className="w-full h-full object-cover"
          style={{
            objectPosition: item.imgPosition || "center",
            transform: hov ? "scale(1.05)" : "scale(1)",
            transition: "transform .5s ease",
          }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a5e]/50 to-transparent" />
        <span className="absolute top-3 left-3 bg-[#0f2a5e] text-white text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-sm">
          {item.category[language]}
        </span>
        <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
          <FiEye className="w-3 h-3" />
          {item.views ?? 0}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
          <span className={`${metaC} text-[11px] font-medium`}>{item[`date_${language}`] || item.date}</span>
          <span className={darkMode ? "text-blue-700" : "text-gray-200"}>•</span>
          <span className={`${darkMode ? "text-blue-400/60" : "text-slate-400"} text-[11px]`}>{getReadTime(item.postedAt, language)}</span>
          <span className={darkMode ? "text-blue-700" : "text-gray-200"}>•</span>
          <ViewBadge views={item.views} darkMode={darkMode} small />
        </div>

        <h3 className={`font-bold ${titleC} leading-snug mb-2 line-clamp-2 min-h-[44px] text-[14px] sm:text-[15px]`}>
          {item.title[language]}
        </h3>

        <p className={`${textC} text-xs leading-relaxed line-clamp-2 min-h-[32px] mb-4`}>
          {item.excerpt[language]}
        </p>

        <div className={`flex items-center justify-between pt-3 border-t ${borderC} mt-auto`}>
          <span className={`text-xs font-semibold ${darkMode ? "text-blue-400" : "text-[#0f2a5e]"}`}>
            {T.read[language]}
          </span>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all duration-300"
            style={{
              background: hov ? "#0f2a5e" : darkMode ? "#1e3a5f" : "#f0f4ff",
              color: hov ? "#fff" : darkMode ? "#60a5fa" : "#0f2a5e",
              transform: hov ? "rotate(-45deg)" : "none",
            }}
          >
            <FiArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function NewsPage() {
  const { darkMode, language, newsList } = useApp();
  const headerRef = useRef(null);
  const iv = useInView(headerRef);
  const [cat, setCat] = useState(0);

  const allCats  = CATS[language];
  const filtered = cat === 0
    ? newsList
    : newsList.filter((n) => n.category.uz === CATS.uz[cat]);

  const featured = filtered[0];
  const rest     = filtered.slice(1);

  const bg           = darkMode ? "bg-[#0a1628]"  : "bg-[#f8f9fc]";
  const headingC     = darkMode ? "text-white"     : "text-[#0f2a5e]";
  const subC         = darkMode ? "text-blue-400"  : "text-blue-500";
  const dividerC     = darkMode ? "bg-blue-900"    : "bg-gray-200";
  const filterActive   = "bg-[#0f2a5e] text-white border-[#0f2a5e]";
  const filterInactive = darkMode
    ? "bg-transparent text-blue-300 border-blue-800 hover:border-blue-500"
    : "bg-transparent text-slate-500 border-gray-200 hover:border-[#0f2a5e] hover:text-[#0f2a5e]";

  return (
    <section className={`${bg} min-h-screen transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-10 sm:mb-12"
          style={{
            opacity: iv ? 1 : 0,
            transform: iv ? "none" : "translateY(16px)",
            transition: "opacity .6s ease, transform .6s ease",
          }}
        >
          <p className={`${subC} text-[11px] font-semibold tracking-[0.25em] uppercase mb-3 flex items-center gap-2`}>
            <span className="w-6 h-px bg-current" />
            {T.label[language]}
          </p>
          <h1 className={`${headingC} font-black text-[32px] sm:text-[44px] lg:text-[56px] leading-tight tracking-tight`}>
            {T.heading[language]}
          </h1>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {allCats.map((c, i) => (
            <button
              key={i}
              onClick={() => setCat(i)}
              className={`text-[11px] font-semibold tracking-wide px-4 py-1.5 rounded-full border transition-all duration-200 ${
                cat === i ? filterActive : filterInactive
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className={`h-px ${dividerC} mb-10`} />

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className={`text-center py-24 ${darkMode ? "text-blue-400/40" : "text-slate-400"} text-lg`}>
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
        <div className={`mt-16 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border ${
          darkMode ? "bg-[#0d1f3c] border-blue-900" : "bg-white border-gray-100"
        }`}>
          <div>
            <p className={`${subC} text-[11px] font-semibold tracking-[0.2em] uppercase mb-1`}>
              {T.subTitle[language]}
            </p>
            <h3 className={`${headingC} font-bold text-lg sm:text-xl`}>
              {T.newsletter[language]}
            </h3>
          </div>
          <div className={`flex rounded-lg overflow-hidden border w-full sm:w-auto ${
            darkMode ? "border-blue-800" : "border-gray-200"
          }`}>
            <input
              type="email"
              placeholder={T.placeholder[language]}
              className={`text-sm px-4 py-2.5 outline-none flex-1 sm:w-52 ${
                darkMode ? "bg-[#0a1628] text-white placeholder-blue-400/50" : "bg-white text-slate-700 placeholder-slate-400"
              }`}
            />
            <button className="bg-[#0f2a5e] hover:bg-blue-800 text-white text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 transition-colors whitespace-nowrap">
              {T.subscribe[language]}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}