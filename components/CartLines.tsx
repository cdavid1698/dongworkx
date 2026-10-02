"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { removeFromCart, setQty, type ResolvedLine } from "@/lib/cart";
import { formatPeso } from "@/lib/format";
import { PartArt } from "./PartArt";

export function CartLines({ lines, compact = false }: { lines: ResolvedLine[]; compact?: boolean }) {
  return (
    <ul className="divide-y divide-line">
      {lines.map(({ part, qty, lineTotal }) => (
        <li key={part.slug} className="flex gap-3 py-4">
          <div className={`${compact ? "size-16" : "size-20"} shrink-0 rounded bg-steel p-2`}>
            <PartArt art={part.art} />
          </div>
          <div className="min-w-0 flex-1">
            <Link href={`/parts/${part.slug}`} className="font-semibold hover:underline">
              {part.name}
            </Link>
            <p className="font-mono text-sm text-muted">{formatPeso(part.price)} each</p>
            <div className="mt-2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setQty(part.slug, qty - 1)}
                className="grid size-11 place-items-center rounded border border-line"
                aria-label={`Decrease quantity of ${part.name}`}
              >
                <Minus className="size-4" aria-hidden />
              </button>
              <span className="w-8 text-center font-mono" aria-live="polite" aria-label={`Quantity ${qty}`}>
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty(part.slug, qty + 1)}
                disabled={qty >= 10}
                className="grid size-11 place-items-center rounded border border-line disabled:opacity-40"
                aria-label={`Increase quantity of ${part.name}`}
              >
                <Plus className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => removeFromCart(part.slug)}
                className="ml-auto grid size-11 place-items-center rounded text-muted hover:text-workx-deep"
                aria-label={`Remove ${part.name}`}
              >
                <Trash2 className="size-4" aria-hidden />
              </button>
            </div>
          </div>
          <p className="font-mono font-semibold">{formatPeso(lineTotal)}</p>
        </li>
      ))}
    </ul>
  );
}
