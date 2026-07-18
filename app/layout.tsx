import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kumimi — Baca Komik, Manga, Manhwa & Manhua",
  description:
    "Kumimi adalah platform baca komik online untuk manga, manhwa, dan manhua terbaik dengan update chapter terbaru setiap hari.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-canvas text-ink font-body`}
      >
        <ScrollToTop />
        {children}
        <Footer />
      </body>
    </html>
  );
}
