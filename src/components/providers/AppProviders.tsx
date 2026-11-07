"use client";

import React, { Suspense } from "react";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <OrderProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <Suspense fallback={null}>
            <MobileNav />
          </Suspense>
          <CartDrawer />
          <ToastContainer />
          <WhatsAppFloatingButton />
        </div>
      </CartProvider>
    </OrderProvider>
  );
}
