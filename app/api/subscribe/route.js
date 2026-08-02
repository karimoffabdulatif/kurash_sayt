import { NextResponse } from "next/server";
import { adminDb } from "../../lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

const COL = "subscribers";
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());

export async function POST(request) {
  try {
    const { email, name = "", language = "uz" } = await request.json();

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const col = adminDb.collection(COL);

    // Avval bu email allaqachon faol obuna bo'lganmi tekshiramiz
    const existing = await col
      .where("email", "==", cleanEmail)
      .where("active", "==", true)
      .limit(1)
      .get();

    if (!existing.empty) {
      return NextResponse.json({ success: false, reason: "already_subscribed" });
    }

    await col.add({
      email: cleanEmail,
      name,
      language,
      createdAt: FieldValue.serverTimestamp(),
      active: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe API error:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}