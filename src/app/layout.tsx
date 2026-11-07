import type { Metadata } from "next";
import { hindSiliguri } from "./fonts";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";

export const metadata: Metadata = {
  title: "আবূ ই-কমার্স | সেরা অনলাইন শপিং অভিজ্ঞতা",
  description: "বাংলাদেশের বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম - ক্যাশ অন ডেলিভারি ও দ্রুত ডেলিভারি সুবিধা সহ।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} font-sans`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
