import { NextRequest, NextResponse } from "next/server";
import {
  getBlogCategoryById,
  getBlogCategoryBySlug,
  updateBlogCategory,
  deleteBlogCategory,
} from "@/lib/data-store";

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/blog-kategori/[id]
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    let item = await getBlogCategoryById(id);
    if (!item) {
      item = await getBlogCategoryBySlug(id);
    }

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Kategori blog tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data kategori blog" },
      { status: 500 }
    );
  }
}

// PUT /api/blog-kategori/[id]
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateBlogCategory(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Kategori blog tidak ditemukan untuk diupdate" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Kategori blog berhasil diperbarui",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui kategori blog" },
      { status: 500 }
    );
  }
}

// DELETE /api/blog-kategori/[id]
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const success = await deleteBlogCategory(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Kategori blog tidak ditemukan untuk dihapus" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Kategori blog berhasil dihapus",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal menghapus kategori blog" },
      { status: 500 }
    );
  }
}
