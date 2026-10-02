"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bike, Menu, ShoppingCart, X } from "lucide-react";
import { Logo } from "./Logo";
import { bikeLabel, getBike } from "@/content/bikes";
import { setBikePickerOpen, useMyBike } from "@/lib/bike";
import { cartCount, setCartDrawer, useCart } from "@/lib/cart";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/parts", label: "Parts" },
  { href: "/branches", label: "Branches" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const bike = getBike(useMyBike());
  const count = cartCount(useCart());

  return (
    <header className="on-ink sticky top-0 z-40 bg-ink text-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4">
        <Link href="/" className="mr-auto shrink-0 py-2" aria-label="DongWorkx home" onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="rounded px-3 py-2.5 font-medium text-paper/80 hover:text-paper aria-[current=page]:text-fi"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setBikePickerOpen(true)}
          className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-paper/25 px-3 text-sm hover:border-fi"
          aria-label={bike ? `My bike: ${bikeLabel(bike)}. Change bike` : "Set my bike"}
        >
          <Bike className="size-4 text-fi" aria-hidden />
          <span className="hidden max-w-36 truncate sm:inline">{bike ? bike.model : "My bike"}</span>
        </button>

        <button
          type="button"
          onClick={() => setCartDrawer(true)}
          className="relative grid size-11 place-items-center rounded-full hover:bg-ink-2"
          aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
        >
          <ShoppingCart className="size-5" aria-hidden />
          {count > 0 && (
            <span className="absolute top-0.5 right-0.5 grid min-w-5 place-items-center rounded-full bg-workx px-1 font-mono text-xs font-bold">
              {count}
            </span>
          )}
        </button>

        <Link
          href="/book"
          className="hidden h-11 items-center rounded bg-workx px-4 font-semibold hover:bg-workx-deep md:flex"
        >
          Book a repair
        </Link>

        <button
          type="button"
          className="grid size-11 place-items-center rounded md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-paper/10 md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {[{ href: "/book", label: "Book a repair" }, ...nav].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="condensed block py-3 text-xl font-semibold aria-[current=page]:text-fi"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
