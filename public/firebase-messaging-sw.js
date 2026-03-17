// public/firebase-messaging-sw.js
// Bu fayl public/ papkasiga joylashtirilishi kerak

importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Firebase config — o'zingiznikini qo'ying
firebase.initializeApp({
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const messaging = firebase.messaging();

/* Background push notification — ilova yopiq bo'lsa ham ishlaydi */
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};

  self.registration.showNotification(title || "WBK & BOKA", {
    body:    body  || "Yangi yangilik bor!",
    icon:    icon  || "/logo-or.png",
    badge:   "/logo-or.png",
    vibrate: [200, 100, 200],
    data:    payload.data || {},
    actions: [
      { action: "open",  title: "O'qish" },
      { action: "close", title: "Yopish" },
    ],
  });
});

/* Notification bosilganda saytga o'tish */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "open" || !event.action) {
    event.waitUntil(
      clients.openWindow("/newsPage")
    );
  }
});