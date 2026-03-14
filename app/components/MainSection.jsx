'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useApp } from "../contex/AppContext";

const images = [
  { src: "img-5.jpg", alt: "Restaurant interior" },
  { src: "img-2.jpg", alt: "VIP lounge" },
  { src: "img-3.jpg", alt: "Bar area" },
  { src: "img-6.jpg", alt: "Dining hall" },
];

const T = {
  about:  { uz: "Haqida",   en: "About",   ru: "О нас"    },
  title:  { uz: "WBK",      en: "WBK",     ru: "WBK"      },
  desc1: {
    uz: "Dunyo Belbog'li Kurash Bel Olish Kurashi Asotsiatsiyasi – kurashni rivojlantirish, xalqaro turnirlar tashkil etish va sportchilarni qo'llab-quvvatlashga bag'ishlangan global tashkilot.",
    en: "The World Kurash Belt Wrestling Association is a global organization dedicated to developing Kurash, organizing international tournaments, and supporting athletes.",
    ru: "Всемирная Ассоциация Борьбы Кураш — глобальная организация, посвящённая развитию кураша, проведению международных турниров и поддержке спортсменов.",
  },
  desc2: {
    uz: "Biz har bir sportchi uchun eng yaxshi sharoitlarni yaratib, kurash sportini jahon miqyosida yangi bosqichga olib chiqamiz.",
    en: "We create the best conditions for every athlete and take Kurash to a new level on the world stage.",
    ru: "Мы создаём лучшие условия для каждого спортсмена и выводим кураш на новый уровень в мировом масштабе.",
  },
  btn: { uz: "Batafsil →", en: "Learn more →", ru: "Подробнее →" },
};

export default function MainSection() {
  const { darkMode, language } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const fadeClass = () =>
    `transition-all duration-700 ease-out ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;

  const fadeStyle = (delay = 0) => ({ transitionDelay: `${delay}ms` });

  const bg       = darkMode ? "bg-[#0a1628]"   : "bg-[#f7f5f2]";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .img-zoom { overflow: hidden; }
        .img-zoom img {
          transition: transform 0.7s ease, filter 0.7s ease;
          filter: brightness(0.88);
        }
        .img-zoom:hover img {
          transform: scale(1.06);
          filter: brightness(1);
        }
      `}</style>

      <section className={`min-h-screen ${bg} flex items-center font-montserrat py-16 px-4 sm:px-8 lg:px-16 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto w-full">

          {/* DESKTOP */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-14 items-center">
            <div className="grid grid-cols-2 gap-2" style={{ gridTemplateRows: "220px 220px 190px" }}>
              <div className={`img-zoom row-span-2 ${fadeClass()}`} style={fadeStyle(100)}>
                <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover"/>
              </div>
              <div className={`img-zoom ${fadeClass()}`} style={fadeStyle(200)}>
                <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover"/>
              </div>
              <div className={`img-zoom ${fadeClass()}`} style={fadeStyle(300)}>
                <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover"/>
              </div>
              <div className={`img-zoom col-span-2 ${fadeClass()}`} style={fadeStyle(400)}>
                <img src={images[3].src} alt={images[3].alt} className="w-full h-full object-cover"/>
              </div>
            </div>
            <div className={`pl-6 ${fadeClass()}`} style={fadeStyle(300)}>
              <TextContent darkMode={darkMode} language={language} />
            </div>
          </div>

          {/* TABLET */}
          <div className="hidden md:flex lg:hidden flex-col gap-10">
            <div className={`text-center ${fadeClass()}`} style={fadeStyle(100)}>
              <TextContent center darkMode={darkMode} language={language} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {images.map((img, i) => (
                <div key={i} className={`img-zoom h-52 ${fadeClass()}`} style={fadeStyle(200 + i * 100)}>
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover"/>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE */}
          <div className="flex md:hidden flex-col gap-6">
            <div className={`${fadeClass()}`} style={fadeStyle(100)}>
              <TextContent center darkMode={darkMode} language={language} />
            </div>
            <div className={`img-zoom h-56 ${fadeClass()}`} style={fadeStyle(200)}>
              <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover"/>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className={`img-zoom h-36 ${fadeClass()}`} style={fadeStyle(300)}>
                <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover"/>
              </div>
              <div className={`img-zoom h-36 ${fadeClass()}`} style={fadeStyle(350)}>
                <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover"/>
              </div>
            </div>
            <div className={`img-zoom h-44 ${fadeClass()}`} style={fadeStyle(400)}>
              <img src={images[3].src} alt={images[3].alt} className="w-full h-full object-cover"/>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

function TextContent({ center = false, darkMode, language }) {
  const alignClass  = center ? "text-center items-center" : "items-start";
  const textMain    = darkMode ? "text-white"       : "text-[#1a1a1a]";
  const textSub     = darkMode ? "text-blue-200/70" : "text-gray-500";
  const labelColor  = darkMode ? "text-blue-300"    : "text-gray-400";
  const btnClass    = darkMode
    ? "border-blue-400 text-blue-400 hover:bg-blue-500 hover:border-blue-500 hover:text-white"
    : "border-blue-400 text-blue-400 hover:bg-blue-500 hover:border-gray-400 hover:text-[#f7f5f2]";

  return (
    <div className={`flex flex-col ${alignClass}`}>
      <span className={`font-montserrat text-[10px] sm:text-xs tracking-[6px] uppercase ${labelColor} mb-2`}>
        {T.about[language]}
      </span>

      <h2 className={`font-cormorant text-5xl sm:text-6xl font-semibold ${textMain} leading-none tracking-wide`}>
        WBK<span className="text-blue-400">&</span>BOKA
      </h2>

      <div className={`w-12 h-px bg-[#679eeb] mt-6 mb-6 ${center ? "mx-auto" : ""}`} />

      <p className={`font-montserrat text-sm font-light leading-[1.9] ${textSub} mb-4 ${center ? "max-w-sm mx-auto" : "max-w-sm"}`}>
        {T.desc1[language]}
      </p>

      <p className={`font-montserrat text-sm font-light leading-[1.9] ${textSub} mb-8 ${center ? "max-w-sm mx-auto" : "max-w-sm"}`}>
        {T.desc2[language]}
      </p>

      <Link href="/about">
        <button className={`font-montserrat text-[10px] sm:text-[11px] font-medium tracking-[3px] uppercase border px-8 sm:px-10 py-3 sm:py-3.5 rounded-[8px] transition-all duration-300 cursor-pointer ${btnClass}`}>
          {T.btn[language]}
        </button>
      </Link>
    </div>
  );
}