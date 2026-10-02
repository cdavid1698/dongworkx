"use client";

import { site } from "@/content/site";
import { openStatus, useManilaNow } from "@/lib/time";

/** Live "Open now / Closed" label based on Manila time. Shows plain hours before hydration. */
export function OpenStatus({ tone = "light" }: { tone?: "light" | "dark" }) {
  const now = useManilaNow();
  if (!now) {
    return <span className="font-mono text-sm">{site.hours.label}</span>;
  }
  const status = openStatus(now);
  const dot = status.open ? (tone === "dark" ? "bg-fi" : "bg-[#1f8a3b]") : "bg-workx";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm">
      <span className={`size-2.5 rounded-full ${dot}`} aria-hidden />
      {status.label}
    </span>
  );
}
