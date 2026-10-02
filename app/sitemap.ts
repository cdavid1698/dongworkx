import type { MetadataRoute } from "next";
import { parts } from "@/content/parts";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/book", "/services", "/parts", "/branches", "/faq", "/privacy", "/terms"];
  return [
    ...routes.map((r) => ({ url: `${site.siteUrl}${r}`, changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.7 })),
    ...parts.map((p) => ({ url: `${site.siteUrl}/parts/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.5 })),
  ];
}
