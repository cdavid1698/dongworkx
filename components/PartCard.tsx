import Link from "next/link";
import type { Part } from "@/content/parts";
import { formatPeso } from "@/lib/format";
import { AddToCartButton } from "./AddToCartButton";
import { PartArt } from "./PartArt";

export function PartCard({ part }: { part: Part }) {
  const inStock = part.stock.gerona + part.stock.guimba > 0;
  return (
    <article className="group relative flex flex-col border border-line bg-paper">
      <div className="aspect-[4/3] border-b border-line bg-steel p-6">
        <PartArt art={part.art} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold leading-snug">
          <Link href={`/parts/${part.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {part.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{part.fits === "all" ? "Fits most bikes" : `Fits ${part.fits.length} models`}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <p className="font-mono text-lg font-bold">{formatPeso(part.price)}</p>
            <p className={`text-sm ${inStock ? "text-muted" : "text-workx-deep"}`}>{inStock ? "In stock" : "Order in, 3–5 days"}</p>
          </div>
          <div className="relative z-10">
            <AddToCartButton slug={part.slug} name={part.name} />
          </div>
        </div>
      </div>
    </article>
  );
}
