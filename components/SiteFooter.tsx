import Link from "next/link";
import { branches, site } from "@/content/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink pb-24 text-paper/80 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs">Motorcycle repair, fuel-injection diagnostics and parts in Tarlac and Nueva Ecija.</p>
          <p className="mt-4">
            <a href={`tel:${site.phoneIntl}`} className="font-mono text-lg text-paper hover:text-fi">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="break-all hover:text-fi">
              {site.email}
            </a>
          </p>
        </div>
        {branches.map((b) => (
          <div key={b.id}>
            <h2 className="font-semibold text-paper">{b.name}</h2>
            <address className="mt-2 not-italic">
              {b.street}
              <br />
              {b.locality}
              {b.postalCode ? ` ${b.postalCode}` : ""}
            </address>
            <p className="mt-2 font-mono text-sm">
              {site.hours.days} · {site.hours.label}
            </p>
          </div>
        ))}
        <nav aria-label="Footer">
          <ul className="space-y-1">
            {[
              ["/book", "Book a repair"],
              ["/services", "Services & prices"],
              ["/parts", "Parts shop"],
              ["/faq", "FAQ"],
              ["/privacy", "Privacy"],
              ["/terms", "Terms"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="inline-block py-1.5 hover:text-fi">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.facebook} className="inline-block py-1.5 hover:text-fi" rel="noopener" target="_blank">
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-paper/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-paper/60">
          © {new Date().getFullYear()} {site.name}. Demo preview by {site.agencyName}. Services, parts and prices shown are samples.
        </p>
      </div>
    </footer>
  );
}
