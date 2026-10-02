// Business facts. Every value traces to research/sources.md (S# = public source, C# = client-confirmed).

export type BranchId = "gerona" | "guimba";

export type Branch = {
  id: BranchId;
  name: string;
  town: string;
  province: string;
  street: string;
  locality: string;
  postalCode?: string;
  plusCode?: string;
  mapQuery: string;
  source: string;
};

export const site = {
  name: "DongWorkx",
  tagline: "Motorparts shop · FI specialist", // S10
  description:
    "Fuel-injection diagnostics, motorcycle repair and parts in Gerona, Tarlac and Guimba, Nueva Ecija. Book a repair online or order parts with nationwide shipping.",
  owner: "Brando Ramones", // brief, S11
  phone: "0969 029 3899", // S2, C2
  phoneIntl: "+639690293899",
  email: "brandoramones130821@gmail.com", // S3
  facebook: "https://www.facebook.com/profile.php?id=100067520688048", // S1
  facebookFollowers: "6.5K", // S7, checked 2026-10-02
  hours: { open: 8 * 60, close: 18 * 60, label: "8:00 AM – 6:00 PM", days: "Daily" }, // C1 (days to confirm)
  timeZone: "Asia/Manila",
  agencyName: process.env.NEXT_PUBLIC_AGENCY_NAME ?? "CK David",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const branches: Branch[] = [
  {
    id: "gerona",
    name: "Gerona branch",
    town: "Gerona",
    province: "Tarlac",
    street: "Mac Arthur Highway, Purok Ilang Ilang",
    locality: "Brgy. Magaspac, Gerona, Tarlac",
    plusCode: "JH7X+X56",
    mapQuery: "JH7X+X56 Gerona, Tarlac, Philippines",
    source: "S4",
  },
  {
    id: "guimba",
    name: "Guimba branch",
    town: "Guimba",
    province: "Nueva Ecija",
    street: "Provincial Road, Saranay District",
    locality: "Guimba, Nueva Ecija",
    postalCode: "3115",
    mapQuery: "Saranay, Guimba, Nueva Ecija, Philippines",
    source: "S5",
  },
];

export function getBranch(id: BranchId): Branch {
  const branch = branches.find((b) => b.id === id);
  if (!branch) throw new Error(`Unknown branch ${id}`);
  return branch;
}

export function mapsDirectionsUrl(branch: Branch): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.mapQuery)}`;
}

export function mapsEmbedUrl(branch: Branch): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(branch.mapQuery)}&output=embed`;
}

// C3: payment methods confirmed by the client.
export type PaymentMethodId = "cash" | "gcash" | "maya" | "qrph" | "card" | "skyro" | "salmon";

export const paymentMethods: { id: PaymentMethodId; label: string; note: string; kind: "cash" | "wallet" | "card" | "financing" }[] = [
  { id: "cash", label: "Cash", note: "Pay at the counter, or cash on delivery", kind: "cash" },
  { id: "gcash", label: "GCash", note: "Scan or pay from the app", kind: "wallet" },
  { id: "maya", label: "Maya", note: "Scan or pay from the app", kind: "wallet" },
  { id: "qrph", label: "QR Ph", note: "Any bank or e-wallet app", kind: "wallet" },
  { id: "card", label: "Credit / debit card", note: "Visa, Mastercard", kind: "card" },
  { id: "skyro", label: "Skyro", note: "Pay in instalments", kind: "financing" },
  { id: "salmon", label: "Salmon", note: "Pay in instalments", kind: "financing" },
];

// C4: nationwide shipping. Rates are sample values for the demo.
export type ShippingRegion = "luzon" | "visayas" | "mindanao";

export const shippingRates: Record<ShippingRegion, { label: string; base: number; perKg: number; days: string; sample: true }> = {
  luzon: { label: "Luzon", base: 120, perKg: 40, days: "2–4 days", sample: true },
  visayas: { label: "Visayas", base: 180, perKg: 60, days: "3–6 days", sample: true },
  mindanao: { label: "Mindanao", base: 200, perKg: 70, days: "4–7 days", sample: true },
};

export const freeShippingThreshold = { amount: 3000, sample: true } as const;

// Reservation deposit for bookings (optional; sample value).
export const bookingDeposit = { amount: 200, sample: true } as const;

// Indicative instalment terms. We do not publish Skyro/Salmon rates; amounts are price ÷ months.
export const financing = { minAmount: 1500, months: [3, 6, 12], sample: true } as const;
