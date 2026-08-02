"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { addNewsToDb, deleteNewsFromDb } from "../lib/newsService";
import { uploadVideoToStorage } from "../lib/videoService";
import { useApp } from "../contex/AppContext";
import { getAllPushTokens, sendPushToAll } from "../lib/pushService";
import {
  MdLockOutline, MdVisibility, MdVisibilityOff, MdErrorOutline,
  MdCheckCircle, MdAddCircleOutline, MdList, MdDelete, MdImage,
  MdHourglassEmpty, MdLogout, MdZoomIn, MdZoomOut, MdNotifications,
  MdTranslate, MdVideoLibrary,
} from "react-icons/md";
import { FiCalendar } from "react-icons/fi";

const ADMIN_LOGIN    = process.env.NEXT_PUBLIC_ADMIN_LOGIN    || "Arabbayev";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "10001";
const IMGBB_API_KEY  = "67a7613cbf54d18cb585ee96b0a8240b";

const CATEGORIES = ["Musobaqa","Rekord","Tashkilot","Intervyu","Turnir","Xalqaro"];
const CAT_MAP = {
  "Musobaqa":  { en:"Tournament",    ru:"Турнир"        },
  "Rekord":    { en:"Record",        ru:"Рекорд"        },
  "Tashkilot": { en:"Organization",  ru:"Организация"   },
  "Intervyu":  { en:"Interview",     ru:"Интервью"      },
  "Turnir":    { en:"Tournament",    ru:"Турнир"        },
  "Xalqaro":   { en:"International", ru:"Международный" },
};

const MONTHS = {
  uz: ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"],
  ru: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
};
const WEEKDAYS = {
  uz: ["Du","Se","Ch","Pa","Ju","Sh","Ya"],
  ru: ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],
  en: ["Mo","Tu","We","Th","Fr","Sa","Su"],
};

const EMPTY = {
  title_uz:"", title_en:"", title_ru:"",
  excerpt_uz:"", excerpt_en:"", excerpt_ru:"",
  category_uz:"Musobaqa", category_en:"Tournament", category_ru:"Турнир",
  media: [], // [{ type:"image"|"video", url, w, h, position, scale }]
  date_uz:"", date_en:"", date_ru:"",
};

const MAX_MEDIA = 6; // jami rasm+video soni chegarasi

const LANGS = [
  { key:"uz", label:"UZ" },
  { key:"ru", label:"RU" },
  { key:"en", label:"EN" },
];

const INP  = "w-full bg-[#070f1e] border border-[#1a3050] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#2d5078] outline-none focus:border-blue-500 transition-colors";
const LBL  = "block text-[#5b8ab0] text-[10px] font-bold tracking-[0.18em] uppercase mb-2";
const BADGE = {
  uz: "text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30 w-7 text-center flex-shrink-0",
  ru: "text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 w-7 text-center flex-shrink-0",
  en: "text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 w-7 text-center flex-shrink-0",
};

/* ─── Auto Translate via MyMemory API (free, no key needed) ─────────────── */

async function translateText(text, langPair) {
  if (!text || !text.trim()) return "";
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.responseData?.translatedText || text;
}

async function autoTranslate(uzTitle, uzExcerpt) {
  const [titleRu, titleEn, excerptRu, excerptEn] = await Promise.all([
    translateText(uzTitle,   "uz|ru"),
    translateText(uzTitle,   "uz|en"),
    translateText(uzExcerpt, "uz|ru"),
    translateText(uzExcerpt, "uz|en"),
  ]);
  return {
    title:   { ru: titleRu,   en: titleEn   },
    excerpt: { ru: excerptRu, en: excerptEn },
  };
}

/* ─── LoginPage ─────────────────────────────────────────────────────────── */

function LoginPage({ onLogin }) {
  const [login, setLogin]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleLogin = () => {
    if (!login || !password) { setError("Login va parolni kiriting!"); return; }
    setLoading(true);
    setTimeout(() => {
      if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) onLogin();
      else { setError("Login yoki parol noto'g'ri!"); setLoading(false); }
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#04090f] flex items-center justify-center px-4">
      <div className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{ backgroundImage:"linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
      <div className="w-full max-w-[360px] relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl border border-blue-500/25 bg-blue-500/10 mb-5">
            <MdLockOutline className="text-blue-400 text-2xl" />
          </div>
          <h1 className="text-white font-black text-2xl tracking-tight mb-1">Admin Panel</h1>
          <p className="text-[#2d5078] text-xs tracking-widest font-bold uppercase">WBK & BOKA</p>
        </div>
        <div className="bg-[#080f1a] rounded-2xl border border-[#0e2038] p-6 space-y-4">
          <div>
            <label className={LBL}>Login</label>
            <input type="text" value={login} onChange={e => { setLogin(e.target.value); setError(""); }}
              onKeyDown={e => e.key==="Enter" && handleLogin()} placeholder="admin" className={INP} />
          </div>
          <div>
            <label className={LBL}>Parol</label>
            <div className="relative">
              <input type={showPass?"text":"password"} value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                onKeyDown={e => e.key==="Enter" && handleLogin()}
                placeholder="••••••••" className={INP+" pr-11"} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2d5078] hover:text-blue-400 transition-colors">
                {showPass ? <MdVisibilityOff size={18}/> : <MdVisibility size={18}/>}
              </button>
            </div>
          </div>
          {error && (
            <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-2.5 flex items-center gap-2 text-red-400 text-xs font-bold">
              <MdErrorOutline size={15}/>{error}
            </div>
          )}
          <button onClick={handleLogin} disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-[#0e2038] disabled:text-[#2d5078] text-white font-black rounded-xl text-xs tracking-[0.2em] uppercase transition-all mt-2">
            {loading ? "Tekshirilmoqda..." : "Kirish →"}
          </button>
        </div>
      </div>
    </main>
  );
}

/* ─── DatePicker ─────────────────────────────────────────────────────────── */

function DatePicker({ value, onChange, lang="uz" }) {
  const today = new Date();
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [open, setOpen]           = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("touchstart", close); };
  }, [open]);

  const months   = MONTHS[lang]   || MONTHS.uz;
  const weekdays = WEEKDAYS[lang] || WEEKDAYS.uz;
  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const startDay    = firstDay===0 ? 6 : firstDay-1;

  const selectDay = (day) => { onChange(`${day} ${months[viewMonth]} ${viewYear}`); setOpen(false); };
  const prevMonth = () => viewMonth===0 ? (setViewMonth(11), setViewYear(y=>y-1)) : setViewMonth(m=>m-1);
  const nextMonth = () => viewMonth===11 ? (setViewMonth(0), setViewYear(y=>y+1)) : setViewMonth(m=>m+1);

  const parts       = value ? value.split(" ") : [];
  const selDay      = parts[0] ? parseInt(parts[0]) : null;
  const selMonthIdx = parts[1] ? months.indexOf(parts[1]) : null;
  const selYear     = parts[2] ? parseInt(parts[2]) : null;
  const placeholder = lang==="ru"?"Дата...":lang==="en"?"Date...":"Sana...";
  const todayLbl    = lang==="ru"?"Сегодня":lang==="en"?"Today":"Bugun";

  return (
    <div className="relative" ref={wrapRef}>
      <button type="button" onClick={() => setOpen(v=>!v)} className={INP+" flex items-center justify-between"}>
        <span className={value?"text-white":"text-[#2d5078]"}>{value||placeholder}</span>
        <FiCalendar className="text-[#2d5078] w-4 h-4 flex-shrink-0" />
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-2 left-0 bg-[#080f1a] border border-[#0e2038] rounded-2xl p-4 shadow-2xl w-64">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="w-7 h-7 rounded-full hover:bg-[#0e2038] flex items-center justify-center text-[#5b8ab0] text-lg transition-colors">‹</button>
            <span className="text-white font-bold text-xs">{months[viewMonth]} {viewYear}</span>
            <button onClick={nextMonth} className="w-7 h-7 rounded-full hover:bg-[#0e2038] flex items-center justify-center text-[#5b8ab0] text-lg transition-colors">›</button>
          </div>
          <div className="grid grid-cols-7 mb-1">
            {weekdays.map(d => <div key={d} className="text-center text-[#2d5078] text-[9px] font-bold py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {Array(startDay).fill(null).map((_,i) => <div key={`e${i}`}/>)}
            {Array(daysInMonth).fill(null).map((_,i) => {
              const day=i+1;
              const isSel=day===selDay&&viewMonth===selMonthIdx&&viewYear===selYear;
              const isTod=day===today.getDate()&&viewMonth===today.getMonth()&&viewYear===today.getFullYear();
              return (
                <button key={day} onClick={() => selectDay(day)}
                  className={`w-full aspect-square rounded-lg text-[11px] font-medium transition-all ${isSel?"bg-blue-600 text-white font-black":isTod?"bg-[#0e2038] text-blue-400 font-bold":"text-[#5b8ab0] hover:bg-[#0e2038] hover:text-white"}`}>
                  {day}
                </button>
              );
            })}
          </div>
          <button onClick={() => { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); selectDay(today.getDate()); }}
            className="mt-3 w-full py-1.5 text-[10px] font-bold text-[#5b8ab0] hover:text-white border border-[#0e2038] hover:border-[#1a3050] rounded-lg transition-colors">
            {todayLbl}
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── ImagePositioner ────────────────────────────────────────────────────── */

function ImagePositioner({ src, position, scale, onPositionChange, onScaleChange }) {
  const containerRef = useRef(null);
  const isDragging   = useRef(false);
  const startTouch   = useRef({ x:0, y:0 });
  const startObjPos  = useRef({ x:50, y:50 });

  const parsePos = (pos) => { const [x,y]=pos.replace(/%/g,"").split(" ").map(Number); return { x:isNaN(x)?50:x, y:isNaN(y)?50:y }; };
  const clamp    = (v,mn,mx) => Math.min(mx, Math.max(mn,v));

  const onMouseDown = (e) => { e.preventDefault(); isDragging.current=true; startTouch.current={x:e.clientX,y:e.clientY}; startObjPos.current=parsePos(position); };
  const onMouseMove = (e) => {
    if (!isDragging.current||!containerRef.current) return;
    const rect=containerRef.current.getBoundingClientRect();
    const dx=((e.clientX-startTouch.current.x)/rect.width)*100;
    const dy=((e.clientY-startTouch.current.y)/rect.height)*100;
    onPositionChange(`${Math.round(clamp(startObjPos.current.x-dx,0,100))}% ${Math.round(clamp(startObjPos.current.y-dy,0,100))}%`);
  };
  const onMouseUp = () => { isDragging.current=false; };

  const onTouchStart = (e) => {
    isDragging.current=true; startTouch.current={x:e.touches[0].clientX,y:e.touches[0].clientY}; startObjPos.current=parsePos(position);
    document.body.style.overflow="hidden"; document.body.style.touchAction="none";
  };
  const onTouchMove = useCallback((e) => {
    if (!isDragging.current||!containerRef.current) return;
    e.preventDefault();
    const rect=containerRef.current.getBoundingClientRect();
    const dx=((e.touches[0].clientX-startTouch.current.x)/rect.width)*100;
    const dy=((e.touches[0].clientY-startTouch.current.y)/rect.height)*100;
    onPositionChange(`${Math.round(clamp(startObjPos.current.x-dx,0,100))}% ${Math.round(clamp(startObjPos.current.y-dy,0,100))}%`);
  }, [position, onPositionChange]);
  const onTouchEnd = () => { isDragging.current=false; document.body.style.overflow=""; document.body.style.touchAction=""; };

  useEffect(() => {
    const el=containerRef.current; if (!el) return;
    el.addEventListener("touchmove", onTouchMove, { passive:false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, [onTouchMove]);
  useEffect(() => () => { document.body.style.overflow=""; document.body.style.touchAction=""; }, []);

  const cur=scale??1; const STEP=0.1; const MIN=0.5; const MAX=3;
  const zoomPct=Math.round(((cur-MIN)/(MAX-MIN))*100);

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <label className={LBL+" mb-0"}>Rasm sozlamalari</label>
        <span className="text-[#2d5078] text-[10px]">{position} · {Math.round(cur*100)}%</span>
      </div>
      <div ref={containerRef} className="relative h-44 rounded-xl overflow-hidden border border-[#1a3050] select-none touch-none"
        style={{ cursor:isDragging.current?"grabbing":"grab" }}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <img src={src} alt="pos" draggable={false} className="w-full h-full pointer-events-none"
          style={{ objectFit:"cover", objectPosition:position, transform:`scale(${cur})`, transformOrigin:position, transition:isDragging.current?"none":"transform 0.15s ease" }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-5 h-5 rounded-full border-2 border-white/60 bg-black/25 backdrop-blur-sm" />
        </div>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
          <span className="bg-black/50 backdrop-blur-sm text-white/60 text-[10px] px-3 py-1 rounded-full">Pozitsiyani sozlash uchun suring</span>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-2.5 px-0.5">
        <span className="text-[#2d5078] text-[10px] font-bold tracking-widest uppercase flex-shrink-0">Zoom</span>
        <button type="button" onClick={() => onScaleChange(parseFloat(Math.max(MIN,cur-STEP).toFixed(2)))} disabled={cur<=MIN}
          className="w-7 h-7 rounded-lg bg-[#0e2038] hover:bg-[#1a3050] disabled:opacity-30 text-[#5b8ab0] hover:text-white flex items-center justify-center transition-all flex-shrink-0">
          <MdZoomOut size={16}/>
        </button>
        <div className="flex-1 relative h-7 flex items-center">
          <div className="absolute inset-x-0 h-1 rounded-full bg-[#0e2038]" />
          <div className="absolute left-0 h-1 rounded-full bg-blue-600 transition-all" style={{ width:`${zoomPct}%` }} />
          <input type="range" min={MIN} max={MAX} step={STEP} value={cur}
            onChange={e => onScaleChange(parseFloat(e.target.value))}
            className="relative w-full appearance-none bg-transparent cursor-pointer" style={{ height:"28px" }} />
        </div>
        <button type="button" onClick={() => onScaleChange(parseFloat(Math.min(MAX,cur+STEP).toFixed(2)))} disabled={cur>=MAX}
          className="w-7 h-7 rounded-lg bg-[#0e2038] hover:bg-[#1a3050] disabled:opacity-30 text-[#5b8ab0] hover:text-white flex items-center justify-center transition-all flex-shrink-0">
          <MdZoomIn size={16}/>
        </button>
        {cur!==1 && <button type="button" onClick={() => onScaleChange(1)} className="text-[#2d5078] hover:text-blue-400 text-[10px] font-bold transition-colors flex-shrink-0">Reset</button>}
      </div>
    </div>
  );
}

/* ─── AdminPanel ─────────────────────────────────────────────────────────── */

function AdminPanel({ onLogout }) {
  const { newsList, refreshNews } = useApp();
  const [form, setForm]           = useState(EMPTY);
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const [deleting, setDeleting]   = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notifStatus, setNotifStatus] = useState("idle");
  const [sendNotif, setSendNotif]     = useState(true);

  // ── Tarjima holati ──
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState("");

  const fileRef = useRef(null);

  const set = (k,v) => setForm(p => ({ ...p, [k]:v }));
  const setCategory = (uzCat) => { set("category_uz",uzCat); set("category_en",CAT_MAP[uzCat]?.en||uzCat); set("category_ru",CAT_MAP[uzCat]?.ru||uzCat); };

  // ── Avtomatik tarjima funksiyasi ──
  const handleTranslate = async () => {
    if (!form.title_uz || form.title_uz.trim().length < 2) return;
    setTranslating(true);
    setTranslateError("");
    try {
      const result = await autoTranslate(form.title_uz, form.excerpt_uz);
      if (result.title?.ru) set("title_ru", result.title.ru);
      if (result.title?.en) set("title_en", result.title.en);
      if (result.excerpt?.ru) set("excerpt_ru", result.excerpt.ru);
      if (result.excerpt?.en) set("excerpt_en", result.excerpt.en);
    } catch (err) {
      console.error("Tarjima xatosi:", err);
      setTranslateError("Tarjima xato yuz berdi. Qayta urinib ko'ring.");
      setTimeout(() => setTranslateError(""), 4000);
    } finally {
      setTranslating(false);
    }
  };

  // ── UZ sarlavhadan chiqilganda avtomatik tarjima ──
  const handleTitleUzBlur = (e) => {
    const val = e.target.value.trim();
    if (val.length >= 2) handleTranslate();
  };

  // ── Excerpt UZ dan chiqqanda faqat excerpt tarjima qilish ──
  const handleExcerptUzBlur = async (e) => {
    const val = e.target.value.trim();
    if (!val || val.length < 2) return;
    setTranslating(true);
    setTranslateError("");
    try {
      const [ru, en] = await Promise.all([
        translateText(val, "uz|ru"),
        translateText(val, "uz|en"),
      ]);
      if (ru) set("excerpt_ru", ru);
      if (en) set("excerpt_en", en);
    } catch (err) {
      setTranslateError("Tarjima xato yuz berdi.");
      setTimeout(() => setTranslateError(""), 4000);
    } finally {
      setTranslating(false);
    }
  };

  const getImageDimensions = (file) => new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload  = () => { resolve({ w: img.naturalWidth, h: img.naturalHeight }); URL.revokeObjectURL(url); };
    img.onerror = () => { resolve({ w: null, h: null }); URL.revokeObjectURL(url); };
    img.src = url;
  });

  const getVideoDimensions = (file) => new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => { resolve({ w: video.videoWidth, h: video.videoHeight }); URL.revokeObjectURL(url); };
    video.onerror = () => { resolve({ w: null, h: null }); URL.revokeObjectURL(url); };
    video.src = url;
  });

  const removeMedia = (idx) => setForm(p => ({ ...p, media: p.media.filter((_, i) => i !== idx) }));

  const updatePrimaryPosition = (v) => setForm(p => {
    if (!p.media[0]) return p;
    const media = [...p.media]; media[0] = { ...media[0], position: v };
    return { ...p, media };
  });
  const updatePrimaryScale = (v) => setForm(p => {
    if (!p.media[0]) return p;
    const media = [...p.media]; media[0] = { ...media[0], scale: v };
    return { ...p, media };
  });

  // Bir nechta rasm va (ko'pi bilan 1 ta) video birga yuklanadi
  const handleFilesUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = ""; // bir xil faylni qayta tanlash imkonini saqlaydi
    if (!files.length) return;

    const existingVideoCount = form.media.filter(m => m.type === "video").length;
    const incomingVideoCount = files.filter(f => f.type.startsWith("video/")).length;
    if (existingVideoCount + incomingVideoCount > 1) { alert("Faqat bitta video yuklash mumkin!"); return; }
    if (form.media.length + files.length > MAX_MEDIA) { alert(`Ko'pi bilan ${MAX_MEDIA} ta fayl yuklash mumkin!`); return; }

    setUploading(true); setUploadProgress(0);
    const newItems = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      if (!isImage && !isVideo) { alert(`${file.name}: faqat rasm yoki video fayl!`); continue; }

      if (isImage) {
        if (file.size > 5*1024*1024) { alert(`${file.name}: rasm uchun max 5MB!`); continue; }
        try {
          const dim = await getImageDimensions(file);
          const fd = new FormData(); fd.append("image", file); fd.append("key", IMGBB_API_KEY);
          const res = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body: fd });
          const data = await res.json();
          if (data.success) {
            newItems.push({ type: "image", url: data.data.url, w: dim.w, h: dim.h, position: "50% 50%", scale: 1 });
          } else throw new Error("Yuklanmadi");
        } catch (err) { alert(`${file.name}: xato — ${err.message}`); }
      } else {
        if (file.size > 50*1024*1024) { alert(`${file.name}: video uchun max 50MB!`); continue; }
        try {
          const dim = await getVideoDimensions(file);
          const url = await uploadVideoToStorage(file, (pct) => setUploadProgress(pct));
          newItems.push({ type: "video", url, w: dim.w, h: dim.h });
        } catch (err) { alert(`${file.name}: video yuklashda xato — ${err.message}`); }
      }
      setUploadProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setForm(p => ({ ...p, media: [...p.media, ...newItems] }));
    setUploading(false);
  };

  const handleSubmit = async () => {
    if (!form.title_uz||form.media.length===0) { alert("Majburiy: Sarlavha (UZ), kamida bitta Rasm/Video"); return; }
    if (!form.date_uz&&!form.date_en&&!form.date_ru) { alert("Kamida bitta sana kiriting!"); return; }
    setLoading(true);
    try {
      const now=new Date();
      const primary = form.media[0];
      const newsData = {
        title:       { uz:form.title_uz,    en:form.title_en,    ru:form.title_ru    },
        excerpt:     { uz:form.excerpt_uz,  en:form.excerpt_en,  ru:form.excerpt_ru  },
        category:    { uz:form.category_uz, en:form.category_en, ru:form.category_ru },
        media:       form.media,
        // Orqaga moslik uchun — eski komponentlar shu maydonlardan ham foydalanadi
        img:         primary.url,
        mediaType:   primary.type,
        imgPosition: primary.position || "50% 50%",
        imgScale:    primary.scale ?? 1,
        date:        form.date_uz||form.date_en||form.date_ru,
        date_uz:     form.date_uz,
        date_en:     form.date_en,
        date_ru:     form.date_ru,
        postedAt:    now.toISOString(),
      };

      await addNewsToDb(newsData);
      await refreshNews();
      setForm(EMPTY); setUploadProgress(0);
      setSuccess(true); setTimeout(() => setSuccess(false), 3000);

      if (sendNotif) {
        setNotifStatus("sending");
        try {
          const notifyRes = await fetch("/api/notify-subscribers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              newsTitle:   newsData.title,
              newsExcerpt: newsData.excerpt,
              newsDate:    newsData.date,
            }),
          });
          if (!notifyRes.ok) {
            const errData = await notifyRes.json().catch(() => ({}));
            throw new Error(errData.error || "notify_failed");
          }
          await sendPushToAll({
            title: newsData.title,
            body:  newsData.excerpt,
          });
          setNotifStatus("done");
          setTimeout(() => setNotifStatus("idle"), 4000);
        } catch(err) {
          console.error("Bildirishnoma xatosi:", err);
          setNotifStatus("error");
          setTimeout(() => setNotifStatus("idle"), 4000);
        }
      }

    } catch(err) { alert("Xato: "+err.message); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    setDeleting(id);
    try { await deleteNewsFromDb(id); await refreshNews(); }
    catch(err) { alert("Xato: "+err.message); }
    finally { setDeleting(null); }
  };

  return (
    <main className="min-h-screen bg-[#04090f] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{ backgroundImage:"linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)", backgroundSize:"40px 40px" }} />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <p className="text-[#2d5078] text-[10px] font-black tracking-[0.25em] uppercase mb-1">WBK & BOKA</p>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Admin Panel</h1>
          </div>
          <button onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#0e2038] hover:border-red-500/30 hover:text-red-400 text-[#5b8ab0] text-xs font-bold transition-all">
            <MdLogout size={15}/> Chiqish
          </button>
        </div>

        {/* Form */}
        <div className="bg-[#080f1a] rounded-2xl border border-[#0e2038] p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-sm font-bold mb-6 flex items-center gap-2 text-[#5b8ab0]">
            <MdAddCircleOutline className="text-blue-400 text-lg"/>
            Yangi yangilik qo'shish
          </h2>

          {/* Sarlavha */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className={LBL+" mb-0"}>Sarlavha *</label>
              {/* Qo'lda tarjima tugmasi */}
              <button
                type="button"
                onClick={handleTranslate}
                disabled={translating || !form.title_uz}
                className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all disabled:opacity-40 disabled:cursor-not-allowed border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                <MdTranslate size={12}/>
                {translating ? "Tarjima qilinmoqda..." : "AI tarjima"}
              </button>
            </div>
            <div className="space-y-2">
              {LANGS.map(({key,label}) => (
                <div key={key} className="flex items-center gap-2">
                  <span className={BADGE[key]}>{label}</span>
                  <div className="relative flex-1">
                    <input
                      className={INP + (key==="uz" && translating ? " pr-8" : "")}
                      placeholder={
                        key==="uz" ? "O'zbekcha sarlavha..." :
                        key==="ru" ? "Заголовок на русском..." :
                        "Title in English..."
                      }
                      value={form[`title_${key}`]}
                      onChange={e => set(`title_${key}`, e.target.value)}
                      onBlur={key==="uz" ? handleTitleUzBlur : undefined}
                    />
                    {key==="uz" && translating && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 text-[10px] font-bold animate-pulse">
                        AI...
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Tarjima xato xabari */}
            {translateError && (
              <div className="mt-2 bg-red-500/10 border border-red-500/25 rounded-xl px-3 py-2 text-red-400 text-[11px] font-bold flex items-center gap-1.5">
                <MdErrorOutline size={13}/>{translateError}
              </div>
            )}
            {/* Tarjima muvaffaqiyat xabari */}
            {!translating && !translateError && form.title_ru && form.title_en && (
              <div className="mt-2 flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold">
                <MdCheckCircle size={12}/> AI tarjima tayyor
              </div>
            )}
          </div>

          {/* Qisqa matn */}
          <div className="mb-5">
            <label className={LBL}>Qisqa matn</label>
            <div className="space-y-2">
              {LANGS.map(({key,label}) => (
                <div key={key} className="flex items-start gap-2">
                  <span className={BADGE[key]+" mt-2.5"}>{label}</span>
                  <textarea rows={2} className={INP+" resize-none"}
                    placeholder={
                      key==="uz" ? "O'zbekcha tavsif..." :
                      key==="ru" ? "Описание на русском..." :
                      "Description in English..."
                    }
                    value={form[`excerpt_${key}`]}
                    onChange={e => set(`excerpt_${key}`, e.target.value)}
                    onBlur={key==="uz" ? handleExcerptUzBlur : undefined} />
                </div>
              ))}
            </div>
          </div>

          {/* Kategoriya */}
          <div className="mb-5">
            <label className={LBL}>Kategoriya *</label>
            <select className={INP+" cursor-pointer"} value={form.category_uz} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Sana */}
          <div className="mb-5">
            <label className={LBL}>Sana *</label>
            <div className="space-y-2">
              {LANGS.map(({key,label}) => (
                <div key={key} className="flex items-center gap-2">
                  <span className={BADGE[key]}>{label}</span>
                  <div className="flex-1">
                    <DatePicker value={form[`date_${key}`]} onChange={v => set(`date_${key}`,v)} lang={key} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rasm(lar) / Video */}
          <div className="mb-3">
            <label className={LBL}>Rasm(lar) yoki Video * (bir nechta rasm + 1 ta video, jami {MAX_MEDIA} tagacha)</label>

            <div className="grid grid-cols-3 gap-2">
              {form.media.map((m, idx) => (
                <div key={idx} className="relative h-24 rounded-lg overflow-hidden bg-[#070f1e] border border-[#0e2038] group">
                  {m.type === "video" ? (
                    <video src={m.url} className="w-full h-full object-cover pointer-events-none" muted playsInline />
                  ) : (
                    <img src={m.url} alt="" className="w-full h-full pointer-events-none"
                      style={{ objectFit:"cover", objectPosition:m.position||"50% 50%", transform:`scale(${m.scale??1})`, transformOrigin:m.position||"50% 50%" }} />
                  )}
                  {idx === 0 && (
                    <span className="absolute top-1 left-1 bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded">ASOSIY</span>
                  )}
                  {m.type === "video" && (
                    <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">VIDEO</span>
                  )}
                  <button type="button" onClick={() => removeMedia(idx)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 hover:bg-red-500 text-white flex items-center justify-center text-xs transition-colors">
                    ×
                  </button>
                </div>
              ))}

              {form.media.length < MAX_MEDIA && (
                <div onClick={() => !uploading && fileRef.current?.click()}
                  className={`h-24 rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-colors ${uploading?"border-blue-500/50 cursor-wait":"border-[#0e2038] hover:border-[#1a3050] cursor-pointer"}`}>
                  {uploading ? <MdHourglassEmpty className="text-blue-400 text-xl mb-1"/> : <MdImage className="text-[#1a3050] text-xl mb-1"/>}
                  <span className="text-[9px] text-[#5b8ab0] font-bold">{uploading?`${uploadProgress}%`:"Qo'shish"}</span>
                </div>
              )}
            </div>

            <input ref={fileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleFilesUpload} />
            <p className="text-[#1a3050] text-[10px] mt-1.5">Rasm: JPG/PNG/WEBP max 5MB · Video: MP4/WEBM max 50MB (faqat 1 ta video)</p>

            {uploading && (
              <div className="mt-2">
                <div className="flex justify-between text-[10px] text-[#5b8ab0] mb-1"><span>Yuklanmoqda...</span><span>{uploadProgress}%</span></div>
                <div className="w-full bg-[#0e2038] rounded-full h-1">
                  <div className="bg-blue-500 h-1 rounded-full transition-all duration-500" style={{ width:`${uploadProgress}%` }} />
                </div>
              </div>
            )}
          </div>

          {form.media[0]?.type === "image" && !uploading && (
            <ImagePositioner src={form.media[0].url} position={form.media[0].position} scale={form.media[0].scale}
              onPositionChange={updatePrimaryPosition} onScaleChange={updatePrimaryScale} />
          )}

          {/* Bildirishnoma toggle */}
          <div className={`mb-4 flex items-center gap-3 px-4 py-3 rounded-xl border ${sendNotif?"border-blue-500/30 bg-blue-500/10":"border-[#0e2038] bg-[#070f1e]"}`}>
            <MdNotifications className={`text-lg flex-shrink-0 ${sendNotif?"text-blue-400":"text-[#2d5078]"}`} />
            <div className="flex-1">
              <p className={`text-xs font-bold ${sendNotif?"text-blue-300":"text-[#5b8ab0]"}`}>Obunchilarga bildirishnoma yuborish</p>
              <p className="text-[10px] text-[#2d5078] mt-0.5">Email + Push notification</p>
            </div>
            <button type="button" onClick={() => setSendNotif(v=>!v)}
              className={`w-10 h-6 rounded-full transition-all flex-shrink-0 relative ${sendNotif?"bg-blue-600":"bg-[#1a3050]"}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${sendNotif?"left-5":"left-1"}`} />
            </button>
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} disabled={loading||uploading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-[#0e2038] disabled:text-[#2d5078] disabled:cursor-not-allowed text-white font-black rounded-xl text-xs tracking-[0.18em] uppercase transition-all">
            {loading?"Saqlanmoqda...":uploading?"Fayllar yuklanmoqda...":"Yangilik qo'shish →"}
          </button>

          {success && (
            <div className="mt-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-4 py-3 text-emerald-400 text-sm font-bold flex items-center justify-center gap-2">
              <MdCheckCircle className="text-lg"/> Muvaffaqiyatli qo'shildi!
            </div>
          )}

          {notifStatus === "sending" && (
            <div className="mt-2 bg-blue-500/10 border border-blue-500/25 rounded-xl px-4 py-2.5 text-blue-400 text-xs font-bold flex items-center gap-2">
              <MdNotifications className="text-base animate-pulse"/> Bildirishnomalar yuborilmoqda...
            </div>
          )}
          {notifStatus === "done" && (
            <div className="mt-2 bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-4 py-2.5 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <MdCheckCircle className="text-base"/> Barcha obunchilarga bildirishnoma yuborildi!
            </div>
          )}
          {notifStatus === "error" && (
            <div className="mt-2 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-2.5 text-red-400 text-xs font-bold flex items-center gap-2">
              <MdErrorOutline className="text-base"/> Bildirishnoma yuborishda xato yuz berdi.
            </div>
          )}
        </div>

        {/* Yangiliklar ro'yxati */}
        <div>
          <h2 className="text-sm font-bold mb-4 flex items-center gap-2 text-[#5b8ab0]">
            <MdList className="text-blue-400 text-lg"/>
            Mavjud yangiliklar
            <span className="ml-auto bg-[#0e2038] text-[#5b8ab0] text-[10px] font-black px-2 py-0.5 rounded-full">{newsList.length}</span>
          </h2>
          {newsList.length===0 ? (
            <div className="bg-[#080f1a] border border-[#0e2038] rounded-2xl py-16 text-center">
              <p className="text-[#2d5078] text-sm">Hozircha yangilik yo'q</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {newsList.map(item => (
                <div key={item.id} className="bg-[#080f1a] border border-[#0e2038] rounded-xl p-3 flex items-center gap-3 hover:border-[#1a3050] transition-colors">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#070f1e]">
                    <img src={item.img} alt="" className="w-full h-full pointer-events-none"
                      style={{ objectFit:"cover", objectPosition:item.imgPosition||"50% 50%", transform:`scale(${item.imgScale??1})`, transformOrigin:item.imgPosition||"50% 50%" }}
                      onError={e => { e.currentTarget.style.display="none"; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-xs sm:text-sm truncate leading-tight mb-0.5">{item.title?.uz}</p>
                    {item.title?.ru && <p className="text-[#3d6080] text-[10px] truncate mb-1">{item.title.ru}</p>}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#5b8ab0] bg-[#0e2038] px-2 py-0.5 rounded-md">{item.category?.uz}</span>
                      <span className="text-[10px] text-[#2d5078]">{item.date}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(item.id)} disabled={deleting===item.id}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500/25 text-red-500/50 hover:text-red-400 flex items-center justify-center transition-all border border-transparent hover:border-red-500/20">
                    {deleting===item.id ? <span className="text-[10px]">...</span> : <MdDelete className="w-4 h-4"/>}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;
  return <AdminPanel onLogout={() => setLoggedIn(false)} />;
}