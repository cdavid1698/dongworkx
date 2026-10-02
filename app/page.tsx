import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Truck } from "lucide-react";
import { branches, freeShippingThreshold, mapsDirectionsUrl, shippingRates, site } from "@/content/site";
import { serviceCategories, services } from "@/content/services";
import { FiScanner } from "@/components/FiScanner";
import { OpenStatus } from "@/components/OpenStatus";
import { ServiceRows } from "@/components/ServiceRows";
import { PartsForYourBike } from "@/components/PartsForYourBike";
import { PaymentChips } from "@/components/PaymentChips";
import { Newsletter } from "@/components/Newsletter";
import { formatPeso } from "@/lib/format";

const steps = [
  { title: "Pick your branch and job", body: "Gerona or Guimba. Choose a service, or tap “Not sure” and we'll scan it first." },
  { title: "Choose a time", body: "Open slots from 8 AM to 6 PM. You'll see the estimate before you confirm." },
  { title: "Ride in", body: "Your bay is ready when you arrive. Pay at the counter by cash, GCash, Maya, QR or card." },
];

export default function HomePage() {
  const fiServices = services.filter((s) => s.category === "fi");
  const fi = serviceCategories.find((c) => c.id === "fi");

  return (
    <>
      {/* Hero */}
      <section className="on-ink overflow-hidden bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-14 md:grid-cols-12 md:gap-8 md:pt-16 md:pb-20">
          <div className="md:col-span-7 md:pt-4">
            <p className="text-paper/70">
              <OpenStatus tone="dark" />
            </p>
            <h1 className="display mt-4 text-[3.4rem] uppercase sm:text-7xl lg:text-[5.5rem]">
              We scan it.
              <br />
              We fix it.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-paper/85">
              DongWorkx is the fuel-injection specialist in Gerona, Tarlac and Guimba, Nueva Ecija. Book a repair slot online, or
              order parts for your bike with nationwide shipping.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="flex h-13 items-center justify-center rounded bg-workx px-7 text-lg font-semibold hover:bg-workx-deep">
                Book a repair
              </Link>
              <Link
                href="/parts"
                className="flex h-13 items-center justify-center rounded border-2 border-paper/70 px-7 text-lg font-semibold hover:border-fi hover:text-fi"
              >
                Shop parts
              </Link>
            </div>
            <p className="mt-6 text-paper/70">
              <a href={site.facebook} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-fi">
                {site.facebookFollowers} followers on Facebook
              </a>
              <span aria-hidden> · </span>
              <a href={`tel:${site.phoneIntl}`} className="font-mono whitespace-nowrap hover:text-fi">
                {site.phone}
              </a>
            </p>
          </div>
          <div className="md:col-span-5">
            <FiScanner />
          </div>
        </div>
      </section>

      {/* Branches */}
      <section aria-labelledby="branches-title" className="border-b border-line bg-paper">
        <h2 id="branches-title" className="sr-only">
          Our branches
        </h2>
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          {branches.map((b, i) => (
            <div key={b.id} className={`px-4 py-6 md:px-6 ${i === 0 ? "border-b border-line md:border-r md:border-b-0 md:pl-4" : ""}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="condensed text-2xl font-bold">{b.town}</h3>
                <OpenStatus />
              </div>
              <p className="mt-1 text-muted">
                {b.street}, {b.locality}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5">
                <a href={mapsDirectionsUrl(b)} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-workx-deep">
                  <MapPin className="size-4" aria-hidden /> Directions
                </a>
                <a href={`tel:${site.phoneIntl}`} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-workx-deep">
                  <Phone className="size-4" aria-hidden /> Call
                </a>
                <Link href={`/book?branch=${b.id}`} className="inline-flex min-h-11 items-center font-semibold text-workx-deep">
                  Book at {b.town}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FI services */}
      <section aria-labelledby="services-title" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
          <div>
            <h2 id="services-title" className="display text-5xl uppercase">
              FI repairs &amp; prices
            </h2>
            <p className="mt-4 text-lg text-muted">{fi?.intro}</p>
            <Link href="/services" className="mt-6 inline-flex min-h-11 items-center font-semibold text-workx-deep underline underline-offset-4">
              See all {services.length} services
            </Link>
          </div>
          <ServiceRows items={fiServices} />
        </div>
      </section>

      {/* Parts */}
      <section aria-labelledby="parts-title" className="border-y border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 id="parts-title" className="display text-5xl uppercase">
            Parts counter
          </h2>
          <div className="mt-6">
            <PartsForYourBike />
          </div>
        </div>
      </section>

      {/* How booking works */}
      <section aria-labelledby="how-title" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 id="how-title" className="display text-5xl uppercase">
          Skip the queue
        </h2>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-ink pt-4">
              <span className="display text-6xl text-workx">{i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="mt-1 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <Link href="/book" className="mt-10 inline-flex h-12 items-center rounded bg-workx px-6 font-semibold text-paper hover:bg-workx-deep">
          Book a repair
        </Link>
      </section>

      {/* Payment and shipping */}
      <section aria-labelledby="pay-title" className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 id="pay-title" className="condensed text-3xl font-bold">
              Pay your way
            </h2>
            <p className="mt-2 text-muted">At the counter or online. Spread bigger jobs and parts over a few months with Skyro or Salmon.</p>
            <div className="mt-5">
              <PaymentChips />
            </div>
          </div>
          <div>
            <h2 className="condensed flex items-center gap-2 text-3xl font-bold">
              <Truck className="size-7" aria-hidden /> Shipped nationwide
            </h2>
            <p className="mt-2 text-muted">
              Parts leave our counter for Luzon, Visayas and Mindanao. Free shipping on orders over {formatPeso(freeShippingThreshold.amount)}.
            </p>
            <table className="mt-5 w-full max-w-sm text-left">
              <caption className="sr-only">Shipping rates from (sample)</caption>
              <thead>
                <tr className="border-b-2 border-ink">
                  <th scope="col" className="py-2 font-semibold">Region</th>
                  <th scope="col" className="py-2 font-semibold">From</th>
                  <th scope="col" className="py-2 font-semibold">Arrives in</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {Object.values(shippingRates).map((r) => (
                  <tr key={r.label} className="border-b border-line">
                    <td className="py-2 font-sans">{r.label}</td>
                    <td className="py-2">{formatPeso(r.base)}</td>
                    <td className="py-2">{r.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section aria-labelledby="proof-title" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="sticker overflow-hidden rounded-md">
            <Image
              src="/images/dongworkx-banner.webp"
              alt="DongWorkx Motorparts Shop, FI Specialist banner with fuel injectors, brake rotors and exhaust parts"
              width={1048}
              height={428}
              sizes="(min-width: 768px) 560px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div>
            <h2 id="proof-title" className="condensed text-3xl font-bold">
              {site.facebookFollowers} people follow DongWorkx
            </h2>
            <p className="mt-2 text-lg text-muted">
              We&rsquo;ve been on Facebook since 2017. Follow the page for reels from the shop, promos and new arrivals.
            </p>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex h-12 items-center rounded border-2 border-ink px-5 font-semibold hover:bg-ink hover:text-paper"
            >
              Follow us on Facebook
            </a>
            <div className="mt-8 rounded border border-dashed border-muted p-5">
              <p className="font-semibold">Customer reviews will appear here</p>
              <p className="mt-1 text-muted">
                Once the Google Business Profiles are live, verified ratings and reviews from both branches will show in this space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Promo signup */}
      <section aria-labelledby="promo-title" className="border-t border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-2 md:items-end">
          <div>
            <h2 id="promo-title" className="condensed text-3xl font-bold">
              Promos and new parts, first
            </h2>
            <p className="mt-2 text-muted">One message a month, at most. No spam.</p>
          </div>
          <Newsletter />
        </div>
      </section>
    </>
  );
}
