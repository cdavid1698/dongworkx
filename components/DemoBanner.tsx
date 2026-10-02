"use client";

import { X } from "lucide-react";
import { site } from "@/content/site";
import { createLocalStore } from "@/lib/store";

const dismissed = createLocalStore<boolean>("dw-demo-dismissed", false);

export function DemoBanner() {
  const hidden = dismissed.useValue();
  if (hidden) return null;
  return (
    <div className="bg-rotor text-paper text-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-1.5">
        <p className="flex-1">
          <strong className="font-semibold">Demo preview</strong> prepared for {site.name} by {site.agencyName}. Bookings and
          payments are simulated.
        </p>
        <button
          type="button"
          onClick={() => dismissed.set(true)}
          className="-mr-2 grid size-11 place-items-center rounded"
          aria-label="Hide demo notice"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
