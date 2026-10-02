import { paymentMethods } from "@/content/site";

/** Payment methods as text chips. We don't copy third-party logos into the demo. */
export function PaymentChips() {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Payment methods accepted">
      {paymentMethods.map((m) => (
        <li
          key={m.id}
          className={`rounded border px-3 py-1.5 font-semibold ${
            m.kind === "financing" ? "border-rotor bg-rotor text-paper" : "border-ink bg-paper"
          }`}
        >
          {m.label}
          {m.kind === "financing" && <span className="ml-1 font-normal">instalments</span>}
        </li>
      ))}
    </ul>
  );
}
