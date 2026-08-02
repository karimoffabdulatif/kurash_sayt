/**
 * Yangilikning media massivini qaytaradi.
 * Yangi format: item.media = [{ type: "image"|"video", url, w, h, position, scale }, ...]
 * Eski format (orqaga moslik): item.img + item.mediaType + item.imgPosition + item.imgScale
 */
export function getMediaArray(item) {
  if (!item) return [];
  if (Array.isArray(item.media) && item.media.length > 0) return item.media;
  if (item.img) {
    return [
      {
        type: item.mediaType === "video" ? "video" : "image",
        url: item.img,
        w: item.imgW || null,
        h: item.imgH || null,
        position: item.imgPosition || "50% 50%",
        scale: item.imgScale ?? 1,
      },
    ];
  }
  return [];
}

/**
 * Media eniga qarab balandlik nisbatini (aspect-ratio) hisoblaydi,
 * juda ingichka yoki juda cho'ziq bo'lib ketmasligi uchun chegaralaydi.
 */
export function clampRatio(w, h, min = 0.6, max = 2.2, fallback = 4 / 3) {
  if (!w || !h) return fallback;
  const r = w / h;
  if (!isFinite(r) || r <= 0) return fallback;
  return Math.min(max, Math.max(min, r));
}