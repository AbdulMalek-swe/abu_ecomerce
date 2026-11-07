"use client";

import React, { useState } from "react";
import { commonBn, validationBn } from "@/locales/bn";
import { useCart } from "@/context/CartContext";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function ContactPage() {
  const { showToast } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = validationBn.contactNameRequired;
    if (!phone.trim()) errs.phone = validationBn.phoneRequired;
    if (!message.trim()) errs.message = validationBn.contactMessageRequired;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      showToast(validationBn.contactMessageSent, "success");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {commonBn.contactUs}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          আপনার যেকোনো প্রশ্ন, অভিযোগ বা মতামতের জন্য আমাদের সাথে নির্দ্বিধায় যোগাযোগ করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">হটলাইন নম্বর</h3>
              <p className="text-xs text-slate-600 mt-1 font-mono">০৯৬১২-০০০০০০</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {commonBn.footer.serviceHours}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">ইমেইল ঠিকানা</h3>
              <p className="text-xs text-slate-600 mt-1">support@abuecommerce.com</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                ২৪ ঘণ্টার মধ্যে উত্তর দেওয়া হবে
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">প্রধান কার্যালয়</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {commonBn.footer.address}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-emerald-950 text-white space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-bold text-sm">আমাদের প্রতিশ্রুতি</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              আমরা সবসময় গ্রাহকের সন্তুষ্টি ও সর্বোচ্চ সেবার মান বজায় রাখতে প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-2xs">
          <h2 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <span>বার্তা পাঠান</span>
          </h2>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  আপনার পূর্ণ নাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  placeholder="উদা: মোহাম্মদ হাসান"
                  className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:bg-white text-slate-900 ${
                    errors.name
                      ? "border-rose-400 focus:ring-rose-500 bg-rose-50/40"
                      : "border-slate-200 focus:ring-emerald-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-rose-600 text-xs mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  মোবাইল নম্বর <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                  }}
                  placeholder="উদা: 01700000000"
                  className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:bg-white text-slate-900 ${
                    errors.phone
                      ? "border-rose-400 focus:ring-rose-500 bg-rose-50/40"
                      : "border-slate-200 focus:ring-emerald-500"
                  }`}
                />
                {errors.phone && (
                  <p className="text-rose-600 text-xs mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                ইমেইল ঠিকানা (ঐচ্ছিক)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="উদা: yourname@example.com"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                আপনার বার্তা লিখুন <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
                }}
                placeholder="আপনার মন্তব্য, জিজ্ঞাসা বা মতামত বিস্তারিত লিখুন..."
                className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:bg-white text-slate-900 ${
                  errors.message
                    ? "border-rose-400 focus:ring-rose-500 bg-rose-50/40"
                    : "border-slate-200 focus:ring-emerald-500"
                }`}
              />
              {errors.message && (
                <p className="text-rose-600 text-xs mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

