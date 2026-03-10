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
    { href: "/news", label: { en: "News", ru: "Новости", uz: "Yangiliklar" } },
  ];

  // Scroll tracker
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dark / Light mode body class
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
          <div>
            <Image
              src={Logo}
              alt="Logo"
              className="h-[100px] w-[100px] rounded-full bg-white object-contain"
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

          {/* Language + Dark Mode + Mobile */}
          <div className="flex gap-4 items-center">
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-2 py-1 border rounded bg-transparent text-current cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="uz">UZ</option>
            </select>

            {/* Dark / Light Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-2xl transition-colors duration-300 hover:text-blue-500"
            >
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="sm:hidden focus:outline-none"
              aria-label="Toggle menu"
            >
              {open ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="sm:hidden pb-4 flex flex-col gap-2">
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
          </nav>
        )}
      </div>
    </header>
  );
}
