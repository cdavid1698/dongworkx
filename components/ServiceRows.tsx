import Link from "next/link";
import { formatDuration, type Service } from "@/content/services";
import { formatPeso } from "@/lib/format";

/** Shop price board: ruled rows with mono duration and price. */
export function ServiceRows({ items, showSummary = true }: { items: Service[]; showSummary?: boolean }) {
  return (
    <ul className="border-t-2 border-ink">
      {items.map((s) => (
        <li key={s.id} className="border-b border-line">
          <Link
            href={`/book?service=${s.id}`}
            className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-4 hover:bg-paper sm:grid-cols-[1fr_6rem_7rem] sm:px-2"
          >
            <span>
              <span className="font-semibold">{s.name}</span>
              {showSummary && <span className="mt-0.5 block text-muted">{s.summary}</span>}
            </span>
            <span className="hidden font-mono text-sm text-muted sm:block">{formatDuration(s.minutes)}</span>
            <span className="text-right font-mono font-bold">
              {s.priceFrom && <span className="font-normal text-muted">from </span>}
              {formatPeso(s.price)}
              <span className="block text-sm font-normal text-muted sm:hidden">{formatDuration(s.minutes)}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
