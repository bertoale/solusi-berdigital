import { eq, desc, asc, and, like, or, isNull } from "drizzle-orm";
import { db } from "@/db";
import {
  users,
  User,
  portfolios,
  Portfolio,
  portfolioImages,
  PortfolioImage,
  PortfolioWithImages,
  portfolioCategories,
  PortfolioCategory,
  articles,
  Article,
  articleCategories,
  ArticleCategory,
  FAQItem,
} from "@/db/schema";
import { staticServices, StaticService } from "./services-data";

// Compatibility Interface for Blog View
export interface BlogView {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  imagePath: string | null;
  tags: string[];
  blogFaqs: FAQItem[];
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Re-export Schema Types for Convenience
export type {
  User,
  Portfolio,
  PortfolioImage,
  PortfolioWithImages,
  PortfolioCategory,
  Article,
  ArticleCategory,
  FAQItem,
};

// ============================================================================
// 1. STATIC SERVICES (READ-ONLY)
// ============================================================================
export async function getAllServices(): Promise<StaticService[]> {
  return [...staticServices];
}

export async function getServiceBySlug(slug: string): Promise<StaticService | null> {
  return (
    staticServices.find(
      (s) =>
        s.slug === slug ||
        (s.id === "srv-custom-system" && slug === "aplikasi-kasir-pos")
    ) || null
  );
}

export async function getServiceById(id: string): Promise<StaticService | null> {
  return (
    staticServices.find(
      (s) =>
        s.id === id ||
        s.slug === id ||
        (s.id === "srv-custom-system" && id === "aplikasi-kasir-pos")
    ) || null
  );
}

// ============================================================================
// 2. USERS (DATABASE QUERY LANGSUNG DARI TABEL `users`)
// ============================================================================
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const cleanEmail = email.toLowerCase().trim();
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, cleanEmail))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("Database findUserByEmail error (Pastikan tabel users telah dibuat di MySQL):", error);
    return null;
  }
}

// ============================================================================
// 3. PORTFOLIO CATEGORIES (DATABASE `portfolio_categories`)
// ============================================================================
export async function getAllPortfolioCategories(): Promise<PortfolioCategory[]> {
  try {
    return await db
      .select()
      .from(portfolioCategories)
      .orderBy(asc(portfolioCategories.order));
  } catch {
    return [];
  }
}

export async function getPortfolioCategoryById(id: string): Promise<PortfolioCategory | null> {
  try {
    const res = await db
      .select()
      .from(portfolioCategories)
      .where(eq(portfolioCategories.id, id))
      .limit(1);
    return res[0] || null;
  } catch {
    return null;
  }
}

export async function getPortfolioCategoryBySlug(slug: string): Promise<PortfolioCategory | null> {
  try {
    const res = await db
      .select()
      .from(portfolioCategories)
      .where(eq(portfolioCategories.slug, slug))
      .limit(1);
    return res[0] || null;
  } catch {
    return null;
  }
}

export async function createPortfolioCategory(
  data: Omit<PortfolioCategory, "id" | "createdAt" | "updatedAt">
): Promise<PortfolioCategory> {
  const newId = `port-cat-${Date.now()}`;
  const record = {
    id: newId,
    name: data.name,
    slug: data.slug,
    description: data.description || null,
    order: data.order ?? 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.insert(portfolioCategories).values(record);
  return record;
}

export async function updatePortfolioCategory(
  id: string,
  data: Partial<PortfolioCategory>
): Promise<PortfolioCategory | null> {
  await db
    .update(portfolioCategories)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(portfolioCategories.id, id));

  return getPortfolioCategoryById(id);
}

export async function deletePortfolioCategory(id: string): Promise<boolean> {
  try {
    await db.delete(portfolioCategories).where(eq(portfolioCategories.id, id));
    return true;
  } catch {
    return false;
  }
}

// ============================================================================
// 4. BLOG CATEGORIES (DATABASE `article_categories` dari sb-blog)
// ============================================================================
export async function getAllBlogCategories(): Promise<ArticleCategory[]> {
  try {
    return await db
      .select()
      .from(articleCategories)
      .where(and(eq(articleCategories.isActive, true), isNull(articleCategories.deletedAt)))
      .orderBy(asc(articleCategories.name));
  } catch {
    return [];
  }
}

export async function getBlogCategoryBySlug(slug: string): Promise<ArticleCategory | null> {
  try {
    const res = await db
      .select()
      .from(articleCategories)
      .where(and(eq(articleCategories.slug, slug), isNull(articleCategories.deletedAt)))
      .limit(1);
    return res[0] || null;
  } catch {
    return null;
  }
}

// ============================================================================
// 5. PORTFOLIOS & PORTFOLIO IMAGES (DATABASE `portfolios` & `portfolio_images`)
// ============================================================================
async function attachImagesToPortfolios(list: Portfolio[]): Promise<PortfolioWithImages[]> {
  if (list.length === 0) return [];

  const results: PortfolioWithImages[] = [];
  for (const item of list) {
    try {
      const images = await db
        .select()
        .from(portfolioImages)
        .where(eq(portfolioImages.portfolioId, item.id))
        .orderBy(asc(portfolioImages.order));
      results.push({ ...item, images });
    } catch {
      results.push({ ...item, images: [] });
    }
  }
  return results;
}

export async function getAllPortfolios(options?: {
  onlyPublished?: boolean;
  category?: string;
}): Promise<PortfolioWithImages[]> {
  try {
    const conditions = [];
    if (options?.onlyPublished) {
      conditions.push(eq(portfolios.isPublished, true));
    }
    if (options?.category && options.category !== "all") {
      conditions.push(like(portfolios.category, `%${options.category}%`));
    }

    const query = db
      .select()
      .from(portfolios)
      .orderBy(desc(portfolios.createdAt));

    const list = conditions.length > 0 ? await query.where(and(...conditions)) : await query;
    return attachImagesToPortfolios(list);
  } catch {
    return [];
  }
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioWithImages | null> {
  try {
    const res = await db
      .select()
      .from(portfolios)
      .where(eq(portfolios.slug, slug))
      .limit(1);

    if (!res[0]) return null;
    const withImages = await attachImagesToPortfolios([res[0]]);
    return withImages[0] || null;
  } catch {
    return null;
  }
}

export async function getPortfolioById(id: string): Promise<PortfolioWithImages | null> {
  try {
    const res = await db
      .select()
      .from(portfolios)
      .where(eq(portfolios.id, id))
      .limit(1);

    if (!res[0]) return null;
    const withImages = await attachImagesToPortfolios([res[0]]);
    return withImages[0] || null;
  } catch {
    return null;
  }
}

export async function createPortfolio(
  data: Omit<Portfolio, "id" | "createdAt" | "updatedAt"> & {
    imagePaths?: string[];
    imageUrls?: string[];
  }
): Promise<PortfolioWithImages> {
  const newId = `port-${Date.now()}`;
  const record: Portfolio = {
    id: newId,
    slug: data.slug,
    title: data.title,
    clientName: data.clientName,
    clientType: data.clientType,
    category: data.category,
    description: data.description,
    fullDescription: data.fullDescription,
    features: data.features,
    mockupType: data.mockupType || "browser",
    liveUrl: data.liveUrl || null,
    isPublished: data.isPublished ?? true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    await db.insert(portfolios).values(record);
  } catch (err: unknown) {
    console.error("\x1b[31m[createPortfolio DB INSERT ERROR]\x1b[0m:", err);
    throw err;
  }

  const paths = data.imagePaths || data.imageUrls || [];
  const insertedImages: PortfolioImage[] = [];

  for (let idx = 0; idx < paths.length; idx++) {
    const imgRecord: PortfolioImage = {
      id: `img-${Date.now()}-${idx}`,
      portfolioId: newId,
      imagePath: paths[idx],
      order: idx,
    };
    await db.insert(portfolioImages).values(imgRecord);
    insertedImages.push(imgRecord);
  }

  return {
    ...record,
    images: insertedImages,
  };
}

export async function updatePortfolio(
  id: string,
  data: Partial<Portfolio> & {
    imagePaths?: string[];
    imageUrls?: string[];
  }
): Promise<PortfolioWithImages | null> {
  const { imagePaths: newPaths, imageUrls: fallbackPaths, ...portfolioData } = data;

  await db
    .update(portfolios)
    .set({
      ...portfolioData,
      updatedAt: new Date(),
    })
    .where(eq(portfolios.id, id));

  const paths = newPaths !== undefined ? newPaths : fallbackPaths;
  if (paths !== undefined) {
    // Hapus relasi lama
    await db.delete(portfolioImages).where(eq(portfolioImages.portfolioId, id));

    // Masukkan relasi gambar baru
    for (let idx = 0; idx < paths.length; idx++) {
      await db.insert(portfolioImages).values({
        id: `img-${Date.now()}-${idx}`,
        portfolioId: id,
        imagePath: paths[idx],
        order: idx,
      });
    }
  }

  return getPortfolioById(id);
}

export async function deletePortfolio(id: string): Promise<boolean> {
  try {
    await db.delete(portfolioImages).where(eq(portfolioImages.portfolioId, id));
    await db.delete(portfolios).where(eq(portfolios.id, id));
    return true;
  } catch {
    return false;
  }
}

// ============================================================================
// 6. ARTICLES (DATABASE `articles` & `article_categories` dari sb-blog)
// ============================================================================
function mapArticleToBlogView(
  article: Article,
  categoryName: string = "Umum"
): BlogView {
  return {
    id: String(article.id),
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt || "",
    content: article.content || "",
    category: categoryName,
    author: "Tim Solusi Berdigital",
    imagePath: article.featuredImageUrl || null,
    tags: Array.isArray(article.tags) ? article.tags : [],
    blogFaqs: Array.isArray(article.faq) ? article.faq : [],
    isPublished: article.status === "published",
    publishedAt: article.createdAt,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  };
}

export async function getAllBlogs(options?: {
  onlyPublished?: boolean;
  category?: string;
  searchQuery?: string;
}): Promise<BlogView[]> {
  try {
    const conditions = [isNull(articles.deletedAt)];

    if (options?.onlyPublished ?? true) {
      conditions.push(eq(articles.status, "published"));
    }

    if (options?.category && options.category !== "all") {
      conditions.push(eq(articleCategories.slug, options.category));
    }

    if (options?.searchQuery) {
      const q = `%${options.searchQuery}%`;
      const searchCond = or(like(articles.title, q), like(articles.excerpt, q));
      if (searchCond) {
        conditions.push(searchCond);
      }
    }

    const rows = await db
      .select({
        article: articles,
        category: articleCategories,
      })
      .from(articles)
      .leftJoin(articleCategories, eq(articles.categoryId, articleCategories.id))
      .where(and(...conditions))
      .orderBy(desc(articles.createdAt));

    return rows.map((r) => mapArticleToBlogView(r.article, r.category?.name || "Umum"));
  } catch (err) {
    console.error("Error fetching articles from db:", err);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogView | null> {
  try {
    const rows = await db
      .select({
        article: articles,
        category: articleCategories,
      })
      .from(articles)
      .leftJoin(articleCategories, eq(articles.categoryId, articleCategories.id))
      .where(
        and(
          eq(articles.slug, slug),
          eq(articles.status, "published"),
          isNull(articles.deletedAt)
        )
      )
      .limit(1);

    if (rows.length === 0) return null;
    return mapArticleToBlogView(rows[0].article, rows[0].category?.name || "Umum");
  } catch (err) {
    console.error("Error fetching article by slug:", err);
    return null;
  }
}
