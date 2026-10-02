"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { LoaderCircle, X } from "lucide-react";
import { financing, paymentMethods, type PaymentMethodId } from "@/content/site";
import { formatPeso } from "@/lib/format";
import { TEST_CARD, formatCardNumber, indicativeMonthly, isTestCard, isValidExpiry, simulatePayment } from "@/lib/payments";

type Props = {
  open: boolean;
  method: PaymentMethodId;
  amount: number;
  onClose: () => void;
  onPaid: (result: { reference: string; financeMonths?: number }) => void;
};

/** Simulated payment step. Test mode: no payment is taken and no card data leaves this component. */
export function PaymentModal({ open, method, amount, onClose, onPaid }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const label = paymentMethods.find((m) => m.id === method)?.label ?? method;

  async function pay(financeMonths?: number) {
    setBusy(true);
    const result = await simulatePayment(method);
    setBusy(false);
    onPaid({ reference: result.reference, financeMonths });
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="pay-title"
      className="m-auto w-[min(28rem,calc(100%-2rem))] rounded-lg bg-paper p-0 text-ink backdrop:bg-ink/75"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <h2 id="pay-title" className="condensed text-xl font-bold">
          Pay {formatPeso(amount)} with {label}
        </h2>
        <button type="button" onClick={onClose} disabled={busy} className="-mr-2 grid size-11 place-items-center" aria-label="Cancel payment">
          <X className="size-5" aria-hidden />
        </button>
      </div>
      <p className="bg-fi/40 px-5 py-2 text-sm font-semibold">Test mode. No payment will be taken.</p>
      <div className="p-5">
        {open && (method === "gcash" || method === "maya" || method === "qrph") && <WalletStep label={label} busy={busy} onPay={() => pay()} />}
        {open && method === "card" && <CardStep amount={amount} busy={busy} onPay={() => pay()} />}
        {open && (method === "skyro" || method === "salmon") && <FinanceStep label={label} amount={amount} busy={busy} onPay={(m) => pay(m)} />}
      </div>
    </dialog>
  );
}

function PayButton({ busy, children }: { busy: boolean; children: ReactNode }) {
  return (
    <button type="submit" disabled={busy} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded bg-workx font-semibold text-paper hover:bg-workx-deep disabled:opacity-70">
      {busy && <LoaderCircle className="size-5 animate-spin" aria-hidden />}
      {busy ? "Processing…" : children}
    </button>
  );
}

function WalletStep({ label, busy, onPay }: { label: string; busy: boolean; onPay: () => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onPay(); }}>
      <div className="mx-auto grid w-44 place-items-center rounded border-2 border-ink p-3">
        <DemoQr />
        <p className="mt-2 text-center font-mono text-xs">DEMO CODE, DO NOT SCAN</p>
      </div>
      <p className="mt-4 text-center text-muted">In the live site, you&rsquo;d scan this with {label} and the order would confirm itself.</p>
      <PayButton busy={busy}>Simulate successful payment</PayButton>
    </form>
  );
}

function CardStep({ amount, busy, onPay }: { amount: number; busy: boolean; onPay: () => void }) {
  const [card, setCard] = useState(TEST_CARD);
  const [expiry, setExpiry] = useState("12/30");
  const [cvc, setCvc] = useState("123");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!isTestCard(card)) next.card = `This demo only accepts the test card ${TEST_CARD}. Never enter a real card here.`;
    if (!isValidExpiry(expiry)) next.expiry = "Enter a future expiry date as MM/YY.";
    if (!/^\d{3,4}$/.test(cvc)) next.cvc = "Enter the 3 or 4 digits on the back.";
    setErrors(next);
    if (Object.keys(next).length === 0) onPay();
  }

  return (
    <form onSubmit={submit} noValidate>
      <Field id="card-number" label="Card number" error={errors.card}>
        <input
          id="card-number"
          inputMode="numeric"
          autoComplete="off"
          value={card}
          onChange={(e) => setCard(formatCardNumber(e.target.value))}
          aria-invalid={Boolean(errors.card)}
          aria-describedby={errors.card ? "card-number-error" : undefined}
          className="h-12 w-full rounded border border-line px-3 font-mono aria-invalid:border-workx-deep"
        />
      </Field>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Field id="card-expiry" label="Expiry (MM/YY)" error={errors.expiry}>
          <input
            id="card-expiry"
            autoComplete="off"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            aria-invalid={Boolean(errors.expiry)}
            aria-describedby={errors.expiry ? "card-expiry-error" : undefined}
            className="h-12 w-full rounded border border-line px-3 font-mono aria-invalid:border-workx-deep"
          />
        </Field>
        <Field id="card-cvc" label="CVC" error={errors.cvc}>
          <input
            id="card-cvc"
            inputMode="numeric"
            autoComplete="off"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
            aria-invalid={Boolean(errors.cvc)}
            aria-describedby={errors.cvc ? "card-cvc-error" : undefined}
            className="h-12 w-full rounded border border-line px-3 font-mono aria-invalid:border-workx-deep"
          />
        </Field>
      </div>
      <PayButton busy={busy}>Pay {formatPeso(amount)}</PayButton>
    </form>
  );
}

function FinanceStep({ label, amount, busy, onPay }: { label: string; amount: number; busy: boolean; onPay: (months: number) => void }) {
  const [months, setMonths] = useState<number>(financing.months[1]);
  return (
    <form onSubmit={(e) => { e.preventDefault(); onPay(months); }}>
      <fieldset>
        <legend className="font-semibold">Choose a term</legend>
        <div className="mt-2 grid gap-2">
          {financing.months.map((m) => (
            <label key={m} className="flex min-h-12 cursor-pointer items-center justify-between rounded border border-line px-3 has-checked:border-rotor has-checked:bg-rotor/10">
              <span className="flex items-center gap-3">
                <input type="radio" name="months" value={m} checked={months === m} onChange={() => setMonths(m)} className="size-4 accent-rotor" />
                {m} months
              </span>
              <span className="font-mono">{formatPeso(indicativeMonthly(amount, m))}/mo</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className="mt-3 text-sm text-muted">
        Indicative amounts before {label}&rsquo;s fees and interest. In the live site you&rsquo;d be sent to {label} to apply and get approved.
      </p>
      <PayButton busy={busy}>Simulate {label} approval</PayButton>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-workx-deep">
          {error}
        </p>
      )}
    </div>
  );
}

/** Decorative QR-style pattern (not a real code). */
function DemoQr() {
  const size = 21;
  const cells: [number, number][] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const finder = (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
      if (finder) {
        const fx = x >= size - 7 ? x - (size - 7) : x;
        const fy = y >= size - 7 ? y - (size - 7) : y;
        const ring = fx === 0 || fx === 6 || fy === 0 || fy === 6;
        const core = fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4;
        if (ring || core) cells.push([x, y]);
      } else if (((x * 7 + y * 13) ^ (x * y)) % 3 === 0) {
        cells.push([x, y]);
      }
    }
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="size-36" aria-hidden="true" shapeRendering="crispEdges">
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#16121f" />
      ))}
    </svg>
  );
}
