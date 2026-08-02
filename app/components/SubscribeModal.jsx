'use client';
import { useState, useEffect } from "react";
import { useApp } from "../contex/AppContext";
import { addSubscriber } from "../lib/subscriberService";
import { FiX, FiMail, FiCheckCircle } from "react-icons/fi";
import { MdNotifications } from "react-icons/md";

const STORAGE_KEY = "wbk_subscribed_v1";
const SCROLL_THRESHOLD = 80; // shuncha pikseldan keyin "scroll qilindi" hisoblanadi

const T = {
  title: {
    uz: "Yangiliklardan xabardor bo'ling",
    en: "Stay informed",
    ru: "Будьте в курсе новостей",
  },
  subtitle: {
    uz: "Emailingizni qoldiring — yangi yangilik chiqqanda birinchilardan bo'lib bilib olasiz.",
    en: "Leave your email — be among the first to know when we publish news.",
    ru: "Оставьте email — узнавайте о новостях одними из первых.",
  },
  placeholder: {
    uz: "Email manzilingiz",
    en: "Your email address",
    ru: "Ваш email",
  },
  subscribe: { uz: "Obuna bo'lish", en: "Subscribe", ru: "Подписаться" },
  subscribing: { uz: "Yuborilmoqda...", en: "Sending...", ru: "Отправка..." },
  success: {
    uz: "Rahmat! Siz muvaffaqiyatli obuna bo'ldingiz.",
    en: "Thank you! You've successfully subscribed.",
    ru: "Спасибо! Вы успешно подписались.",
  },
  invalidEmail: {
    uz: "Iltimos, to'g'ri email manzil kiriting",
    en: "Please enter a valid email address",
    ru: "Пожалуйста, введите корректный email",
  },
  genericError: {
    uz: "Xatolik yuz berdi. Qayta urinib ko'ring.",
    en: "Something went wrong. Please try again.",
    ru: "Произошла ошибка. Попробуйте снова.",
  },
  privacy: {
    uz: "Faqat yangiliklar. Spam yo'q, istalgan vaqt bekor qilishingiz mumkin.",
    en: "News only. No spam, unsubscribe anytime.",
    ru: "Только новости. Без спама, отписаться можно в любой момент.",
  },
};

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function SubscribeModal() {
  const { darkMode, language } = useApp();
  const [visible, setVisible]     = useState(false);
  const [dismissed, setDismissed] = useState(false); // shu tashrif uchun × bosilganmi
  const [email, setEmail]         = useState("");
  const [status, setStatus]       = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg]   = useState("");

  // Allaqachon obuna bo'lganmi — localStorage orqali tekshiramiz
  useEffect(() => {
    let already = false;
    try { already = localStorage.getItem(STORAGE_KEY) === "1"; } catch {}
    if (already) return; // hech qachon ko'rsatilmaydi

    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClose = () => {
    setDismissed(true);
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMsg(T.invalidEmail[language]);
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      await addSubscriber({ email, language });
      // "already_subscribed" bo'lsa ham bu qurilmada obuna bo'ldi deb belgilaymiz
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
      setStatus("success");
      setTimeout(() => setVisible(false), 1800);
    } catch (err) {
      setStatus("error");
      setErrorMsg(T.genericError[language]);
    }
  };

  if (!visible || dismissed) return null;

  const cardBg    = darkMode ? "bg-[#0d1f3c]" : "bg-white";
  const titleC    = darkMode ? "text-white" : "text-[#0f2a5e]";
  const textC     = darkMode ? "text-blue-200/70" : "text-slate-500";
  const inputBg   = darkMode
    ? "bg-[#0a1628] text-white placeholder-blue-400/50 border-blue-900"
    : "bg-[#f8f9fc] text-slate-700 placeholder-slate-400 border-gray-200";
  const iconWrap  = darkMode ? "bg-blue-500/15 text-blue-400" : "bg-blue-50 text-[#0f2a5e]";

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center px-4"
      style={{ animation: "wbkFadeIn .25s ease forwards" }}
    >
      {/* Orqa fon */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Karta */}
      <div
        className={`relative w-full max-w-md rounded-2xl overflow-hidden border ${darkMode ? "border-blue-900" : "border-gray-100"} ${cardBg}`}
        style={{ animation: "wbkPopIn .3s ease forwards", boxShadow: "0 30px 80px rgba(15,42,94,0.35)" }}
      >
        <button
          onClick={handleClose}
          aria-label="close"
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10 ${
            darkMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-black/5 hover:bg-black/10 text-slate-600"
          }`}
        >
          <FiX className="w-4 h-4" />
        </button>

        <div className="p-7 sm:p-8 text-center">
          <div className={`w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center ${iconWrap}`}>
            <MdNotifications className="w-7 h-7" />
          </div>

          <h2 className={`font-black text-xl sm:text-2xl mb-2 ${titleC}`}>
            {T.title[language]}
          </h2>
          <p className={`text-sm leading-relaxed mb-6 ${textC}`}>
            {T.subtitle[language]}
          </p>

          {status === "success" ? (
            <div className={`flex flex-col items-center gap-2 py-4 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
              <FiCheckCircle className="w-9 h-9" />
              <p className="font-bold text-sm">{T.success[language]}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="text-left">
              <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 mb-2 ${inputBg}`}>
                <FiMail className={darkMode ? "text-blue-400" : "text-slate-400"} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                  placeholder={T.placeholder[language]}
                  className="flex-1 bg-transparent outline-none text-sm min-w-0"
                  disabled={status === "loading"}
                />
              </div>

              {status === "error" && errorMsg && (
                <p className="text-red-500 text-xs font-medium mb-3">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#0f2a5e] hover:bg-blue-800 active:bg-blue-900 disabled:opacity-60 text-white font-bold text-sm py-3 rounded-xl transition-colors mt-1"
              >
                {status === "loading" ? T.subscribing[language] : T.subscribe[language]}
              </button>

              <p className={`text-[11px] text-center mt-4 ${darkMode ? "text-blue-400/50" : "text-slate-400"}`}>
                {T.privacy[language]}
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes wbkFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes wbkPopIn {
          from { opacity: 0; transform: translateY(16px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}