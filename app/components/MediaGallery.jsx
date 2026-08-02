'use client';
import React from "react";
import { clampRatio } from "../lib/mediaUtils";

/* Play belgisi — video ustida */
function PlayBadge({ size = 14 }) {
  const circle = size * 4;
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
        style={{ width: circle, height: circle }}
      >
        <div
          className="ml-1"
          style={{
            width: 0,
            height: 0,
            borderTop: `${size * 0.65}px solid transparent`,
            borderBottom: `${size * 0.65}px solid transparent`,
            borderLeft: `${size}px solid white`,
          }}
        />
      </div>
    </div>
  );
}

function MediaItem({ item, alt, hovered, controls, playSize = 14 }) {
  const zoomStyle = {
    transform: hovered ? "scale(1.045)" : "scale(1)",
    transition: "transform .6s ease",
  };

  if (item.type === "video") {
    return (
      <>
        <video
          src={item.url}
          className="absolute inset-0 w-full h-full object-cover"
          muted={!controls}
          controls={controls}
          playsInline
          style={zoomStyle}
        />
        {!controls && <PlayBadge size={playSize} />}
      </>
    );
  }
  return (
    <img
      src={item.url}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ objectPosition: item.position || "50% 50%", ...zoomStyle }}
    />
  );
}

/**
 * Bir nechta rasm / video ko'rsatadigan galereya.
 * Konteyner o'lchami media (rasm/video)ning o'z proporsiyasiga (aspect-ratio) qarab olinadi —
 * karta media uchun emas, media karta uchun cho'zilmaydi.
 *
 * Props:
 *  - media: [{ type, url, w, h, position }]
 *  - alt: string
 *  - hovered: bool — hover paytida yengil zoom effekti
 *  - controls: bool — true bo'lsa video to'liq controls bilan (faqat 1 ta media bo'lganda ma'noli)
 *  - minRatio/maxRatio: aspect-ratio chegaralari
 *  - className: tashqi konteyner uchun qo'shimcha klass
 *  - children: overlay (badge, gradient va h.k.) — konteyner ichida absolute joylashadi
 */
export default function MediaGallery({
  media = [],
  alt = "",
  hovered = false,
  controls = false,
  minRatio = 0.6,
  maxRatio = 2.2,
  className = "",
  children,
}) {
  if (!media || media.length === 0) return null;

  const primary = media[0];
  const ratio = clampRatio(
    primary.w,
    primary.h,
    primary.type === "video" ? Math.min(minRatio, 0.5625) : minRatio,
    maxRatio
  );
  const count = media.length;
  const extra = count > 4 ? count - 4 : 0;

  return (
    <div
      className={`relative overflow-hidden w-full ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {count === 1 && (
        <div className="absolute inset-0">
          <MediaItem item={primary} alt={alt} hovered={hovered} controls={controls} playSize={16} />
        </div>
      )}

      {count === 2 && (
        <div className="absolute inset-0 grid grid-cols-2 gap-[2px]">
          {media.slice(0, 2).map((m, i) => (
            <div key={i} className="relative overflow-hidden">
              <MediaItem item={m} alt={alt} hovered={hovered} controls={false} playSize={12} />
            </div>
          ))}
        </div>
      )}

      {count === 3 && (
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[2px]">
          <div className="relative overflow-hidden row-span-2">
            <MediaItem item={media[0]} alt={alt} hovered={hovered} controls={false} playSize={14} />
          </div>
          <div className="relative overflow-hidden">
            <MediaItem item={media[1]} alt={alt} hovered={hovered} controls={false} playSize={10} />
          </div>
          <div className="relative overflow-hidden">
            <MediaItem item={media[2]} alt={alt} hovered={hovered} controls={false} playSize={10} />
          </div>
        </div>
      )}

      {count >= 4 && (
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[2px]">
          {media.slice(0, 4).map((m, i) => (
            <div key={i} className="relative overflow-hidden">
              <MediaItem item={m} alt={alt} hovered={hovered} controls={false} playSize={10} />
              {i === 3 && extra > 0 && (
                <div className="absolute inset-0 bg-black/55 flex items-center justify-center pointer-events-none">
                  <span className="text-white font-black text-lg sm:text-xl">+{extra}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}