"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AppProvider } from "./contex/AppContext";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function LayoutInner({ children }) {
  const pathname = usePathname();
  const isAdmin  = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}>
        <AppProvider>
          <LayoutInner>{children}</LayoutInner>
        </AppProvider>
      </body>
    </html>
  );
}