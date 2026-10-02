"use client";

// Payment service module (Stripe Mode A: fully simulated).
// No money moves and nothing is sent anywhere. In the paid build, replace simulatePayment
// with PayMongo/Xendit (GCash, Maya, QR Ph, cards) and Skyro/Salmon merchant checkouts.

import { financing, type PaymentMethodId } from "@/content/site";
import type { CartLine, Delivery } from "./cart";
import { createLocalStore } from "./store";

export const TEST_CARD = "4242 4242 4242 4242";

export function isTestCard(input: string): boolean {
  return input.replace(/\s/g, "") === TEST_CARD.replace(/\s/g, "");
}

export function formatCardNumber(input: string): string {
  return input.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function isValidExpiry(input: string): boolean {
  const m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(input.trim());
  if (!m) return false;
  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
}

export function canFinance(amount: number): boolean {
  return amount >= financing.minAmount;
}

/** Indicative only: the amount divided by the months. Real terms come from Skyro or Salmon. */
export function indicativeMonthly(amount: number, months: number): number {
  return Math.ceil(amount / months);
}

export async function simulatePayment(method: PaymentMethodId): Promise<{ ok: true; reference: string }> {
  await new Promise((r) => setTimeout(r, method === "cash" ? 300 : 1200));
  return { ok: true, reference: `TEST-${Date.now().toString(36).toUpperCase()}` };
}

export type Order = {
  id: string;
  lines: CartLine[];
  delivery: Delivery;
  pickupBranch?: string;
  payment: PaymentMethodId;
  financeMonths?: number;
  reference: string;
  subtotal: number;
  shipping: number;
  total: number;
  vat: number;
  customer: { name: string; mobile: string; email: string; address?: string };
  createdAt: string;
};

const ordersStore = createLocalStore<Order[]>("dw-orders", []);
export const useOrders = ordersStore.useValue;
export function saveOrder(order: Order) {
  ordersStore.set((prev) => [order, ...prev].slice(0, 20));
}
