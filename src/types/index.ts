import { BackendOrderStatus } from "@/locales/bn/orders";

export type { BackendOrderStatus };

export interface Product {
  id: string;
  name: string; // Exact backend provided product name
  slug: string;
  description: string; // Exact backend provided description
  price: number;
  originalPrice?: number;
  category: "electronics" | "fashion" | "grocery" | "beauty" | "home" | "accessories";
  brand: string; // Exact backend brand
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockQuantity: number;
  images: string[];
  specifications: Record<string, string>; // Exact backend specifications
  isFeatured?: boolean;
  isFlashSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  altPhone?: string;
  division: string;
  district: string;
  upazila: string;
  city?: string;
  fullAddress: string;
  notes?: string;
}

export interface OrderTimelineItem {
  status: BackendOrderStatus;
  timestamp: string;
  note: string;
}

export interface Order {
  orderId: string; // Original ID format preserved exactly (e.g. ORD-2026-9482)
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: BackendOrderStatus; // Raw backend status value
  paymentMethod: "cod" | "bkash" | "nagad";
  createdAt: string;
  timeline: OrderTimelineItem[];
}
