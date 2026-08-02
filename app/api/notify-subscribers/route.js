import { NextResponse } from "next/server";
import { adminDb } from "../../lib/firebase-admin";
import { sendNewsToAllSubscribers } from "../../lib/emailService";

export async function POST(request) {
  try {
    const { newsTitle, newsExcerpt, newsDate } = await request.json();

    if (!newsTitle) {
      return NextResponse.json({ error: "newsTitle is required" }, { status: 400 });
    }

    const snap = await adminDb
      .collection("subscribers")
      .where("active", "==", true)
      .get();

    const subscribers = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    if (subscribers.length === 0) {
      return NextResponse.json({ success: 0, failed: 0, total: 0 });
    }

    const results = await sendNewsToAllSubscribers({
      subscribers,
      newsTitle,
      newsExcerpt,
      newsDate,
    });

    return NextResponse.json({ ...results, total: subscribers.length });
  } catch (error) {
    console.error("Notify subscribers API error:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}