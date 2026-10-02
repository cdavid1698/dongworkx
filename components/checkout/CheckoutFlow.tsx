"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { branches, financing, paymentMethods, shippingRates, type BranchId, type PaymentMethodId, type ShippingRegion } from "@/content/site";
import { cartTotals, clearCart, resolveLines, useCart, type Delivery } from "@/lib/cart";
import { formatPeso, isValidEmail, isValidPhMobile, shortId } from "@/lib/format";
import { canFinance, saveOrder, simulatePayment, type Order } from "@/lib/payments";
import { useHydrated } from "@/lib/store";
import { PaymentModal } from "../PaymentModal";

type DeliveryChoice = BranchId | "ship";
type Fields = { name: string; mobile: string; email: string; street: string; barangay: string; city: string; province: string; zip: string };

const emptyFields: Fields = { name: "", mobile: "", email: "", street: "", barangay: "", city: "", province: "", zip: "" };

export function CheckoutFlow() {
  const router = useRouter();
  const hydrated = useHydrated();
  const cart = useCart();
  const lines = resolveLines(cart);
  const [choice, setChoice] = useState<DeliveryChoice>("gerona");
  const [region, setRegion] = useState<ShippingRegion>("luzon");
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [method, setMethod] = useState<PaymentMethodId>("cash");
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [paying, setPaying] = useState(false);
  const [placing, setPlacing] = useState(false);

  const delivery: Delivery = choice === "ship" ? { type: "ship", region } : { type: "pickup" };
  const totals = cartTotals(lines, delivery);
  const financeOk = canFinance(totals.total);
  const shipping = choice === "ship";
  // If the total drops below the financing minimum, fall back to cash.
  const activeMethod: PaymentMethodId = paymentMethods.find((m) => m.id === method)?.kind === "financing" && !financeOk ? "cash" : method;

  if (!hydrated) return <p className="mt-8 text-muted">Loading checkout…</p>;

  if (lines.length === 0 && !placing) {
    return (
      <div className="mt-8 rounded border border-dashed border-muted p-8">
        <p className="text-lg font-semibold">There&rsquo;s nothing to check out yet.</p>
        <Link href="/parts" className="mt-4 inline-flex h-12 items-center rounded bg-workx px-5 font-semibold text-paper hover:bg-workx-deep">
          Shop parts
        </Link>
      </div>
    );
  }

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validate(): boolean {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) next.name = "Enter your full name.";
    if (!isValidPhMobile(fields.mobile)) next.mobile = "Enter a mobile number like 0917 123 4567.";
    if (fields.email && !isValidEmail(fields.email)) next.email = "Check the email address, or leave it blank.";
    if (shipping) {
      if (!fields.street.trim()) next.street = "Enter your house number and street.";
      if (!fields.barangay.trim()) next.barangay = "Enter your barangay.";
      if (!fields.city.trim()) next.city = "Enter your city or municipality.";
      if (!fields.province.trim()) next.province = "Enter your province.";
      if (!/^\d{4}$/.test(fields.zip)) next.zip = "Enter a 4-digit ZIP code.";
    }
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) document.getElementById(`co-${first}`)?.focus();
    return !first;
  }

  function finish(reference: string, financeMonths?: number) {
    setPlacing(true);
    const id = shortId("DWO");
    const order: Order = {
      id,
      lines: cart,
      delivery,
      pickupBranch: shipping ? undefined : choice,
      payment: activeMethod,
      financeMonths,
      reference,
      ...totals,
      customer: {
        name: fields.name,
        mobile: fields.mobile,
        email: fields.email,
        address: shipping ? `${fields.street}, ${fields.barangay}, ${fields.city}, ${fields.province} ${fields.zip}` : undefined,
      },
      createdAt: new Date().toISOString(),
    };
    saveOrder(order);
    clearCart();
    router.push(`/checkout/success?order=${id}`);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (activeMethod === "cash") {
      setPlacing(true);
      const { reference } = await simulatePayment("cash");
      finish(reference);
      return;
    }
    setPaying(true);
  }

  const cashLabel = shipping ? "Cash on delivery (COD)" : "Cash at pickup";

  return (
    <>
      <form onSubmit={submit} noValidate className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-10">
          <fieldset>
            <legend className="condensed text-2xl font-bold">1. Delivery</legend>
            <div className="mt-3 grid gap-3">
              {branches.map((b) => (
                <Choice key={b.id} name="delivery" checked={choice === b.id} onChange={() => setChoice(b.id)} title={`Pick up at ${b.town}`} body={`${b.street}, ${b.locality}. Free.`} />
              ))}
              <Choice name="delivery" checked={shipping} onChange={() => setChoice("ship")} title="Ship to my address" body="Nationwide by courier. Rate shown below." />
            </div>
            {shipping && (
              <div className="mt-4">
                <label htmlFor="co-region" className="font-semibold">Region</label>
                <select id="co-region" value={region} onChange={(e) => setRegion(e.target.value as ShippingRegion)} className="mt-1 block h-12 w-full max-w-xs rounded border border-line bg-paper px-3">
                  {(Object.keys(shippingRates) as ShippingRegion[]).map((r) => (
                    <option key={r} value={r}>{shippingRates[r].label}: {shippingRates[r].days}</option>
                  ))}
                </select>
              </div>
            )}
          </fieldset>
  
          <fieldset>
            <legend className="condensed text-2xl font-bold">2. Your details</legend>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Input id="co-name" label="Full name" value={fields.name} onChange={set("name")} error={errors.name} autoComplete="name" className="sm:col-span-2" />
              <Input id="co-mobile" label="Mobile number" value={fields.mobile} onChange={set("mobile")} error={errors.mobile} autoComplete="tel" inputMode="tel" />
              <Input id="co-email" label="Email (optional, for your receipt)" value={fields.email} onChange={set("email")} error={errors.email} autoComplete="email" inputMode="email" />
              {shipping && (
                <>
                  <Input id="co-street" label="House no. and street" value={fields.street} onChange={set("street")} error={errors.street} autoComplete="address-line1" className="sm:col-span-2" />
                  <Input id="co-barangay" label="Barangay" value={fields.barangay} onChange={set("barangay")} error={errors.barangay} autoComplete="address-line2" />
                  <Input id="co-city" label="City / municipality" value={fields.city} onChange={set("city")} error={errors.city} autoComplete="address-level2" />
                  <Input id="co-province" label="Province" value={fields.province} onChange={set("province")} error={errors.province} autoComplete="address-level1" />
                  <Input id="co-zip" label="ZIP code" value={fields.zip} onChange={set("zip")} error={errors.zip} autoComplete="postal-code" inputMode="numeric" />
                </>
              )}
            </div>
          </fieldset>
  
          <fieldset>
            <legend className="condensed text-2xl font-bold">3. Payment</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {paymentMethods.map((m) => {
                const disabled = m.kind === "financing" && !financeOk;
                return (
                  <Choice
                    key={m.id}
                    name="payment"
                    checked={activeMethod === m.id}
                    disabled={disabled}
                    onChange={() => setMethod(m.id)}
                    title={m.id === "cash" ? cashLabel : m.label}
                    body={disabled ? `For orders of ${formatPeso(financing.minAmount)} or more.` : m.kind === "financing" ? `From ${formatPeso(Math.ceil(totals.total / 12))}/mo over 12 months (indicative).` : m.note}
                  />
                );
              })}
            </div>
          </fieldset>
        </div>
  
        <aside aria-label="Order summary" className="h-fit rounded bg-ink p-5 text-paper md:sticky md:top-24">
          <h2 className="font-mono text-xs text-fi">ORDER SUMMARY</h2>
          <ul className="mt-3 space-y-2">
            {lines.map((l) => (
              <li key={l.slug} className="flex justify-between gap-3">
                <span>{l.part.name} <span className="text-paper/60">× {l.qty}</span></span>
                <span className="font-mono">{formatPeso(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1 border-t border-paper/15 pt-3 font-mono">
            <div className="flex justify-between"><dt className="font-sans">Subtotal</dt><dd>{formatPeso(totals.subtotal)}</dd></div>
            <div className="flex justify-between">
              <dt className="font-sans">{shipping ? `Shipping, ${shippingRates[region].label}` : "Pickup"}</dt>
              <dd>{totals.shipping === 0 ? "Free" : formatPeso(totals.shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-paper/15 pt-2 text-xl font-bold"><dt className="font-sans">Total</dt><dd>{formatPeso(totals.total)}</dd></div>
            <div className="flex justify-between text-sm text-paper/70"><dt className="font-sans">VAT included (12%)</dt><dd>{formatPeso(totals.vat, true)}</dd></div>
          </dl>
          <button type="submit" disabled={placing} className="mt-5 h-12 w-full rounded bg-workx font-semibold hover:bg-workx-deep disabled:opacity-70">
            {placing ? "Placing order…" : `Place order, ${formatPeso(totals.total)}`}
          </button>
          <p className="mt-3 text-sm text-paper/70">Test mode. No payment will be taken.</p>
        </aside>
      </form>

      <PaymentModal
        open={paying}
        method={activeMethod}
        amount={totals.total}
        onClose={() => setPaying(false)}
        onPaid={({ reference, financeMonths }) => {
          setPaying(false);
          finish(reference, financeMonths);
        }}
      />
    </>
  );
}

function Choice({ name, checked, onChange, title, body, disabled = false }: { name: string; checked: boolean; onChange: () => void; title: string; body: string; disabled?: boolean }) {
  return (
    <label className={`flex items-start gap-3 rounded border-2 bg-paper p-4 has-checked:border-rotor ${disabled ? "cursor-not-allowed border-line opacity-60" : "cursor-pointer border-line"}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} disabled={disabled} className="mt-1 size-5 shrink-0 accent-rotor" />
      <span>
        <span className="font-semibold">{title}</span>
        <span className="block text-sm text-muted">{body}</span>
      </span>
    </label>
  );
}

function Input({ id, label, value, onChange, error, className = "", autoComplete, inputMode }: { id: string; label: string; value: string; onChange: (v: string) => void; error?: string; className?: string; autoComplete?: string; inputMode?: "tel" | "email" | "numeric" | "text" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="font-semibold">{label}</label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-1 h-12 w-full rounded border border-line bg-paper px-3 aria-invalid:border-workx-deep"
      />
      {error && <p id={`${id}-error`} className="mt-1 text-sm text-workx-deep">{error}</p>}
    </div>
  );
}
