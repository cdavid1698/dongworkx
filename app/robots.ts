import type { MetadataRoute } from "next";

// Demo preview: block all crawlers so it never competes with the business's real listings.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
