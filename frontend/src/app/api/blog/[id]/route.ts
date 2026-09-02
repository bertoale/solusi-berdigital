import { NextRequest, NextResponse } from "next/server";
import { getBlogById, getBlogBySlug, updateBlog, deleteBlog } from "@/lib/data-store";

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/blog/[id] - Ambil detail artikel berdasarkan ID atau Slug
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    let blog = await getBlogById(id);
    if (!blog) {
      blog = await getBlogBySlug(id);
    }

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Artikel blog tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data blog" },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[id] - Update artikel blog
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateBlog(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Artikel blog tidak ditemukan untuk diupdate" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Artikel blog berhasil diperbarui",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui artikel blog" },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[id] - Hapus artikel blog
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const success = await deleteBlog(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Artikel blog tidak ditemukan untuk dihapus" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Artikel blog berhasil dihapus",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal menghapus artikel blog" },
      { status: 500 }
    );
  }
}
