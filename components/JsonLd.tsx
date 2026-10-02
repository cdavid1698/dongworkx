import { branches, paymentMethods, site } from "@/content/site";

/** LocalBusiness schema for both branches, populated only with verified facts (S1–S5, C1, C3). */
export function BusinessJsonLd() {
  const data = branches.map((b) => ({
    "@context": "https://schema.org",
    "@type": "MotorcycleRepair",
    "@id": `${site.siteUrl}/branches#${b.id}`,
    name: `${site.name} ${b.town}`,
    telephone: site.phoneIntl,
    email: site.email,
    url: site.siteUrl,
    sameAs: [site.facebook],
    address: {
      "@type": "PostalAddress",
      streetAddress: b.street,
      addressLocality: b.town,
      addressRegion: b.province,
      ...(b.postalCode ? { postalCode: b.postalCode } : {}),
      addressCountry: "PH",
    },
    openingHours: "Mo-Su 08:00-18:00",
    paymentAccepted: paymentMethods.map((m) => m.label).join(", "),
    currenciesAccepted: "PHP",
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
