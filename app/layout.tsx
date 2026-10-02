import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Saira } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { DemoBanner } from "@/components/DemoBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileActionBar } from "@/components/MobileActionBar";
import { BikePicker } from "@/components/BikePicker";
import { CartDrawer } from "@/components/CartDrawer";
import { BusinessJsonLd } from "@/components/JsonLd";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: "DongWorkx | FI specialist & motorparts, Gerona and Guimba",
    template: "%s | DongWorkx",
  },
  description: site.description,
  // Demo preview: keep it out of search so it doesn't compete with the business's real presence.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_PH",
    images: [{ url: "/images/dongworkx-banner.webp", width: 1048, height: 428, alt: "DongWorkx motorparts shop, FI specialist" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#16121f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-PH" className={`${saira.variable} ${jetbrains.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only z-50 bg-fi p-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
          Skip to content
        </a>
        <DemoBanner />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
        <BikePicker />
        <CartDrawer />
        <BusinessJsonLd />
      </body>
    </html>
  );
}
