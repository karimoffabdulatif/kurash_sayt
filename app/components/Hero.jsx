'use client';
import { useState, useEffect } from "react";
import { useApp } from "../contex/AppContext";

const slides = {
  uz: [
    { title: "WBK & BOKA Rasmiy Sayti",       subtitle: "Dunyo Belbog'li Kurashi va Bel Olish Kurashi Asotsiyatsiyasi",  img: "/img-2.jpg" },
    { title: "Xalqaro Musobaqalar",            subtitle: "Dunyoning eng yaxshi kurashchilari bir maydonda.",               img: "/img-3.jpg" },
    { title: "Bizning Jamiyatga Qo'shiling",   subtitle: "Kurash sportini birga rivojlantiramiz.",                         img: "/img-6.jpg" },
    { title: "Yangiliklar va Tadbirl ar",      subtitle: "So'nggi xabarlar va turnirlardan boxabar bo'ling.",              img: "/img-5.jpg" },
  ],
  en: [
    { title: "Official WBK & BOKA Website",   subtitle: "World Kurash Belt Wrestling Association",                        img: "/img-2.jpg" },
    { title: "International Competitions",    subtitle: "The world's best wrestlers on one stage.",                        img: "/img-3.jpg" },
    { title: "Join Our Community",            subtitle: "Together we develop Kurash sport.",                               img: "/img-6.jpg" },
    { title: "News and Events",               subtitle: "Stay up to date with the latest news and tournaments.",           img: "/img-5.jpg" },
  ],
  ru: [
    { title: "Официальный сайт WBK & BOKA",  subtitle: "Всемирная Ассоциация Борьбы Кураш",                              img: "/img-2.jpg" },
    { title: "Международные соревнования",   subtitle: "Лучшие борцы мира на одной арене.",                               img: "/img-3.jpg" },
    { title: "Присоединяйтесь к нам",        subtitle: "Вместе развиваем кураш.",                                         img: "/img-6.jpg" },
    { title: "Новости и события",             subtitle: "Будьте в курсе последних новостей и турниров.",                   img: "/img-5.jpg" },
  ],
};

export default function Hero() {
  const { darkMode, language } = useApp();
  const [current, setCurrent] = useState(0);
  const currentSlides = slides[language];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % currentSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [language]);

  // til o'zgarganda current reset
  useEffect(() => { setCurrent(0); }, [language]);

  // dark modeda overlay quyuqroq
  const overlayOpacity = darkMode ? "brightness(20%)" : "brightness(30%)";

  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {currentSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Rasm + overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: overlayOpacity,
            }}
          />

          {/* Dark mode qo'shimcha overlay */}
          {darkMode && (
            <div className="absolute inset-0 bg-[#0a1628]/40" />
          )}

          {/* Content */}
          <div className="relative h-full w-full flex items-center justify-center px-4 sm:px-6">
            <div className="text-center text-white max-w-3xl z-20">
              <p className="text-[11px] sm:text-xs tracking-[4px] sm:tracking-[6px] uppercase text-blue-300 mb-3 sm:mb-4 font-medium">
                WBK & BOKA
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-5 leading-tight tracking-tight">
                {slide.title}
              </h1>
              <div className="w-12 h-0.5 bg-blue-400 mx-auto mb-4 sm:mb-5" />
              <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 z-20">
        {currentSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === current
                ? "bg-blue-400 w-6 h-3"
                : "bg-white/40 hover:bg-white/70 w-3 h-3"
            }`}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
      

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10 z-20">
        <div
          key={current}
          className="h-full bg-blue-400"
          style={{ animation: "progress 5s linear forwards" }}
        />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}