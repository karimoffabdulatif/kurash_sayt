'use client';
import Image from "next/image";
import Logo from "../../public/logo-or.png";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en"); // en / ru / uz

  const links = [
    { href: "/", label: { en: "Home", ru: "Главная", uz: "Bosh sahifa" } },
    { href: "/about", label: { en: "About", ru: "О нас", uz: "Biz haqimizda" } },
    { href: "/contact", label: { en: "Contact", ru: "Контакты", uz: "Kontaktlar" } },
    { href: "/directing", label: { en: "Directing", ru: "Режиссура", uz: "Direktorlash" } },
    { href: "/newsPage", label: { en: "News", ru: "Новости", uz: "Yangiliklar" } },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-white");
      document.body.classList.remove("bg-white", "text-gray-900");
    } else {
      document.body.classList.add("bg-white", "text-gray-900");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
  }, [darkMode]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? darkMode
            ? "bg-gray-900 shadow-lg"
            : "bg-gradient-to-r from-white to-blue-400/80 backdrop-blur shadow-lg"
          : darkMode
            ? "bg-gray-900"
            : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src={Logo}
              alt="Logo"
              className="h-[60px] sm:h-[100px] w-[60px] sm:w-[100px] rounded-full bg-white object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden sm:flex gap-5 text-[18px] tracking-widest">
            {links.map((link) => {
              const linkColor = darkMode
                ? "text-white hover:text-gray-300"
                : scrolled
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-300";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1 transition-colors duration-300 ${linkColor}`}
                >
                  {link.label[language]}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Language + Dark Mode */}
          <div className="hidden sm:flex gap-4 items-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-2 py-1 border rounded bg-transparent text-current cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="uz">UZ</option>
            </select>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-2xl transition-colors duration-300 hover:text-blue-500"
            >
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col justify-between w-7 h-5 focus:outline-none"
            >
              <span
                className={`block h-1 w-full rounded transition-all duration-300 ${
                  open
                    ? "bg-white rotate-45 translate-y-2" // X ochiq holatda doimo oq
                    : scrolled || darkMode
                      ? "bg-gray-900" // yopiq holatda scroll/dark bo'lsa qora
                      : "bg-white" // yopiq holatda default oq
                }`}
              />
              <span
                className={`block h-1 w-full rounded transition-all duration-300 ${
                  open
                    ? "bg-white opacity-0" // X ochiq holatda yashiradi
                    : scrolled || darkMode
                      ? "bg-gray-900"
                      : "bg-white"
                }`}
              />
              <span
                className={`block h-1 w-full rounded transition-all duration-300 ${
                  open
                    ? "bg-white -rotate-45 -translate-y-2" // X ochiq holatda doimo oq
                    : scrolled || darkMode
                      ? "bg-gray-900"
                      : "bg-white"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown like old version */}
        {open && (
          <nav
            className={`sm:hidden flex flex-col gap-2 mt-2 pb-4 p-4 rounded-md shadow-md transition-colors duration-300
              ${darkMode ? "bg-gray-800" : "bg-white"}`}
          >
            {links.map((link) => {
              const mobileLinkColor = darkMode
                ? "text-white hover:text-gray-300"
                : "text-gray-700 hover:text-gray-900";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-2 transition-colors duration-300 ${mobileLinkColor}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label[language]}
                </Link>
              );
            })}

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`mt-2 px-2 py-1 border rounded bg-transparent text-current cursor-pointer`}
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="uz">UZ</option>
            </select>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="mt-2 flex items-center gap-2 text-lg transition-colors duration-300 hover:text-blue-500"
            >
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
              <span className="text-sm">Mode</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
