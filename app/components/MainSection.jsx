'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

const images = [
  { src: "img-5.jpg", alt: "Restaurant interior" },
  { src: "img-2.jpg", alt: "VIP lounge" },
  { src: "img-3.jpg", alt: "Bar area" },
  { src: "img-6.jpg", alt: "Dining hall" },
];

const TICKER_WORDS = [
  "NEWS", "WBK", "DUNYO BELBOGLI KURASH", "WBK", "WORLD CHAMPIONSHIP 2026",
  "WBK", "TOSHKENT GRAND PRIX", "WBK", "KURASH YANGILIKLARI", "WBK",
  "SPORT XABARLARI", "WBK", "UWF RASMIY SAYTI", "WBK",
];

export default function MainSection() {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const fadeClass = () =>
    `transition-all duration-700 ease-out ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;

  const fadeStyle = (delay = 0) => ({
    transitionDelay: `${delay}ms`,
  });

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

      <section className="min-h-screen bg-[#f7f5f2] flex items-center font-montserrat py-16 px-4 sm:px-8 lg:px-16">
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
              <TextContent/>
            </div>

          </div>

          {/* TABLET */}
          <div className="hidden md:flex lg:hidden flex-col gap-10">

            <div className={`text-center ${fadeClass()}`} style={fadeStyle(100)}>
              <TextContent center/>
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
              <TextContent center/>
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

function TextContent({ center = false }) {

  const alignClass = center ? "text-center items-center" : "items-start";

  return (
    <div className={`flex flex-col ${alignClass}`}>

      <span className="font-montserrat text-[10px] sm:text-xs tracking-[6px] uppercase text-gray-400 mb-2">
        About to
      </span>

      <h2 className="font-cormorant text-5xl sm:text-6xl font-semibold text-[#1a1a1a] leading-none tracking-wide">
        WBK<span className="text-blue-400">&</span>BOKA
      </h2>

      <div className={`w-12 h-px bg-[#679eeb] mt-6 mb-6 ${center ? "mx-auto" : ""}`}/>

      <p className={`font-montserrat text-sm font-light leading-[1.9] text-gray-500 mb-4 ${center ? "max-w-sm mx-auto" : "max-w-sm"}`}>
        Dunyo Belbog'li Kurash Bel Olish Kurashi Asotsiatsiyasi – kurashni rivojlantirish,
        xalqaro turnirlar tashkil etish va sportchilarni
        qo'llab-quvvatlashga bag'ishlangan global tashkilot.
      </p>

      <p className={`font-montserrat text-sm font-light leading-[1.9] text-gray-500 mb-8 ${center ? "max-w-sm mx-auto" : "max-w-sm"}`}>
        Biz har bir sportchi uchun eng yaxshi sharoitlarni yaratib,
        kurash sportini jahon miqyosida yangi bosqichga olib chiqamiz.
      </p>

      <Link href="/about">
      <button className="font-montserrat text-[10px] sm:text-[11px] font-medium tracking-[3px] uppercase border border-blue-400 text-blue-400 px-8 sm:px-10 py-3 sm:py-3.5 rounded-[8px] hover:bg-blue-500 hover:border-gray-400 hover:text-[#f7f5f2] transition-all duration-300 cursor-pointer">
        Batafsil →
      </button>
      </Link>

    </div>
  );
}


