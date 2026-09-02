"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminCredentials, setAdminSession, clearAdminSession, verifyPassword } from "./auth";
import * as db from "./data-store";

// ==========================================
// 1. ADMIN AUTH ACTIONS
// ==========================================
export async function loginAdminAction(prevState: { error?: string } | undefined, formData: FormData) {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  // 1. Cek dari database user (Bcrypt Hashed)
  const dbUser = await db.findUserByEmail(email);
  if (dbUser) {
    const isMatch = await verifyPassword(password, dbUser.password);
    if (isMatch) {
      await setAdminSession({
        email: dbUser.email,
        name: "Administrator Solusi Berdigital",
        role: "admin",
        loggedInAt: Date.now(),
      });
      redirect("/admin");
    }
  }

  // 2. Fallback ke environment admin credentials
  const envCredentials = getAdminCredentials();
  if (email.toLowerCase() === envCredentials.email.toLowerCase()) {
    const isMatch = await verifyPassword(password, envCredentials.password);
    if (isMatch) {
      await setAdminSession({
        email: envCredentials.email,
        name: envCredentials.name,
        role: "admin",
        loggedInAt: Date.now(),
      });
      redirect("/admin");
    }
  }

  return { error: "Email atau password admin tidak valid. Silakan periksa kembali." };
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

// ==========================================
// 2. PORTFOLIOS ACTIONS
// ==========================================
export async function createPortfolioAction(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const clientName = formData.get("clientName") as string;
  const clientType = formData.get("clientType") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string; // Deskripsi Singkat
  const fullDescription = formData.get("fullDescription") as string; // Deskripsi Biasa / Lengkap
  const liveUrl = (formData.get("liveUrl") as string) || null;
  const mockupType = (formData.get("mockupType") as string) || "browser";

  const rawFeatures = formData.get("features") as string;
  const features = rawFeatures
    ? rawFeatures.split("\n").map((f) => f.trim()).filter(Boolean)
    : [];

  const rawImages = (formData.get("imagePaths") || formData.get("images")) as string;
  const images = rawImages
    ? rawImages.split("\n").map((img) => img.trim()).filter(Boolean)
    : [];

  const isPublished = formData.get("isPublished") === "on" || formData.get("isPublished") === "true";

  await db.createPortfolio({
    slug,
    title,
    clientName,
    clientType,
    category,
    description,
    fullDescription,
    features,
    imagePaths: images,
    mockupType,
    liveUrl,
    isPublished,
  });

  revalidatePath("/");
  revalidatePath("/portofolio");
  revalidatePath(`/portofolio/${slug}`);
  revalidatePath("/admin/portofolio");
  redirect("/admin/portofolio");
}

export async function updatePortfolioAction(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const clientName = formData.get("clientName") as string;
  const clientType = formData.get("clientType") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string; // Deskripsi Singkat
  const fullDescription = formData.get("fullDescription") as string; // Deskripsi Biasa / Lengkap
  const liveUrl = (formData.get("liveUrl") as string) || null;

  const rawFeatures = formData.get("features") as string;
  const features = rawFeatures
    ? rawFeatures.split("\n").map((f) => f.trim()).filter(Boolean)
    : [];

  const rawImages = (formData.get("imagePaths") || formData.get("images")) as string;
  const images = rawImages
    ? rawImages.split("\n").map((img) => img.trim()).filter(Boolean)
    : [];

  const isPublished = formData.get("isPublished") === "on" || formData.get("isPublished") === "true";

  await db.updatePortfolio(id, {
    slug,
    title,
    clientName,
    clientType,
    category,
    description,
    fullDescription,
    features,
    imagePaths: images,
    liveUrl,
    isPublished,
  });

  revalidatePath("/");
  revalidatePath("/portofolio");
  revalidatePath(`/portofolio/${slug}`);
  revalidatePath("/admin/portofolio");
  redirect("/admin/portofolio");
}

export async function deletePortfolioAction(id: string) {
  await db.deletePortfolio(id);
  revalidatePath("/");
  revalidatePath("/portofolio");
  revalidatePath("/admin/portofolio");
}

// ==========================================
// 3. PORTFOLIO CATEGORIES ACTIONS
// ==========================================
export async function createPortfolioCategoryAction(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const description = (formData.get("description") as string) || "";
  const order = parseInt((formData.get("order") as string) || "0", 10);

  await db.createPortfolioCategory({
    name,
    slug,
    description,
    order,
  });

  revalidatePath("/portofolio");
  revalidatePath("/admin/portofolio");
  revalidatePath("/admin/portofolio/kategori");
  redirect("/admin/portofolio/kategori");
}

export async function updatePortfolioCategoryAction(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = (formData.get("description") as string) || "";
  const order = parseInt((formData.get("order") as string) || "0", 10);

  await db.updatePortfolioCategory(id, {
    name,
    slug,
    description,
    order,
  });

  revalidatePath("/portofolio");
  revalidatePath("/admin/portofolio");
  revalidatePath("/admin/portofolio/kategori");
  redirect("/admin/portofolio/kategori");
}

export async function deletePortfolioCategoryAction(id: string) {
  await db.deletePortfolioCategory(id);
  revalidatePath("/portofolio");
  revalidatePath("/admin/portofolio/kategori");
}

// ==========================================
// 4. BLOGS ACTIONS
// ==========================================
export async function createBlogAction(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const category = formData.get("category") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const author = (formData.get("author") as string) || "Tim Solusi Berdigital";
  const imagePath = (formData.get("imagePath") as string) || null;

  const rawTags = formData.get("tags") as string;
  const tags = rawTags
    ? rawTags.split(",").map((t) => t.trim()).filter(Boolean)
    : ["Bisnis Digital"];

  const isPublished = formData.get("isPublished") === "on" || formData.get("isPublished") === "true";

  await db.createBlog({
    slug,
    title,
    excerpt,
    content,
    category,
    author,
    imagePath,
    tags,
    isPublished,
    publishedAt: new Date(),
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updateBlogAction(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  const imagePath = (formData.get("imagePath") as string) || null;

  const rawTags = formData.get("tags") as string;
  const tags = rawTags
    ? rawTags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const isPublished = formData.get("isPublished") === "on" || formData.get("isPublished") === "true";

  await db.updateBlog(id, {
    slug,
    title,
    excerpt,
    content,
    category,
    author,
    imagePath,
    tags,
    isPublished,
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deleteBlogAction(id: string) {
  await db.deleteBlog(id);
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

// ==========================================
// 5. BLOG CATEGORIES ACTIONS
// ==========================================
export async function createBlogCategoryAction(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const description = (formData.get("description") as string) || "";
  const order = parseInt((formData.get("order") as string) || "0", 10);

  await db.createBlogCategory({
    name,
    slug,
    description,
    order,
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin/blog/kategori");
  redirect("/admin/blog/kategori");
}

export async function updateBlogCategoryAction(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = (formData.get("description") as string) || "";
  const order = parseInt((formData.get("order") as string) || "0", 10);

  await db.updateBlogCategory(id, {
    name,
    slug,
    description,
    order,
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin/blog/kategori");
  redirect("/admin/blog/kategori");
}

export async function deleteBlogCategoryAction(id: string) {
  await db.deleteBlogCategory(id);
  revalidatePath("/blog");
  revalidatePath("/admin/blog/kategori");
}
