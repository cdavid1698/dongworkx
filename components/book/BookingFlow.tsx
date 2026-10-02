"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { CalendarPlus, Check, ChevronLeft, MapPin, Phone } from "lucide-react";
import { bikeLabel, bikes, getBike } from "@/content/bikes";
import { formatDuration, serviceCategories, services } from "@/content/services";
import { bookingDeposit, branches, getBranch, mapsDirectionsUrl, paymentMethods, site, type BranchId, type PaymentMethodId } from "@/content/site";
import { bookableDates, downloadIcs, getSlots, selectedServices, submitBooking, totals, type Booking, type BookingDraft } from "@/lib/booking";
import { setMyBike, useMyBike } from "@/lib/bike";
import { formatPeso, isValidPhMobile, shortId } from "@/lib/format";
import { addDays, formatDateLong, formatDateParts, formatMinutes, manilaNow } from "@/lib/time";
import { useHydrated } from "@/lib/store";
import { OpenStatus } from "../OpenStatus";
import { PaymentModal } from "../PaymentModal";

const STEPS = ["Branch", "Services", "Your bike", "Date & time", "Your details", "Review"] as const;
const DEPOSIT_METHODS: PaymentMethodId[] = ["gcash", "maya", "qrph", "card"];

type Props = { initialServiceId?: string; initialBranch?: BranchId };

export function BookingFlow({ initialServiceId, initialBranch }: Props) {
  const hydrated = useHydrated();
  const myBike = useMyBike();
  const [step, setStep] = useState(initialBranch ? (initialServiceId ? 2 : 1) : 0);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<BookingDraft>({
    branch: initialBranch ?? null,
    serviceIds: initialServiceId && services.some((s) => s.id === initialServiceId) ? [initialServiceId] : [],
    bikeId: null,
    bikeOther: "",
    date: null,
    minutes: null,
    name: "",
    mobile: "",
    notes: "",
    payment: "at-shop",
  });
  const [depositMethod, setDepositMethod] = useState<PaymentMethodId>("gcash");
  const [paying, setPaying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // The bike falls back to "My bike" until the rider picks one here.
  const bikeId = draft.bikeId ?? (draft.bikeOther ? null : myBike);
  const t = totals(draft.serviceIds);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    window.scrollTo({ top: 0 });
  }, [step, booking]);

  const update = (patch: Partial<BookingDraft>) => {
    setError("");
    setDraft((d) => ({ ...d, ...patch }));
  };

  function validate(s: number): string {
    if (s === 0 && !draft.branch) return "Choose a branch to continue.";
    if (s === 1 && draft.serviceIds.length === 0) return "Choose at least one service. Not sure? Pick “FI diagnostic scan”.";
    if (s === 2 && !bikeId && !draft.bikeOther.trim()) return "Choose your bike, or type the make and model.";
    if (s === 3 && (!draft.date || draft.minutes === null)) return "Choose a date and an open time.";
    if (s === 4) {
      if (!draft.name.trim()) return "Enter your name so we know who to expect.";
      if (!isValidPhMobile(draft.mobile)) return "Enter a mobile number like 0917 123 4567.";
    }
    return "";
  }

  function next() {
    const message = validate(step);
    if (message) {
      setError(message);
      return;
    }
    if (step === 2 && bikeId) {
      update({ bikeId });
      setMyBike(bikeId);
    }
    setStep((s) => s + 1);
  }

  function back() {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  }

  async function confirm() {
    setSubmitting(true);
    const result = await submitBooking({ ...draft, bikeId }, shortId("DW"));
    setSubmitting(false);
    setBooking(result);
  }

  function onConfirmClick() {
    if (draft.payment === "deposit") setPaying(true);
    else void confirm();
  }

  if (booking) return <Confirmation booking={booking} headingRef={headingRef} />;

  const branch = draft.branch ? getBranch(draft.branch) : null;
  const bike = getBike(bikeId);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-36 md:pt-12 md:pb-16">
      <Progress step={step} />

      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_20rem]">
        <section aria-labelledby="step-title">
          <h1 id="step-title" ref={headingRef} tabIndex={-1} className="display text-5xl uppercase outline-none md:text-6xl">
            {["Choose a branch", "What needs doing?", "What do you ride?", "Pick a time", "Your details", "Check and book"][step]}
          </h1>

          <div className="mt-6">
            {step === 0 && (
              <fieldset>
                <legend className="sr-only">Branch</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {branches.map((b) => (
                    <label key={b.id} className="block cursor-pointer rounded border-2 border-line bg-paper p-4 has-checked:border-rotor">
                      <span className="flex items-start gap-3">
                        <input type="radio" name="branch" value={b.id} checked={draft.branch === b.id} onChange={() => update({ branch: b.id, date: null, minutes: null })} className="mt-1.5 size-5 accent-rotor" />
                        <span>
                          <span className="condensed block text-2xl font-bold">{b.town}</span>
                          <span className="block text-muted">{b.street}, {b.locality}</span>
                          <span className="mt-2 block"><OpenStatus /></span>
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <div className="space-y-8">
                {serviceCategories.map((c) => (
                  <fieldset key={c.id}>
                    <legend className="condensed text-xl font-bold">{c.name}</legend>
                    <div className="mt-2 border-t-2 border-ink">
                      {services.filter((s) => s.category === c.id).map((s) => {
                        const checked = draft.serviceIds.includes(s.id);
                        return (
                          <label key={s.id} className="flex cursor-pointer items-start gap-3 border-b border-line py-3 has-checked:bg-paper sm:px-2">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => update({ serviceIds: checked ? draft.serviceIds.filter((id) => id !== s.id) : [...draft.serviceIds, s.id], minutes: null })}
                              className="mt-1 size-5 shrink-0 accent-rotor"
                            />
                            <span className="flex-1">
                              <span className="font-semibold">{s.name}</span>
                              <span className="block text-sm text-muted">{s.summary}</span>
                            </span>
                            <span className="text-right font-mono text-sm">
                              {s.priceFrom ? "from " : ""}{formatPeso(s.price)}
                              <span className="block text-muted">{formatDuration(s.minutes)}</span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>
            )}

            {step === 2 && (
              <div>
                <fieldset>
                  <legend className="sr-only">Bike model</legend>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {bikes.map((b) => (
                      <label key={b.id} className="flex min-h-12 cursor-pointer items-center gap-2 rounded border-2 border-line bg-paper px-3 py-2 has-checked:border-rotor">
                        <input type="radio" name="bike" checked={bikeId === b.id} onChange={() => update({ bikeId: b.id, bikeOther: "" })} className="size-4 accent-rotor" />
                        <span><span className="block text-xs text-muted">{b.make}</span>{b.model}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="mt-6 max-w-md">
                  <label htmlFor="bike-other" className="font-semibold">Not listed? Type the make, model and year</label>
                  <input
                    id="bike-other"
                    value={draft.bikeOther}
                    onChange={(e) => update({ bikeOther: e.target.value, bikeId: null })}
                    placeholder="e.g. Kawasaki Barako 175, 2019"
                    className="mt-1 h-12 w-full rounded border border-line bg-paper px-3"
                  />
                </div>
              </div>
            )}

            {step === 3 && draft.branch && hydrated && (
              <DateTimeStep branch={draft.branch} minutes={t.minutes} date={draft.date} time={draft.minutes} onChange={(date, time) => update({ date, minutes: time })} />
            )}

            {step === 4 && (
              <div className="max-w-md space-y-5">
                <TextField id="b-name" label="Your name" value={draft.name} onChange={(v) => update({ name: v })} autoComplete="name" />
                <TextField id="b-mobile" label="Mobile number" hint="We'll text to confirm. Format: 0917 123 4567" value={draft.mobile} onChange={(v) => update({ mobile: v })} autoComplete="tel" inputMode="tel" />
                <div>
                  <label htmlFor="b-notes" className="font-semibold">What&rsquo;s happening with the bike? <span className="font-normal text-muted">(optional)</span></label>
                  <textarea id="b-notes" rows={3} value={draft.notes} onChange={(e) => update({ notes: e.target.value })} className="mt-1 w-full rounded border border-line bg-paper p-3" placeholder="e.g. hard to start in the morning, check-engine light blinks" />
                </div>
              </div>
            )}

            {step === 5 && branch && draft.date && draft.minutes !== null && (
              <div className="space-y-6">
                <dl className="grid grid-cols-[7rem_1fr] gap-y-3 border-y border-line py-4">
                  <dt className="text-muted">Branch</dt>
                  <dd>{branch.town}: {branch.street}</dd>
                  <dt className="text-muted">When</dt>
                  <dd>{formatDateLong(draft.date)}, {formatMinutes(draft.minutes)}</dd>
                  <dt className="text-muted">Bike</dt>
                  <dd>{bike ? bikeLabel(bike) : draft.bikeOther}</dd>
                  <dt className="text-muted">Name</dt>
                  <dd>{draft.name} · <span className="font-mono">{draft.mobile}</span></dd>
                </dl>
                <fieldset>
                  <legend className="condensed text-xl font-bold">How do you want to pay?</legend>
                  <div className="mt-3 grid gap-3">
                    <label className="flex cursor-pointer items-start gap-3 rounded border-2 border-line bg-paper p-4 has-checked:border-rotor">
                      <input type="radio" name="pay" checked={draft.payment === "at-shop"} onChange={() => update({ payment: "at-shop" })} className="mt-1 size-5 accent-rotor" />
                      <span><span className="font-semibold">Pay at the shop</span><span className="block text-muted">Cash, GCash, Maya, QR Ph, card, or Skyro / Salmon instalments.</span></span>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 rounded border-2 border-line bg-paper p-4 has-checked:border-rotor">
                      <input type="radio" name="pay" checked={draft.payment === "deposit"} onChange={() => update({ payment: "deposit" })} className="mt-1 size-5 accent-rotor" />
                      <span><span className="font-semibold">Pay a {formatPeso(bookingDeposit.amount)} reservation deposit now</span><span className="block text-muted">Locks your slot. Deducted from your bill.</span></span>
                    </label>
                  </div>
                  {draft.payment === "deposit" && (
                    <div className="mt-4">
                      <label htmlFor="deposit-method" className="font-semibold">Deposit method</label>
                      <select id="deposit-method" value={depositMethod} onChange={(e) => setDepositMethod(e.target.value as PaymentMethodId)} className="mt-1 block h-12 w-full max-w-xs rounded border border-line bg-paper px-3">
                        {paymentMethods.filter((m) => DEPOSIT_METHODS.includes(m.id)).map((m) => (
                          <option key={m.id} value={m.id}>{m.label}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </fieldset>
              </div>
            )}
          </div>

          {error && (
            <p role="alert" className="mt-6 rounded border-l-4 border-workx bg-paper p-3 font-semibold text-workx-deep">
              {error}
            </p>
          )}
        </section>

        <aside aria-label="Booking summary" className="hidden md:block">
          <div className="sticky top-24 rounded bg-ink p-5 text-paper">
            <h2 className="font-mono text-xs text-fi">YOUR BOOKING</h2>
            <Summary branchTown={branch?.town} serviceIds={draft.serviceIds} date={draft.date} time={draft.minutes} />
          </div>
        </aside>
      </div>

      {/* Navigation: sticky on mobile with the running total */}
      <div className="on-ink fixed inset-x-0 bottom-0 z-30 border-t border-paper/10 bg-ink pb-[env(safe-area-inset-bottom)] text-paper md:static md:mt-8 md:border-0 md:bg-transparent md:text-ink">
        <div className="mx-auto max-w-6xl px-4 py-3 md:px-0">
          <p className="mb-2 flex justify-between font-mono text-sm md:hidden">
            <span>{t.minutes ? formatDuration(t.minutes) : "No services yet"}</span>
            <span>{t.price ? `${t.hasFrom ? "from " : ""}${formatPeso(t.price)}` : ""}</span>
          </p>
          <div className="flex gap-3 md:max-w-[calc(100%-22.5rem)]">
            {step > 0 && (
              <button type="button" onClick={back} className="flex h-12 items-center gap-1 rounded border-2 border-paper/40 px-4 font-semibold md:border-ink">
                <ChevronLeft className="size-4" aria-hidden /> Back
              </button>
            )}
            {step < 5 ? (
              <button type="button" onClick={next} className="h-12 flex-1 rounded bg-workx font-semibold text-paper hover:bg-workx-deep md:flex-none md:px-10">
                Continue
              </button>
            ) : (
              <button type="button" onClick={onConfirmClick} disabled={submitting} className="h-12 flex-1 rounded bg-workx font-semibold text-paper hover:bg-workx-deep disabled:opacity-70 md:flex-none md:px-10">
                {submitting ? "Booking…" : draft.payment === "deposit" ? `Pay ${formatPeso(bookingDeposit.amount)} and book appointment` : "Book appointment"}
              </button>
            )}
          </div>
        </div>
      </div>

      <PaymentModal
        open={paying}
        method={depositMethod}
        amount={bookingDeposit.amount}
        onClose={() => setPaying(false)}
        onPaid={() => {
          setPaying(false);
          void confirm();
        }}
      />
    </div>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <div>
      <p className="font-mono text-sm text-muted">Step {step + 1} of {STEPS.length}</p>
      <ol className="mt-2 flex gap-1" aria-label="Booking progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex-1" aria-current={i === step ? "step" : undefined}>
            <span className={`block h-1.5 rounded-full ${i <= step ? "bg-workx" : "bg-line"}`} />
            <span className={`mt-1.5 hidden text-sm lg:block ${i === step ? "font-semibold" : "text-muted"}`}>{label}</span>
            <span className="sr-only lg:hidden">{label}{i < step ? ", done" : ""}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Summary({ branchTown, serviceIds, date, time }: { branchTown?: string; serviceIds: string[]; date: string | null; time: number | null }) {
  const list = selectedServices(serviceIds);
  const t = totals(serviceIds);
  return (
    <div className="mt-3 space-y-3">
      <p>{branchTown ? `DongWorkx ${branchTown}` : <span className="text-paper/60">No branch yet</span>}</p>
      {list.length > 0 ? (
        <ul className="space-y-1 border-t border-paper/15 pt-3">
          {list.map((s) => (
            <li key={s.id} className="flex justify-between gap-3">
              <span>{s.name}</span>
              <span className="font-mono">{formatPeso(s.price)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-paper/60">No services yet</p>
      )}
      {date && time !== null && <p className="border-t border-paper/15 pt-3">{formatDateLong(date)}, {formatMinutes(time)}</p>}
      {list.length > 0 && (
        <div className="border-t border-paper/15 pt-3 font-mono">
          <p className="flex justify-between"><span>Time</span><span>{formatDuration(t.minutes)}</span></p>
          <p className="flex justify-between text-lg font-bold"><span>Estimate</span><span>{t.hasFrom ? "from " : ""}{formatPeso(t.price)}</span></p>
          <p className="mt-1 font-sans text-sm text-paper/60">Labour, VAT included. Parts quoted after inspection.</p>
        </div>
      )}
    </div>
  );
}

function DateTimeStep({ branch, minutes, date, time, onChange }: { branch: BranchId; minutes: number; date: string | null; time: number | null; onChange: (date: string, time: number | null) => void }) {
  const dates = bookableDates();
  const active = date ?? dates[0];
  const slots = getSlots(branch, active, minutes);
  const openCount = slots.filter((s) => s.available).length;

  return (
    <div>
      <p className="text-muted">Job time: <span className="font-mono">{formatDuration(Math.max(minutes, 30))}</span>. Open {site.hours.label}.</p>
      <fieldset className="mt-4">
        <legend className="font-semibold">Date</legend>
        <div className="-mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-2">
          {dates.map((d) => {
            const p = formatDateParts(d);
            return (
              <label key={d} className="flex w-16 shrink-0 cursor-pointer flex-col items-center rounded border-2 border-line bg-paper py-2 has-checked:border-rotor has-checked:bg-rotor has-checked:text-paper">
                <input type="radio" name="date" className="sr-only" checked={active === d && date !== null} onChange={() => onChange(d, null)} />
                <span className="text-sm">{p.weekday}</span>
                <span className="display text-2xl not-italic">{p.day}</span>
                <span className="text-xs">{p.month}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="font-semibold">Time on {formatDateLong(active)}</legend>
        {openCount === 0 ? (
          <p className="mt-2 rounded border border-dashed border-muted p-4">No open slots left on this day. Pick another date, or call us. We often fit in walk-ins.</p>
        ) : (
          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {slots.map((s) => (
              <label key={s.minutes} className={`flex h-12 items-center justify-center rounded border-2 font-mono text-sm ${s.available ? "cursor-pointer border-line bg-paper has-checked:border-rotor has-checked:bg-rotor has-checked:text-paper" : "border-transparent bg-line/50 text-muted line-through"}`}>
                <input type="radio" name="time" className="sr-only" disabled={!s.available} checked={date === active && time === s.minutes} onChange={() => onChange(active, s.minutes)} />
                {formatMinutes(s.minutes)}
                {!s.available && <span className="sr-only">, booked</span>}
              </label>
            ))}
          </div>
        )}
      </fieldset>
    </div>
  );
}

function TextField({ id, label, hint, value, onChange, autoComplete, inputMode }: { id: string; label: string; hint?: string; value: string; onChange: (v: string) => void; autoComplete?: string; inputMode?: "tel" | "text" }) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold">{label}</label>
      {hint && <p id={`${id}-hint`} className="text-sm text-muted">{hint}</p>}
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete} inputMode={inputMode} aria-describedby={hint ? `${id}-hint` : undefined} className="mt-1 h-12 w-full rounded border border-line bg-paper px-3" />
    </div>
  );
}

function Confirmation({ booking, headingRef }: { booking: Booking; headingRef: RefObject<HTMLHeadingElement | null> }) {
  const branch = getBranch(booking.branch);
  const bike = getBike(booking.bikeId);
  const today = manilaNow().date;
  const when = booking.date === today ? "today" : booking.date === addDays(today, 1) ? "tomorrow" : formatDateLong(booking.date).split(",")[0];
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <p className="flex items-center gap-2 font-semibold text-[#1f6f33]">
        <Check className="size-5" aria-hidden /> Appointment booked
      </p>
      <h1 ref={headingRef} tabIndex={-1} className="display mt-3 text-5xl uppercase outline-none md:text-6xl">
        See you {when}
      </h1>
      <p className="mt-4 text-lg">
        {formatDateLong(booking.date)} at <strong>{formatMinutes(booking.minutes)}</strong>, DongWorkx {branch.town}. Booking{" "}
        <span className="font-mono font-bold">{booking.id}</span>.
      </p>
      <p className="mt-1 text-muted">In the live site, you&rsquo;d get an SMS confirmation now. (Demo: nothing was sent.)</p>

      <div className="mt-8 rounded border border-line bg-paper p-5">
        <ul className="divide-y divide-line">
          {selectedServices(booking.serviceIds).map((s) => (
            <li key={s.id} className="flex justify-between py-2">
              <span>{s.name}</span>
              <span className="font-mono">{formatPeso(s.price)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex justify-between border-t-2 border-ink pt-3 font-semibold">
          <span>Estimate ({formatDuration(booking.totalMinutes)})</span>
          <span className="font-mono">{formatPeso(booking.estimate)}</span>
        </p>
        <p className="mt-2 text-muted">
          Bike: {bike ? bikeLabel(bike) : booking.bikeOther}.{" "}
          {booking.payment === "deposit" ? `Deposit of ${formatPeso(bookingDeposit.amount)} paid (test mode).` : "Pay at the shop."}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={() => downloadIcs(booking)} className="inline-flex h-12 items-center gap-2 rounded bg-workx px-5 font-semibold text-paper hover:bg-workx-deep">
          <CalendarPlus className="size-5" aria-hidden /> Add to calendar
        </button>
        <a href={mapsDirectionsUrl(branch)} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded border-2 border-ink px-5 font-semibold">
          <MapPin className="size-5" aria-hidden /> Directions
        </a>
        <a href={`tel:${site.phoneIntl}`} className="inline-flex h-12 items-center gap-2 rounded border-2 border-ink px-5 font-semibold">
          <Phone className="size-5" aria-hidden /> {site.phone}
        </a>
      </div>
      <Link href="/parts" className="mt-8 inline-flex min-h-11 items-center font-semibold text-workx-deep underline underline-offset-4">
        Need parts for the job? Order them now and we&rsquo;ll have them ready
      </Link>
    </div>
  );
}
