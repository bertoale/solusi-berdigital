"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setAdminSession, clearAdminSession, verifyPassword } from "./auth";
import * as db from "./data-store";

export type ActionResponse = {
  success: boolean;
  error?: string;
  data?: unknown;
};

// ==========================================
// 1. ADMIN AUTH ACTIONS (DATABASE USERS ONLY)
// ==========================================
export async function loginAdminAction(prevState: { error?: string } | undefined, formData: FormData) {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  // 1. Query akun dari tabel `users` di database MySQL
  const dbUser = await db.findUserByEmail(email);
  if (!dbUser) {
    return {
      error:
        "Akun tidak ditemukan di database. Pastikan tabel users telah dibuat dan akun telah diinsert ke database MySQL.",
    };
  }

  // 2. Verifikasi password Bcrypt
  const isMatch = await verifyPassword(password, dbUser.password);
  if (!isMatch) {
    return { error: "Password yang Anda masukkan salah. Silakan periksa kembali." };
  }

  // 3. Set cookie sesi terenkripsi HMAC
  await setAdminSession({
    email: dbUser.email,
    name: "Administrator Solusi Berdigital",
    role: "admin",
    loggedInAt: Date.now(),
  });

  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/login");
}

// ==========================================
// 2. PORTFOLIOS ACTIONS
// ==========================================
export async function createPortfolioAction(formData: FormData): Promise<ActionResponse> {
  try {
    const title = (formData.get("title") as string)?.trim();
    if (!title) return { success: false, error: "Judul portofolio wajib diisi" };

    const slug = (formData.get("slug") as string)?.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const clientName = (formData.get("clientName") as string)?.trim();
    if (!clientName) return { success: false, error: "Nama klien wajib diisi" };

    const clientType = (formData.get("clientType") as string)?.trim();
    if (!clientType) return { success: false, error: "Tipe klien / industri wajib diisi" };

    const category = (formData.get("category") as string)?.trim();
    if (!category) return { success: false, error: "Kategori portofolio wajib dipilih" };

    const description = (formData.get("description") as string)?.trim();
    if (!description) return { success: false, error: "Deskripsi singkat wajib diisi" };

    const fullDescription = (formData.get("fullDescription") as string)?.trim();
    if (!fullDescription) return { success: false, error: "Deskripsi lengkap proyek wajib diisi" };

    const liveUrl = (formData.get("liveUrl") as string)?.trim() || null;
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
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menambahkan portofolio ke database";
    return { success: false, error: message };
  }
}

export async function updatePortfolioAction(id: string, formData: FormData): Promise<ActionResponse> {
  try {
    const title = (formData.get("title") as string)?.trim();
    if (!title) return { success: false, error: "Judul portofolio wajib diisi" };

    const slug = (formData.get("slug") as string)?.trim();
    if (!slug) return { success: false, error: "Slug portofolio wajib diisi" };

    const clientName = (formData.get("clientName") as string)?.trim();
    if (!clientName) return { success: false, error: "Nama klien wajib diisi" };

    const clientType = (formData.get("clientType") as string)?.trim();
    if (!clientType) return { success: false, error: "Tipe klien / industri wajib diisi" };

    const category = (formData.get("category") as string)?.trim();
    if (!category) return { success: false, error: "Kategori portofolio wajib dipilih" };

    const description = (formData.get("description") as string)?.trim();
    if (!description) return { success: false, error: "Deskripsi singkat wajib diisi" };

    const fullDescription = (formData.get("fullDescription") as string)?.trim();
    if (!fullDescription) return { success: false, error: "Deskripsi lengkap proyek wajib diisi" };

    const liveUrl = (formData.get("liveUrl") as string)?.trim() || null;

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
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui portofolio di database";
    return { success: false, error: message };
  }
}

export async function deletePortfolioAction(id: string): Promise<ActionResponse> {
  try {
    await db.deletePortfolio(id);
    revalidatePath("/");
    revalidatePath("/portofolio");
    revalidatePath("/admin/portofolio");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menghapus portofolio";
    return { success: false, error: message };
  }
}

// ==========================================
// 3. PORTFOLIO CATEGORIES ACTIONS
// ==========================================
export async function createPortfolioCategoryAction(formData: FormData): Promise<ActionResponse> {
  try {
    const name = (formData.get("name") as string)?.trim();
    if (!name) return { success: false, error: "Nama kategori portofolio wajib diisi" };

    const slug = (formData.get("slug") as string)?.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const description = (formData.get("description") as string)?.trim() || "";
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
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menambahkan kategori portofolio";
    return { success: false, error: message };
  }
}

export async function updatePortfolioCategoryAction(id: string, formData: FormData): Promise<ActionResponse> {
  try {
    const name = (formData.get("name") as string)?.trim();
    if (!name) return { success: false, error: "Nama kategori portofolio wajib diisi" };

    const slug = (formData.get("slug") as string)?.trim();
    if (!slug) return { success: false, error: "Slug kategori wajib diisi" };

    const description = (formData.get("description") as string)?.trim() || "";
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
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui kategori portofolio";
    return { success: false, error: message };
  }
}

export async function deletePortfolioCategoryAction(id: string): Promise<ActionResponse> {
  try {
    await db.deletePortfolioCategory(id);
    revalidatePath("/portofolio");
    revalidatePath("/admin/portofolio");
    revalidatePath("/admin/portofolio/kategori");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menghapus kategori portofolio";
    return { success: false, error: message };
  }
}

// ==========================================
// 4. BLOGS ACTIONS
// ==========================================
export async function createBlogAction(formData: FormData): Promise<ActionResponse> {
  try {
    const title = (formData.get("title") as string)?.trim();
    if (!title) return { success: false, error: "Judul artikel wajib diisi" };

    const slug = (formData.get("slug") as string)?.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const category = (formData.get("category") as string)?.trim();
    if (!category) return { success: false, error: "Kategori artikel wajib dipilih" };

    const excerpt = (formData.get("excerpt") as string)?.trim();
    if (!excerpt) return { success: false, error: "Ringkasan / kutipan artikel wajib diisi" };

    const content = (formData.get("content") as string)?.trim();
    if (!content) return { success: false, error: "Konten lengkap artikel wajib diisi" };

    const author = (formData.get("author") as string)?.trim() || "Tim Solusi Berdigital";
    const imagePath = (formData.get("imagePath") as string)?.trim() || null;

    const rawTags = formData.get("tags") as string;
    const tags = rawTags
      ? rawTags.split(",").map((t) => t.trim()).filter(Boolean)
      : ["Bisnis Digital"];

    const rawFaqs = formData.get("blogFaqs") as string;
    let blogFaqs: { question: string; answer: string }[] = [];
    try {
      if (rawFaqs) {
        blogFaqs = JSON.parse(rawFaqs);
      }
    } catch {
      blogFaqs = [];
    }

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
      blogFaqs,
      isPublished,
      publishedAt: new Date(),
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menambahkan artikel blog";
    return { success: false, error: message };
  }
}

export async function updateBlogAction(id: string, formData: FormData): Promise<ActionResponse> {
  try {
    const title = (formData.get("title") as string)?.trim();
    if (!title) return { success: false, error: "Judul artikel wajib diisi" };

    const slug = (formData.get("slug") as string)?.trim();
    if (!slug) return { success: false, error: "Slug artikel wajib diisi" };

    const category = (formData.get("category") as string)?.trim();
    if (!category) return { success: false, error: "Kategori artikel wajib dipilih" };

    const excerpt = (formData.get("excerpt") as string)?.trim();
    if (!excerpt) return { success: false, error: "Ringkasan / kutipan artikel wajib diisi" };

    const content = (formData.get("content") as string)?.trim();
    if (!content) return { success: false, error: "Konten artikel wajib diisi" };

    const author = (formData.get("author") as string)?.trim() || "Tim Solusi Berdigital";
    const imagePath = (formData.get("imagePath") as string)?.trim() || null;

    const rawTags = formData.get("tags") as string;
    const tags = rawTags
      ? rawTags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const rawFaqs = formData.get("blogFaqs") as string;
    let blogFaqs: { question: string; answer: string }[] = [];
    try {
      if (rawFaqs) {
        blogFaqs = JSON.parse(rawFaqs);
      }
    } catch {
      blogFaqs = [];
    }

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
      blogFaqs,
      isPublished,
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui artikel blog";
    return { success: false, error: message };
  }
}

export async function deleteBlogAction(id: string): Promise<ActionResponse> {
  try {
    await db.deleteBlog(id);
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menghapus artikel blog";
    return { success: false, error: message };
  }
}

// ==========================================
// 5. BLOG CATEGORIES ACTIONS
// ==========================================
export async function createBlogCategoryAction(formData: FormData): Promise<ActionResponse> {
  try {
    const name = (formData.get("name") as string)?.trim();
    if (!name) return { success: false, error: "Nama kategori blog wajib diisi" };

    const slug = (formData.get("slug") as string)?.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const description = (formData.get("description") as string)?.trim() || "";
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
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menambahkan kategori blog";
    return { success: false, error: message };
  }
}

export async function updateBlogCategoryAction(id: string, formData: FormData): Promise<ActionResponse> {
  try {
    const name = (formData.get("name") as string)?.trim();
    if (!name) return { success: false, error: "Nama kategori blog wajib diisi" };

    const slug = (formData.get("slug") as string)?.trim();
    if (!slug) return { success: false, error: "Slug kategori blog wajib diisi" };

    const description = (formData.get("description") as string)?.trim() || "";
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
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui kategori blog";
    return { success: false, error: message };
  }
}

export async function deleteBlogCategoryAction(id: string): Promise<ActionResponse> {
  try {
    await db.deleteBlogCategory(id);
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    revalidatePath("/admin/blog/kategori");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menghapus kategori blog";
    return { success: false, error: message };
  }
}
