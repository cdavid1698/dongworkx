import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about DongWorkx hours, FI diagnostics, payment by GCash, Maya, card or Skyro and Salmon instalments, and nationwide parts shipping.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <h1 className="display text-6xl uppercase md:text-7xl">FAQ</h1>
      <div className="mt-10 border-t-2 border-ink">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-line">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden className="font-mono text-2xl text-workx transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-5 text-lg text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-10 text-lg">
        Still stuck?{" "}
        <Link href="/branches" className="font-semibold text-workx-deep underline underline-offset-4">
          Call or visit a branch
        </Link>
        .
      </p>
    </div>
  );
}
