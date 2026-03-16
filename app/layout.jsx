import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WBK & BOKA — Butunjahon Belbog'li Kurash Assotsiatsiyasi",
  description:
    "Butunjahon Belbog'li Kurash va Bel Olish Kurash Assotsiatsiyasi (WBK & BOKA) — xalqaro kurash musobaqalari, yangiliklar va rasmiy ma'lumotlar.",
  keywords: [
    "belbogʻli kurash",
    "belt wrestling",
    "kurash",
    "WBK",
    "BOKA",
    "bel olish",
    "xalqaro kurash",
    "kurash musobaqasi",
    "wrestling association",
    "world kurash",
    "uzbek wrestling",
    "kurash uz",
    "wbkboka",
  ],
  authors: [{ name: "WBK & BOKA" }],
  creator: "WBK & BOKA",
  publisher: "WBK & BOKA",
  metadataBase: new URL("https://www.wbkboka.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WBK & BOKA — Butunjahon Belbog'li Kurash Assotsiatsiyasi",
    description:
      "Xalqaro belbog'li kurash va bel olish kurash musobaqalari, yangiliklar va rasmiy ma'lumotlar.",
    url: "https://www.wbkboka.org",
    siteName: "WBK & BOKA",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WBK & BOKA — World Kurash Association",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WBK & BOKA — Butunjahon Belbog'li Kurash Assotsiatsiyasi",
    description:
      "Xalqaro belbog'li kurash va bel olish kurash musobaqalari.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}