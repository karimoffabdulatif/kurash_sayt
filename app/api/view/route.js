import { NextResponse } from "next/server";
import { adminDb } from "../../lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { createHash } from "crypto";

const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 soat

function getIP(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const real      = request.headers.get("x-real-ip");
  const ip = forwarded ? forwarded.split(",")[0].trim() : real ?? "unknown";
  return ip;
}

function hashIP(ip) {
  return createHash("sha256")
    .update(ip + "wbk-salt-2026")
    .digest("hex")
    .slice(0, 16);
}

export async function POST(request) {
  try {
    const { newsId } = await request.json();

    if (!newsId || typeof newsId !== "string") {
      return NextResponse.json({ error: "Invalid newsId" }, { status: 400 });
    }

    const ip     = getIP(request);
    const ipHash = hashIP(ip);
    const logId  = `${newsId}_${ipHash}`;

    const logRef  = adminDb.collection("views_log").doc(logId);
    const logSnap = await logRef.get();
    const now     = Date.now();

    if (logSnap.exists) {
      const lastSeen = logSnap.data().lastSeen?._seconds * 1000 ?? 0;
      if (now - lastSeen < COOLDOWN_MS) {
        return NextResponse.json({ counted: false, reason: "cooldown" });
      }
    }

    // Parallel: views +1 va log yangilash
    const newsRef = adminDb.collection("news").doc(newsId);
    await Promise.all([
      newsRef.update({ views: FieldValue.increment(1) }),
      logRef.set({ newsId, ipHash, lastSeen: FieldValue.serverTimestamp() }),
    ]);

    return NextResponse.json({ counted: true });

  } catch (error) {
    console.error("View API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}