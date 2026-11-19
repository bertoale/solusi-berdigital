import { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";
import { getAllBlogs, getAllPortfolios, getAllServices } from "@/lib/data-store";

export const dynamic = "force-dynamic";

// Cache hasil query 1 jam; tetap dinamis agar tidak butuh DB saat build.
const getSitemapData = unstable_cache(
  async () => {
    const [services, portfolios, blogs] = await Promise.all([
      getAllServices(),
      getAllPortfolios({ onlyPublished: true }),
      getAllBlogs({ onlyPublished: true }),
    ]);
    return { services, portfolios, blogs };
  },
  ["sitemap-data"],
  { revalidate: 3600 }
);

// Tanggal tetap (bukan new Date()) agar sinyal lastmod bermakna.
const STATIC_LAST_MODIFIED = new Date("2026-10-01");

function getLatestDate(
  dates: Array<Date | string | null | undefined>,
  fallback: Date
): Date {
  let latest = fallback;
  for (const d of dates) {
    if (!d) continue;
    const parsed = new Date(d);
    if (!Number.isNaN(parsed.getTime()) && parsed > latest) {
      latest = parsed;
    }
  }
  return latest;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://solusiberdigital.com";
  const { services, portfolios, blogs } = await getSitemapData();

  const latestBlogDate = getLatestDate(
    blogs.map((b) => b.updatedAt || b.publishedAt),
    STATIC_LAST_MODIFIED
  );
  const latestPortfolioDate = getLatestDate(
    portfolios.map((p) => p.updatedAt || p.createdAt),
    STATIC_LAST_MODIFIED
  );

  // 1. Static Pages (halaman listing mengikuti konten dinamis terbarunya)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: latestBlogDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/layanan`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portofolio`,
      lastModified: latestPortfolioDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestBlogDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // 2. Layanan Pages
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/layanan/${service.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // 3. Portofolio Pages (Only Published)
  const portfolioRoutes: MetadataRoute.Sitemap = portfolios.map((portfolio) => ({
    url: `${baseUrl}/portofolio/${portfolio.slug}`,
    lastModified: new Date(portfolio.updatedAt || portfolio.createdAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 4. Blog Pages (Only Published)
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.publishedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...portfolioRoutes,
    ...blogRoutes,
  ];
}
