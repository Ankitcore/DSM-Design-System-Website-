import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString();

  const routes = [
    "",
    "/components",
    "/resources",
    "/docs",
    "/guide",
    "/about",
    "/privacy-policy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/components" || route === "/resources" ? 0.9 : 0.7,
  }));
}
