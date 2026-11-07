/**
 * Centralized Number Formatter for Bangla Numbers
 * Maps 0-9 to Bengali digits: ০-৯
 * Note: Raw IDs, phone numbers, and machine-readable values must NEVER be converted.
 */

const BN_DIGITS: Record<string, string> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

const EN_DIGITS: Record<string, string> = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

/**
 * Converts English digits in a number or numeric string to Bengali digits.
 * Preserves commas, decimals, hyphens, and whitespace.
 *
 * @param value - number or string to convert
 * @returns Bengali numeric string
 * @example toBnDigits(1500) => "১৫০০"
 * @example toBnDigits("1,500.50") => "১,৫০০.৫০"
 */
export function toBnDigits(value: number | string): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  return str.replace(/[0-9]/g, (digit) => BN_DIGITS[digit] || digit);
}

/**
 * Converts Bengali digits in a string back to English digits.
 * Useful for parsing user-typed Bengali numerals in quantity or form inputs.
 *
 * @param value - string containing Bengali digits
 * @returns English numeric string
 * @example toEnDigits("১২৩৪") => "1234"
 */
export function toEnDigits(value: string): string {
  if (!value) return "";
  return value.replace(/[০-৯]/g, (digit) => EN_DIGITS[digit] || digit);
}

/**
 * Formats a number with standard comma grouping (thousands separators) in Bengali digits.
 *
 * @param num - number to format
 * @param options - optional decimal configuration
 * @returns Formatted Bengali number string
 * @example formatBnNumber(150000) => "১,৫০,০০০" (or "১,৫০,০০০" South Asian format)
 */
export function formatBnNumber(num: number, options?: { decimals?: number }): string {
  if (isNaN(num)) return "০";

  // Use South Asian numbering system (lakh/crore) for natural Bengali formatting
  const parts = (options?.decimals !== undefined ? num.toFixed(options.decimals) : String(num)).split(".");
  const intPart = parts[0];
  const decPart = parts[1];

  let formattedInt = "";
  if (intPart.length > 3) {
    const lastThree = intPart.substring(intPart.length - 3);
    const otherDigits = intPart.substring(0, intPart.length - 3);
    const withCommas = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    formattedInt = withCommas + "," + lastThree;
  } else {
    formattedInt = intPart;
  }

  const result = decPart ? `${formattedInt}.${decPart}` : formattedInt;
  return toBnDigits(result);
}

