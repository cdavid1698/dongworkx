import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <p className="font-mono text-workx-deep">ERROR 404</p>
      <h1 className="display mt-2 text-6xl uppercase">Wrong turn</h1>
      <p className="mt-4 text-lg text-muted">That page doesn&rsquo;t exist. It may have moved, or the link has a typo.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="inline-flex h-12 items-center rounded bg-workx px-5 font-semibold text-paper hover:bg-workx-deep">Go to the home page</Link>
        <Link href="/parts" className="inline-flex h-12 items-center rounded border-2 border-ink px-5 font-semibold">Shop parts</Link>
      </div>
    </div>
  );
}
