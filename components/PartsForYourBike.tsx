"use client";

import Link from "next/link";
import { bikeLabel, getBike } from "@/content/bikes";
import { parts, partFitsBike } from "@/content/parts";
import { setBikePickerOpen, useMyBike } from "@/lib/bike";
import { PartCard } from "./PartCard";

const featured = [
  "fuel-injector-6-hole", "fuel-injector-8-hole-155", "throttle-body-cleaner", "drive-belt-click",
  "drive-belt-nmax-aerox", "iridium-spark-plug", "scooter-oil-10w40", "adjustable-rear-shock-300", "big-bore-kit-59mm",
];

export function PartsForYourBike() {
  const bikeId = useMyBike();
  const bike = getBike(bikeId);
  const list = parts.filter((p) => featured.includes(p.slug) && partFitsBike(p, bikeId)).slice(0, 4);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-lg">
          {bike ? (
            <>
              Showing parts for your <strong>{bikeLabel(bike)}</strong>.
            </>
          ) : (
            "Tell us your bike and we'll only show parts that fit."
          )}
        </p>
        <button
          type="button"
          onClick={() => setBikePickerOpen(true)}
          className="min-h-11 rounded-full border border-ink px-4 font-semibold hover:bg-ink hover:text-paper"
        >
          {bike ? "Change bike" : "Choose my bike"}
        </button>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <PartCard key={p.slug} part={p} />
        ))}
      </div>
      <Link href="/parts" className="mt-6 inline-flex min-h-11 items-center font-semibold text-workx-deep underline underline-offset-4">
        See all {parts.length} parts
      </Link>
    </div>
  );
}
