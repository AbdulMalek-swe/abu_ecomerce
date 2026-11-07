"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "@/types";
import { validationBn } from "@/locales/bn";

interface ToastState {
  message: string;
  type: "success" | "error" | "info";
  id: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toasts: ToastState[];
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "abu_ecommerce_cart_v1";

/**
 * Validates untrusted persisted cart data from LocalStorage
 */
function validateCartItems(data: unknown): CartItem[] {
  if (!Array.isArray(data)) return [];

  const validItems: CartItem[] = [];

  for (const item of data) {
    if (
      item &&
      typeof item === "object" &&
      item.product &&
      typeof item.product.id === "string" &&
      typeof item.product.name === "string" &&
      typeof item.product.price === "number" &&
      item.product.price >= 0 &&
      typeof item.quantity === "number" &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    ) {
      validItems.push({
        product: {
          ...item.product,
          price: Math.max(0, Number(item.product.price)),
        },
        quantity: Math.max(1, Math.min(99, Math.floor(item.quantity))),
      });
    }
  }

  return validItems;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Lazy initialization avoids setState in effect
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return validateCartItems(JSON.parse(stored));
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Sync to LocalStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { message, type, id }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const safeQty = Math.max(1, Math.min(99, Math.floor(Number(quantity) || 1)));
    if (!product || !product.id || safeQty < 1) return;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(99, updated[existingIndex].quantity + safeQty),
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            product: {
              ...product,
              price: Math.max(0, Number(product.price) || 0),
            },
            quantity: safeQty,
          },
        ];
      }
    });

    showToast(validationBn.productAddedToCart, "success");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const safeQty = Math.floor(Number(quantity) || 0);

    if (safeQty <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(99, safeQty) }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    showToast(validationBn.productRemovedFromCart, "info");
  };

  const clearCart = () => {
    setItems([]);
  };

  // Recalculate totals through business logic
  const totalItemsCount = items.reduce((total, item) => total + Math.max(0, item.quantity), 0);
  const subtotal = items.reduce(
    (total, item) => total + Math.max(0, item.product.price) * Math.max(0, item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
