"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { addToCart } from "@/lib/cart";

export function AddToCartButton({ slug, name, size = "md" }: { slug: string; name: string; size?: "md" | "lg" }) {
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(slug);
        setAdded(true);
        setTimeout(() => setAdded(false), 1600);
      }}
      aria-label={size === "md" ? `Add ${name} to cart` : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded font-semibold text-paper transition-colors ${
        added ? "bg-rotor" : "bg-workx hover:bg-workx-deep"
      } ${size === "lg" ? "h-12 w-full px-6 text-lg sm:w-auto" : "h-11 px-4"}`}
    >
      {added ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
      {added ? "Added" : "Add to cart"}
    </button>
  );
}
