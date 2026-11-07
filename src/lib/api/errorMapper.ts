/**
 * Centralized Backend Error Mapping Layer
 * Translates machine-readable backend error codes and status messages
 * into natural, user-friendly Bangla messages without altering backend responses.
 */

export const BACKEND_ERROR_MAP: Record<string, string> = {
  // HTTP & Network Errors
  NETWORK_ERROR: "ইন্টারনেট সংযোগে ত্রুটি দেখা দিয়েছে। আপনার সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
  SERVER_ERROR: "আমাদের সার্ভারে সাময়িক সমস্যা হচ্ছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
  UNAUTHORIZED: "এই কাজটি সম্পন্ন করার জন্য প্রয়োজনীয় অনুমতি নেই।",
  FORBIDDEN: "আপনার এই সেবায় প্রবেশাধিকার নেই।",
  NOT_FOUND: "অনুরোধকৃত তথ্য বা পণ্যটি খুঁজে পাওয়া যায়নি।",
  TIMEOUT: "অনুরোধের সময়সীমা পার হয়ে গেছে। অনুগ্রহ করে আবার চেষ্টা করুন।",

  // Product & Inventory Errors
  OUT_OF_STOCK: "দুঃখিত, এই পণ্যটির স্টক শেষ হয়ে গেছে।",
  INSUFFICIENT_STOCK: "আপনার অনুরোধকৃত পরিমাণের পর্যাপ্ত স্টক নেই।",
  PRODUCT_NOT_FOUND: "পণ্যটি ডাটাবেজে খুঁজে পাওয়া যায়নি।",
  PRODUCT_INACTIVE: "পণ্যটি বর্তমানে বিক্রয়ের জন্য উপলব্ধ নয়।",

  // Cart & Coupon Errors
  CART_EMPTY: "আপনার কার্ট খালি। অনুগ্রহ করে পণ্য যোগ করুন।",
  INVALID_COUPON: "প্রদত্ত কুপন কোডটি সঠিক নয় বা মেয়াদোত্তীর্ণ।",
  COUPON_MIN_AMOUNT: "এই কুপনটি ব্যবহারের জন্য ন্যূনতম ক্রয়ের পরিমাণ পূর্ণ হয়নি।",
  COUPON_ALREADY_USED: "আপনি ইতিমধ্যে এই কুপনটি ব্যবহার করেছেন।",

  // Checkout & Validation Errors
  INVALID_PHONE: "অনুগ্রহ করে সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর প্রদান করুন।",
  INVALID_ADDRESS: "সম্পূর্ণ ও সঠিক ডেলিভারি ঠিকানা প্রদান করুন।",
  PAYMENT_FAILED: "পেমেন্ট প্রক্রিয়াটি সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
  ORDER_FAILED: "অর্ডারটি গ্রহণ করা যায়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।",

  // Order Tracking Errors
  ORDER_NOT_FOUND: "প্রদত্ত অর্ডার নম্বর ও ফোন নম্বরের সাথে কোনো রেকর্ড মেলেনি।",
  INVALID_ORDER_ID: "অর্ডার নম্বরের ফরম্যাট সঠিক নয়।",
};

/**
 * Maps a backend error code, status string, or API response to natural Bangla.
 *
 * @param errorCodeOrMessage - Backend provided error code (e.g. "OUT_OF_STOCK") or message
 * @param defaultFallback - Optional default fallback message
 * @returns Natural user-friendly Bangla error message
 */
export function mapBackendErrorToBn(
  errorCodeOrMessage?: string | null,
  defaultFallback: string = "একটি ত্রুটি দেখা দিয়েছে। আবার চেষ্টা করুন।"
): string {
  if (!errorCodeOrMessage) return defaultFallback;

  const normalizedKey = errorCodeOrMessage.trim().toUpperCase().replace(/\s+/g, "_");

  if (normalizedKey in BACKEND_ERROR_MAP) {
    return BACKEND_ERROR_MAP[normalizedKey];
  }

  // Check substring matches
  for (const [key, bnMsg] of Object.entries(BACKEND_ERROR_MAP)) {
    if (normalizedKey.includes(key)) {
      return bnMsg;
    }
  }

  return defaultFallback;
}

