"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { bikeLabel, getBike } from "@/content/bikes";
import { partCategories, parts, partFitsBike, type PartCategoryId } from "@/content/parts";
import { setBikePickerOpen, useMyBike } from "@/lib/bike";
import { PartCard } from "./PartCard";

type Sort = "popular" | "price-asc" | "price-desc";

export function PartsBrowser() {
  const bikeId = useMyBike();
  const bike = getBike(bikeId);
  const [category, setCategory] = useState<PartCategoryId | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("popular");
  const [onlyFits, setOnlyFits] = useState(true);

  const filterByBike = Boolean(bike) && onlyFits;

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = parts.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!filterByBike || partFitsBike(p, bikeId)) &&
        (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
    );
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [category, query, sort, filterByBike, bikeId]);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded border border-line bg-paper p-4 md:flex-row md:items-center">
        <div className="flex-1">
          {bike ? (
            <label className="flex min-h-11 items-center gap-3">
              <input type="checkbox" checked={onlyFits} onChange={(e) => setOnlyFits(e.target.checked)} className="size-5 accent-rotor" />
              <span>
                Only parts that fit my <strong>{bikeLabel(bike)}</strong>
              </span>
            </label>
          ) : (
            <p>Showing all parts. Choose your bike to see only what fits.</p>
          )}
        </div>
        <button type="button" onClick={() => setBikePickerOpen(true)} className="min-h-11 rounded-full border border-ink px-4 font-semibold hover:bg-ink hover:text-paper">
          {bike ? "Change bike" : "Choose my bike"}
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="relative flex-1">
          <label htmlFor="part-search" className="font-semibold">
            Search parts
          </label>
          <Search className="pointer-events-none absolute bottom-3.5 left-3 size-5 text-muted" aria-hidden />
          <input
            id="part-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Injector, belt, oil…"
            className="mt-1 h-12 w-full rounded border border-line bg-paper pr-3 pl-10"
          />
        </div>
        <div>
          <label htmlFor="part-sort" className="font-semibold">
            Sort
          </label>
          <select id="part-sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="mt-1 block h-12 w-full rounded border border-line bg-paper px-3 lg:w-56">
            <option value="popular">Most popular</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
          </select>
        </div>
      </div>

      <div role="group" aria-label="Category" className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-2">
        {[{ id: "all" as const, name: "All parts" }, ...partCategories].map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={category === c.id}
            onClick={() => setCategory(c.id)}
            className="min-h-11 shrink-0 rounded-full border border-line bg-paper px-4 font-medium aria-pressed:border-rotor aria-pressed:bg-rotor aria-pressed:text-paper"
          >
            {c.name}
          </button>
        ))}
      </div>

      <p className="mt-4 text-muted" aria-live="polite">
        {list.length} {list.length === 1 ? "part" : "parts"}
      </p>

      {list.length === 0 ? (
        <div className="mt-6 rounded border border-dashed border-muted p-8 text-center">
          <p className="text-lg font-semibold">No parts match yet.</p>
          <p className="mt-1 text-muted">Try another category, or call us. We can order in most parts within 3–5 days.</p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <PartCard key={p.slug} part={p} />
          ))}
        </div>
      )}
    </div>
  );
}
