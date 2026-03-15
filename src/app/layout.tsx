import Navbar from "../components/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NotesDrop",
  description: "Share notes and files instantly using a secure 6-digit code or QR.",
  verification: {
    google: "hx7gb-OVW0rB2HB6CsOn_LY7rV2eSTzscf8yBfjU1M0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}