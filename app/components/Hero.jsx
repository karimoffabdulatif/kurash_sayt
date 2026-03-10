'use client';
import { useState, useEffect } from "react";

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
    title: "Explore More",
    subtitle: "Stay tuned for updates.",
    img: "/banner-4.jpg",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Automatic slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Rasm xira bo'lishi va overlay */}
          <div
            className="absolute inset-0 bg-black/90"
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(30%)",
            }}
          ></div>

          {/* Slide content – text doim e’tibor tortadi */}
          <div className="relative h-full w-full flex items-center justify-center px-4 sm:px-6">
            <div className="text-center text-white max-w-3xl z-20">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl">{slide.subtitle}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 z-20">
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
