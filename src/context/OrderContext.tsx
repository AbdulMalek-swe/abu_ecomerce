"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Order, BackendOrderStatus } from "@/types";
import { MOCK_ORDERS } from "@/data/orders";

interface CreateOrderInput {
  customer: Order["customer"];
  items: Order["items"];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  paymentMethod: "cod" | "bkash" | "nagad";
}

interface OrderContextType {
  orders: Order[];
  createOrder: (input: CreateOrderInput) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  findOrderForTracking: (orderId: string, phone: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = "abu_ecommerce_orders_v1";

/**
 * Validates untrusted persisted orders data from LocalStorage
 */
function validateOrders(data: unknown): Order[] {
  if (!Array.isArray(data)) return [];

  return data.filter((o): o is Order => {
    return (
      Boolean(o) &&
      typeof o === "object" &&
      typeof o.orderId === "string" &&
      Boolean(o.customer) &&
      typeof o.customer.fullName === "string" &&
      typeof o.customer.phone === "string" &&
      Array.isArray(o.items) &&
      typeof o.total === "number" &&
      typeof o.status === "string"
    );
  });
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  // Lazy initialization avoids setState in effect
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === "undefined") return MOCK_ORDERS;
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const validStored = validateOrders(parsed);
        const mockMap = new Map(MOCK_ORDERS.map((o) => [o.orderId, o]));
        validStored.forEach((o) => mockMap.set(o.orderId, o));
        return Array.from(mockMap.values());
      }
    } catch {
      // fallback
    }
    return MOCK_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore storage error
    }
  }, [orders]);

  const createOrder = (input: CreateOrderInput): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = `ORD-2026-${randomSuffix}`;
    const now = new Date();

    const initialStatus: BackendOrderStatus = "pending";

    const newOrder: Order = {
      orderId: newOrderId,
      customer: input.customer,
      items: input.items,
      subtotal: Math.max(0, input.subtotal),
      shippingCost: Math.max(0, input.shippingCost),
      discount: Math.max(0, input.discount),
      total: Math.max(0, input.total),
      status: initialStatus, // Raw backend status: "pending"
      paymentMethod: input.paymentMethod,
      createdAt: now.toISOString(),
      timeline: [
        {
          status: "pending",
          timestamp: `${now.toLocaleDateString("en-GB")} ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`,
          note: "অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।",
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(
      (o) => o.orderId.toLowerCase().trim() === orderId.toLowerCase().trim()
    );
  };

  const findOrderForTracking = (orderId: string, phone: string): Order | undefined => {
    const cleanId = orderId.trim().toLowerCase();
    const cleanPhone = phone.trim().replace(/\D/g, "");

    // Strict security check: must provide both ID and valid phone digits
    if (!cleanId || cleanPhone.length < 11) {
      return undefined;
    }

    return orders.find((o) => {
      const idMatch = o.orderId.toLowerCase() === cleanId;
      const orderPhoneClean = o.customer.phone.replace(/\D/g, "");
      const phoneMatch =
        orderPhoneClean.endsWith(cleanPhone) || cleanPhone.endsWith(orderPhoneClean);
      return idMatch && phoneMatch;
    });
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        findOrderForTracking,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
