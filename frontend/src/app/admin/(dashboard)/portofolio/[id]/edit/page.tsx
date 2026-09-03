import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getPortfolioById, getAllPortfolioCategories } from "@/lib/data-store";
import { updatePortfolioAction } from "@/lib/actions";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioImagesUploader } from "@/components/portfolio-images-uploader";
import { AdminForm } from "@/components/admin/admin-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminPortofolioEditPage({ params }: Props) {
  const session = await getAdminSession();
  if (!session) redirect("/login");

  const { id } = await params;
  const item = await getPortfolioById(id);

  if (!item) {
    notFound();
  }

  const categories = await getAllPortfolioCategories();
  const updateActionWithId = updatePortfolioAction.bind(null, item.id);

  const initialImagePaths = (item.images || []).map((img) => img.imagePath);

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/portofolio"
          className="theme-btn inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground px-3.5 py-1.5 rounded-xl bg-card border border-border mb-4 transition-all"
        >
          <ArrowLeft className="size-3.5" />
          <span>Kembali ke Daftar Portofolio</span>
        </Link>
        <h1 className="theme-text text-2xl font-extrabold tracking-tight text-foreground">
          Edit Portofolio: {item.title}
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Perbarui rincian proyek, deskripsi singkat, penjelasan lengkap, upload galeri screenshot ke S3, dan URL live demo jika tersedia.
        </p>
      </div>

      {/* Edit Form */}
      <AdminForm
        action={updateActionWithId}
        successMessage="Portofolio berhasil diperbarui"
        loadingMessage="Menyimpan perubahan..."
        redirectUrl="/admin/portofolio"
        className="theme-card bg-card/95 backdrop-blur-md p-6 sm:p-8 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Judul Proyek *
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={item.title}
              className="w-full h-11 px-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Nama Klien / Perusahaan *
            </label>
            <input
              type="text"
              name="clientName"
              required
              defaultValue={item.clientName}
              className="w-full h-11 px-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Tipe Industri Klien *
            </label>
            <input
              type="text"
              name="clientType"
              required
              defaultValue={item.clientType}
              className="w-full h-11 px-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Slug URL *
            </label>
            <input
              type="text"
              name="slug"
              required
              defaultValue={item.slug}
              className="w-full h-11 px-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-mono rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                Kategori Portofolio *
              </label>
              <Link
                href="/admin/portofolio/kategori"
                className="text-[11px] font-bold text-primary hover:underline"
              >
                + Kelola Kategori
              </Link>
            </div>
            <select
              name="category"
              defaultValue={item.category}
              className="w-full h-11 px-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* URL Website / Live Demo */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              URL Website / Live Demo (Opsional)
            </label>
            <input
              type="url"
              name="liveUrl"
              defaultValue={item.liveUrl || ""}
              placeholder="https://contoh-klien.com"
              className="w-full h-11 px-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-mono rounded-xl"
            />
          </div>

          {/* Uploader Gambar Multi-Screenshot */}
          <div className="space-y-1.5 sm:col-span-2">
            <PortfolioImagesUploader
              initialImagePaths={initialImagePaths}
              name="imagePaths"
            />
          </div>

          {/* Tipe Mockup Frame */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Tipe Mockup Frame Tampilan Utama
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-4 theme-card bg-card/60 cursor-pointer rounded-xl hover:bg-muted/40 transition-all">
                <input
                  type="radio"
                  name="mockupType"
                  value="browser"
                  defaultChecked={item.mockupType === "browser" || !item.mockupType}
                  className="text-primary focus:ring-primary"
                />
                <div>
                  <span className="text-xs font-bold text-foreground block">Browser Mockup (Desktop)</span>
                  <span className="text-[11px] text-muted-foreground block">
                    Cocok untuk Company Profile, Landing Page, dan Toko Online
                  </span>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 theme-card bg-card/60 cursor-pointer rounded-xl hover:bg-muted/40 transition-all">
                <input
                  type="radio"
                  name="mockupType"
                  value="app"
                  defaultChecked={item.mockupType === "app"}
                  className="text-primary focus:ring-primary"
                />
                <div>
                  <span className="text-xs font-bold text-foreground block">App / POS Window</span>
                  <span className="text-[11px] text-muted-foreground block">
                    Cocok untuk Sistem POS Kasir, Dashboard Web App, dan Software
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Deskripsi Singkat */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Deskripsi Singkat (Ringkasan Cuplikan) *
            </label>
            <textarea
              name="description"
              required
              rows={2}
              defaultValue={item.description}
              className="w-full p-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
            />
          </div>

          {/* Deskripsi Biasa / Lengkap */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Deskripsi Biasa / Penjelasan Lengkap Proyek *
            </label>
            <textarea
              name="fullDescription"
              required
              rows={6}
              defaultValue={item.fullDescription}
              className="w-full p-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium leading-relaxed rounded-xl"
            />
          </div>

          {/* Fitur / Standar Implementasi */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Fitur & Standar Teknologi (1 per baris) *
            </label>
            <textarea
              name="features"
              required
              rows={3}
              defaultValue={item.features.join("\n")}
              className="w-full p-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-mono text-xs rounded-xl"
            />
          </div>

          <div className="sm:col-span-2 flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              defaultChecked={item.isPublished}
              className="size-4.5 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="isPublished" className="text-xs font-bold text-foreground cursor-pointer">
              Tampilkan di halaman galeri publik
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex items-center justify-end gap-3">
          <Link
            href="/admin/portofolio"
            className="theme-btn px-5 h-11 rounded-xl bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold text-xs inline-flex items-center justify-center transition-colors"
          >
            Batal
          </Link>
          <Button
            type="submit"
            className="theme-btn px-6 h-11 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <Save className="size-4" />
            <span>Simpan Perubahan</span>
          </Button>
        </div>
      </AdminForm>
    </div>
  );
}
