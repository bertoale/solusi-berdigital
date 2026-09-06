"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { UploadCloud, X, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import { getPublicImageUrl } from "@/lib/s3";

interface ImageItem {
  id: string;
  isNew: boolean;
  file?: File;
  previewUrl: string;
  serverPath?: string;
}

interface PortfolioImagesUploaderProps {
  initialImagePaths?: string[];
  name?: string;
}

export function PortfolioImagesUploader({
  initialImagePaths = [],
  name = "imagePaths",
}: PortfolioImagesUploaderProps) {
  const [items, setItems] = useState<ImageItem[]>(() =>
    initialImagePaths.map((path, idx) => ({
      id: `init-${idx}-${path}`,
      isNew: false,
      previewUrl: getPublicImageUrl(path),
      serverPath: path,
    }))
  );
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Bersihkan object URLs blob saat unmount
  useEffect(() => {
    return () => {
      items.forEach((item) => {
        if (item.previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
    };
  }, [items]);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErrorMsg(null);
    setIsCompressing(true);

    try {
      const newItems: ImageItem[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setStatusText(`Mengompresi gambar ${i + 1} dari ${files.length}...`);

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

        const blobUrl = URL.createObjectURL(compressedBlob);
        newItems.push({
          id: `new-${Date.now()}-${i}`,
          isNew: true,
          file: webpFile,
          previewUrl: blobUrl,
        });
      }

      setItems((prev) => [...prev, ...newItems]);
    } catch (err: unknown) {
      console.error("Multi compress error:", err);
      setErrorMsg(err instanceof Error ? err.message : "Gagal memproses beberapa gambar");
    } finally {
      setIsCompressing(false);
      setStatusText("");
      e.target.value = "";
    }
  };

  const handleRemove = (index: number) => {
    setItems((prev) => {
      const target = prev[index];
      if (target?.previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setItems((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    setItems((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  // Upload gambar ke S3 saat form disubmit
  useEffect(() => {
    const inputEl = hiddenInputRef.current;
    if (!inputEl) return;
    const form = inputEl.closest("form");
    if (!form) return;

    const onFormSubmit = async (e: Event) => {
      // Ambil judul atau slug dari form untuk nama file SEO
      const formData = new FormData(form);
      const title = (formData.get("title") as string)?.trim();
      const slug = (formData.get("slug") as string)?.trim();
      const seoBase = slug || title || "portofolio";

      const hasNewFiles = items.some((item) => item.isNew && item.file);
      if (!hasNewFiles) {
        // Hanya path lama yang sudah ada di S3
        const finalPaths = items.map((it) => it.serverPath).filter(Boolean);
        if (hiddenInputRef.current) {
          hiddenInputRef.current.value = finalPaths.join("\n");
        }
        return;
      }

      setIsUploading(true);
      setErrorMsg(null);

      try {
        const finalPaths: string[] = [];

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (!item.isNew && item.serverPath) {
            finalPaths.push(item.serverPath);
          } else if (item.isNew && item.file) {
            setStatusText(`Mengupload gambar ${i + 1} dari ${items.length} ke S3...`);
            const uploadData = new FormData();
            uploadData.append("file", item.file);
            uploadData.append("folder", "portofolio");
            // Buat nama SEO dengan indeks screenshot
            uploadData.append("customName", `${seoBase}-screenshot-${i + 1}`);

            const res = await fetch("/api/upload", {
              method: "POST",
              body: uploadData,
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
              throw new Error(data.error || `Gagal mengupload gambar ke-${i + 1}`);
            }

            finalPaths.push(data.imagePath);
          }
        }

        if (hiddenInputRef.current) {
          hiddenInputRef.current.value = finalPaths.join("\n");
        }
      } catch (err: unknown) {
        console.error("Upload error on submit:", err);
        const msg = err instanceof Error ? err.message : "Gagal mengupload gambar ke S3";
        setErrorMsg(msg);
        e.preventDefault();
        e.stopPropagation();
        throw err;
      } finally {
        setIsUploading(false);
        setStatusText("");
      }
    };

    form.addEventListener("submit", onFormSubmit, true);
    return () => {
      form.removeEventListener("submit", onFormSubmit, true);
    };
  }, [items]);

  // Current value string untuk hidden input fallback
  const currentVal = items
    .map((it) => it.serverPath)
    .filter(Boolean)
    .join("\n");

  return (
    <div className="space-y-4">
      {/* Hidden input passing newline-separated paths to Server Actions */}
      <input ref={hiddenInputRef} type="hidden" name={name} value={currentVal} />

      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-foreground uppercase tracking-wide">
          Galeri Screenshot Portofolio ({items.length} Gambar)
        </label>
        <span className="text-[11px] text-muted-foreground">
          Gambar urutan #1 otomatis menjadi thumbnail kartu
        </span>
      </div>

      {/* Upload Dropzone */}
      <label className="theme-card-flat border-2 border-dashed border-border hover:border-primary/60 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-center cursor-pointer transition-colors bg-card/60 hover:bg-muted/40">
        <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary theme-card-flat">
          {isCompressing || isUploading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <UploadCloud className="size-6" />
          )}
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-foreground block">
            {isCompressing
              ? statusText || "Mengompresi Gambar..."
              : isUploading
              ? statusText || "Mengupload ke S3..."
              : "Klik / Drag untuk Tambah Gambar Screenshot"}
          </span>
          <p className="text-[11px] text-muted-foreground">
            Bisa pilih banyak gambar sekaligus. Otomatis dikompresi ke <span className="font-mono text-primary font-bold">.webp</span>. Nama file akan otomatis memakai <span className="text-primary font-bold">Judul Portofolio (SEO)</span> saat Anda klik Simpan.
          </p>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          disabled={isCompressing || isUploading}
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
      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
          {items.map((item, idx) => {
            const isFirst = idx === 0;

            return (
              <div
                key={item.id}
                className="group relative aspect-[16/10] rounded-xl overflow-hidden theme-inset bg-muted/40 border border-border flex flex-col justify-between p-2"
              >
                <Image
                  src={item.previewUrl}
                  alt={`Screenshot ${idx + 1}`}
                  fill
                  unoptimized={item.previewUrl.startsWith("blob:")}
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

                {/* Status upload pending / ready */}
                <div className="relative z-10 flex items-center justify-between gap-1">
                  {item.isNew && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/90 text-white font-mono text-[9px] font-bold">
                      Pending Submit
                    </span>
                  )}

                  {/* Reorder buttons */}
                  <div className="flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
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
                    {idx < items.length - 1 && (
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
