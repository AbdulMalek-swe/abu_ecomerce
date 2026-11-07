import { formatBnNumber } from "./number";

/**
 * Centralized Currency Formatter for Bangladeshi Taka (BDT)
 * All frontend prices must pass through this formatter.
 */

export const BDT_SYMBOL = "৳";

export interface FormatPriceOptions {
  showSymbol?: boolean;
  symbolPosition?: "before" | "after";
  decimals?: number;
}

/**
 * Formats a raw numeric price into standard Bangla Taka notation.
 *
 * @param amount - Raw price number (e.g. 1500)
 * @param options - Formatting options
 * @returns Formatted price string (e.g. "৳ ১,৫০০")
 * @example formatPrice(1500) => "৳ ১,৫০০"
 * @example formatPrice(99.5, { decimals: 2 }) => "৳ ৯৯.৫০"
 */
export function formatPrice(
  amount: number,
  options: FormatPriceOptions = {}
): string {
  const {
    showSymbol = true,
    symbolPosition = "before",
    decimals = 0,
  } = options;

  if (typeof amount !== "number" || isNaN(amount)) {
    return showSymbol ? `${BDT_SYMBOL} ০` : "০";
  }

  const formattedNum = formatBnNumber(amount, { decimals });

  if (!showSymbol) {
    return formattedNum;
  }

  return symbolPosition === "before"
    ? `${BDT_SYMBOL} ${formattedNum}`
    : `${formattedNum} ${BDT_SYMBOL}`;
}

/**
 * Calculates discount percentage and formats in Bangla numerals
 * @example formatDiscountPercent(1500, 1200) => "২০% ছাড়"
 */
export function formatDiscountPercent(originalPrice: number, discountedPrice: number): string {
  if (!originalPrice || originalPrice <= discountedPrice) return "";
  const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  return `${formatBnNumber(discount)}% ছাড়`;
}

