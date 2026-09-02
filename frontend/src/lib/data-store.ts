import {
  User,
  Portfolio,
  PortfolioImage,
  PortfolioWithImages,
  PortfolioCategory,
  Blog,
  BlogCategory,
} from "@/db/schema";
import { staticServices, StaticService } from "./services-data";

// Global in-memory cache to persist across Server Actions / HMR during Node runtime
declare global {
  var __SB_USERS__: User[] | undefined;
  var __SB_PORTFOLIOS__: Portfolio[] | undefined;
  var __SB_PORTFOLIO_IMAGES__: PortfolioImage[] | undefined;
  var __SB_PORTFOLIO_CATEGORIES__: PortfolioCategory[] | undefined;
  var __SB_BLOGS__: Blog[] | undefined;
  var __SB_BLOG_CATEGORIES__: BlogCategory[] | undefined;
}

// ============================================================================
// 0. USERS REPOSITORY (KOSONG, DIISI MANUAL/VIA DATABASE)
// ============================================================================
const initialUsers: User[] = [];

export async function findUserByEmail(email: string): Promise<User | null> {
  const list = globalThis.__SB_USERS__ ?? initialUsers;
  return list.find((u) => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
}

// ============================================================================
// 1. STATIC SERVICES (READ-ONLY)
// ============================================================================
export async function getAllServices(): Promise<StaticService[]> {
  return [...staticServices];
}

export async function getServiceBySlug(slug: string): Promise<StaticService | null> {
  return staticServices.find((s) => s.slug === slug) || null;
}

export async function getServiceById(id: string): Promise<StaticService | null> {
  return staticServices.find((s) => s.id === id || s.slug === id) || null;
}

// ============================================================================
// 2. PORTFOLIO CATEGORIES SEED & CRUD (KOSONG, DIISI VIA ADMIN)
// ============================================================================
const initialPortfolioCategories: PortfolioCategory[] = [];

export async function getAllPortfolioCategories(): Promise<PortfolioCategory[]> {
  const list = globalThis.__SB_PORTFOLIO_CATEGORIES__ ?? initialPortfolioCategories;
  return [...list].sort((a, b) => a.order - b.order);
}

export async function getPortfolioCategoryById(id: string): Promise<PortfolioCategory | null> {
  const list = globalThis.__SB_PORTFOLIO_CATEGORIES__ ?? initialPortfolioCategories;
  return list.find((c) => c.id === id) || null;
}

export async function getPortfolioCategoryBySlug(slug: string): Promise<PortfolioCategory | null> {
  const list = globalThis.__SB_PORTFOLIO_CATEGORIES__ ?? initialPortfolioCategories;
  return list.find((c) => c.slug === slug) || null;
}

export async function createPortfolioCategory(
  data: Omit<PortfolioCategory, "id" | "createdAt" | "updatedAt">
): Promise<PortfolioCategory> {
  const newCat: PortfolioCategory = {
    ...data,
    id: `port-cat-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  globalThis.__SB_PORTFOLIO_CATEGORIES__ = [
    ...(globalThis.__SB_PORTFOLIO_CATEGORIES__ ?? initialPortfolioCategories),
    newCat,
  ];
  return newCat;
}

export async function updatePortfolioCategory(
  id: string,
  data: Partial<PortfolioCategory>
): Promise<PortfolioCategory | null> {
  const list = globalThis.__SB_PORTFOLIO_CATEGORIES__ ?? initialPortfolioCategories;
  const index = list.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const updated: PortfolioCategory = {
    ...list[index],
    ...data,
    updatedAt: new Date(),
  };
  list[index] = updated;
  globalThis.__SB_PORTFOLIO_CATEGORIES__ = [...list];
  return updated;
}

export async function deletePortfolioCategory(id: string): Promise<boolean> {
  const list = globalThis.__SB_PORTFOLIO_CATEGORIES__ ?? initialPortfolioCategories;
  const filtered = list.filter((c) => c.id !== id);
  if (filtered.length === list.length) return false;
  globalThis.__SB_PORTFOLIO_CATEGORIES__ = filtered;
  return true;
}

// ============================================================================
// 3. BLOG CATEGORIES SEED & CRUD (KOSONG, DIISI VIA ADMIN)
// ============================================================================
const initialBlogCategories: BlogCategory[] = [];

export async function getAllBlogCategories(): Promise<BlogCategory[]> {
  const list = globalThis.__SB_BLOG_CATEGORIES__ ?? initialBlogCategories;
  return [...list].sort((a, b) => a.order - b.order);
}

export async function getBlogCategoryById(id: string): Promise<BlogCategory | null> {
  const list = globalThis.__SB_BLOG_CATEGORIES__ ?? initialBlogCategories;
  return list.find((c) => c.id === id) || null;
}

export async function getBlogCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  const list = globalThis.__SB_BLOG_CATEGORIES__ ?? initialBlogCategories;
  return list.find((c) => c.slug === slug) || null;
}

export async function createBlogCategory(
  data: Omit<BlogCategory, "id" | "createdAt" | "updatedAt">
): Promise<BlogCategory> {
  const newCat: BlogCategory = {
    ...data,
    id: `blog-cat-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  globalThis.__SB_BLOG_CATEGORIES__ = [
    ...(globalThis.__SB_BLOG_CATEGORIES__ ?? initialBlogCategories),
    newCat,
  ];
  return newCat;
}

export async function updateBlogCategory(
  id: string,
  data: Partial<BlogCategory>
): Promise<BlogCategory | null> {
  const list = globalThis.__SB_BLOG_CATEGORIES__ ?? initialBlogCategories;
  const index = list.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const updated: BlogCategory = {
    ...list[index],
    ...data,
    updatedAt: new Date(),
  };
  list[index] = updated;
  globalThis.__SB_BLOG_CATEGORIES__ = [...list];
  return updated;
}

export async function deleteBlogCategory(id: string): Promise<boolean> {
  const list = globalThis.__SB_BLOG_CATEGORIES__ ?? initialBlogCategories;
  const filtered = list.filter((c) => c.id !== id);
  if (filtered.length === list.length) return false;
  globalThis.__SB_BLOG_CATEGORIES__ = filtered;
  return true;
}

// ============================================================================
// 4. PORTFOLIOS & PORTFOLIO IMAGES CRUD (KOSONG, DIISI VIA ADMIN)
// ============================================================================
const initialPortfolios: Portfolio[] = [];
const initialPortfolioImages: PortfolioImage[] = [];

function attachImagesToPortfolio(portfolio: Portfolio): PortfolioWithImages {
  const allImages = globalThis.__SB_PORTFOLIO_IMAGES__ ?? initialPortfolioImages;
  const images = allImages
    .filter((img) => img.portfolioId === portfolio.id)
    .sort((a, b) => a.order - b.order);
  return {
    ...portfolio,
    images,
  };
}

export async function getAllPortfolios(options?: {
  onlyPublished?: boolean;
  category?: string;
}): Promise<PortfolioWithImages[]> {
  let list = globalThis.__SB_PORTFOLIOS__ ?? initialPortfolios;
  if (options?.onlyPublished) {
    list = list.filter((p) => p.isPublished);
  }
  if (options?.category && options.category !== "all") {
    list = list.filter(
      (p) =>
        p.category.toLowerCase().includes(options.category!.toLowerCase()) ||
        p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") === options.category!.toLowerCase()
    );
  }
  return list.map((p) => attachImagesToPortfolio(p));
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioWithImages | null> {
  const list = globalThis.__SB_PORTFOLIOS__ ?? initialPortfolios;
  const portfolio = list.find((p) => p.slug === slug) || null;
  if (!portfolio) return null;
  return attachImagesToPortfolio(portfolio);
}

export async function getPortfolioById(id: string): Promise<PortfolioWithImages | null> {
  const list = globalThis.__SB_PORTFOLIOS__ ?? initialPortfolios;
  const portfolio = list.find((p) => p.id === id) || null;
  if (!portfolio) return null;
  return attachImagesToPortfolio(portfolio);
}

export async function createPortfolio(
  data: Omit<Portfolio, "id" | "createdAt" | "updatedAt"> & {
    imagePaths?: string[];
    imageUrls?: string[];
  }
): Promise<PortfolioWithImages> {
  const newId = `port-${Date.now()}`;
  const newPortfolio: Portfolio = {
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

  globalThis.__SB_PORTFOLIOS__ = [newPortfolio, ...(globalThis.__SB_PORTFOLIOS__ ?? [])];

  const paths = data.imagePaths || data.imageUrls || [];
  const newImages: PortfolioImage[] = paths.map((path, idx) => ({
    id: `img-${Date.now()}-${idx}`,
    portfolioId: newId,
    imagePath: path,
    order: idx,
  }));

  globalThis.__SB_PORTFOLIO_IMAGES__ = [
    ...(globalThis.__SB_PORTFOLIO_IMAGES__ ?? []),
    ...newImages,
  ];

  return attachImagesToPortfolio(newPortfolio);
}

export async function updatePortfolio(
  id: string,
  data: Partial<Portfolio> & {
    imagePaths?: string[];
    imageUrls?: string[];
  }
): Promise<PortfolioWithImages | null> {
  const list = globalThis.__SB_PORTFOLIOS__ ?? initialPortfolios;
  const index = list.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated: Portfolio = {
    ...list[index],
    ...data,
    updatedAt: new Date(),
  };
  list[index] = updated;
  globalThis.__SB_PORTFOLIOS__ = [...list];

  const paths = data.imagePaths !== undefined ? data.imagePaths : data.imageUrls;
  if (paths !== undefined) {
    const currentImages = (globalThis.__SB_PORTFOLIO_IMAGES__ ?? []).filter((img) => img.portfolioId !== id);
    const newImages: PortfolioImage[] = paths.map((path, idx) => ({
      id: `img-${Date.now()}-${idx}`,
      portfolioId: id,
      imagePath: path,
      order: idx,
    }));
    globalThis.__SB_PORTFOLIO_IMAGES__ = [...currentImages, ...newImages];
  }

  return attachImagesToPortfolio(updated);
}

export async function deletePortfolio(id: string): Promise<boolean> {
  const list = globalThis.__SB_PORTFOLIOS__ ?? initialPortfolios;
  const filtered = list.filter((p) => p.id !== id);
  if (filtered.length === list.length) return false;
  globalThis.__SB_PORTFOLIOS__ = filtered;

  globalThis.__SB_PORTFOLIO_IMAGES__ = (globalThis.__SB_PORTFOLIO_IMAGES__ ?? []).filter(
    (img) => img.portfolioId !== id
  );

  return true;
}

// ============================================================================
// 5. BLOGS CRUD (KOSONG, DIISI VIA ADMIN)
// ============================================================================
const initialBlogs: Blog[] = [];

export async function getAllBlogs(options?: {
  onlyPublished?: boolean;
  category?: string;
  searchQuery?: string;
}): Promise<Blog[]> {
  let list = globalThis.__SB_BLOGS__ ?? initialBlogs;
  if (options?.onlyPublished) {
    list = list.filter((b) => b.isPublished);
  }
  if (options?.category && options.category !== "all") {
    list = list.filter(
      (b) =>
        b.category.toLowerCase().includes(options.category!.toLowerCase()) ||
        b.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") === options.category!.toLowerCase()
    );
  }
  if (options?.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    list = list.filter(
      (b) => b.title.toLowerCase().includes(query) || b.excerpt.toLowerCase().includes(query)
    );
  }
  return [...list];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const list = globalThis.__SB_BLOGS__ ?? initialBlogs;
  return list.find((b) => b.slug === slug) || null;
}

export async function getBlogById(id: string): Promise<Blog | null> {
  const list = globalThis.__SB_BLOGS__ ?? initialBlogs;
  return list.find((b) => b.id === id) || null;
}

export async function createBlog(data: Omit<Blog, "id" | "createdAt" | "updatedAt">): Promise<Blog> {
  const newBlog: Blog = {
    ...data,
    id: `blog-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  globalThis.__SB_BLOGS__ = [newBlog, ...(globalThis.__SB_BLOGS__ ?? [])];
  return newBlog;
}

export async function updateBlog(id: string, data: Partial<Blog>): Promise<Blog | null> {
  const list = globalThis.__SB_BLOGS__ ?? initialBlogs;
  const index = list.findIndex((b) => b.id === id);
  if (index === -1) return null;

  const updated: Blog = {
    ...list[index],
    ...data,
    updatedAt: new Date(),
  };
  list[index] = updated;
  globalThis.__SB_BLOGS__ = [...list];
  return updated;
}

export async function deleteBlog(id: string): Promise<boolean> {
  const list = globalThis.__SB_BLOGS__ ?? initialBlogs;
  const filtered = list.filter((b) => b.id !== id);
  if (filtered.length === list.length) return false;
  globalThis.__SB_BLOGS__ = filtered;
  return true;
}

// Reset Global Cache to empty arrays if not yet created
if (!globalThis.__SB_USERS__) {
  globalThis.__SB_USERS__ = [];
}
if (!globalThis.__SB_PORTFOLIOS__) {
  globalThis.__SB_PORTFOLIOS__ = [];
}
if (!globalThis.__SB_PORTFOLIO_IMAGES__) {
  globalThis.__SB_PORTFOLIO_IMAGES__ = [];
}
if (!globalThis.__SB_PORTFOLIO_CATEGORIES__) {
  globalThis.__SB_PORTFOLIO_CATEGORIES__ = [];
}
if (!globalThis.__SB_BLOGS__) {
  globalThis.__SB_BLOGS__ = [];
}
if (!globalThis.__SB_BLOG_CATEGORIES__) {
  globalThis.__SB_BLOG_CATEGORIES__ = [];
}
