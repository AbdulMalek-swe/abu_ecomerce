"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { navigationBn } from "@/locales/bn";

export function WhatsAppFloatingButton() {
  const WHATSAPP_NUMBER = "8801700000000";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "আসসালামু আলাইকুম, আমি আবূ ই-কমার্স থেকে পণ্য সম্পর্কে জানতে চাই।"
  )}`;

  return (
    <aside aria-label={navigationBn.whatsappContact} className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={navigationBn.whatsappContact}
        className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full shadow-lg shadow-emerald-700/30 transition-transform active:scale-95 group"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">{navigationBn.whatsapp}</span>
      </a>
    </aside>
  );
}

