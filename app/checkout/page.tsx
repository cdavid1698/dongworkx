import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";

export const metadata: Metadata = { title: "Checkout", description: "Pick up your parts in Gerona or Guimba, or ship nationwide." };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-16">
      <h1 className="display text-6xl uppercase">Checkout</h1>
      <CheckoutFlow />
    </div>
  );
}
