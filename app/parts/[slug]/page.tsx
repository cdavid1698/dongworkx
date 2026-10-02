import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Store, Truck } from "lucide-react";
import { bikeLabel, getBike } from "@/content/bikes";
import { getPart, partCategories, parts } from "@/content/parts";
import { getService } from "@/content/services";
import { branches, financing, freeShippingThreshold, shippingRates } from "@/content/site";
import { formatPeso, vatIncluded } from "@/lib/format";
import { AddToCartButton } from "@/components/AddToCartButton";
import { FitmentCheck } from "@/components/FitmentCheck";
import { PartArt } from "@/components/PartArt";

export function generateStaticParams() {
  return parts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/parts/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const part = getPart(slug);
  if (!part) return {};
  return { title: part.name, description: part.description };
}

export default async function PartPage(props: PageProps<"/parts/[slug]">) {
  const { slug } = await props.params;
  const part = getPart(slug);
  if (!part) notFound();

  const category = partCategories.find((c) => c.id === part.category);
  const install = part.installServiceId ? getService(part.installServiceId) : undefined;
  const financeable = part.price >= financing.minAmount;
  const fitsList = part.fits === "all" ? null : part.fits.map(getBike).filter((b) => b !== undefined);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <Link href="/parts" className="inline-flex min-h-11 items-center gap-1 font-semibold text-muted hover:text-ink">
        <ChevronLeft className="size-4" aria-hidden /> All parts
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="aspect-square border border-line bg-paper p-12">
          <PartArt art={part.art} />
        </div>

        <div>
          <p className="font-medium text-muted">{category?.name}</p>
          <h1 className="condensed mt-1 text-4xl leading-tight font-bold md:text-5xl">{part.name}</h1>
          <p className="mt-4 font-mono text-3xl font-bold">{formatPeso(part.price)}</p>
          <p className="text-sm text-muted">Includes {formatPeso(vatIncluded(part.price), true)} VAT</p>

          {financeable && (
            <p className="mt-3 rounded bg-rotor/10 px-3 py-2">
              Or from <strong className="font-mono">{formatPeso(Math.ceil(part.price / 12))}/month</strong> over 12 months with Skyro or Salmon.{" "}
              <span className="text-sm text-muted">Indicative only. Final terms are set by the provider.</span>
            </p>
          )}

          <div className="mt-5">
            <FitmentCheck part={part} />
          </div>

          <div className="mt-5">
            <AddToCartButton slug={part.slug} name={part.name} size="lg" />
          </div>

          <p className="mt-6 text-lg">{part.description}</p>

          <ul className="mt-6 divide-y divide-line border-y border-line">
            {branches.map((b) => {
              const qty = part.stock[b.id];
              return (
                <li key={b.id} className="flex items-center justify-between py-3">
                  <span className="flex items-center gap-2">
                    <Store className="size-4 text-muted" aria-hidden /> {b.town} pickup
                  </span>
                  <span className={`font-mono text-sm ${qty > 0 ? "" : "text-workx-deep"}`}>{qty > 0 ? `${qty} in stock` : "Order in, 3–5 days"}</span>
                </li>
              );
            })}
            <li className="flex items-center justify-between py-3">
              <span className="flex items-center gap-2">
                <Truck className="size-4 text-muted" aria-hidden /> Ship nationwide
              </span>
              <span className="font-mono text-sm">
                {part.price >= freeShippingThreshold.amount ? "Free" : `from ${formatPeso(shippingRates.luzon.base)}`}
              </span>
            </li>
          </ul>

          {install && (
            <div className="mt-6 rounded bg-ink p-5 text-paper">
              <p className="font-semibold">Need it fitted?</p>
              <p className="mt-1 text-paper/80">
                {install.name}: {install.priceFrom ? "from " : ""}
                {formatPeso(install.price)} labour.
              </p>
              <Link href={`/book?service=${install.id}`} className="mt-3 inline-flex h-11 items-center rounded bg-workx px-4 font-semibold hover:bg-workx-deep">
                Book fitting
              </Link>
            </div>
          )}

          <h2 className="condensed mt-8 text-2xl font-bold">Specs</h2>
          <dl className="mt-2 grid grid-cols-[9rem_1fr] gap-y-2 border-t border-line pt-3">
            {part.specs.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-muted">{k}</dt>
                <dd className="font-mono">{v}</dd>
              </div>
            ))}
          </dl>

          <h2 className="condensed mt-8 text-2xl font-bold">Fits</h2>
          {fitsList ? (
            <ul className="mt-2 flex flex-wrap gap-2">
              {fitsList.map((b) => (
                <li key={b.id} className="rounded border border-line bg-paper px-3 py-1.5">
                  {bikeLabel(b)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2">Most motorcycles and scooters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
