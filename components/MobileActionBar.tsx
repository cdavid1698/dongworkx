"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ShoppingCart } from "lucide-react";
import { site } from "@/content/site";
import { cartCount, setCartDrawer, useCart } from "@/lib/cart";

export function MobileActionBar() {
  const pathname = usePathname();
  const count = cartCount(useCart());
  // The booking and checkout flows have their own sticky footers.
  if (pathname.startsWith("/book") || pathname.startsWith("/checkout")) return null;

  return (
    <div className="on-ink fixed inset-x-0 bottom-0 z-30 border-t border-paper/10 bg-ink pb-[env(safe-area-inset-bottom)] text-paper md:hidden">
      <div className="grid grid-cols-[1fr_2fr_1fr]">
        <a href={`tel:${site.phoneIntl}`} className="flex h-14 flex-col items-center justify-center text-xs font-medium">
          <Phone className="size-5" aria-hidden />
          Call
        </a>
        <Link href="/book" className="m-1.5 flex items-center justify-center rounded bg-workx font-semibold">
          Book a repair
        </Link>
        <button type="button" onClick={() => setCartDrawer(true)} className="relative flex h-14 flex-col items-center justify-center text-xs font-medium">
          <ShoppingCart className="size-5" aria-hidden />
          Cart{count > 0 ? ` (${count})` : ""}
        </button>
      </div>
    </div>
  );
}
