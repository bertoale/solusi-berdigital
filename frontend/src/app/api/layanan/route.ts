import { NextResponse } from "next/server";
import { getAllServices } from "@/lib/data-store";

// GET /api/layanan - Ambil semua layanan (Data Statis)
export async function GET() {
  try {
    const data = await getAllServices();
    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data layanan" },
      { status: 500 }
    );
  }
}
