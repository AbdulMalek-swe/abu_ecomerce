/**
 * Centralized Bangla Translations: Checkout
 */

export const checkoutBn = {
  pageTitle: "অর্ডার কনফার্মেশন ও চেকআউট",
  pageSubtitle: "নিচের তথ্যগুলো পূরণ করে আপনার অর্ডারটি সম্পন্ন করুন",

  // Sections
  customerInfoTitle: "১. গ্রাহকের তথ্য ও ডেলিভারি ঠিকানা",
  deliveryMethodTitle: "২. ডেলিভারি পদ্ধতি নির্বাচন",
  paymentMethodTitle: "৩. মূল্য পরিশোধের মাধ্যম",
  orderReviewTitle: "৪. অর্ডারের বিবরণ",

  // Customer Form Fields
  fullName: "পূর্ণ নাম",
  fullNamePlaceholder: "উদা: মোহাম্মদ আব্দুল্লাহ",
  phoneNumber: "মোবাইল নম্বর",
  phoneNumberPlaceholder: "উদা: 01700000000",
  altPhoneNumber: "বিকল্প মোবাইল নম্বর (ঐচ্ছিক)",
  altPhoneNumberPlaceholder: "উদা: 01800000000",
  division: "বিভাগ",
  selectDivision: "বিভাগ নির্বাচন করুন",
  district: "জেলা",
  districtPlaceholder: "জেলা নির্বাচন বা লিখুন (উদা: ঢাকা, চট্টগ্রাম...)",
  upazila: "থানা / উপজেলা",
  upazilaPlaceholder: "থানা বা উপজেলা লিখুন (উদা: ধানমন্ডি, মিরপুর, পাঁচলাইশ...)",
  fullAddress: "সম্পূর্ণ ডেলিভারি ঠিকানা",
  fullAddressPlaceholder: "বাসা নং, রোড নং, এলাকা বিস্তারিত লিখুন...",
  orderNotes: "বিশেষ নির্দেশনা (ঐচ্ছিক)",
  orderNotesPlaceholder: "ডেলিভারি সময় বা পণ্য সম্পর্কিত কোনো বিশেষ নির্দেশনা থাকলে লিখুন...",

  // Delivery Methods
  deliveryMethods: {
    insideDhaka: "ঢাকার ভেতরে স্ট্যান্ডার্ড ডেলিভারি",
    insideDhakaDuration: "২৪ - ৪৮ ঘণ্টার মধ্যে",
    outsideDhaka: "ঢাকার বাইরে সারা দেশে ডেলিভারি",
    outsideDhakaDuration: "২ - ৩ কর্মদিবসের মধ্যে",
    express: "এক্সপ্রেস সুপার-ফাস্ট ডেলিভারি",
    expressDuration: "একই দিনে ডেলিভারি (শুধু ঢাকা সিটি)",
  },

  // Payment Methods
  paymentMethods: {
    cod: "ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে মূল্য পরিশোধ)",
    codBadge: "সর্বাধিক জনপ্রিয়",
    codDescription: "পণ্য ডেলিভারিম্যানের কাছ থেকে বুঝে নিয়ে সম্পূর্ণ মূল্য নগদ পরিশোধ করুন। কোনো অগ্রিম ফি প্রয়োজন নেই।",
    bkash: "বিকাশ পেমেন্ট",
    bkashDescription: "আপনার বিকাশ অ্যাকাউন্ট থেকে সরাসরি নিরাপদ পেমেন্ট করুন।",
    nagad: "নগদ পেমেন্ট",
    nagadDescription: "আপনার নগদ অ্যাকাউন্ট থেকে সহজেই পেমেন্ট সম্পন্ন করুন।",
  },

  // Order Summary Sidebar
  orderSummary: "আপনার অর্ডার",
  itemsTotal: "আইটেম সর্বমোট",
  shippingFee: "ডেলিভারি চার্জ",
  discount: "ডিসকাউন্ট",
  grandTotal: "সর্বমোট প্রদেয় টাকা",
  termsAgreement: "অর্ডার কনফার্ম করার মাধ্যমে আপনি আমাদের শর্তাবলী ও নিয়মাবলীর সাথে সম্মতি প্রকাশ করছেন।",
  placeOrder: "অর্ডার নিশ্চিত করুন (ক্যাশ অন ডেলিভারি)",
  processingOrder: "অর্ডার প্রসেস হচ্ছে...",

  // Order Success Page
  success: {
    title: "অর্ডার সফল হয়েছে!",
    subtitle: "ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।",
    orderIdLabel: "অর্ডার নম্বর",
    orderDateLabel: "অর্ডারের তারিখ",
    statusLabel: "বর্তমান অবস্থা",
    customerDetails: "গ্রাহকের তথ্য",
    deliveryAddress: "ডেলিভারি ঠিকানা",
    paymentMethod: "পেমেন্ট মাধ্যম",
    contactNotice: "আমাদের প্রতিনিধি অর্ডারটি কনফার্ম করার জন্য শীঘ্রই আপনার দেওয়া নম্বরে ফোন করবেন।",
    printInvoice: "চালান প্রিন্ট করুন",
    trackOrderBtn: "অর্ডার ট্র্যাক করুন",
    backToHomeBtn: "হোমে ফিরে যান",
  },
} as const;
