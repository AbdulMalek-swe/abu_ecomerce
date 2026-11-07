"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { cartBn, commonBn, validationBn } from "@/locales/bn";
import { formatPrice } from "@/lib/formatters/currency";
import { toBnDigits } from "@/lib/formatters/number";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  ArrowLeft,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItemsCount,
    showToast,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const estimatedDelivery = subtotal >= 5000 ? 0 : 60;
  const finalTotal = Math.max(0, subtotal - discountAmount + estimatedDelivery);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.trim().toUpperCase() === "ABU100") {
      setDiscountAmount(100);
      setAppliedCoupon("ABU100");
      showToast("কুপন কোড সফলভাবে যুক্ত হয়েছে! ১০০ টাকা ছাড় প্রদান করা হয়েছে।", "success");
    } else {
      showToast(validationBn.couponInvalid, "error");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-xs border border-emerald-100">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          {cartBn.emptyCart}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
          {cartBn.emptyCartDesc}
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md shadow-emerald-600/20 active:scale-95"
        >
          <span>{cartBn.startShopping}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {cartBn.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {cartBn.itemCount(toBnDigits(totalItemsCount))}
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{cartBn.clearCart}</span>
        </button>
      </div>

      {/* Grid: Cart Items + Summary Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                    {item.product.brand}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 mt-1 truncate">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="hover:text-emerald-700 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    একক মূল্য:{" "}
                    <span className="font-semibold text-slate-800">
                      {formatPrice(item.product.price)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Quantity Adjuster & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    aria-label="পরিমাণ কমান"
                    className="p-1.5 px-3 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-sm font-bold text-slate-900">
                    {toBnDigits(item.quantity)}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    aria-label="পরিমাণ বাড়ান"
                    className="p-1.5 px-3 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="font-bold text-sm sm:text-base text-slate-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  aria-label={cartBn.remove}
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-slate-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{cartBn.continueShopping}</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-5">
            <h2 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
              {cartBn.summaryTitle}
            </h2>

            {/* Calculations */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-600">
                <span>{cartBn.itemsSubtotal}</span>
                <span className="font-semibold text-slate-900">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>{cartBn.deliveryCharge}</span>
                <span className="font-semibold text-slate-900">
                  {estimatedDelivery === 0 ? (
                    <span className="text-emerald-600 font-bold">
                      {cartBn.freeDelivery}
                    </span>
                  ) : (
                    formatPrice(estimatedDelivery)
                  )}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>
                    {cartBn.discount} ({appliedCoupon})
                  </span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-bold text-slate-900 text-base">
                  {cartBn.total}
                </span>
                <span className="font-extrabold text-emerald-700 text-xl">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Free Shipping Notice */}
            {subtotal < 5000 && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-[11px] text-amber-800 leading-relaxed">
                আর মাত্র{" "}
                <span className="font-bold">
                  {formatPrice(5000 - subtotal)}
                </span>{" "}
                টাকার কেনাকাটা করলেই উপভোগ করুন সারা দেশে ফ্রি হোম ডেলিভারি!
              </div>
            )}

            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {cartBn.couponCode}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder={cartBn.couponPlaceholder}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-xl transition-colors shrink-0"
                >
                  {cartBn.applyCoupon}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                পরীক্ষার জন্য ব্যবহার করুন: <span className="font-bold text-emerald-600">ABU100</span>
              </p>
            </form>

            {/* Checkout Button */}
            <div className="pt-2">
              <Link
                href="/checkout"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl text-center transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95"
              >
                <span>{cartBn.proceedToCheckout}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{cartBn.secureCheckoutNotice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

