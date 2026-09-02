import { NextRequest, NextResponse } from "next/server";
import { getServiceById, getServiceBySlug } from "@/lib/data-store";

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/layanan/[id] - Ambil detail layanan berdasarkan ID atau Slug (Statis)
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    let service = await getServiceById(id);
    if (!service) {
      service = await getServiceBySlug(id);
    }

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Layanan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: service,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data layanan" },
      { status: 500 }
    );
  }
}
