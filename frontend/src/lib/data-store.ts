import { eq, desc, asc, and, like, or } from "drizzle-orm";
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
  blogs,
  Blog,
  blogCategories,
  BlogCategory,
  BlogFaqItem,
} from "@/db/schema";
import { staticServices, StaticService } from "./services-data";

// Re-export Schema Types for Convenience
export type {
  User,
  Portfolio,
  PortfolioImage,
  PortfolioWithImages,
  PortfolioCategory,
  Blog,
  BlogCategory,
  BlogFaqItem,
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
// 4. BLOG CATEGORIES (DATABASE `blog_categories`)
// ============================================================================
export async function getAllBlogCategories(): Promise<BlogCategory[]> {
  try {
    return await db
      .select()
      .from(blogCategories)
      .orderBy(asc(blogCategories.order));
  } catch {
    return [];
  }
}

export async function getBlogCategoryById(id: string): Promise<BlogCategory | null> {
  try {
    const res = await db
      .select()
      .from(blogCategories)
      .where(eq(blogCategories.id, id))
      .limit(1);
    return res[0] || null;
  } catch {
    return null;
  }
}

export async function getBlogCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  try {
    const res = await db
      .select()
      .from(blogCategories)
      .where(eq(blogCategories.slug, slug))
      .limit(1);
    return res[0] || null;
  } catch {
    return null;
  }
}

export async function createBlogCategory(
  data: Omit<BlogCategory, "id" | "createdAt" | "updatedAt">
): Promise<BlogCategory> {
  const newId = `blog-cat-${Date.now()}`;
  const record = {
    id: newId,
    name: data.name,
    slug: data.slug,
    description: data.description || null,
    order: data.order ?? 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.insert(blogCategories).values(record);
  return record;
}

export async function updateBlogCategory(
  id: string,
  data: Partial<BlogCategory>
): Promise<BlogCategory | null> {
  await db
    .update(blogCategories)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(blogCategories.id, id));

  return getBlogCategoryById(id);
}

export async function deleteBlogCategory(id: string): Promise<boolean> {
  try {
    await db.delete(blogCategories).where(eq(blogCategories.id, id));
    return true;
  } catch {
    return false;
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
// 6. BLOGS (DATABASE `blogs`)
// ============================================================================
export async function getAllBlogs(options?: {
  onlyPublished?: boolean;
  category?: string;
  searchQuery?: string;
}): Promise<Blog[]> {
  try {
    const conditions = [];
    if (options?.onlyPublished) {
      conditions.push(eq(blogs.isPublished, true));
    }
    if (options?.category && options.category !== "all") {
      conditions.push(like(blogs.category, `%${options.category}%`));
    }
    if (options?.searchQuery) {
      const q = `%${options.searchQuery}%`;
      conditions.push(or(like(blogs.title, q), like(blogs.excerpt, q)));
    }

    const query = db.select().from(blogs).orderBy(desc(blogs.publishedAt));
    return conditions.length > 0 ? await query.where(and(...conditions)) : await query;
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const res = await db.select().from(blogs).where(eq(blogs.slug, slug)).limit(1);
    return res[0] || null;
  } catch {
    return null;
  }
}

export async function getBlogById(id: string): Promise<Blog | null> {
  try {
    const res = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);
    return res[0] || null;
  } catch {
    return null;
  }
}

export async function createBlog(data: Omit<Blog, "id" | "createdAt" | "updatedAt">): Promise<Blog> {
  const newId = `blog-${Date.now()}`;
  const record: Blog = {
    id: newId,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    category: data.category,
    author: data.author,
    imagePath: data.imagePath || null,
    tags: data.tags || [],
    blogFaqs: data.blogFaqs || [],
    isPublished: data.isPublished ?? true,
    publishedAt: data.publishedAt || new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.insert(blogs).values(record);
  return record;
}

export async function updateBlog(id: string, data: Partial<Blog>): Promise<Blog | null> {
  await db
    .update(blogs)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(blogs.id, id));

  return getBlogById(id);
}

export async function deleteBlog(id: string): Promise<boolean> {
  try {
    await db.delete(blogs).where(eq(blogs.id, id));
    return true;
  } catch {
    return false;
  }
}
