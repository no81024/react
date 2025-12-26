import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import AppHeader from "@/app/components/appheader";
import AppFooter from "@/app/components/appfooter";
import FeaturedNews from "@/app/components/FeaturedNews";
import Test from "@/app/components/alert";

import "./globals.css";

// ---- Font Setup ----
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ---- Metadata ----
export const metadata: Metadata = {
  title: "Hỗ trợ pháp lý cho doanh nghiệp",
  description: "Trang thông tin – hỗ trợ pháp lý cho doanh nghiệp",
};

// ---- Root Layout ----
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* Header */}
        <AppHeader />

        {/* MAIN WRAPPER */}
        <main className="min-h-screen">

          {/* Page Content */}
          {children}

          {/* Alert / Test Component */}
          {/* <Test /> */}

        </main>

        {/* Footer */}
        <AppFooter />

      </body>
    </html>
  );
}
