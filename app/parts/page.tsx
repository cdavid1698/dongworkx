import type { Metadata } from "next";
import { PartsBrowser } from "@/components/PartsBrowser";

export const metadata: Metadata = {
  title: "Motorcycle parts",
  description: "Fuel injectors, fuel pumps, CVT belts, rollers, brake pads, oils and performance parts for Honda, Yamaha and Suzuki scooters. Pickup in Gerona or Guimba, or nationwide shipping.",
};

export default function PartsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h1 className="display text-6xl uppercase md:text-7xl">Parts</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        The same parts we fit in the shop. Pick up at either branch or have them shipped anywhere in the Philippines.
      </p>
      <div className="mt-8">
        <PartsBrowser />
      </div>
    </div>
  );
}
