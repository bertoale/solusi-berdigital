import { NextRequest, NextResponse } from "next/server";
import { getAllBlogs, createBlog } from "@/lib/data-store";

// GET /api/blog - Ambil semua artikel (?category=&q=&published=true)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const searchQuery = searchParams.get("q") || undefined;
    const onlyPublished = searchParams.get("published") === "true";

    const data = await getAllBlogs({
      onlyPublished,
      category,
      searchQuery,
    });

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data blog" },
      { status: 500 }
    );
  }
}

// POST /api/blog - Buat artikel blog baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.excerpt || !body.content || !body.category) {
      return NextResponse.json(
        { success: false, error: "Field title, excerpt, content, dan category wajib diisi." },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const newBlog = await createBlog({
      slug,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      author: body.author || "Tim Solusi Berdigital",
      imagePath: body.imagePath || null,
      tags: Array.isArray(body.tags) ? body.tags : ["Bisnis Digital"],
      isPublished: body.isPublished ?? true,
      publishedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Artikel blog berhasil dibuat",
        data: newBlog,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Format request tidak valid atau terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
