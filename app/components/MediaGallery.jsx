'use client';
import React, { useState, useRef } from "react";
import { clampRatio } from "../lib/mediaUtils";
import { MdPlayArrow, MdPause } from "react-icons/md";

/* Video ustidagi Play tugmasi */
function PlayBadge({ playing, onTogglePlay }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onTogglePlay();
      }}
      className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/40 transition-colors z-20 cursor-pointer group"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600/90 group-hover:bg-blue-500 text-white flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
        {playing ? (
          <MdPause className="w-7 h-7" />
        ) : (
          <MdPlayArrow className="w-8 h-8 ml-0.5" />
        )}
      </div>
    </button>
  );
}

function MediaItem({ item, alt, hovered }) {
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
      setShowControls(true);
    }
  };

  const fit = item.fit || "contain";
  const scale = fit === "cover" ? Math.max(item.scale ?? 1, 1) : item.scale ?? 1;
  const zoomStyle = {
    transform: hovered && !playing ? `scale(${scale * 1.03})` : `scale(${scale})`,
    transition: "transform .5s ease",
  };

  const fitClass = fit === "cover" ? "object-cover" : "object-contain";

  if (item.type === "video") {
    return (
      <div className="relative w-full h-full group overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <video
          ref={videoRef}
          src={item.url}
          className={`w-full h-full ${fitClass}`}
          controls={showControls}
          playsInline
          onPlay={() => { setPlaying(true); setShowControls(true); }}
          onPause={() => setPlaying(false)}
          style={zoomStyle}
        />
        {!showControls && (
          <PlayBadge playing={playing} onTogglePlay={togglePlay} />
        )}
      </div>
    );
  }

  return (
    <img
      src={item.url}
      alt={alt}
      className={`absolute inset-0 w-full h-full ${fitClass}`}
      style={{ objectPosition: item.position || "50% 50%", ...zoomStyle }}
    />
  );
}

function getMediaRatio(item) {
  if (item?.w && item?.h) return item.w / item.h;
  const width = item?.type === "video" ? 16 : 4;
  const height = item?.type === "video" ? 9 : 3;
  return width / height;
}

/**
 * MediaGallery — rasm va videolarni to'liq to'ldirib, rasm TEPADA, video PASTDA formatda ko'rsatuvchi galereya.
 */
export default function MediaGallery({
  media = [],
  alt = "",
  hovered = false,
  minRatio = 0.6,
  maxRatio = 2.2,
  className = "",
  fillContainer = false,
  children,
}) {
  if (!media || media.length === 0) return null;

  const count = media.length;
  
  // Media tartibini tekshiramiz: Rasm har doim TEPADA (row 1), Video PASTDA (row 2) bo'lsin
  let displayMedia = [...media];
  if (count === 2) {
    const firstIsVideo = displayMedia[0]?.type === "video";
    const secondIsImg  = displayMedia[1]?.type === "image";
    if (firstIsVideo && secondIsImg) {
      displayMedia = [displayMedia[1], displayMedia[0]];
    }
  }

  const primary = displayMedia[0];
  const ratio = primary?.w && primary?.h
    ? getMediaRatio(primary)
    : clampRatio(primary?.w || 4, primary?.h || 3, minRatio, maxRatio);

  const extra = count > 4 ? count - 4 : 0;

  return (
    <div
      className={`relative overflow-hidden w-full ${className}`}
      style={count === 1 || fillContainer ? { aspectRatio: ratio } : undefined}
    >
      {count === 1 && (
        <div className="absolute inset-0">
          <MediaItem item={primary} alt={alt} hovered={hovered} />
        </div>
      )}

      {/* 2 ta media bo'lsa: Rasm TEPADA, Video PASTDA */}
      {count === 2 && (
        <div className="relative flex flex-col gap-[2px]">
          {displayMedia.slice(0, 2).map((m, i) => (
            <div key={i} className="relative overflow-hidden w-full" style={{ aspectRatio: getMediaRatio(m) }}>
              <MediaItem item={m} alt={alt} hovered={hovered} />
            </div>
          ))}
        </div>
      )}

      {count === 3 && (
        <div className="relative flex flex-col gap-[2px]">
          {displayMedia.slice(0, 3).map((m, i) => (
            <div key={i} className="relative overflow-hidden w-full" style={{ aspectRatio: getMediaRatio(m) }}>
              <MediaItem item={m} alt={alt} hovered={hovered} />
            </div>
          ))}
        </div>
      )}

      {count >= 4 && (
        <div className="relative flex flex-col gap-[2px]">
          {displayMedia.slice(0, 4).map((m, i) => (
            <div key={i} className="relative overflow-hidden w-full" style={{ aspectRatio: getMediaRatio(m) }}>
              <MediaItem item={m} alt={alt} hovered={hovered} />
              {i === 3 && extra > 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none z-10">
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
