const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 });
const pesoCents = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", minimumFractionDigits: 2 });

export function formatPeso(amount: number, withCents = false): string {
  return (withCents ? pesoCents : peso).format(amount);
}

/** Philippine VAT is 12%. Prices are shown VAT-inclusive, so the VAT part is price × 12/112. */
export const VAT_RATE = 0.12;

export function vatIncluded(grossAmount: number): number {
  return Math.round((grossAmount * VAT_RATE * 100) / (1 + VAT_RATE)) / 100;
}

/** Accepts 09XXXXXXXXX or +639XXXXXXXXX, ignoring spaces and dashes. */
export function isValidPhMobile(input: string): boolean {
  const digits = input.replace(/[\s-]/g, "");
  return /^(09\d{9}|\+639\d{9})$/.test(digits);
}

export function isValidEmail(input: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
}

export function shortId(prefix: string): string {
  const n = Math.floor(Math.random() * 36 ** 5).toString(36).toUpperCase().padStart(5, "0");
  return `${prefix}-${n}`;
}
