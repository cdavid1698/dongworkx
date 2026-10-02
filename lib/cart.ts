"use client";

// Cart service module: localStorage-backed. Swap for a server cart in the paid build.

import { freeShippingThreshold, shippingRates, type ShippingRegion } from "@/content/site";
import { getPart, type Part } from "@/content/parts";
import { vatIncluded } from "./format";
import { createLocalStore } from "./store";

export type CartLine = { slug: string; qty: number };
export type ResolvedLine = CartLine & { part: Part; lineTotal: number };

const MAX_QTY = 10;
const cartStore = createLocalStore<CartLine[]>("dw-cart", []);

// The drawer opens whenever something is added, so the rider gets feedback.
const drawerStore = createLocalStore<boolean>("dw-cart-open", false, { persist: false });

export const useCart = cartStore.useValue;
export const useCartDrawer = drawerStore.useValue;
export const setCartDrawer = (open: boolean) => drawerStore.set(open);

export function addToCart(slug: string, qty = 1) {
  cartStore.set((lines) => {
    const existing = lines.find((l) => l.slug === slug);
    if (existing) {
      return lines.map((l) => (l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
    }
    return [...lines, { slug, qty: Math.min(MAX_QTY, qty) }];
  });
  drawerStore.set(true);
}

export function setQty(slug: string, qty: number) {
  cartStore.set((lines) =>
    qty <= 0 ? lines.filter((l) => l.slug !== slug) : lines.map((l) => (l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
  );
}

export function removeFromCart(slug: string) {
  cartStore.set((lines) => lines.filter((l) => l.slug !== slug));
}

export function clearCart() {
  cartStore.set([]);
}

export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  return lines.flatMap((line) => {
    const part = getPart(line.slug);
    return part ? [{ ...line, part, lineTotal: part.price * line.qty }] : [];
  });
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}

export type Delivery = { type: "pickup" } | { type: "ship"; region: ShippingRegion };

export function shippingCost(lines: ResolvedLine[], delivery: Delivery): number {
  if (delivery.type === "pickup" || lines.length === 0) return 0;
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  if (subtotal >= freeShippingThreshold.amount) return 0;
  const weight = lines.reduce((s, l) => s + l.part.weightKg * l.qty, 0);
  const rate = shippingRates[delivery.region];
  return rate.base + Math.max(0, Math.ceil(weight - 1)) * rate.perKg;
}

export function cartTotals(lines: ResolvedLine[], delivery: Delivery = { type: "pickup" }) {
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const shipping = shippingCost(lines, delivery);
  const total = subtotal + shipping;
  return { subtotal, shipping, total, vat: vatIncluded(total) };
}
