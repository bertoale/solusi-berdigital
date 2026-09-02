"use client";

import React, { useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { getPublicImageUrl } from "@/lib/s3";

interface SingleImageUploaderProps {
  initialImagePath?: string | null;
  name?: string;
  folder?: "blog" | "portofolio";
  label?: string;
}

export function SingleImageUploader({
  initialImagePath = "",
  name = "imagePath",
  folder = "blog",
  label = "Gambar Cover / Thumbnail Artikel",
}: SingleImageUploaderProps) {
  const [imagePath, setImagePath] = useState<string>(initialImagePath || "");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setIsUploading(true);

    try {
      // 1. Kompresi gambar & konversi ke WebP di browser
      const options = {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: "image/webp",
      };

      const compressedBlob = await imageCompression(file, options);
      const webpFile = new File(
        [compressedBlob],
        file.name.replace(/\.[^/.]+$/, "") + ".webp",
        { type: "image/webp" }
      );

      // 2. Upload ke endpoint S3
      const formData = new FormData();
      formData.append("file", webpFile);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengupload gambar");
      }

      setImagePath(data.imagePath);
    } catch (err: unknown) {
      console.error("Upload error:", err);
      setErrorMsg(err instanceof Error ? err.message : "Gagal mengupload gambar ke S3");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setImagePath("");
  };

  const previewUrl = imagePath ? getPublicImageUrl(imagePath) : null;

  return (
    <div className="space-y-2">
      {/* Hidden input to pass imagePath into Form Data for Server Actions */}
      <input type="hidden" name={name} value={imagePath} />

      <label className="text-xs font-bold text-foreground uppercase tracking-wide block">
        {label}
      </label>

      {previewUrl ? (
        <div className="relative w-full max-w-md aspect-[16/9] rounded-2xl overflow-hidden theme-inset bg-muted/40 border border-border group">
          <Image
            src={previewUrl}
            alt="Preview Cover"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 450px"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRemove}
              className="p-2.5 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all font-bold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <X className="size-4" />
              <span>Hapus Gambar</span>
            </button>
          </div>
          <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-background/90 backdrop-blur-md text-[10px] font-mono text-muted-foreground border border-border">
            {imagePath}
          </div>
        </div>
      ) : (
        <div className="relative">
          <label className="theme-card-flat border-2 border-dashed border-border hover:border-primary/60 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center gap-3 text-center cursor-pointer transition-colors bg-card/60 hover:bg-muted/40">
            <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary theme-card-flat">
              {isUploading ? (
                <Loader2 className="size-6 animate-spin" />
              ) : (
                <UploadCloud className="size-6" />
              )}
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-foreground block">
                {isUploading ? "Mengompresi & Mengupload ke S3..." : "Klik untuk Pilih & Upload Gambar"}
              </span>
              <p className="text-[11px] text-muted-foreground">
                Otomatis dikompresi menjadi format <span className="font-mono text-primary font-bold">.webp</span> beresolusi tinggi sebelum disimpan ke S3.
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              disabled={isUploading}
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
          {errorMsg}
        </div>
      )}
    </div>
  );
}
