"use client";

import React, { useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { UploadCloud, X, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import { getPublicImageUrl } from "@/lib/s3";

interface PortfolioImagesUploaderProps {
  initialImagePaths?: string[];
  name?: string;
}

export function PortfolioImagesUploader({
  initialImagePaths = [],
  name = "imagePaths",
}: PortfolioImagesUploaderProps) {
  const [imagePaths, setImagePaths] = useState<string[]>(initialImagePaths);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgressText, setUploadProgressText] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErrorMsg(null);
    setIsUploading(true);

    try {
      const newUploadedPaths: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgressText(`Mengompresi & mengupload gambar ${i + 1} dari ${files.length}...`);

        // 1. Kompresi & konversi ke WebP
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: "image/webp",
        };

        const compressedBlob = await imageCompression(file, options);
        const webpFile = new File(
          [compressedBlob],
          file.name.replace(/\.[^/.]+$/, "") + ".webp",
          { type: "image/webp" }
        );

        // 2. Upload ke S3
        const formData = new FormData();
        formData.append("file", webpFile);
        formData.append("folder", "portofolio");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || `Gagal mengupload ${file.name}`);
        }

        newUploadedPaths.push(data.imagePath);
      }

      setImagePaths((prev) => [...prev, ...newUploadedPaths]);
    } catch (err: unknown) {
      console.error("Multi upload error:", err);
      setErrorMsg(err instanceof Error ? err.message : "Gagal mengupload beberapa gambar");
    } finally {
      setIsUploading(false);
      setUploadProgressText("");
      // Reset input value
      e.target.value = "";
    }
  };

  const handleRemove = (index: number) => {
    setImagePaths((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setImagePaths((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === imagePaths.length - 1) return;
    setImagePaths((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  return (
    <div className="space-y-4">
      {/* Hidden input passing newline-separated paths to Server Actions */}
      <input type="hidden" name={name} value={imagePaths.join("\n")} />

      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-foreground uppercase tracking-wide">
          Galeri Screenshot Portofolio ({imagePaths.length} Gambar)
        </label>
        <span className="text-[11px] text-muted-foreground">
          Gambar urutan #1 otomatis menjadi thumbnail kartu
        </span>
      </div>

      {/* Upload Dropzone */}
      <label className="theme-card-flat border-2 border-dashed border-border hover:border-primary/60 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-center cursor-pointer transition-colors bg-card/60 hover:bg-muted/40">
        <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary theme-card-flat">
          {isUploading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <UploadCloud className="size-6" />
          )}
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-foreground block">
            {isUploading ? uploadProgressText : "Klik / Drag untuk Tambah Gambar Screenshot"}
          </span>
          <p className="text-[11px] text-muted-foreground">
            Bisa pilih banyak gambar sekaligus. Otomatis dikompresi ke <span className="font-mono text-primary font-bold">.webp</span> dan diupload ke S3 folder <span className="font-mono text-primary font-bold">/portofolio</span>.
          </p>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          disabled={isUploading}
          onChange={handleFilesChange}
          className="sr-only"
        />
      </label>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
          {errorMsg}
        </div>
      )}

      {/* Uploaded Images Grid */}
      {imagePaths.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
          {imagePaths.map((path, idx) => {
            const previewUrl = getPublicImageUrl(path);
            const isFirst = idx === 0;

            return (
              <div
                key={`${path}-${idx}`}
                className="group relative aspect-[16/10] rounded-xl overflow-hidden theme-inset bg-muted/40 border border-border flex flex-col justify-between p-2"
              >
                <Image
                  src={previewUrl}
                  alt={`Screenshot ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 200px"
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className={`theme-pill px-2 py-0.5 text-[10px] font-mono font-bold ${
                      isFirst
                        ? "bg-primary text-primary-foreground shadow"
                        : "bg-background/90 text-foreground border border-border"
                    }`}
                  >
                    {isFirst ? "★ Thumbnail (#1)" : `#${idx + 1}`}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="p-1 rounded-lg bg-destructive/90 text-destructive-foreground hover:bg-destructive shadow cursor-pointer transition-transform hover:scale-110"
                    title="Hapus Gambar"
                  >
                    <X className="size-3" />
                  </button>
                </div>

                {/* Reorder buttons */}
                <div className="relative z-10 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => handleMoveUp(idx)}
                      className="p-1 rounded-md bg-background/90 text-foreground hover:bg-muted border border-border shadow cursor-pointer"
                      title="Pindahkan ke Kiri / Atas"
                    >
                      <ArrowUp className="size-3" />
                    </button>
                  )}
                  {idx < imagePaths.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleMoveDown(idx)}
                      className="p-1 rounded-md bg-background/90 text-foreground hover:bg-muted border border-border shadow cursor-pointer"
                      title="Pindahkan ke Kanan / Bawah"
                    >
                      <ArrowDown className="size-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
