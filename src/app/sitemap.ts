import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/leistungen/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/produkte/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/leistungen/app-entwicklung/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tools/ki-entscheidungsberater/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools/lokaler-ki-hardware-rechner/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/ueber-mich/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/kontakt/", priority: 0.5, changeFrequency: "yearly" },
  { path: "/brettany-support/", priority: 0.5, changeFrequency: "monthly" },
  { path: "/brettany-privacy/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/baumstark-kdk-support/", priority: 0.5, changeFrequency: "monthly" },
  { path: "/baumstark-kdk-privacy/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/impressum/", priority: 0.1, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
