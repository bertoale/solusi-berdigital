import { NextRequest, NextResponse } from "next/server";
import { getAllPortfolioCategories, createPortfolioCategory } from "@/lib/data-store";

// GET /api/portofolio-kategori
export async function GET() {
  try {
    const data = await getAllPortfolioCategories();
    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data kategori portofolio" },
      { status: 500 }
    );
  }
}

// POST /api/portofolio-kategori
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Nama kategori portofolio wajib diisi." },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const newCategory = await createPortfolioCategory({
      name: body.name,
      slug,
      description: body.description || "",
      order: body.order ?? 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Kategori portofolio berhasil ditambahkan",
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
