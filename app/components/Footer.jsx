"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo-or.png";
import { useApp } from "../contex/AppContext";

const NAV = {
  main: [
    { uz: "Bosh sahifa", en: "Home", ru: "Главная", href: "/" },
    { uz: "Yangiliklar", en: "News", ru: "Новости", href: "/newsPage" },
    { uz: "Turnirlar", en: "Tournaments", ru: "Турниры", href: "/tournaments" },
    { uz: "Sportchilar", en: "Athletes", ru: "Спортсмены", href: "/athletes" },
    { uz: "Natijalar", en: "Results", ru: "Результаты", href: "/results" },
  ],
  about: [
    { uz: "Federatsiya haqida", en: "About", ru: "О федерации", href: "/about" },
    { uz: "Rahbariyat", en: "Leadership", ru: "Руководство", href: "/leadership" },
    { uz: "Qoidalar & Nizom", en: "Rules", ru: "Правила", href: "/rules" },
    { uz: "Hujjatlar", en: "Documents", ru: "Документы", href: "/documents" },
    { uz: "Hamkorlar", en: "Partners", ru: "Партнёры", href: "/partners" },
  ],
};

const CONTACT = [
  { icon: "📞", label: "+998 71 123 45 67", href: "tel:+998711234567" },
  { icon: "✉️", label: "info@kurash.uz", href: "mailto:info@kurash.uz" },
  { icon: "📍", label: "Toshkent, O'zbekiston", href: "#" },
];

const T = {
  pages: { uz: "Sahifalar", en: "Pages", ru: "Страницы" },
  fed: { uz: "Federatsiya", en: "Federation", ru: "Федерация" },
  contact: { uz: "Aloqa", en: "Contact", ru: "Контакты" },
  tg: { uz: "Telegram kanalimizga qo'shiling", en: "Join our Telegram", ru: "Наш Telegram" },
  copy: { uz: "Barcha huquqlar himoyalangan.", en: "All rights reserved.", ru: "Все права защищены." },
  privacy: { uz: "Maxfiylik siyosati", en: "Privacy Policy", ru: "Политика конфиденциальности" },
  terms: { uz: "Foydalanish shartlari", en: "Terms of Use", ru: "Условия использования" },
};

const SOCIALS = [
  { name: "Telegram", href: "https://t.me/kurash_uz", color: "hover:bg-[#229ED9]", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg> },
  { name: "Instagram", href: "https://instagram.com/kurash_uz", color: "hover:bg-[#E1306C]", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg> },
  { name: "YouTube", href: "https://youtube.com/@kurash_uz", color: "hover:bg-[#FF0000]", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg> },
  { name: "Facebook", href: "https://facebook.com/kurash.uz", color: "hover:bg-[#1877F2]", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
];

const TgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

export default function Footer() {
  const { darkMode, language } = useApp();
  const bg = darkMode ? "bg-[#0a1628]" : "bg-blue-700";
  const bgBrand = darkMode ? "bg-[#0d1f3c]" : "bg-blue-800";
  const tgBtn = darkMode ? "bg-blue-500 hover:bg-blue-400 text-white" : "bg-white text-blue-700 hover:bg-blue-50";

  return (
    <footer className={`${bg} text-white transition-colors duration-300`}>

      {/* ── Mobile brand ── */}
      <div className={`sm:hidden ${bgBrand} border-b border-white/20 px-5 py-6`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/30 overflow-hidden flex-shrink-0">
            <Link href="/"><Image src={Logo} alt="Logo" width={56} height={56} className="rounded-full bg-white object-contain" /></Link>
          </div>
          <div>
            <p className="font-black text-white text-[16px] tracking-wider uppercase">WKB&BOKA</p>
            <p className="text-blue-100 text-[10px] tracking-[0.2em] uppercase mt-0.5">Belbog'li Kurash Asotsiyatsiyasi</p>
          </div>
        </div>
        <p className="text-white/70 text-[12px] leading-relaxed mb-5">
          Dunyo Belbog'li Kurashi va Bel Olish Kurashi Asotsiyatsiyasining rasmiy veb-sayti.
        </p>
        <div className="flex gap-3">
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
              className={`w-11 h-11 rounded-xl bg-white/20 border border-white/25 ${s.color} flex items-center justify-center text-white transition-all active:scale-95`}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* ── Mobile links ── */}
      <div className="sm:hidden px-5 py-6 grid grid-cols-2 gap-x-6 gap-y-7">
        {[{ key: "pages", data: NAV.main }, { key: "fed", data: NAV.about }].map(({ key, data }) => (
          <div key={key}>
            <h4 className="text-white font-black text-[10px] tracking-[0.22em] uppercase mb-3">{T[key][language]}</h4>
            <ul className="space-y-2.5">
              {data.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 hover:text-white text-[13px] font-medium transition-colors">
                    {l[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Mobile aloqa ── */}
      <div className="sm:hidden px-5 pb-6">
        <h4 className="text-white font-black text-[10px] tracking-[0.22em] uppercase mb-3">{T.contact[language]}</h4>
        <div className="grid grid-cols-1 gap-2 mb-4">
          {CONTACT.map((l) => (
            <a key={l.label} href={l.href}
              className="flex items-center gap-3 bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-[13px] text-white/80 hover:text-white hover:bg-white/25 transition-all">
              <span>{l.icon}</span>{l.label}
            </a>
          ))}
        </div>
        <a href="https://t.me/kurash_uz" target="_blank" rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-2 text-[13px] font-bold py-3 rounded-xl transition-colors active:scale-95 ${tgBtn}`}>
          <TgIcon />{T.tg[language]}
        </a>
      </div>

      {/* ── Tablet & Desktop ── */}
      <div className="hidden sm:block max-w-7xl mx-auto px-6 lg:px-8 pt-12 lg:pt-14 pb-8 lg:pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-white/20 border border-white/30 overflow-hidden">
                <Link href="/"><Image src={Logo} alt="Logo" width={44} height={44} className="rounded-full bg-white object-contain" /></Link>
              </div>
              <div>
                <p className="font-black text-white text-[15px] tracking-wide uppercase">WKB&BOKA</p>
                <p className="text-blue-100 text-[10px] tracking-widest uppercase">O'zbekiston Federatsiyasi</p>
              </div>
            </div>
            <p className="text-white/70 text-[13px] leading-relaxed mb-5 max-w-[300px]">
              Dunyo Belbog'li Kurashi va Bel Olish Kurashi Asotsiyatsiyasining rasmiy veb-sayti.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-lg bg-white/20 ${s.color} border border-white/20 flex items-center justify-center text-white transition-all`}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Sahifalar */}
          <div>
            <h4 className="text-white font-bold text-[12px] tracking-[0.18em] uppercase mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-white/50" />{T.pages[language]}
            </h4>
            <ul className="space-y-2.5">
              {NAV.main.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/75 hover:text-white text-[13px] transition-colors hover:translate-x-1 inline-block">
                    {l[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Federatsiya */}
          <div>
            <h4 className="text-white font-bold text-[12px] tracking-[0.18em] uppercase mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-white/50" />{T.fed[language]}
            </h4>
            <ul className="space-y-2.5">
              {NAV.about.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/75 hover:text-white text-[13px] transition-colors hover:translate-x-1 inline-block">
                    {l[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Aloqa */}
          <div>
            <h4 className="text-white font-bold text-[12px] tracking-[0.18em] uppercase mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-white/50" />{T.contact[language]}
            </h4>
            <ul className="space-y-2.5 mb-5">
              {CONTACT.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/75 hover:text-white text-[13px] transition-colors flex items-center gap-2">
                    <span>{l.icon}</span>{l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="https://t.me/kurash_uz" target="_blank" rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-[12px] font-bold px-4 py-2 rounded-full transition-colors ${tgBtn}`}>
              <TgIcon />{T.tg[language]}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-[12px] text-white/60">
          <p className="text-center sm:text-left">
            <Link href="/admin" className="text-white/60 hover:text-white/60 cursor-default">&copy;</Link> {new Date().getFullYear()} Belbogli Kurash Federatsiyasi. {T.copy[language]}
          </p>
          <div className="flex gap-3 sm:gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">{T.privacy[language]}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{T.terms[language]}</Link>
          </div>

          <Link href="/admin" className="text-white/10 hover:text-white/30 transition-colors text-[10px] select-none ml-2">
            ©
          </Link>   </div>
      </div>
    </footer>
  );
}