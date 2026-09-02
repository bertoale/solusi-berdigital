import { NextRequest, NextResponse } from "next/server";
import { getPortfolioById, getPortfolioBySlug, updatePortfolio, deletePortfolio } from "@/lib/data-store";

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/portofolio/[id] - Ambil detail portofolio berdasarkan ID atau Slug
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    let item = await getPortfolioById(id);
    if (!item) {
      item = await getPortfolioBySlug(id);
    }

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Portofolio tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data portofolio" },
      { status: 500 }
    );
  }
}

// PUT /api/portofolio/[id] - Update portofolio
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updatePortfolio(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Portofolio tidak ditemukan untuk diupdate" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Portofolio berhasil diperbarui",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui portofolio" },
      { status: 500 }
    );
  }
}

// DELETE /api/portofolio/[id] - Hapus portofolio
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const success = await deletePortfolio(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Portofolio tidak ditemukan untuk dihapus" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Portofolio berhasil dihapus",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal menghapus portofolio" },
      { status: 500 }
    );
  }
}
