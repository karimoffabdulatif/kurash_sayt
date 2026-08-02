import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Admin SDK — faqat server da ishlaydi
if (!getApps().length) {
  const rawKey = process.env.FIREBASE_PRIVATE_KEY || "";
  const cleanedKey = rawKey.replace(/^"|"$/g, "").replace(/\\n/g, "\n");

  initializeApp({
    credential: cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:  cleanedKey,
    }),
  });
}

export const adminDb = getFirestore();