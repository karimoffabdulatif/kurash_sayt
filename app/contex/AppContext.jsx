"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getNews } from "../lib/newsService";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("uz");
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading]   = useState(true);

  // Firebase dan yangiliklar yuklash
  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await getNews();
        setNewsList(data);
      } catch (e) {
        console.error("Yangiliklar yuklanmadi:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
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

  // Yangilik qo'shilgandan keyin qayta yuklash
  const refreshNews = async () => {
    const data = await getNews();
    setNewsList(data);
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