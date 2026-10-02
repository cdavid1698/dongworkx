import type { Metadata } from "next";
import Link from "next/link";
import { serviceCategories, services } from "@/content/services";
import { ServiceRows } from "@/components/ServiceRows";

export const metadata: Metadata = {
  title: "Services & prices",
  description: "Motorcycle repair prices at DongWorkx Gerona and Guimba: FI diagnostic scans, injector cleaning, CVT, brakes, electrical and engine work.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h1 className="display text-6xl uppercase md:text-7xl">Services &amp; prices</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Prices are for labour and include VAT. Parts are quoted separately. Tap any service to book it.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-12">
        <nav aria-label="Service categories" className="md:sticky md:top-24 md:self-start">
          <ul className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:gap-0 md:overflow-visible">
            {serviceCategories.map((c) => (
              <li key={c.id} className="shrink-0">
                <a href={`#${c.id}`} className="block rounded border border-line bg-paper px-3 py-2.5 font-medium md:border-0 md:bg-transparent md:px-0 md:hover:text-workx-deep">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-14">
          {serviceCategories.map((c) => (
            <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`}>
              <h2 id={`${c.id}-title`} className="condensed text-3xl font-bold">
                {c.name}
              </h2>
              <p className="mt-1 mb-4 text-muted">{c.intro}</p>
              <ServiceRows items={services.filter((s) => s.category === c.id)} />
            </section>
          ))}
          <div className="rounded bg-ink p-6 text-paper">
            <p className="condensed text-2xl font-bold">Not sure what&rsquo;s wrong?</p>
            <p className="mt-1 text-paper/80">Book an FI diagnostic scan. We find the fault first, then quote the fix before we start.</p>
            <Link href="/book?service=fi-scan" className="mt-4 inline-flex h-12 items-center rounded bg-workx px-5 font-semibold hover:bg-workx-deep">
              Book an FI diagnostic scan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
