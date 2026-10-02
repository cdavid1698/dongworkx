import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { branches, mapsDirectionsUrl, mapsEmbedUrl, site } from "@/content/site";
import { OpenStatus } from "@/components/OpenStatus";

export const metadata: Metadata = {
  title: "Branches & contact",
  description: "DongWorkx branches on Mac Arthur Highway, Brgy. Magaspac, Gerona, Tarlac and Provincial Road, Saranay District, Guimba, Nueva Ecija. Open 8 AM to 6 PM.",
};

export default function BranchesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h1 className="display text-6xl uppercase md:text-7xl">Branches</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Two shops, one number. Call or text{" "}
        <a href={`tel:${site.phoneIntl}`} className="font-mono font-semibold whitespace-nowrap text-ink underline underline-offset-4">
          {site.phone}
        </a>{" "}
        or email{" "}
        <a href={`mailto:${site.email}`} className="font-semibold break-all text-ink underline underline-offset-4">
          {site.email}
        </a>
        .
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {branches.map((b) => (
          <section key={b.id} id={b.id} aria-labelledby={`${b.id}-title`} className="border border-line bg-paper">
            <iframe
              title={`Map of DongWorkx ${b.town}`}
              src={mapsEmbedUrl(b)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[16/10] w-full border-b border-line"
            />
            <div className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 id={`${b.id}-title`} className="condensed text-3xl font-bold">
                  {b.name}
                </h2>
                <OpenStatus />
              </div>
              <address className="mt-2 text-lg not-italic">
                {b.street}
                <br />
                {b.locality}
                {b.postalCode ? ` ${b.postalCode}` : ""}
                {b.plusCode && <span className="block font-mono text-sm text-muted">Plus code {b.plusCode}</span>}
              </address>
              <dl className="mt-4 grid grid-cols-[6rem_1fr] gap-y-1">
                <dt className="text-muted">Hours</dt>
                <dd className="font-mono">
                  {site.hours.days}, {site.hours.label}
                </dd>
                <dt className="text-muted">Phone</dt>
                <dd className="font-mono">{site.phone}</dd>
              </dl>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={`/book?branch=${b.id}`} className="inline-flex h-12 items-center rounded bg-workx px-5 font-semibold text-paper hover:bg-workx-deep">
                  Book at {b.town}
                </Link>
                <a href={mapsDirectionsUrl(b)} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded border-2 border-ink px-4 font-semibold">
                  <MapPin className="size-4" aria-hidden /> Directions
                </a>
                <a href={`tel:${site.phoneIntl}`} className="inline-flex h-12 items-center gap-2 rounded border-2 border-ink px-4 font-semibold">
                  <Phone className="size-4" aria-hidden /> Call
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
