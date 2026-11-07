"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useOrders } from "@/context/OrderContext";
import { Order, BackendOrderStatus } from "@/types";
import {
  ordersBn,
  orderStatusDetails,
  getOrderStatusLabel,
  validationBn,
  commonBn,
} from "@/locales/bn";
import { formatPrice } from "@/lib/formatters/currency";
import { toBnDigits } from "@/lib/formatters/number";
import {
  Truck,
  Search,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";

export function TrackOrderClient() {
  const searchParams = useSearchParams();
  const { findOrderForTracking } = useOrders();

  const initialOrderId = searchParams.get("orderId") || "";
  const initialPhone = searchParams.get("phone") || "";

  const [orderId, setOrderId] = useState(initialOrderId);
  const [phone, setPhone] = useState(initialPhone);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => {
    if (initialOrderId && initialPhone) {
      return findOrderForTracking(initialOrderId, initialPhone) || null;
    }
    return null;
  });
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState(() => {
    if (initialOrderId && initialPhone && !findOrderForTracking(initialOrderId, initialPhone)) {
      return ordersBn.notFoundDesc;
    }
    return "";
  });

  const executeSearch = (idToSearch: string, phoneToSearch: string) => {
    setErrorMessage("");
    setIsSearching(true);

    setTimeout(() => {
      const found = findOrderForTracking(idToSearch, phoneToSearch);
      if (found) {
        setSearchedOrder(found);
      } else {
        setSearchedOrder(null);
        setErrorMessage(ordersBn.notFoundDesc);
      }
      setIsSearching(false);
    }, 250);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setErrorMessage(validationBn.orderIdRequired);
      return;
    }
    if (!phone.trim()) {
      setErrorMessage(validationBn.phoneRequired);
      return;
    }
    executeSearch(orderId, phone);
  };

  const loadDemoOrder = (demoId: string, demoPhone: string) => {
    setOrderId(demoId);
    setPhone(demoPhone);
    executeSearch(demoId, demoPhone);
  };

  // Status index for timeline stepper
  const statusSteps: BackendOrderStatus[] = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "out_for_delivery",
    "delivered",
  ];

  const currentStepIndex = searchedOrder
    ? statusSteps.indexOf(searchedOrder.status)
    : -1;

  const isCancelled = searchedOrder?.status === "cancelled";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-2">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {ordersBn.pageTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {ordersBn.pageSubtitle}
        </p>
      </div>

      {/* Lookup Card Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-2xs max-w-2xl mx-auto space-y-6">
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {ordersBn.orderIdLabel} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder={ordersBn.orderIdPlaceholder}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono text-slate-900 placeholder:font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {ordersBn.phoneLabel} <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={ordersBn.phonePlaceholder}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono text-slate-900 placeholder:font-sans"
            />
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSearching}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{isSearching ? ordersBn.searching : ordersBn.trackButton}</span>
          </button>
        </form>

        {/* Demo Orders Quick Test */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
            {ordersBn.demoHelp}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => loadDemoOrder("ORD-2026-001", "01712345678")}
              className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 rounded-lg border border-slate-200 transition-colors"
            >
              ORD-2026-001 (ডেলিভারির পথে)
            </button>
            <button
              type="button"
              onClick={() => loadDemoOrder("ORD-2026-002", "01819998877")}
              className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 rounded-lg border border-slate-200 transition-colors"
            >
              ORD-2026-002 (ডেলিভারি সম্পন্ন)
            </button>
            <button
              type="button"
              onClick={() => loadDemoOrder("ORD-2026-003", "01911002233")}
              className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 rounded-lg border border-slate-200 transition-colors"
            >
              ORD-2026-003 (প্রস্তুত করা হচ্ছে)
            </button>
          </div>
        </div>
      </div>

      {/* Tracking Result View */}
      {searchedOrder && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Status Header Box */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-500 font-semibold">
                  অর্ডার নম্বর:
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                  {searchedOrder.orderId}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  অর্ডার গ্রহণের তারিখ: {new Date(searchedOrder.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>

              <div>
                <span
                  className={`inline-block px-4 py-1.5 text-xs sm:text-sm font-bold rounded-full border ${
                    orderStatusDetails[searchedOrder.status]?.badgeClass ||
                    "bg-slate-100 text-slate-800"
                  }`}
                >
                  {getOrderStatusLabel(searchedOrder.status)}
                </span>
                <p className="text-xs text-slate-500 mt-1 max-w-xs text-right hidden sm:block">
                  {orderStatusDetails[searchedOrder.status]?.description}
                </p>
              </div>
            </div>

            {/* Stepper Timeline (if not cancelled) */}
            {!isCancelled ? (
              <div className="py-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {ordersBn.timelineSteps.map((step, idx) => {
                    const isPassed = currentStepIndex >= idx;
                    const isCurrent = currentStepIndex === idx;

                    return (
                      <div
                        key={step.key}
                        className={`p-3 rounded-2xl border transition-all flex flex-col items-center text-center ${
                          isCurrent
                            ? "bg-emerald-50 border-emerald-400 ring-2 ring-emerald-400/20"
                            : isPassed
                            ? "bg-slate-50 border-emerald-200 text-slate-700"
                            : "bg-white border-slate-200 opacity-50"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                            isCurrent
                              ? "bg-emerald-600 text-white"
                              : isPassed
                              ? "bg-emerald-200 text-emerald-800"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {isPassed ? "✓" : toBnDigits(idx + 1)}
                        </div>
                        <span
                          className={`text-xs font-bold leading-tight ${
                            isCurrent ? "text-emerald-800" : "text-slate-800"
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0 text-rose-600" />
                <p>অর্ডারটি বাতিল করা হয়েছে। বিস্তারিত তথ্যের জন্য আমাদের হটলাইনে যোগাযোগ করুন।</p>
              </div>
            )}

            {/* Timeline Events Log */}
            {searchedOrder.timeline && searchedOrder.timeline.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">
                  {ordersBn.statusTimeline}
                </h3>
                <div className="space-y-3 border-l-2 border-emerald-500 ml-2 pl-4">
                  {searchedOrder.timeline.map((event, idx) => (
                    <div key={idx} className="relative text-xs">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-white" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-bold text-slate-900">
                          {getOrderStatusLabel(event.status)}
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">
                          {event.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{event.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Delivery & Items Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer & Address */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
                {ordersBn.deliveryTo}
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <p>
                  <span className="text-slate-400">নাম:</span>{" "}
                  <span className="font-semibold text-slate-900">
                    {searchedOrder.customer.fullName}
                  </span>
                </p>
                <p>
                  <span className="text-slate-400">ফোন নম্বর:</span>{" "}
                  <span className="font-mono font-semibold text-slate-900">
                    {searchedOrder.customer.phone}
                  </span>
                </p>
                <p>
                  <span className="text-slate-400">ঠিকানা:</span>{" "}
                  <span className="font-medium text-slate-800">
                    {searchedOrder.customer.fullAddress},{" "}
                    {searchedOrder.customer.city},{" "}
                    {searchedOrder.customer.division}
                  </span>
                </p>
                <p>
                  <span className="text-slate-400">পেমেন্ট মেথড:</span>{" "}
                  <span className="font-semibold text-slate-900">
                    {searchedOrder.paymentMethod === "cod"
                      ? "ক্যাশ অন ডেলিভারি"
                      : "মোবাইল ব্যাংকিং"}
                  </span>
                </p>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
                {ordersBn.paymentSummary}
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>{ordersBn.subtotal}:</span>
                  <span className="font-semibold text-slate-800">
                    {formatPrice(searchedOrder.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{ordersBn.shipping}:</span>
                  <span className="font-semibold text-slate-800">
                    {searchedOrder.shippingCost === 0
                      ? "ফ্রি"
                      : formatPrice(searchedOrder.shippingCost)}
                  </span>
                </div>
                {searchedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>ডিসকাউন্ট:</span>
                    <span>-{formatPrice(searchedOrder.discount)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm sm:text-base text-slate-900">
                  <span>{ordersBn.totalPaid}:</span>
                  <span className="text-emerald-700">
                    {formatPrice(searchedOrder.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Support Strip */}
      <div className="p-4 rounded-2xl bg-slate-100 text-slate-600 text-xs sm:text-sm text-center">
        {ordersBn.needHelp}{" "}
        <span className="font-bold text-slate-900">{commonBn.footer.hotline}</span>{" "}
        ({commonBn.footer.serviceHours})
      </div>
    </div>
  );
}

