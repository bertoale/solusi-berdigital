import { NextRequest, NextResponse } from "next/server";
import { getAllPortfolios, createPortfolio } from "@/lib/data-store";

// GET /api/portofolio - Ambil semua portofolio (?category=&published=true)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const onlyPublished = searchParams.get("published") === "true";

    const data = await getAllPortfolios({
      onlyPublished,
      category,
    });

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data portofolio" },
      { status: 500 }
    );
  }
}

// POST /api/portofolio - Tambah portofolio baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.clientName || !body.clientType || !body.category || !body.description || !body.fullDescription) {
      return NextResponse.json(
        { success: false, error: "Field title, clientName, clientType, category, description, dan fullDescription wajib diisi." },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const newPortfolio = await createPortfolio({
      slug,
      title: body.title,
      clientName: body.clientName,
      clientType: body.clientType,
      category: body.category,
      description: body.description,
      fullDescription: body.fullDescription,
      features: Array.isArray(body.features) ? body.features : [],
      imageUrls: Array.isArray(body.images) ? body.images : [],
      mockupType: body.mockupType || "browser",
      liveUrl: body.liveUrl || null,
      isPublished: body.isPublished ?? true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Portofolio berhasil ditambahkan",
        data: newPortfolio,
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
