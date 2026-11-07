"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { productsBn, commonBn } from "@/locales/bn";
import { formatPrice, formatDiscountPercent } from "@/lib/formatters/currency";
import { toBnDigits } from "@/lib/formatters/number";
import { ProductCard } from "@/components/products/ProductCard";
import {
  ShoppingBag,
  Zap,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  Share2,
} from "lucide-react";

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailsClient({
  product,
  relatedProducts,
}: ProductDetailsClientProps) {
  const router = useRouter();
  const { addToCart, showToast } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");

  const discountText =
    product.originalPrice && product.originalPrice > product.price
      ? formatDiscountPercent(product.originalPrice, product.price)
      : null;

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("লিংক কপি করা হয়েছে!", "info");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="ব্রেডক্রাম্ব" className="text-xs sm:text-sm text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-700">
          {commonBn.home}
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-emerald-700">
          {commonBn.allProducts}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-2xs">
        {/* Images Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-inner">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {discountText && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-rose-600 text-white font-bold text-xs sm:text-sm rounded-lg shadow-md">
                {discountText}
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx
                      ? "border-emerald-600 ring-2 ring-emerald-600/30"
                      : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Brand & Stock */}
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800">
                {product.brand}
              </span>

              {product.inStock ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full">
                  <Check className="w-3.5 h-3.5" />
                  <span>{productsBn.inStock}</span>
                </span>
              ) : (
                <span className="px-3 py-1 text-xs font-bold bg-rose-100 text-rose-800 rounded-full">
                  {productsBn.outOfStock}
                </span>
              )}
            </div>

            {/* Product Name (Verbatim backend data) */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-snug">
              {product.name}
            </h1>

            {/* Rating & Review */}
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-800">
                  {toBnDigits(product.rating.toFixed(1))}
                </span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">
                {productsBn.reviews(toBnDigits(product.reviewsCount))}
              </span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm sm:text-base text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Action Zone: Quantity & Buttons */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                {productsBn.quantity}:
              </span>
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="কমান"
                  className="p-2 px-3 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-900">
                  {toBnDigits(quantity)}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="বাড়ান"
                  className="p-2 px-3 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-slate-400">
                ({productsBn.stockCount(toBnDigits(product.stockQuantity))})
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={!product.inStock}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{productsBn.addToCart}</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-slate-950 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
              >
                <Zap className="w-5 h-5 fill-slate-950 text-slate-950" />
                <span>{productsBn.buyNow}</span>
              </button>
            </div>

            {/* Quick Trust Strip */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 flex flex-col items-center">
                <Truck className="w-4 h-4 text-emerald-600 mb-1" />
                <span className="text-[11px] font-semibold text-slate-700">
                  {commonBn.guarantees.fastDeliveryTitle}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                <span className="text-[11px] font-semibold text-slate-700">
                  {commonBn.guarantees.codTitle}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-emerald-600 mb-1" />
                <span className="text-[11px] font-semibold text-slate-700">
                  {commonBn.guarantees.returnTitle}
                </span>
              </div>
            </div>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="text-xs text-slate-500 hover:text-emerald-700 font-medium flex items-center gap-1.5 pt-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{productsBn.shareProduct}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Specifications, Reviews */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50/70">
          <button
            onClick={() => setActiveTab("desc")}
            className={`py-3.5 px-6 font-bold text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "desc"
                ? "border-emerald-600 text-emerald-700 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            {productsBn.tabs.description}
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`py-3.5 px-6 font-bold text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "specs"
                ? "border-emerald-600 text-emerald-700 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            {productsBn.tabs.specifications}
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`py-3.5 px-6 font-bold text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "reviews"
                ? "border-emerald-600 text-emerald-700 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            {productsBn.tabs.reviews}
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === "desc" && (
            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
              <p>{product.description}</p>
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-950 text-sm mb-1">
                  কেন আমাদের থেকে কিনবেন?
                </h4>
                <ul className="list-disc list-inside text-xs sm:text-sm text-emerald-900 space-y-1">
                  <li>১০০% জেনুইন ও ইনট্যাক্ট পণ্যের নিশ্চয়তা।</li>
                  <li>সরাসরি আমদানিকারক ও অফিসিয়াল ডিস্ট্রিবিউটর থেকে সংগৃহীত।</li>
                  <li>ক্যাশ অন ডেলিভারিতে চেক করে নেওয়ার অনন্য সুবিধা।</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? "bg-slate-50/60" : "bg-white"}
                    >
                      <td className="py-3 px-4 font-bold text-slate-700 w-1/3 border-b border-slate-100">
                        {key}
                      </td>
                      <td className="py-3 px-4 text-slate-800 border-b border-slate-100">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                <div className="text-center px-4 border-r border-amber-200">
                  <div className="text-3xl font-extrabold text-amber-600">
                    {toBnDigits(product.rating.toFixed(1))}
                  </div>
                  <div className="flex items-center justify-center text-amber-500 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-amber-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-amber-900">
                  <p className="font-bold">যাচাইকৃত গ্রাহকদের মতামত</p>
                  <p className="text-amber-700 mt-0.5">
                    মোট {toBnDigits(product.reviewsCount)} জন ক্রেতা এই পণ্যের রিভিউ প্রদান করেছেন।
                  </p>
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-slate-800">
                      রাকিবুল হাসান (যাচাইকৃত ক্রেতা)
                    </span>
                    <span className="text-[11px] text-slate-400">২ দিন আগে</span>
                  </div>
                  <div className="flex text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600">
                    অরিজিনাল প্রোডাক্ট পেয়েছি, প্যাকেজিং অনেক চমৎকার ছিল। সময়মতো ডেলিভারি পেয়েছি। ধন্যবাদ!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {productsBn.relatedProductsTitle}
            </h2>
            <Link
              href="/products"
              className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800"
            >
              {commonBn.allProducts}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 lg:gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

