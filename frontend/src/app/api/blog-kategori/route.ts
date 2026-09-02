import { NextRequest, NextResponse } from "next/server";
import { getAllBlogCategories, createBlogCategory } from "@/lib/data-store";

// GET /api/blog-kategori
export async function GET() {
  try {
    const data = await getAllBlogCategories();
    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data kategori blog" },
      { status: 500 }
    );
  }
}

// POST /api/blog-kategori
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Nama kategori blog wajib diisi." },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const newCategory = await createBlogCategory({
      name: body.name,
      slug,
      description: body.description || "",
      order: body.order ?? 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Kategori blog berhasil ditambahkan",
        data: newCategory,
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
