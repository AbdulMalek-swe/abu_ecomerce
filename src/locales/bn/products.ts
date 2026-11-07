/**
 * Centralized Bangla Translations: Products & Shop
 */

export const productsBn = {
  // Page Titles & Section Headings
  pageTitle: "সব পণ্য",
  pageSubtitle: "আমাদের প্রিমিয়াম কোয়ালিটির পণ্যের বিস্তৃত কালেকশন ঘুরে দেখুন",
  featuredTitle: "জনপ্রিয় পণ্যসমূহ",
  featuredSubtitle: "আমাদের সেরা বিক্রিত ও গ্রাহক প্রিয় পণ্য",
  flashDealsTitle: "সেরা অফার ও ডিসকাউন্ট",
  flashDealsSubtitle: "সীমিত সময়ের জন্য বিশেষ ছাড়",
  newArrivalsTitle: "নতুন কালেকশন",
  relatedProductsTitle: "সম্পর্কিত পণ্যসমূহ",

  // Product Card & UI Labels
  productDetails: "পণ্যের বিবরণ",
  price: "মূল্য",
  regularPrice: "পূর্ব মূল্য",
  save: "বাঁচবে",
  off: "ছাড়",
  brand: "ব্র্যান্ড",
  sku: "এসকেইউ (SKU)",
  category: "ক্যাটাগরি",
  quantity: "পরিমাণ",
  addToCart: "কার্টে যোগ করুন",
  buyNow: "এখনই কিনুন",
  addedToCart: "কার্টে যোগ হয়েছে",
  inStock: "স্টকে আছে",
  outOfStock: "স্টক শেষ",
  stockCount: (count: string) => `${count} টি বাকি আছে`,
  rating: "রেটিং",
  reviews: (count: string) => `(${count} টি রিভিউ)`,

  // Filters & Sorting
  filters: "ফিল্টার",
  clearFilters: "সব ফিল্টার মুছুন",
  filterByCategory: "ক্যাটাগরি অনুযায়ী বাছাই",
  filterByPrice: "মূল্য সীমা",
  minPrice: "সর্বনিম্ন মূল্য",
  maxPrice: "সর্বোচ্চ মূল্য",
  filterByBrand: "ব্র্যান্ড অনুযায়ী",
  filterByAvailability: "উপলব্ধতা",
  onlyInStock: "শুধু স্টকে আছে এমন",
  sortBy: "সাজান",
  sortOptions: {
    featured: "জনপ্রিয়",
    newest: "নতুন পণ্য",
    priceLowToHigh: "মূল্য: কম থেকে বেশি",
    priceHighToLow: "মূল্য: বেশি থেকে কম",
    rating: "সর্বোচ্চ রেটিং",
  },
  showingResults: (shown: string, total: string) => `মোট ${total} টি পণ্যের মধ্যে ${shown} টি দেখানো হচ্ছে`,
  noProductsMatch: "আপনার পছন্দের সাথে মিল রেখে কোনো পণ্য পাওয়া যায়নি। ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।",

  // Details Page Tabs
  tabs: {
    description: "পণ্যের বিবরণ",
    specifications: "বৈশিষ্ট্য ও স্পেসিফিকেশন",
    reviews: "গ্রাহক মতামত ও রিভিউ",
    shipping: "ডেলিভারি ও রিটার্ন নীতি",
  },

  // Benefits & Badges
  deliveryBadge: "সারা দেশে ক্যাশ অন ডেলিভারি",
  warrantyBadge: "১০০% অরিজিনাল পণ্যের নিশ্চয়তা",
  returnBadge: "৭ দিনের সহজ রিটার্ন পলিসি",
  shareProduct: "শেয়ার করুন",
} as const;

