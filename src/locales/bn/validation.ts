/**
 * Centralized Bangla Translations: Form Validation & Notifications
 */

export const validationBn = {
  // Input Field Validation
  nameRequired: "আপনার নাম লিখুন।",
  nameMinLength: "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।",
  phoneRequired: "মোবাইল নম্বর লিখুন।",
  phoneInvalid: "সঠিক মোবাইল নম্বর প্রদান করুন (উদা: 017XXXXXXXX)।",
  altPhoneInvalid: "বিকল্প মোবাইল নম্বর সঠিক ফরম্যাটে প্রদান করুন।",
  divisionRequired: "অনুগ্রহ করে আপনার বিভাগ নির্বাচন করুন।",
  districtRequired: "অনুগ্রহ করে আপনার জেলা লিখুন।",
  upazilaRequired: "অনুগ্রহ করে আপনার থানা বা উপজেলা লিখুন।",
  addressRequired: "সম্পূর্ণ ঠিকানা লিখুন।",
  addressMinLength: "ঠিকানা কমপক্ষে ১০ অক্ষরের বিস্তারিত হতে হবে।",
  selectProduct: "অনুগ্রহ করে একটি পণ্য নির্বাচন করুন।",
  quantityMin: "পরিমাণ কমপক্ষে ১ হতে হবে।",
  orderIdRequired: "অনুগ্রহ করে অর্ডার নম্বর লিখুন।",
  termsRequired: "অর্ডার সম্পন্ন করতে শর্তাবলী গ্রহণ করতে হবে।",

  // Cart & Orders Notifications
  cartEmpty: "আপনার কার্ট খালি।",
  productAddedToCart: "পণ্যটি কার্টে যোগ করা হয়েছে।",
  productRemovedFromCart: "পণ্যটি কার্ট থেকে অপসারণ করা হয়েছে।",
  cartUpdated: "কার্ট সফলভাবে আপডেট করা হয়েছে।",
  orderPlacedSuccess: "অর্ডার সফলভাবে সম্পন্ন হয়েছে।",
  orderNotFound: "কোনো অর্ডার পাওয়া যায়নি। সঠিক অর্ডার নম্বর ও ফোন নম্বর প্রদান করুন।",
  orderTrackFailed: "অর্ডারের তথ্য লোড করা যায়নি।",

  // Generic System & Error States
  tryAgain: "আবার চেষ্টা করুন।",
  networkError: "ইন্টারনেট সংযোগে ত্রুটি দেখা দিয়েছে। আবার চেষ্টা করুন।",
  somethingWentWrong: "কোথাও কোনো সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
  couponInvalid: "অকার্যকর কুপন কোড। অনুগ্রহ করে সঠিক কোড দিন।",
  couponSuccess: "কুপন কোড সফলভাবে যুক্ত হয়েছে!",

  // Contact Form
  contactNameRequired: "অনুগ্রহ করে আপনার নাম লিখুন।",
  contactEmailRequired: "সঠিক ইমেইল ঠিকানা লিখুন।",
  contactMessageRequired: "আপনার বার্তাটি লিখুন।",
  contactMessageSent: "আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।",
} as const;
