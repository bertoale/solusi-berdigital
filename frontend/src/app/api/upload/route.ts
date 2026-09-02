import { NextRequest, NextResponse } from "next/server";
import { uploadBufferToS3 } from "@/lib/s3";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "blog"; // "blog" atau "portofolio"

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File gambar tidak ditemukan" },
        { status: 400 }
      );
    }

    const validFolder = folder === "portofolio" ? "portofolio" : "blog";
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate clean unique filename
    const originalName = file.name || "image.webp";
    const cleanName = originalName
      .toLowerCase()
      .replace(/\.[^/.]+$/, "") // hapus ekstensi lama
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const filename = `${Date.now()}-${cleanName || "upload"}.webp`;
    const s3Key = `${validFolder}/${filename}`;

    const result = await uploadBufferToS3(buffer, s3Key, "image/webp");

    return NextResponse.json({
      success: true,
      message: "Gambar berhasil diupload ke S3",
      imagePath: result.imagePath, // e.g. /blog/1725300000000-gambar.webp
    });
  } catch (err) {
    console.error("S3 Upload Error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengupload gambar ke S3. Pastikan konfigurasi S3 telah sesuai.",
      },
      { status: 500 }
    );
  }
}
