/**
 * Centralized Bangla Translations: Orders & Order Tracking
 *
 * Backend status values must remain unchanged internally:
 * "pending" | "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled"
 */

export type BackendOrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface StatusMeta {
  label: string;
  description: string;
  badgeClass: string;
}

/**
 * Centralized mapping of backend status values to natural Bangla labels
 */
export const orderStatusMap: Record<BackendOrderStatus, string> = {
  pending: "অপেক্ষমাণ",
  confirmed: "নিশ্চিত করা হয়েছে",
  processing: "প্রস্তুত করা হচ্ছে",
  shipped: "পাঠানো হয়েছে",
  out_for_delivery: "ডেলিভারির পথে",
  delivered: "ডেলিভারি সম্পন্ন",
  cancelled: "বাতিল করা হয়েছে",
};

/**
 * Detailed status metadata for timeline, descriptions, and styling
 */
export const orderStatusDetails: Record<BackendOrderStatus, StatusMeta> = {
  pending: {
    label: "অপেক্ষমাণ",
    description: "আপনার অর্ডারটি গ্রহণ করা হয়েছে, কনফার্মেশনের অপেক্ষায় রয়েছে।",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
  },
  confirmed: {
    label: "নিশ্চিত করা হয়েছে",
    description: "আমাদের প্রতিনিধি আপনার অর্ডারটি যাচাই করে নিশ্চিত করেছেন।",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
  },
  processing: {
    label: "প্রস্তুত করা হচ্ছে",
    description: "ওয়্যারহাউসে আপনার পণ্যটি প্যাকিং ও গুণগত মান পরীক্ষা করা হচ্ছে।",
    badgeClass: "bg-indigo-100 text-indigo-800 border-indigo-300",
  },
  shipped: {
    label: "পাঠানো হয়েছে",
    description: "কুরিয়ার সার্ভিসের মাধ্যমে পণ্যটি আপনার এলাকার হাবের উদ্দেশ্যে পাঠানো হয়েছে।",
    badgeClass: "bg-purple-100 text-purple-800 border-purple-300",
  },
  out_for_delivery: {
    label: "ডেলিভারির পথে",
    description: "আমাদের ডেলিভারি রাইডার আপনার ঠিকানায় পৌঁছে দেওয়ার পথে রয়েছেন।",
    badgeClass: "bg-orange-100 text-orange-800 border-orange-300",
  },
  delivered: {
    label: "ডেলিভারি সম্পন্ন",
    description: "পণ্যটি সফলভাবে গ্রাহকের কাছে হস্তান্তর করা হয়েছে।",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  cancelled: {
    label: "বাতিল করা হয়েছে",
    description: "গ্রাহকের অনুরোধে বা অনিবার্য কারণে অর্ডারটি বাতিল করা হয়েছে।",
    badgeClass: "bg-rose-100 text-rose-800 border-rose-300",
  },
};

/**
 * Helper to safely get the Bangla label for any backend status
 */
export function getOrderStatusLabel(status: BackendOrderStatus | string): string {
  if (status in orderStatusMap) {
    return orderStatusMap[status as BackendOrderStatus];
  }
  return status; // Fallback to raw string if unrecognized
}

export const ordersBn = {
  pageTitle: "অর্ডার ট্র্যাকিং",
  pageSubtitle: "আপনার অর্ডার নম্বর ও ফোন নম্বর দিয়ে অর্ডারের বর্তমান অবস্থা জানুন",
  formTitle: "অর্ডার ট্র্যাক করুন",
  orderIdLabel: "অর্ডার নম্বর (Order ID)",
  orderIdPlaceholder: "উদা: ORD-98214",
  phoneLabel: "অর্ডারে ব্যবহৃত মোবাইল নম্বর",
  phonePlaceholder: "উদা: 01700000000",
  trackButton: "অর্ডারের তথ্য খুঁজুন",
  searching: "তথ্য খোঁজা হচ্ছে...",
  notFoundTitle: "কোনো অর্ডার পাওয়া যায়নি",
  notFoundDesc: "প্রদত্ত অর্ডার নম্বর ও ফোন নম্বরের সাথে কোনো রেকর্ড মেলেনি। অনুগ্রহ করে সঠিক তথ্য দিয়ে আবার চেষ্টা করুন।",
  demoHelp: "পরীক্ষার জন্য ডেমো অর্ডার ব্যবহার করুন:",

  // Result Section
  orderDetails: "অর্ডারের বিবরণ",
  orderPlacedOn: "অর্ডার গ্রহণের সময়",
  estimatedDelivery: "সম্ভাব্য ডেলিভারি",
  currentStatus: "বর্তমান অবস্থা",
  statusTimeline: "ডেলিভারি টাইমলাইন",
  deliveryTo: "ডেলিভারি গন্তব্য",
  itemsOrdered: "অর্ডারের পণ্যসমূহ",
  paymentSummary: "পেমেন্ট সারসংক্ষেপ",
  subtotal: "পণ্যের মূল্য",
  shipping: "ডেলিভারি চার্জ",
  totalPaid: "মোট প্রদেয় টাকা",
  needHelp: "সাহায্য প্রয়োজন? আমাদের হটলাইনে ফোন করুন:",
  timelineSteps: [
    { key: "pending", title: "অর্ডার গ্রহণ" },
    { key: "confirmed", title: "কনফার্মড" },
    { key: "processing", title: "প্রস্তুতি" },
    { key: "shipped", title: "শিপড" },
    { key: "out_for_delivery", title: "ডেলিভারির পথে" },
    { key: "delivered", title: "সম্পন্ন" },
  ],
} as const;

