// lib/pushService.js
// Firebase Cloud Messaging (FCM) push notification

import { db } from "./firebase";
import {
  collection, addDoc, getDocs, deleteDoc,
  doc, query, where, serverTimestamp,
} from "firebase/firestore";

const PUSH_COL = "pushTokens";

/* ── Push ruxsati so'rash va token saqlash ── */
export async function subscribeToPush(language = "uz") {
  try {
    /* 1. firebase/messaging import — faqat client side da */
    const { getMessaging, getToken } = await import("firebase/messaging");
    const { getApp } = await import("firebase/app");

    const messaging = getMessaging(getApp());

    /* 2. Brauzerdan ruxsat so'rash */
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return { success: false, reason: "permission_denied" };
    }

    /* 3. FCM token olish */
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    if (!token) return { success: false, reason: "no_token" };

    /* 4. Token allaqachon bormi? */
    const q    = query(collection(db, PUSH_COL), where("token", "==", token));
    const snap = await getDocs(q);
    if (!snap.empty) return { success: true, reason: "already_subscribed" };

    /* 5. Firestore ga saqlash */
    await addDoc(collection(db, PUSH_COL), {
      token,
      language,
      createdAt: serverTimestamp(),
      active:    true,
    });

    return { success: true };
  } catch (e) {
    console.error("Push subscription error:", e);
    return { success: false, reason: e.message };
  }
}

/* ── Barcha push tokenlarni olish ── */
export async function getAllPushTokens() {
  const q    = query(collection(db, PUSH_COL), where("active", "==", true));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/* ── FCM orqali push yuborish (Brevo API key bilan emas, Firebase Admin SDK kerak)
   Spark planda Cloud Functions yo'q, shuning uchun
   Firebase REST API orqali yuboramiz ── */
export async function sendPushToAll({ title, body, language }) {
  const tokens = await getAllPushTokens();
  if (tokens.length === 0) return { success: 0, failed: 0 };

  const results = { success: 0, failed: 0 };

  /* FCM v1 API — har bir tokenga alohida yuborish */
  const FIREBASE_SERVER_KEY = process.env.NEXT_PUBLIC_FIREBASE_SERVER_KEY;

  for (const t of tokens) {
    try {
      const res = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `key=${FIREBASE_SERVER_KEY}`,
        },
        body: JSON.stringify({
          to: t.token,
          notification: {
            title: title[t.language] || title.uz || title,
            body:  body[t.language]  || body.uz  || body,
            icon:  "/logo-or.png",
            click_action: "https://wbkboka.com/newsPage",
          },
          data: { language: t.language },
        }),
      });

      const data = await res.json();
      if (data.success === 1) results.success++;
      else results.failed++;
    } catch (e) {
      results.failed++;
    }
  }

  return results;
}