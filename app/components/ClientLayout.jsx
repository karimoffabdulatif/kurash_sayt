"use client";

import Header from "./Header";
import Footer from "./Footer";
import { AppProvider } from "../contex/AppContext";
import { usePathname } from "next/navigation";

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

export default function ClientLayout({ children }) {
  return (
    <AppProvider>
      <LayoutInner>{children}</LayoutInner>
    </AppProvider>
  );
}