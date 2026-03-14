"use client";

import { useState, useRef } from "react";
import { addNewsToDb, deleteNewsFromDb } from "../lib/newsService";
import { useApp } from "../contex/AppContext";
import { MdLockOutline, MdVisibility, MdVisibilityOff, MdErrorOutline, MdCheckCircle, MdAddCircleOutline, MdList, MdDelete, MdImage, MdHourglassEmpty } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";

const ADMIN_LOGIN    = process.env.NEXT_PUBLIC_ADMIN_LOGIN    || "admin";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "12345";

const IMGBB_API_KEY = "67a7613cbf54d18cb585ee96b0a8240b";
const CATEGORIES = ["Musobaqa", "Rekord", "Tashkilot", "Intervyu", "Turnir", "Xalqaro"];
const MONTHS_UZ  = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"];

const EMPTY = {
  title_uz: "", title_en: "", title_ru: "",
  excerpt_uz: "", excerpt_en: "", excerpt_ru: "",
  category_uz: "Musobaqa", category_en: "Tournament", category_ru: "Турнир",
  img: "", imgPosition: "50% 50%",
  date_uz: "", date_en: "", date_ru: "",
  readTime_uz: "3 daq", readTime_en: "3 min", readTime_ru: "3 мин",
};

const CAT_MAP = {
  "Musobaqa":  { en: "Tournament",    ru: "Турнир"        },
  "Rekord":    { en: "Record",        ru: "Рекорд"        },
  "Tashkilot": { en: "Organization",  ru: "Организация"   },
  "Intervyu":  { en: "Interview",     ru: "Интервью"      },
  "Turnir":    { en: "Tournament",    ru: "Турнир"        },
  "Xalqaro":   { en: "International", ru: "Международный" },
};

/* ── Login ── */
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
      if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
        onLogin();
      } else {
        setError("Login yoki parol noto'g'ri!");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#0a1628] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
            <MdLockOutline className="text-blue-400 text-3xl" />
          </div>
          <h1 className="text-white font-black text-2xl">Admin Panel</h1>
          <p className="text-blue-400/60 text-sm mt-1">WBK & BOKA</p>
        </div>

        <div className="bg-[#0d1f3c] rounded-2xl p-6 border border-blue-900">
          <div className="space-y-4">
            <div>
              <label className="block text-blue-300 text-[11px] font-bold tracking-widest uppercase mb-1.5">Login</label>
              <input type="text" value={login}
                onChange={(e) => { setLogin(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Login..."
                className="w-full bg-[#0a1628] border border-blue-800 rounded-xl px-4 py-3 text-white text-sm placeholder-blue-400/50 outline-none focus:border-blue-500 transition-colors" />
            </div>

            <div>
              <label className="block text-blue-300 text-[11px] font-bold tracking-widest uppercase mb-1.5">Parol</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Parol..."
                  className="w-full bg-[#0a1628] border border-blue-800 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-blue-400/50 outline-none focus:border-blue-500 transition-colors" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-white transition-colors">
                  {showPass ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-2.5 text-red-400 text-xs font-bold flex items-center gap-2">
                <MdErrorOutline size={16} />{error}
              </div>
            )}

            <button onClick={handleLogin} disabled={loading}
              className="w-full py-3 bg-blue-500 hover:bg-blue-400 disabled:bg-blue-900 text-white font-black rounded-xl transition-all text-sm tracking-widest uppercase mt-2">
              {loading ? "Tekshirilmoqda..." : "Kirish →"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── Kalendar ── */
function DatePicker({ value, onChange }) {
  const today = new Date();
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [open, setOpen]           = useState(false);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const startDay    = firstDay === 0 ? 6 : firstDay - 1;

  const selectDay = (day) => { onChange(`${day} ${MONTHS_UZ[viewMonth]} ${viewYear}`); setOpen(false); };
  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

  const parts       = value ? value.split(" ") : [];
  const selDay      = parts[0] ? parseInt(parts[0]) : null;
  const selMonthIdx = parts[1] ? MONTHS_UZ.indexOf(parts[1]) : null;
  const selYear     = parts[2] ? parseInt(parts[2]) : null;

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full bg-[#0a1628] border border-blue-800 rounded-xl px-4 py-2.5 text-left text-sm flex items-center justify-between outline-none focus:border-blue-500 transition-colors">
        <span className={value ? "text-white" : "text-blue-400"}>{value || "Sana tanlang..."}</span>
        <FiCalendar className="text-blue-400 w-4 h-4" />
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-2 left-0 bg-[#0d1f3c] border border-blue-800 rounded-2xl p-4 shadow-2xl w-64 sm:w-72">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="w-8 h-8 rounded-full hover:bg-blue-800 flex items-center justify-center text-blue-300 text-lg transition-colors">‹</button>
            <span className="text-white font-bold text-sm">{MONTHS_UZ[viewMonth]} {viewYear}</span>
            <button onClick={nextMonth} className="w-8 h-8 rounded-full hover:bg-blue-800 flex items-center justify-center text-blue-300 text-lg transition-colors">›</button>
          </div>
          <div className="grid grid-cols-7 mb-1">
            {["Du","Se","Ch","Pa","Ju","Sh","Ya"].map(d => (
              <div key={d} className="text-center text-blue-400/60 text-[10px] font-bold py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {Array(startDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
            {Array(daysInMonth).fill(null).map((_, i) => {
              const day     = i + 1;
              const isSel   = day === selDay && viewMonth === selMonthIdx && viewYear === selYear;
              const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
              return (
                <button key={day} onClick={() => selectDay(day)}
                  className={`w-full aspect-square rounded-lg text-xs font-medium transition-all ${
                    isSel ? "bg-blue-500 text-white font-black" : isToday ? "bg-blue-900 text-blue-300 font-bold" : "text-blue-200 hover:bg-blue-800"
                  }`}>
                  {day}
                </button>
              );
            })}
          </div>
          <button onClick={() => { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); selectDay(today.getDate()); }}
            className="mt-3 w-full py-1.5 text-xs font-bold text-blue-400 hover:text-white border border-blue-800 hover:border-blue-500 rounded-lg transition-colors">
            Bugun
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Drag pozitsiya ── */
function ImagePositioner({ src, position, onChange }) {
  const containerRef = useRef(null);
  const isDragging   = useRef(false);
  const startPos     = useRef({ x: 0, y: 0 });
  const startObjPos  = useRef({ x: 50, y: 50 });

  const parsePos = (pos) => { const [x, y] = pos.replace(/%/g, "").split(" ").map(Number); return { x: isNaN(x) ? 50 : x, y: isNaN(y) ? 50 : y }; };
  const clamp = (v, mn, mx) => Math.min(mx, Math.max(mn, v));
  const getEventPos = (e) => e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };

  const onStart = (e) => { e.preventDefault(); isDragging.current = true; startPos.current = getEventPos(e); startObjPos.current = parsePos(position); };
  const onMove  = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cur  = getEventPos(e);
    const dx   = ((cur.x - startPos.current.x) / rect.width)  * 100;
    const dy   = ((cur.y - startPos.current.y) / rect.height) * 100;
    onChange(`${Math.round(clamp(startObjPos.current.x - dx, 0, 100))}% ${Math.round(clamp(startObjPos.current.y - dy, 0, 100))}%`);
  };
  const onEnd = () => { isDragging.current = false; };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-blue-300 text-[11px] font-bold tracking-widest uppercase">Rasm pozitsiyasi</label>
        <span className="text-blue-400/60 text-[10px]">Rasmni suring</span>
      </div>
      <div ref={containerRef}
        className="relative h-36 sm:h-44 rounded-xl overflow-hidden border-2 border-blue-700 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onStart} onMouseMove={onMove} onMouseUp={onEnd} onMouseLeave={onEnd}
        onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd}>
        <img src={src} alt="pos" draggable={false} className="w-full h-full object-cover pointer-events-none"
          style={{ objectPosition: position }} />
        <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
          <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-full">
            ↔ Suring — {position}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Admin Panel ── */
function AdminPanel() {
  const { newsList, refreshNews } = useApp();
  const [form, setForm]           = useState(EMPTY);
  const [tab, setTab]             = useState("uz");
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const [deleting, setDeleting]   = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef(null);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const setCategory = (uzCat) => { set("category_uz", uzCat); set("category_en", CAT_MAP[uzCat]?.en || uzCat); set("category_ru", CAT_MAP[uzCat]?.ru || uzCat); };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Faqat rasm fayl!"); return; }
    if (file.size > 5 * 1024 * 1024) { alert("Max 5MB!"); return; }
    setUploading(true); setUploadProgress(30);
    try {
      const fd = new FormData();
      fd.append("image", file); fd.append("key", IMGBB_API_KEY);
      setUploadProgress(60);
      const res  = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) { set("img", data.data.url); set("imgPosition", "50% 50%"); setUploadProgress(100); }
      else throw new Error("Yuklanmadi");
    } catch (e) { alert("Xato: " + e.message); setUploadProgress(0); }
    finally { setUploading(false); }
  };

  const handleSubmit = async () => {
    if (!form.title_uz || (!form.date_uz && !form.date_en && !form.date_ru) || !form.img) {
      alert("Majburiy: Sarlavha (uz), Sana, Rasm"); return;
    }
    setLoading(true);
    try {
      await addNewsToDb({
        title:       { uz: form.title_uz,    en: form.title_en,    ru: form.title_ru    },
        excerpt:     { uz: form.excerpt_uz,  en: form.excerpt_en,  ru: form.excerpt_ru  },
        category:    { uz: form.category_uz, en: form.category_en, ru: form.category_ru },
        readTime:    { uz: form.readTime_uz, en: form.readTime_en, ru: form.readTime_ru },
        img:         form.img,
        imgPosition: form.imgPosition,
        date:        form.date_uz || form.date_en || form.date_ru,
        date_uz:     form.date_uz,
        date_en:     form.date_en,
        date_ru:     form.date_ru,
      });
      await refreshNews();
      setForm(EMPTY); setUploadProgress(0);
      setSuccess(true); setTimeout(() => setSuccess(false), 3000);
    } catch (e) { alert("Xato: " + e.message); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    setDeleting(id);
    try { await deleteNewsFromDb(id); await refreshNews(); }
    catch (e) { alert("Xato: " + e.message); }
    finally { setDeleting(null); }
  };

  const inp = "w-full bg-[#0a1628] border border-blue-800 rounded-xl px-4 py-2.5 text-white text-sm placeholder-blue-400/50 outline-none focus:border-blue-500 transition-colors";
  const lbl = "block text-blue-300 text-[11px] font-bold tracking-widests uppercase mb-1.5";

  return (
    <main className="min-h-screen bg-[#0a1628] text-white px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-blue-400 text-[11px] font-black tracking-[0.25em] uppercase mb-1">WBK & BOKA</p>
            <h1 className="text-2xl sm:text-3xl font-black">Admin Panel</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <MdLockOutline className="text-blue-400 text-xl" />
          </div>
        </div>

        {/* Form */}
        <div className="bg-[#0d1f3c] rounded-2xl p-4 sm:p-6 border border-blue-900 mb-8">
          <h2 className="text-base sm:text-lg font-bold mb-5 flex items-center gap-2">
            <MdAddCircleOutline className="text-blue-400 text-xl" />
            Yangi yangilik
          </h2>

          {/* Til */}
          <div className="flex gap-2 mb-5">
            {["uz","en","ru"].map((l) => (
              <button key={l} onClick={() => setTab(l)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  tab === l ? "bg-blue-500 text-white" : "bg-blue-900/50 text-blue-300 hover:bg-blue-800"
                }`}>{l}</button>
            ))}
          </div>

          <div className="space-y-3 mb-5">
            <div>
              <label className={lbl}>Sarlavha ({tab}) *</label>
              <input className={inp} placeholder={`Sarlavha ${tab} tilida...`}
                value={form[`title_${tab}`]} onChange={(e) => set(`title_${tab}`, e.target.value)} />
            </div>
            <div>
              <label className={lbl}>Qisqa matn ({tab})</label>
              <textarea rows={3} className={inp + " resize-none"} placeholder={`Tavsif ${tab} tilida...`}
                value={form[`excerpt_${tab}`]} onChange={(e) => set(`excerpt_${tab}`, e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <div>
              <label className={lbl}>Kategoriya</label>
              <select className={inp + " cursor-pointer"} value={form.category_uz} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={lbl}>Sana ({tab}) *</label>
              <DatePicker value={form[`date_${tab}`]} onChange={(v) => set(`date_${tab}`, v)} />
            </div>
            <div className="sm:col-span-2">
              <label className={lbl}>O'qish vaqti ({tab})</label>
              <input className={inp}
                placeholder={tab === "uz" ? "3 daq" : tab === "en" ? "3 min" : "3 мин"}
                value={form[`readTime_${tab}`]}
                onChange={(e) => set(`readTime_${tab}`, e.target.value)} />
            </div>
          </div>

          {/* Rasm */}
          <div className="mb-3">
            <label className={lbl}>Rasm *</label>
            <div onClick={() => !uploading && fileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center transition-colors bg-[#0a1628] ${
                uploading ? "border-blue-500 cursor-wait" : "border-blue-700 hover:border-blue-500 cursor-pointer"
              }`}>
              {form.img ? (
                <div>
                  <div className="h-36 sm:h-44 rounded-lg overflow-hidden mb-2">
                    <img src={form.img} alt="preview" className="w-full h-full object-cover"
                      style={{ objectPosition: form.imgPosition }} />
                  </div>
                  {!uploading && <p className="text-blue-400 text-xs">O'zgartirish uchun bosing</p>}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  {uploading
                    ? <MdHourglassEmpty className="text-blue-400 text-4xl mb-2" />
                    : <MdImage className="text-blue-600 text-4xl mb-2" />
                  }
                  <p className="text-blue-300 text-sm font-bold">{uploading ? "Yuklanmoqda..." : "Rasm tanlash"}</p>
                  <p className="text-blue-400/50 text-xs mt-1">JPG, PNG, WEBP — max 5MB</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

            {uploading && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-blue-400 mb-1">
                  <span>Yuklanmoqda...</span><span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-blue-900 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}
            {!uploading && uploadProgress === 100 && (
              <p className="mt-1.5 text-green-400 text-xs font-bold flex items-center gap-1">
                <MdCheckCircle className="text-green-400" /> Yuklandi!
              </p>
            )}
          </div>

          {form.img && !uploading && (
            <ImagePositioner src={form.img} position={form.imgPosition} onChange={(v) => set("imgPosition", v)} />
          )}

          <button onClick={handleSubmit} disabled={loading || uploading}
            className="w-full py-3 bg-blue-500 hover:bg-blue-400 disabled:bg-blue-900 disabled:cursor-not-allowed text-white font-black rounded-xl transition-all text-sm tracking-widest uppercase">
            {loading ? "Saqlanmoqda..." : uploading ? "Rasm yuklanmoqda..." : "Yangilik qo'shish"}
          </button>

          {success && (
            <div className="mt-3 bg-green-500/20 border border-green-500/40 rounded-xl px-4 py-3 text-green-400 text-sm font-bold flex items-center justify-center gap-2">
              <MdCheckCircle className="text-green-400 text-lg" /> Muvaffaqiyatli qo'shildi!
            </div>
          )}
        </div>

        {/* Mavjud yangiliklar */}
        <div>
          <h2 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-2">
            <MdList className="text-blue-400 text-xl" />
            Yangiliklar ({newsList.length})
          </h2>
          {newsList.length === 0 ? (
            <p className="text-blue-400/50 text-sm text-center py-10">Hozircha yangilik yo'q</p>
          ) : (
            <div className="space-y-3">
              {newsList.map((item) => (
                <div key={item.id} className="bg-[#0d1f3c] border border-blue-900 rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-blue-900">
                    <img src={item.img} alt="" className="w-full h-full object-cover"
                      style={{ objectPosition: item.imgPosition || "50% 50%" }}
                      onError={(e) => e.currentTarget.style.display = "none"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-xs sm:text-sm truncate">{item.title?.uz}</p>
                    <p className="text-blue-400 text-[11px] mt-0.5">{item.category?.uz} • {item.date}</p>
                  </div>
                  <button onClick={() => handleDelete(item.id)} disabled={deleting === item.id}
                    className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 flex items-center justify-center transition-all">
                    {deleting === item.id
                      ? <span className="text-xs">...</span>
                      : <MdDelete className="w-4 h-4" />
                    }
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
  return <AdminPanel />;
}