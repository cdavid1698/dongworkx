"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { getPart } from "@/content/parts";
import { getBranch, paymentMethods, shippingRates, site, type BranchId } from "@/content/site";
import { formatPeso } from "@/lib/format";
import { useOrders } from "@/lib/payments";
import { useHydrated } from "@/lib/store";

export function OrderSuccess({ orderId }: { orderId?: string }) {
  const hydrated = useHydrated();
  const order = useOrders().find((o) => o.id === orderId);

  if (!hydrated) return <p className="text-muted">Loading your order…</p>;

  if (!order) {
    return (
      <div>
        <h1 className="display text-5xl uppercase">Order not found</h1>
        <p className="mt-4 text-lg text-muted">We couldn&rsquo;t find that order on this device. Call {site.phone} and we&rsquo;ll look it up.</p>
        <Link href="/parts" className="mt-6 inline-flex h-12 items-center rounded bg-workx px-5 font-semibold text-paper">Shop parts</Link>
      </div>
    );
  }

  const method = paymentMethods.find((m) => m.id === order.payment);
  const pickup = order.pickupBranch ? getBranch(order.pickupBranch as BranchId) : null;
  const nextStep = pickup
    ? `We'll text you when it's ready for pickup at ${pickup.town}, usually the same day.`
    : `We'll text your tracking number when it ships. ${order.delivery.type === "ship" ? `Expect it in ${shippingRates[order.delivery.region].days}.` : ""}`;

  return (
    <div>
      <p className="flex items-center gap-2 font-semibold text-[#1f6f33]">
        <Check className="size-5" aria-hidden /> Order placed
      </p>
      <h1 className="display mt-3 text-5xl uppercase md:text-6xl">Salamat, {order.customer.name.split(" ")[0]}!</h1>
      <p className="mt-4 text-lg">
        Order <span className="font-mono font-bold">{order.id}</span>. {nextStep}
      </p>
      <p className="mt-1 text-muted">
        {order.payment === "cash"
          ? pickup ? "Pay in cash when you collect." : "Pay the courier in cash on delivery."
          : `Paid with ${method?.label}${order.financeMonths ? ` over ${order.financeMonths} months` : ""} (test reference ${order.reference}).`}{" "}
        Demo: no payment was taken and no message was sent.
      </p>

      <div className="mt-8 rounded border border-line bg-paper p-5">
        <ul className="divide-y divide-line">
          {order.lines.map((l) => {
            const part = getPart(l.slug);
            return part ? (
              <li key={l.slug} className="flex justify-between py-2">
                <span>{part.name} × {l.qty}</span>
                <span className="font-mono">{formatPeso(part.price * l.qty)}</span>
              </li>
            ) : null;
          })}
        </ul>
        <p className="mt-2 flex justify-between text-muted"><span>Shipping</span><span className="font-mono">{order.shipping ? formatPeso(order.shipping) : "Free"}</span></p>
        <p className="mt-2 flex justify-between border-t-2 border-ink pt-3 text-lg font-semibold"><span>Total</span><span className="font-mono">{formatPeso(order.total)}</span></p>
        <p className="text-sm text-muted">Includes {formatPeso(order.vat, true)} VAT</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/book" className="inline-flex h-12 items-center rounded bg-workx px-5 font-semibold text-paper hover:bg-workx-deep">Book fitting</Link>
        <Link href="/parts" className="inline-flex h-12 items-center rounded border-2 border-ink px-5 font-semibold">Continue shopping</Link>
      </div>
    </div>
  );
}
