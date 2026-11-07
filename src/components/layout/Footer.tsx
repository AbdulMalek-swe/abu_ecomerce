import React from "react";
import Link from "next/link";
import { commonBn, navigationBn } from "@/locales/bn";
import {
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {commonBn.guarantees.fastDeliveryTitle}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {commonBn.guarantees.fastDeliveryDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {commonBn.guarantees.codTitle}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {commonBn.guarantees.codDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {commonBn.guarantees.returnTitle}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {commonBn.guarantees.returnDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {commonBn.guarantees.securePaymentTitle}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {commonBn.guarantees.securePaymentDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Links & Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white">
                {commonBn.appName}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {commonBn.footer.aboutDesc}
            </p>
            <div className="pt-1">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                {commonBn.footer.cashOnDelivery}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              {commonBn.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {navigationBn.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {navigationBn.allProducts}
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {navigationBn.trackOrder}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {navigationBn.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              {navigationBn.categories}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/products?category=electronics"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {navigationBn.categoryLabels.electronics}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=fashion"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {navigationBn.categoryLabels.fashion}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=grocery"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {navigationBn.categoryLabels.grocery}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=beauty"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {navigationBn.categoryLabels.beauty}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=home"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {navigationBn.categoryLabels.home}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              {commonBn.footer.contactInfo}
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{commonBn.footer.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{commonBn.footer.hotline}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{commonBn.footer.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{commonBn.footer.serviceHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © ২০২৬ {commonBn.appName}। {commonBn.footer.allRightsReserved}
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>{commonBn.footer.paymentMethods}:</span>
            <span className="font-semibold text-slate-300">ক্যাশ অন ডেলিভারি</span>
            <span>•</span>
            <span className="font-semibold text-slate-300">বিকাশ</span>
            <span>•</span>
            <span className="font-semibold text-slate-300">নগদ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

