// Post qo'yilganidan beri o'tgan vaqtni hisoblash
export function getReadTime(postedAt, language = "uz") {
  if (!postedAt) return "";

  const posted = new Date(postedAt);
  const now    = new Date();
  const diff   = Math.floor((now - posted) / 60000); // minutlarda

  if (language === "uz") {
    if (diff < 1)    return "Hozirgina";
    if (diff < 60)   return `${diff} daq oldin`;
    const h = Math.floor(diff / 60);
    if (h < 24)      return `${h} soat oldin`;
    const d = Math.floor(h / 24);
    if (d < 30)      return `${d} kun oldin`;
    const m = Math.floor(d / 30);
    if (m < 12)      return `${m} oy oldin`;
    return `${Math.floor(m / 12)} yil oldin`;
  }

  if (language === "en") {
    if (diff < 1)    return "Just now";
    if (diff < 60)   return `${diff} min ago`;
    const h = Math.floor(diff / 60);
    if (h < 24)      return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d < 30)      return `${d}d ago`;
    const m = Math.floor(d / 30);
    if (m < 12)      return `${m}mo ago`;
    return `${Math.floor(m / 12)}y ago`;
  }

  if (language === "ru") {
    if (diff < 1)    return "Только что";
    if (diff < 60)   return `${diff} мин назад`;
    const h = Math.floor(diff / 60);
    if (h < 24)      return `${h}ч назад`;
    const d = Math.floor(h / 24);
    if (d < 30)      return `${d}д назад`;
    const m = Math.floor(d / 30);
    if (m < 12)      return `${m}мес назад`;
    return `${Math.floor(m / 12)}л назад`;
  }

  return "";
}