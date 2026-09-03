import { MetadataRoute } from "next";
import { getAllBlogs, getAllPortfolios, getAllServices } from "@/lib/data-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://solusiberdigital.id";

  // 1. Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/layanan`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portofolio`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // 2. Layanan Pages
  const services = await getAllServices();
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/layanan/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // 3. Portofolio Pages (Only Published)
  const portfolios = await getAllPortfolios({ onlyPublished: true });
  const portfolioRoutes: MetadataRoute.Sitemap = portfolios.map((portfolio) => ({
    url: `${baseUrl}/portofolio/${portfolio.slug}`,
    lastModified: new Date(portfolio.updatedAt || portfolio.createdAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 4. Blog Pages (Only Published)
  const blogs = await getAllBlogs({ onlyPublished: true });
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
