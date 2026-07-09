import type { MetadataRoute } from "next";

const BASE_URL = "https://www.dailypicklab.com";

const LAST_MODIFIED = {
  home: new Date("2026-05-21"),
  tools: new Date("2026-05-21"),
  lotto: new Date("2026-07-04"),
  guides: new Date("2026-05-21"),
  policies: new Date("2026-05-21"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: LAST_MODIFIED.home, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/lotto`, lastModified: LAST_MODIFIED.lotto, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/personality`, lastModified: LAST_MODIFIED.tools, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/reaction`, lastModified: LAST_MODIFIED.tools, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/pomodoro`, lastModified: LAST_MODIFIED.tools, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/password`, lastModified: LAST_MODIFIED.tools, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides`, lastModified: LAST_MODIFIED.guides, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/guides/password-security`, lastModified: LAST_MODIFIED.guides, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guides/pomodoro-study`, lastModified: LAST_MODIFIED.guides, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guides/reaction-speed`, lastModified: LAST_MODIFIED.guides, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guides/mbti-types`, lastModified: LAST_MODIFIED.guides, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guides/lotto-winning-tips`, lastModified: LAST_MODIFIED.guides, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: LAST_MODIFIED.policies, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: LAST_MODIFIED.policies, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: LAST_MODIFIED.policies, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: LAST_MODIFIED.policies, changeFrequency: "yearly", priority: 0.3 },
  ];

  return staticRoutes;
}
