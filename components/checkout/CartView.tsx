"use client";

import Link from "next/link";
import { cartTotals, resolveLines, useCart } from "@/lib/cart";
import { formatPeso } from "@/lib/format";
import { useHydrated } from "@/lib/store";
import { freeShippingThreshold } from "@/content/site";
import { CartLines } from "../CartLines";

export function CartView() {
  const hydrated = useHydrated();
  const lines = resolveLines(useCart());
  const { subtotal, vat } = cartTotals(lines);

  if (!hydrated) return <p className="mt-8 text-muted">Loading your cart…</p>;

  if (lines.length === 0) {
    return (
      <div className="mt-8 rounded border border-dashed border-muted p-8">
        <p className="text-lg font-semibold">Your cart is empty.</p>
        <Link href="/parts" className="mt-4 inline-flex h-12 items-center rounded bg-workx px-5 font-semibold text-paper hover:bg-workx-deep">
          Shop parts
        </Link>
      </div>
    );
  }

  const toFree = freeShippingThreshold.amount - subtotal;

  return (
    <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="border-t-2 border-ink">
        <CartLines lines={lines} />
      </div>
      <aside aria-label="Order total" className="h-fit rounded border border-line bg-paper p-5">
        <p className="flex justify-between text-lg font-semibold">
          <span>Subtotal</span>
          <span className="font-mono">{formatPeso(subtotal)}</span>
        </p>
        <p className="mt-1 text-sm text-muted">Includes {formatPeso(vat, true)} VAT.</p>
        <p className="mt-3 text-sm">
          {toFree > 0 ? `Add ${formatPeso(toFree)} more for free nationwide shipping.` : "Your order ships free anywhere in the Philippines."}
        </p>
        <Link href="/checkout" className="mt-5 flex h-12 items-center justify-center rounded bg-workx font-semibold text-paper hover:bg-workx-deep">
          Go to checkout
        </Link>
        <Link href="/parts" className="mt-2 flex h-11 items-center justify-center font-semibold underline underline-offset-4">
          Keep shopping
        </Link>
      </aside>
    </div>
  );
}
