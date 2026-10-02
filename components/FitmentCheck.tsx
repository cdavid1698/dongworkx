"use client";

import { Check, CircleAlert } from "lucide-react";
import { bikeLabel, getBike } from "@/content/bikes";
import { partFitsBike, type Part } from "@/content/parts";
import { setBikePickerOpen, useMyBike } from "@/lib/bike";

export function FitmentCheck({ part }: { part: Part }) {
  const bike = getBike(useMyBike());
  if (!bike) {
    return (
      <button type="button" onClick={() => setBikePickerOpen(true)} className="min-h-11 font-semibold text-workx-deep underline underline-offset-4">
        Check if this fits my bike
      </button>
    );
  }
  const fits = partFitsBike(part, bike.id);
  return (
    <p className={`flex items-center gap-2 font-semibold ${fits ? "text-[#1f6f33]" : "text-workx-deep"}`}>
      {fits ? <Check className="size-5" aria-hidden /> : <CircleAlert className="size-5" aria-hidden />}
      {fits ? `Fits your ${bikeLabel(bike)}` : `Not listed for your ${bikeLabel(bike)}. Call us to check.`}
    </p>
  );
}
