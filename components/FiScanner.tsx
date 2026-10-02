"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { symptoms } from "@/content/symptoms";
import { formatDuration, getService } from "@/content/services";
import { formatPeso } from "@/lib/format";

type Phase = "idle" | "reading" | "result";

export function FiScanner() {
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const symptom = symptoms.find((s) => s.id === selected);
  const service = symptom ? getService(symptom.serviceId) : undefined;

  function read(id: string) {
    setSelected(id);
    if (timer.current) clearTimeout(timer.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("result");
      return;
    }
    setPhase("reading");
    timer.current = setTimeout(() => setPhase("result"), 900);
  }

  return (
    <section aria-labelledby="scanner-title" className="sticker relative rounded-md bg-ink-2 text-paper md:rotate-[1.5deg]">
      <div className="flex items-center justify-between border-b border-fi/20 px-4 py-2.5 font-mono text-xs text-fi">
        <h2 id="scanner-title" className="font-bold">DW-SCAN · FI symptom check</h2>
        <span className="flex items-center gap-1.5">
          <span className={`size-2 rounded-full ${phase === "reading" ? "animate-pulse bg-workx" : "bg-fi"}`} aria-hidden />
          {phase === "reading" ? "READING" : "READY"}
        </span>
      </div>

      <div className="px-4 pt-4">
        <p id="scanner-prompt" className="text-paper/80">
          What&rsquo;s your bike doing?
        </p>
        <div role="group" aria-labelledby="scanner-prompt" className="mt-3 flex flex-wrap gap-2">
          {symptoms.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={selected === s.id}
              onClick={() => read(s.id)}
              className="min-h-11 rounded-full border border-paper/25 px-3.5 text-left text-sm font-medium hover:border-fi aria-pressed:border-fi aria-pressed:bg-fi aria-pressed:text-ink"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="scanline mx-4 mt-4 mb-4 min-h-56 rounded bg-ink p-4 font-mono text-sm leading-relaxed text-fi" aria-live="polite">
        {!symptom && (
          <p>
            <span className="text-paper/50">&gt;</span> Pick a symptom to start the check<span className="caret" aria-hidden />
          </p>
        )}

        {symptom && (
          <div key={symptom.id}>
            <p className="type-in">
              <span className="text-paper/50">&gt;</span> {symptom.label.toUpperCase()}{" "}
              <span className="text-paper/60">({symptom.tagalog})</span>
            </p>
            <p className="type-in text-paper/70" style={{ animationDelay: "120ms" }}>
              <span className="text-paper/50">&gt;</span> checking {symptom.checks.join(", ")}
              {phase === "reading" && <span className="caret" aria-hidden />}
            </p>

            {phase === "result" && service && (
              <div className="mt-3">
                <p className="text-paper/50">LIKELY CAUSES</p>
                <ol className="mt-1 space-y-0.5">
                  {symptom.causes.map((c, i) => (
                    <li key={c} className="type-in" style={{ animationDelay: `${i * 90}ms` }}>
                      <span className="text-paper/50">{String(i + 1).padStart(2, "0")}</span> {c}
                    </li>
                  ))}
                </ol>
                <div className="mt-4 border-t border-fi/20 pt-3 font-sans">
                  <p className="font-mono text-xs text-paper/50">RECOMMENDED</p>
                  <p className="mt-1 text-lg font-semibold text-paper">{service.name}</p>
                  <p className="font-mono text-paper/70">
                    {formatDuration(service.minutes)} · {service.priceFrom ? "from " : ""}
                    {formatPeso(service.price)}
                  </p>
                  <Link
                    href={`/book?service=${service.id}`}
                    className="mt-3 flex h-12 items-center justify-center rounded bg-workx font-semibold text-paper hover:bg-workx-deep sm:inline-flex sm:px-6"
                  >
                    Book {service.name.toLowerCase()}
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="px-4 pb-4 text-xs text-paper/60">This is a guide, not a diagnosis. We confirm every fault with a real ECU scan before any work starts.</p>
    </section>
  );
}
