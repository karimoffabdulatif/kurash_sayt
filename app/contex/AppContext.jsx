"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("uz");
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading]   = useState(true);

  // Real-time listener — Firestore o'zgarganda avtomatik yangilanadi
  useEffect(() => {
    const q = query(
      collection(db, "news"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setNewsList(data);
        setLoading(false);
      },
      (error) => {
        console.error("onSnapshot error:", error);
        setLoading(false);
      }
    );

    // Komponent unmount bo'lganda listener o'chiriladi
    return () => unsubscribe();
  }, []);

  // Dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      document.body.style.backgroundColor = "#0a1628";
      document.body.style.color = "#ffffff";
    } else {
      root.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#111827";
    }
  }, [darkMode]);

  // Manual refresh (admin panel uchun)
  const refreshNews = async () => {
    // onSnapshot avtomatik yangilaydi, bu funksiya endi kerak emas
    // Lekin admin panel ishlatib qolishi uchun saqlaymiz
  };

  return (
    <AppContext.Provider value={{
      darkMode, setDarkMode,
      language, setLanguage,
      newsList, loading,
      refreshNews,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}