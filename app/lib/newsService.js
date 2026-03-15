import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const NEWS_COL = "news";

// Barcha yangiliklar — yangi birinchi
export async function getNews() {
  const q = query(collection(db, NEWS_COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Ko'rishni server API orqali hisoblash (IP + 24h cooldown)
export async function incrementView(newsId) {
  if (!newsId) return;
  try {
    await fetch("/api/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newsId }),
    });
  } catch (e) {
    // Tarmoq xatosi — jimgina o'tkazib yuboramiz
    console.error("incrementView error:", e);
  }
}

// Yangilik qo'shish
export async function addNewsToDb(item) {
  await addDoc(collection(db, NEWS_COL), {
    ...item,
    views: 0,
    createdAt: serverTimestamp(),
  });
}

// Yangilik o'chirish
export async function deleteNewsFromDb(id) {
  await deleteDoc(doc(db, NEWS_COL, id));
}