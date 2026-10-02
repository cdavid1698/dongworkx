"use client";

import { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import { bikes } from "@/content/bikes";
import { setBikePickerOpen, setMyBike, useBikePickerOpen, useMyBike } from "@/lib/bike";

const makes = Array.from(new Set(bikes.map((b) => b.make)));

export function BikePicker() {
  const open = useBikePickerOpen();
  const current = useMyBike();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function choose(id: string | null) {
    setMyBike(id);
    setBikePickerOpen(false);
  }

  return (
    <dialog
      ref={ref}
      onClose={() => setBikePickerOpen(false)}
      onClick={(e) => e.target === e.currentTarget && setBikePickerOpen(false)}
      aria-labelledby="bike-picker-title"
      className="m-auto w-[min(32rem,calc(100%-2rem))] rounded-lg bg-paper p-0 text-ink backdrop:bg-ink/70"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <h2 id="bike-picker-title" className="condensed text-xl font-bold">
          What do you ride?
        </h2>
        <button type="button" onClick={() => setBikePickerOpen(false)} className="-mr-2 grid size-11 place-items-center" aria-label="Close">
          <X className="size-5" aria-hidden />
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
        <p className="text-muted">We&rsquo;ll only show parts that fit, and add your bike to bookings.</p>
        {makes.map((make) => (
          <fieldset key={make} className="mt-4">
            <legend className="font-mono text-xs font-bold text-muted uppercase">{make}</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {bikes
                .filter((b) => b.make === make)
                .map((b) => {
                  const selected = b.id === current;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => choose(b.id)}
                      aria-pressed={selected}
                      className="flex min-h-11 items-center justify-between gap-2 rounded border border-line px-3 py-2 text-left font-medium hover:border-ink aria-pressed:border-rotor aria-pressed:bg-rotor aria-pressed:text-paper"
                    >
                      {b.model}
                      {selected && <Check className="size-4 shrink-0" aria-hidden />}
                    </button>
                  );
                })}
            </div>
          </fieldset>
        ))}
        {current && (
          <button type="button" onClick={() => choose(null)} className="mt-5 min-h-11 font-semibold text-workx-deep underline underline-offset-4">
            Clear my bike and show all parts
          </button>
        )}
      </div>
    </dialog>
  );
}
