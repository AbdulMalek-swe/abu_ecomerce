import { Order } from "@/types";
import { MOCK_PRODUCTS } from "./products";

export const MOCK_ORDERS: Order[] = [
  {
    orderId: "ORD-2026-001",
    customer: {
      fullName: "তানভীর আহমেদ",
      phone: "01712345678",
      division: "ঢাকা",
      district: "ঢাকা",
      upazila: "উত্তরা",
      city: "ঢাকা উত্তর",
      fullAddress: "বাসা-৪৮, রোড-১১, সেক্টর-০৪, উত্তরা, ঢাকা-১২৩০",
      notes: "বিকাল ৫টার পর ডেলিভারি দিলে ভালো হয়।",
    },
    items: [
      { product: MOCK_PRODUCTS[1], quantity: 1 }, // Sony Headphones
      { product: MOCK_PRODUCTS[4], quantity: 2 }, // Honey
    ],
    subtotal: 39000,
    shippingCost: 60,
    discount: 500,
    total: 38560,
    status: "out_for_delivery", // Raw backend status
    paymentMethod: "cod",
    createdAt: "2026-11-06T10:30:00Z",
    timeline: [
      {
        status: "pending",
        timestamp: "2026-11-06 10:30 AM",
        note: "অর্ডারটি সফলভাবে ডাটাবেজে সংরক্ষিত হয়েছে।",
      },
      {
        status: "confirmed",
        timestamp: "2026-11-06 11:15 AM",
        note: "গ্রাহক সেবাদানকারী প্রতিনিধি কর্তৃক নিশ্চিত করা হয়েছে।",
      },
      {
        status: "processing",
        timestamp: "2026-11-06 02:45 PM",
        note: "উত্তরা হাব ওয়্যারহাউসে মোড়কজাত সম্পন্ন হয়েছে।",
      },
      {
        status: "shipped",
        timestamp: "2026-11-07 07:00 AM",
        note: "ডেলিভারি পার্টনারের কাছে পার্সেল হস্তান্তর করা হয়েছে।",
      },
      {
        status: "out_for_delivery",
        timestamp: "2026-11-07 09:30 AM",
        note: "রাইডার ডেলিভারির উদ্দেশ্যে রওনা হয়েছেন।",
      },
    ],
  },
  {
    orderId: "ORD-2026-002",
    customer: {
      fullName: "সাদিয়া আফরোজ",
      phone: "01819998877",
      division: "চট্টগ্রাম",
      district: "চট্টগ্রাম",
      upazila: "পাঁচলাইশ",
      city: "চট্টগ্রাম সদর",
      fullAddress: "ফ্ল্যাট-বি২, প্রবর্তক মোড়, পাঁচলাইশ, চট্টগ্রাম-৪২০০",
    },
    items: [
      { product: MOCK_PRODUCTS[2], quantity: 1 }, // Aarong Silk Panjabi
      { product: MOCK_PRODUCTS[6], quantity: 1 }, // The Ordinary Serum
    ],
    subtotal: 8300,
    shippingCost: 120,
    discount: 0,
    total: 8420,
    status: "delivered", // Raw backend status
    paymentMethod: "cod",
    createdAt: "2026-11-04T14:20:00Z",
    timeline: [
      {
        status: "pending",
        timestamp: "2026-11-04 02:20 PM",
        note: "অর্ডার গ্রহণ করা হয়েছে।",
      },
      {
        status: "confirmed",
        timestamp: "2026-11-04 03:00 PM",
        note: "অর্ডার যাচাই ও নিশ্চিত করা হয়েছে।",
      },
      {
        status: "processing",
        timestamp: "2026-11-04 05:30 PM",
        note: "মোড়কজাত করা হয়েছে।",
      },
      {
        status: "shipped",
        timestamp: "2026-11-05 09:00 AM",
        note: "চট্টগ্রাম হাবের উদ্দেশ্যে প্রেরণ করা হয়েছে।",
      },
      {
        status: "out_for_delivery",
        timestamp: "2026-11-05 01:15 PM",
        note: "রাইডার ডেলিভারির জন্য বের হয়েছেন।",
      },
      {
        status: "delivered",
        timestamp: "2026-11-05 03:45 PM",
        note: "গ্রাহক সন্তোষজনকভাবে পণ্য বুঝে পেয়েছেন।",
      },
    ],
  },
  {
    orderId: "ORD-2026-003",
    customer: {
      fullName: "কামরুল হাসান",
      phone: "01911002233",
      division: "সিলেট",
      district: "সিলেট",
      upazila: "আম্বরখানা",
      city: "সিলেট সদর",
      fullAddress: "হাউজ-১৪, জালালাবাদ আ/এ, আম্বরখানা, সিলেট",
    },
    items: [{ product: MOCK_PRODUCTS[7], quantity: 1 }], // Xiaomi Air Purifier
    subtotal: 11500,
    shippingCost: 120,
    discount: 200,
    total: 11420,
    status: "processing", // Raw backend status
    paymentMethod: "bkash",
    createdAt: "2026-11-07T08:10:00Z",
    timeline: [
      {
        status: "pending",
        timestamp: "2026-11-07 08:10 AM",
        note: "বিকাশ ট্রানজেকশন সফল ও অর্ডার গ্রহণ করা হয়েছে।",
      },
      {
        status: "confirmed",
        timestamp: "2026-11-07 08:30 AM",
        note: "অর্ডার নিশ্চিত করা হয়েছে।",
      },
      {
        status: "processing",
        timestamp: "2026-11-07 09:15 AM",
        note: "ওয়্যারহাউস থেকে পণ্য সংগ্রহ ও প্যাকিং প্রক্রিয়াধীন।",
      },
    ],
  },
];
