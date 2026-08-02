// lib/subscriberService.js
// Firestore da obunchilarni boshqarish

import { db } from "./firebase";
import {
  collection, addDoc, getDocs, deleteDoc,
  doc, query, where, serverTimestamp,
} from "firebase/firestore";

const COL = "subscribers";

/* ── Yangi obunchi qo'shish ──
   Eslatma: bu endi to'g'ridan-to'g'ri Firestore'ga yozmaydi (buni Firestore
   Security Rules bloklashi mumkin edi va aynan shu "Xatolik yuz berdi"
   xatosiga sabab bo'lgan). Endi imtiyozli (admin) huquqqa ega server API
   route orqali yoziladi — /app/api/subscribe/route.js */
export async function addSubscriber({ email, name = "", language = "uz" }) {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, language }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "subscribe_failed");
  }

  return res.json(); // { success: true } yoki { success:false, reason:"already_subscribed" }
}

/* ── Email allaqachon obunami? ── */
export async function isSubscribed(email) {
  const q = query(
    collection(db, COL),
    where("email", "==", email.toLowerCase().trim()),
    where("active", "==", true)
  );
  const snap = await getDocs(q);
  return !snap.empty;
}

/* ── Barcha faol obunchilarni olish ── */
export async function getAllSubscribers() {
  const q    = query(collection(db, COL), where("active", "==", true));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/* ── Obunani bekor qilish ── */
export async function unsubscribe(email) {
  const q    = query(collection(db, COL), where("email", "==", email.toLowerCase().trim()));
  const snap = await getDocs(q);
  for (const d of snap.docs) {
    await deleteDoc(doc(db, COL, d.id));
  }
  return true;
}