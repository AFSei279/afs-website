import type { MetadataRoute } from "next";

const SITE_URL = "https://afs-ta.com";

// List the routes that should be indexed by search engines.
// Paid landing pages under /lp/ are intentionally excluded — they're
// disallowed in robots.txt as well.
const ROUTES: { path: string; changeFrequency?: "weekly" | "monthly" | "yearly"; priority?: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/leistungen/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ueber-uns/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/kontakt/", changeFrequency: "yearly", priority: 0.5 },
  { path: "/impressum/", changeFrequency: "yearly", priority: 0.1 },
  { path: "/datenschutz/", changeFrequency: "yearly", priority: 0.1 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
