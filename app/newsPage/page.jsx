"use client";

import { useState, useRef, useEffect } from "react";

const NEWS = [
  {
    id: 1,
    category: "Musobaqa",
    date: "12 Mart 2026",
    title: "2026 Dunyo Chempionati saralash bosqichi boshlandi",
    excerpt: "48 davlat, bitta taxt. Osiyo, Yevropa va Amerika qit'alaridan eng kuchli kurashchilar jahon sahnasiga chiqish uchun raqobatlashmoqda.",
    img: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&q=80",
    readTime: "3 daq",
  },
  {
    id: 2,
    category: "Rekord",
    date: "10 Mart 2026",
    title: "Og'ir vaznda yangi jahon rekordi o'rnatildi",
    excerpt: "Qozog'istonlik Arman Dosybekov og'ir vazn kategoriyasida yangi jahon rekordini o'rnatdi.",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    readTime: "2 daq",
  },
  {
    id: 3,
    category: "Tashkilot",
    date: "8 Mart 2026",
    title: "UWF boshqaruv kengashi yangi qoidalarni tasdiqladi",
    excerpt: "Federatsiya boshqaruv kengashining yig'ilishida sport qoidalariga muhim o'zgartirishlar kiritildi.",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
    readTime: "4 daq",
  },
  {
    id: 4,
    category: "Intervyu",
    date: "5 Mart 2026",
    title: "\"Belbogli kurash — bu faqat kuch emas, aql ham kerak\"",
    excerpt: "Jahon chempioni Sardor Rahimov tayyorgarlik jarayoni va sport falsafasi haqida so'zladi.",
    img: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=600&q=80",
    readTime: "6 daq",
  },
  {
    id: 5,
    category: "Turnir",
    date: "3 Mart 2026",
    title: "Toshkent Grand Prix — aprel oyida bo'lib o'tadi",
    excerpt: "32 davlatdan kurashchilar poytaxtga keladi. Musobaqa Toshkent sport majmuasida o'tkaziladi.",
    img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80",
    readTime: "3 daq",
  },
  {
    id: 6,
    category: "Xalqaro",
    date: "1 Mart 2026",
    title: "O'zbekiston terma jamoasi Yevropa safarini yakunladi",
    excerpt: "Terma jamoamiz Yevropa bosqichida 3 ta oltin, 2 ta kumush medal qo'lga kiritdi.",
    img: "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=600&q=80",
    readTime: "5 daq",
  },
];

const CATS = ["Barchasi", "Musobaqa", "Rekord", "Tashkilot", "Intervyu", "Turnir", "Xalqaro"];

const TICKER_WORDS = [
  "NEWS", "WBK", "DUNYO BELBOGLI KURASH", "WBK", "WORLD CHAMPIONSHIP 2026",
  "WBK", "TOSHKENT GRAND PRIX", "WBK", "KURASH YANGILIKLARI", "WBK",
  "SPORT XABARLARI", "WBK", "UWF RASMIY SAYTI", "WBK",
];

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

/* ────────────────── TICKER ────────────────── */
function Ticker() {
  const all = [...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS];
  return (
    <>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .ticker-track { animation: ticker 45s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="bg-blue-600 overflow-hidden py-2.5 border-y border-blue-500">
        <div className="ticker-track flex gap-10 whitespace-nowrap">
          {all.map((word, i) => (
            <span
              key={i}
              className={`text-xs font-extrabold tracking-[0.2em] uppercase select-none ${
                word === "WBK" ? "text-blue-200" : "text-white"
              }`}
            >
              {word === "WBK" ? `✦ ${word} ✦` : word}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

/* ────────────────── FEATURED CARD ────────────────── */
function FeaturedCard({ item }) {
  const ref = useRef(null);
  const iv = useInView(ref);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="grid md:grid-cols-2 rounded-3xl overflow-hidden bg-white cursor-pointer"
      style={{
        boxShadow: hov
          ? "0 32px 80px rgba(30,64,175,0.25)"
          : "0 4px 32px rgba(30,64,175,0.10)",
        opacity: iv ? 1 : 0,
        transform: iv
          ? "translateY(0) scale(1)"
          : "translateY(32px) scale(0.98)",
        transition:
          "opacity .7s ease, transform .7s ease, box-shadow .4s ease",
      }}
    >
      {/* ── Image panel ── */}
      <div className="relative overflow-hidden" style={{ minHeight: 380 }}>
        <img
          src={item.img}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: hov ? "scale(1.07)" : "scale(1)",
            transition: "transform .6s cubic-bezier(.25,1,.5,1)",
          }}
        />
        {/* tints */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />

        {/* badges */}
        <span className="absolute top-4 left-4 bg-blue-400 text-white text-[10px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full shadow-lg">
          {item.category}
        </span>
        <span className="absolute bottom-4 left-4 bg-white/15 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
          ⭐ Asosiy yangilik
        </span>
      </div>

      {/* ── Content panel ── */}
      <div className="flex flex-col justify-between p-8 bg-gradient-to-br from-blue-50 to-white">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-400 font-bold text-sm">{item.date}</span>
            <span className="text-blue-200">•</span>
            <span className="text-blue-300 text-sm">⏱ {item.readTime}</span>
          </div>

          <h2
            className="font-bold text-blue-900 leading-tight mb-4"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(22px,2.6vw,36px)",
            }}
          >
            {item.title}
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            {item.excerpt}
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-white font-bold text-sm px-7 py-3 rounded-full w-fit transition-all duration-300"
          style={{ transform: hov ? "translateX(6px)" : "none" }}
        >
          Batafsil o'qish <span>→</span>
        </button>
      </div>
    </div>
  );
}

/* ────────────────── SMALL CARD ────────────────── */
function NewsCard({ item, index }) {
  const ref = useRef(null);
  const iv = useInView(ref);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer"
      style={{
        boxShadow: hov
          ? "0 16px 48px rgba(30,64,175,0.18)"
          : "0 2px 16px rgba(30,64,175,0.06)",
        opacity: iv ? 1 : 0,
        transform: iv ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .6s ease ${index * 0.08}s, transform .6s ease ${index * 0.08}s, box-shadow .3s`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover"
          style={{
            transform: hov ? "scale(1.08)" : "scale(1)",
            transition: "transform .5s cubic-bezier(.25,1,.5,1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
        <span className="absolute top-3 left-3 bg-blue-400 text-white text-[9px] font-black tracking-[0.18em] uppercase px-3 py-1 rounded-full">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-blue-400 text-xs font-semibold">{item.date}</span>
          <span className="text-blue-200 text-xs">•</span>
          <span className="text-blue-300 text-xs">⏱ {item.readTime}</span>
        </div>

        <h3
          className="font-bold text-blue-900 leading-snug mb-2 flex-1"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(15px,1.8vw,18px)",
          }}
        >
          {item.title}
        </h3>

        <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
          {item.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-blue-50">
          <span className="text-blue-400 text-xs font-bold">O'qish</span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300"
            style={{
              background: hov ? "#60a5fa" : "#eff6ff",
              color: hov ? "#fff" : "#60a5fa",
              transform: hov ? "rotate(-45deg)" : "none",
            }}
          >
            ↗
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────── PAGE SECTION ────────────────── */
export default function NewsSection() {
  const headerRef = useRef(null);
  const iv = useInView(headerRef);
  const [cat, setCat] = useState("Barchasi");

  const filtered =
    cat === "Barchasi" ? NEWS : NEWS.filter((n) => n.category === cat);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section className="bg-blue-400 min-h-screen">

      {/* Ticker */}
      <Ticker />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
          style={{
            opacity: iv ? 1 : 0,
            transform: iv ? "none" : "translateY(24px)",
            transition: "opacity .7s ease, transform .7s ease",
          }}
        >
          <div>
            <p className="text-blue-100 text-[11px] font-black tracking-[0.25em] uppercase mb-2">
              — WBK & BOKA Rasmiy Yangiliklari
            </p>
            <h2
              className="font-black text-white leading-[0.88]"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(52px,9vw,100px)",
              }}
            >
              So'nggi
              <br />
              <span className="text-blue-900 italic">Yangiliklar</span>
            </h2>
          </div>

          {/* Stats block */}
          <div className="grid grid-cols-2 gap-px bg-blue-300/30 rounded-2xl overflow-hidden border border-blue-300/20 shrink-0">
            {[
              ["48", "Davlat"],
              ["2026", "Yil"],
              ["∞", "Sharaf"],
              ["01", "Tashkilot"],
            ].map(([n, l]) => (
              <div
                key={l}
                className="bg-blue-500/40 backdrop-blur-sm px-6 py-4 text-center"
              >
                <div
                  className="text-white font-black text-2xl"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {n}
                </div>
                <div className="text-blue-200 text-[10px] tracking-widest uppercase mt-0.5">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Category filter ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`text-xs font-bold tracking-wide px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                cat === c
                  ? "bg-white text-blue-500 border-white shadow-md"
                  : "bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-white/50 via-white/10 to-transparent mb-10" />

        {/* ── Cards ── */}
        {filtered.length === 0 ? (
          <div
            className="text-center py-24 text-white/40 text-xl italic"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Bu kategoriyada yangilik mavjud emas.
          </div>
        ) : (
          <>
            {featured && (
              <div className="mb-6">
                <FeaturedCard item={featured} />
              </div>
            )}

            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((item, i) => (
                  <NewsCard key={item.id} item={item} index={i} />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Newsletter ── */}
        <div className="mt-16 bg-blue-900/40 backdrop-blur-sm rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10">
          <div>
            <p className="text-blue-300 text-[10px] font-black tracking-[0.25em] uppercase mb-1">
              Xabardor bo'lib turing
            </p>
            <h3
              className="text-white font-bold text-2xl"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Yangiliklar xabarnomasi
            </h3>
          </div>

          <div className="flex rounded-full overflow-hidden border border-white/20 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Email manzilingiz"
              className="bg-white/10 text-white placeholder-blue-300 text-sm px-5 py-3 outline-none flex-1 sm:w-56"
            />
            <button className="bg-white text-blue-500 font-black text-xs tracking-widest uppercase px-6 py-3 hover:bg-blue-50 transition-colors whitespace-nowrap">
              Obuna →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}