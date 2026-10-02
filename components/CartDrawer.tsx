"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cartTotals, resolveLines, setCartDrawer, useCart, useCartDrawer } from "@/lib/cart";
import { formatPeso } from "@/lib/format";
import { CartLines } from "./CartLines";

export function CartDrawer() {
  const open = useCartDrawer();
  const lines = resolveLines(useCart());
  const { subtotal } = cartTotals(lines);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={() => setCartDrawer(false)}
      onClick={(e) => e.target === e.currentTarget && setCartDrawer(false)}
      aria-labelledby="cart-title"
      className="m-0 ml-auto h-dvh max-h-dvh w-[min(26rem,100%)] max-w-none bg-paper p-0 text-ink backdrop:bg-ink/70"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <h2 id="cart-title" className="condensed text-xl font-bold">
            Your cart
          </h2>
          <button type="button" onClick={() => setCartDrawer(false)} className="-mr-2 grid size-11 place-items-center" aria-label="Close cart">
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5">
          {lines.length === 0 ? (
            <div className="py-10">
              <p className="text-muted">Your cart is empty.</p>
              <Link href="/parts" onClick={() => setCartDrawer(false)} className="mt-3 inline-block font-semibold text-workx-deep underline underline-offset-4">
                Browse parts for your bike
              </Link>
            </div>
          ) : (
            <CartLines lines={lines} compact />
          )}
        </div>
        {lines.length > 0 && (
          <div className="border-t border-line px-5 py-4">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span className="font-mono">{formatPeso(subtotal)}</span>
            </div>
            <p className="mt-1 text-sm text-muted">VAT included. Shipping or pickup is chosen at checkout.</p>
            <Link
              href="/checkout"
              onClick={() => setCartDrawer(false)}
              className="mt-4 flex h-12 items-center justify-center rounded bg-workx font-semibold text-paper hover:bg-workx-deep"
            >
              Go to checkout
            </Link>
            <Link href="/cart" onClick={() => setCartDrawer(false)} className="mt-2 flex h-11 items-center justify-center font-semibold underline underline-offset-4">
              View full cart
            </Link>
          </div>
        )}
      </div>
    </dialog>
  );
}
