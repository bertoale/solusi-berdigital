import { NextRequest, NextResponse } from "next/server";
import {
  getPortfolioCategoryById,
  getPortfolioCategoryBySlug,
  updatePortfolioCategory,
  deletePortfolioCategory,
} from "@/lib/data-store";

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/portofolio-kategori/[id]
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    let item = await getPortfolioCategoryById(id);
    if (!item) {
      item = await getPortfolioCategoryBySlug(id);
    }

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Kategori portofolio tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data kategori portofolio" },
      { status: 500 }
    );
  }
}

// PUT /api/portofolio-kategori/[id]
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updatePortfolioCategory(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Kategori portofolio tidak ditemukan untuk diupdate" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Kategori portofolio berhasil diperbarui",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui kategori portofolio" },
      { status: 500 }
    );
  }
}

// DELETE /api/portofolio-kategori/[id]
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const success = await deletePortfolioCategory(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Kategori portofolio tidak ditemukan untuk dihapus" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Kategori portofolio berhasil dihapus",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal menghapus kategori portofolio" },
      { status: 500 }
    );
  }
}
