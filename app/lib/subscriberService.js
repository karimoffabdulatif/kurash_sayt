// lib/subscriberService.js
// Firestore da obunchilarni boshqarish

import { db } from "./firebase";
import {
  collection, addDoc, getDocs, deleteDoc,
  doc, query, where, serverTimestamp,
} from "firebase/firestore";

const COL = "subscribers";

/* ── Yangi obunchi qo'shish ── */
export async function addSubscriber({ email, name = "", language = "uz" }) {
  // Avval bu email allaqachon bormi tekshir
  const exists = await isSubscribed(email);
  if (exists) return { success: false, reason: "already_subscribed" };

  await addDoc(collection(db, COL), {
    email:     email.toLowerCase().trim(),
    name,
    language,
    createdAt: serverTimestamp(),
    active:    true,
  });

  return { success: true };
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