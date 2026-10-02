import type { Metadata } from "next";
import { CartView } from "@/components/checkout/CartView";

export const metadata: Metadata = { title: "Cart", description: "Review the parts in your DongWorkx cart." };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h1 className="display text-6xl uppercase">Your cart</h1>
      <CartView />
    </div>
  );
}
