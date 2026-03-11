'use client';
import Image from "next/image";
import Logo from "../../public/logo-or.png";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const links = [
  { href: "/",          num: "01", label: { en: "Home",      ru: "Главная",   uz: "Bosh sahifa"   } },
  { href: "/about",     num: "02", label: { en: "About",     ru: "О нас",     uz: "Biz haqimizda" } },
  { href: "/contact",   num: "03", label: { en: "Contact",   ru: "Контакты",  uz: "Kontaktlar"    } },
  { href: "/directing", num: "04", label: { en: "Directing", ru: "Режиссура", uz: "Direktorlash"  } },
  { href: "/newsPage",  num: "05", label: { en: "News",      ru: "Новости",   uz: "Yangiliklar"   } },
];

const LANGS = ["en", "ru", "uz"];

export default function Header() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("bg-gray-900",   darkMode);
    document.body.classList.toggle("text-white",    darkMode);
    document.body.classList.toggle("bg-white",      !darkMode);
    document.body.classList.toggle("text-gray-900", !darkMode);
  }, [darkMode]);

  /* Scroll lock when menu open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navLinkColor = darkMode
    ? "text-white hover:text-blue-300"
    : scrolled
      ? "text-gray-800 hover:text-blue-500"
      : "text-white hover:text-blue-200";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .bebas { font-family: 'Bebas Neue', sans-serif; }

        /* Mobile menu slide down */
        .mobile-menu {
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.35s cubic-bezier(.16,1,.3,1), opacity 0.3s ease;
        }
        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* Staggered link reveal */
        @keyframes linkIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .nav-link-item {
          opacity: 0;
          animation: linkIn 0.4s cubic-bezier(.16,1,.3,1) forwards;
        }

        /* Desktop underline */
        .nav-underline::after {
          content: '';
          position: absolute;
          bottom: 0; left: 16px; right: 16px;
          height: 2px;
          background: #60a5fa;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .nav-underline:hover::after { transform: scaleX(1); }
      `}</style>

      {/* ══════════════════════════════
          HEADER — z-[100] en yuqori
      ══════════════════════════════ */}
      <header
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? darkMode
              ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
              : "backdrop-blur-md shadow-md shadow-blue-200/40"
            : "bg-transparent"
        }`}
        style={scrolled && !darkMode ? {
          background: "linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(96, 165, 250) 100%)"
        } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 sm:py-3">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src={Logo}
                alt="WBK Logo"
                className="h-[56px] sm:h-[80px] w-[56px] sm:w-[80px] rounded-full bg-white object-contain shadow-md"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-underline relative px-4 py-2 text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${navLinkColor}`}
                >
                  {link.label[language]}
                </Link>
              ))}
            </nav>

            {/* Desktop controls */}
            <div className="hidden sm:flex items-center gap-3">
              <div className={`flex rounded-full overflow-hidden border ${
                darkMode ? "border-gray-600" : scrolled ? "border-gray-200" : "border-white/30"
              }`}>
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      language === l
                        ? "bg-blue-400 text-white"
                        : darkMode
                          ? "text-gray-300 hover:text-white"
                          : scrolled
                            ? "text-gray-500 hover:text-gray-800"
                            : "text-white/70 hover:text-white"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                    : scrolled
                      ? "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-500"
                      : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {darkMode ? <MdLightMode /> : <MdDarkMode />}
              </button>
            </div>

            {/* ── Mobile hamburger — z-[110] har doim ustida ── */}
            <button
              onClick={() => setOpen(prev => !prev)}
              aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
              className="sm:hidden z-[110] relative w-10 h-10 flex flex-col justify-center items-center gap-[6px] focus:outline-none"
            >
              {/* Chiziq 1 */}
              <span
                className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
                  open ? "rotate-45 translate-y-2 bg-white"
                    : scrolled || darkMode ? "bg-gray-800" : "bg-white"
                }`}
              />
              {/* Chiziq 2 */}
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ${
                  open ? "w-0 opacity-0"
                    : "w-6 opacity-100 " + (scrolled || darkMode ? "bg-gray-800" : "bg-white")
                }`}
              />
              {/* Chiziq 3 */}
              <span
                className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
                  open ? "-rotate-45 -translate-y-2 bg-white"
                    : scrolled || darkMode ? "bg-gray-800" : "bg-white"
                }`}
              />
            </button>

          </div>
        </div>
      </header>

      {/* ══════════════════════════════
          MOBILE MENU — sahifaning
          70% ini qoplaydi, tepada header ko'rinib turadi
      ══════════════════════════════ */}
      <div
        className={`sm:hidden fixed top-0 left-0 right-0 z-[90] mobile-menu ${open ? "open" : ""}`}
        style={{ height: "75vh" }}
      >
        {/* Fon */}
        <div className={`absolute inset-0 ${darkMode ? "bg-gray-950" : "bg-[#1a3a6b]"}`} />

        {/* Dekorativ diagonal */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ background: "linear-gradient(135deg, transparent 50%, #60a5fa 100%)" }}
        />

        {/* Katta bg yozuv */}
        <div
          className="absolute bottom-4 right-4 bebas leading-none select-none pointer-events-none text-white/[0.04]"
          style={{ fontSize: "clamp(80px, 25vw, 140px)" }}
        >
          WBK
        </div>

        {/* Kontent */}
        <div className="relative z-10 flex flex-col h-full px-6 pt-24 pb-6">

          {/* Nav links */}
          <nav className="flex flex-col flex-1 justify-center gap-0">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="nav-link-item group flex items-baseline gap-3 py-3 border-b border-white/10"
                style={{ animationDelay: open ? `${i * 0.06 + 0.05}s` : "0s" }}
              >
                <span className="text-blue-300 text-[10px] font-bold tracking-widest shrink-0 transition-colors group-hover:text-white">
                  {link.num}
                </span>
                <span
                  className="bebas text-white tracking-wide transition-all duration-300 group-hover:text-blue-300 group-hover:translate-x-1.5 inline-block"
                  style={{ fontSize: "clamp(28px, 7.5vw, 44px)" }}
                >
                  {link.label[language]}
                </span>
                <span className="ml-auto text-white/25 text-base transition-all duration-300 group-hover:text-blue-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom: til + dark mode */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex gap-1.5">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-200 ${
                    language === l
                      ? "bg-blue-400 text-white"
                      : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg transition-all duration-300"
            >
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </div>

        </div>
      </div>

      {/* Backdrop — menyu tashqarisiga bosganda yopiladi */}
      {open && (
        <div
          className="sm:hidden fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}