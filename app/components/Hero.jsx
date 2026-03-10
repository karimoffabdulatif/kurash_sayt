'use client';
import { useState, useEffect } from "react";
import Image from "next/image";



const slides = [
  {
    title: "Welcome to Our Site",
    subtitle: "This is the hero section.",
    img: "/banner-1.jpg",
  },
  {
    title: "Discover Features",
    subtitle: "Learn what we offer.",
    img: "/banner-2.png",
  },
  {
    title: "Join Our Community",
    subtitle: "Be a part of something big.",
    img: "/banner-3.jpg",
  },
  {
    title: "Join Our Community",
    subtitle: "Be a part of something big.",
    img: "/banner43.jpg",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Automatic slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 soniya
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${slide.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="h-full w-full bg-black/40 flex items-center justify-center px-4 sm:px-6">
            <div className="text-center text-white max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl">{slide.subtitle}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              idx === current ? "bg-white" : "bg-gray-500 hover:bg-white/70"
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </section>
  );
}
