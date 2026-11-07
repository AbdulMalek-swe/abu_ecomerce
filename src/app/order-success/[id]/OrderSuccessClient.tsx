"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useOrders } from "@/context/OrderContext";
import { checkoutBn, orderStatusDetails, getOrderStatusLabel } from "@/locales/bn";
import { formatPrice } from "@/lib/formatters/currency";
import { toBnDigits } from "@/lib/formatters/number";
import {
  CheckCircle,
  Truck,
  Home,
  MapPin,
  Phone,
  User,
  CreditCard,
  Printer,
} from "lucide-react";

interface OrderSuccessClientProps {
  orderId: string;
}

export function OrderSuccessClient({ orderId }: OrderSuccessClientProps) {
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  const statusMeta = order
    ? orderStatusDetails[order.status] || {
        label: getOrderStatusLabel(order.status),
        badgeClass: "bg-slate-100 text-slate-800",
      }
    : null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xs text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm animate-in zoom-in-75 duration-300">
          <CheckCircle className="w-9 h-9" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {checkoutBn.success.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          {checkoutBn.success.subtitle}
        </p>

        {/* Order ID Pill - Preserves exact order ID as specified */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs text-slate-500 font-semibold">
            {checkoutBn.success.orderIdLabel}:
          </span>
          <span className="font-mono font-bold text-slate-900 text-sm sm:text-base">
            {orderId}
          </span>
        </div>

        {statusMeta && (
          <div className="pt-2">
            <span
              className={`inline-block px-3.5 py-1 text-xs font-bold rounded-full border ${statusMeta.badgeClass}`}
            >
              {checkoutBn.success.statusLabel}: {statusMeta.label}
            </span>
          </div>
        )}
      </div>

      {order ? (
        <div className="space-y-6">
          {/* Details Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
            <h2 className="font-bold text-slate-900 text-base sm:text-lg pb-3 border-b border-slate-100">
              {checkoutBn.success.customerDetails}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-slate-700">
                  <User className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-500">নাম:</span>
                  <span className="font-semibold text-slate-900">
                    {order.customer.fullName}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-slate-700">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-500">মোবাইল নম্বর:</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {order.customer.phone}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-slate-700">
                  <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-500">পেমেন্ট মাধ্যম:</span>
                  <span className="font-semibold text-slate-900">
                    {order.paymentMethod === "cod"
                      ? "ক্যাশ অন ডেলিভারি"
                      : order.paymentMethod === "bkash"
                      ? "বিকাশ"
                      : "নগদ"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2.5 text-slate-700">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block mb-0.5">
                      {checkoutBn.success.deliveryAddress}:
                    </span>
                    <p className="font-medium text-slate-900 leading-relaxed">
                      {order.customer.fullAddress}
                      {order.customer.upazila ? `, ${order.customer.upazila}` : ""}
                      {order.customer.district ? `, ${order.customer.district}` : order.customer.city ? `, ${order.customer.city}` : ""}
                      {order.customer.division ? `, ${order.customer.division}` : ""}
                    </p>
                  </div>
                </div>

                {order.customer.notes && (
                  <p className="text-xs text-slate-500 pt-1">
                    নির্দেশনা: {order.customer.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Ordered Items */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm mb-4">
                অর্ডারের পণ্যসমূহ ({toBnDigits(order.items.length)} টি আইটেম)
              </h3>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-lg bg-white overflow-hidden shrink-0 border border-slate-200">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-xs sm:text-sm text-slate-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {formatPrice(item.product.price)} ×{" "}
                          {toBnDigits(item.quantity)}
                        </p>
                      </div>
                    </div>

                    <span className="font-bold text-xs sm:text-sm text-slate-900 shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>উপমোট:</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ডেলিভারি চার্জ:</span>
                  <span>
                    {order.shippingCost === 0 ? "ফ্রি" : formatPrice(order.shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span className="text-emerald-700">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/70 text-xs sm:text-sm text-amber-900 leading-relaxed text-center">
            {checkoutBn.success.contactNotice}
          </div>
        </div>
      ) : null}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          href={`/track-order?orderId=${encodeURIComponent(orderId)}${
            order ? `&phone=${encodeURIComponent(order.customer.phone)}` : ""
          }`}
          className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 active:scale-95"
        >
          <Truck className="w-4 h-4" />
          <span>{checkoutBn.success.trackOrderBtn}</span>
        </Link>

        <button
          onClick={handlePrint}
          className="px-5 py-3.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>{checkoutBn.success.printInvoice}</span>
        </button>

        <Link
          href="/"
          className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>{checkoutBn.success.backToHomeBtn}</span>
        </Link>
      </div>
    </div>
  );
}

