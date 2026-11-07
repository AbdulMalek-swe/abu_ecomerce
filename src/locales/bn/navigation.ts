/**
 * Centralized Bangla Translations: Navigation & Header
 */

export const navigationBn = {
  // Top Announcement Bar
  announcement: "সারা দেশে ক্যাশ অন ডেলিভারি সুবিধা! ৫,০০০ টাকার অর্ডারে ফ্রি ডেলিভারি!",
  topHelp: "সাহায্য প্রয়োজন?",
  topTrack: "অর্ডার ট্র্যাক",
  whatsapp: "হোয়াটসঅ্যাপ",
  whatsappContact: "হোয়াটসঅ্যাপে যোগাযোগ",

  // Main Nav Links
  home: "হোম",
  allProducts: "সব পণ্য",
  categories: "ক্যাটাগরি",
  trackOrder: "অর্ডার ট্র্যাক",
  contact: "যোগাযোগ",
  about: "আমাদের সম্পর্কে",

  // Categories Menu
  categoryLabels: {
    all: "সকল ক্যাটাগরি",
    electronics: "ইলেকট্রনিক্স",
    fashion: "ফ্যাশন ও পোশাক",
    grocery: "গ্রোসারি ও খাদ্যপণ্য",
    beauty: "রূপচর্চা ও স্বাস্থ্য",
    home: "গৃহস্থালি ও রান্নাঘর",
    accessories: "ঘড়ি ও এক্সেসরিজ",
  },

  // Search & Cart Icons
  searchPlaceholder: "পণ্য বা ব্র্যান্ড খুঁজুন...",
  searchButton: "অনুসন্ধান",
  cart: "শপিং কার্ট",
  cartItemsCount: (count: string) => `${count} টি পণ্য`,

  // Mobile Bottom Bar
  mobileNav: {
    home: "হোম",
    products: "সব পণ্য",
    cart: "কার্ট",
    track: "ট্র্যাক",
    menu: "মেনু",
  },

  // Mobile Drawer
  menuTitle: "মেনু তালিকা",
  closeMenu: "মেনু বন্ধ করুন",
  openMenu: "মেনু খুলুন",
} as const;
