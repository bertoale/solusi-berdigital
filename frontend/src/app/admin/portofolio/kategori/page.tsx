import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getAllPortfolioCategories } from "@/lib/data-store";
import {
  createPortfolioCategoryAction,
  deletePortfolioCategoryAction,
} from "@/lib/actions";
import {
  FolderTree,
  Plus,
  Trash2,
  Edit,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminPortfolioCategoriesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const categories = await getAllPortfolioCategories();

  return (
    <div className="max-w-5xl space-y-8">
      {/* Header Bar */}
      <div>
        <Link
          href="/admin/portofolio"
          className="theme-btn inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground px-3.5 py-1.5 rounded-xl bg-card border border-border mb-4 transition-all"
        >
          <ArrowLeft className="size-3.5" />
          <span>Kembali ke Portofolio</span>
        </Link>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="theme-text text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
              <FolderTree className="size-7 text-primary" />
              <span>Kelola Kategori Portofolio</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Kelola kategori / klasifikasi proyek studi kasus yang ditampilkan di website publik.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Create Form */}
        <div className="lg:col-span-5 theme-card bg-card/95 backdrop-blur-md p-6 space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Plus className="size-4 text-primary" />
            <h2 className="theme-text font-bold text-sm text-foreground">
              Tambah Kategori Portofolio Baru
            </h2>
          </div>

          <form action={createPortfolioCategoryAction} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                Nama Kategori *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Contoh: Aplikasi Mobile iOS & Android"
                className="w-full h-11 px-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                Slug URL (Opsional)
              </label>
              <input
                type="text"
                name="slug"
                placeholder="aplikasi-mobile (otomatis jika kosong)"
                className="w-full h-11 px-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-mono rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                Urutan Tampil (Order)
              </label>
              <input
                type="number"
                name="order"
                defaultValue={categories.length}
                className="w-full h-11 px-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                Deskripsi Singkat (Opsional)
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Deskripsi tujuan kategori ini..."
                className="w-full p-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-xs theme-btn inline-flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Plus className="size-4" />
              <span>Simpan Kategori Portofolio</span>
            </Button>
          </form>
        </div>

        {/* Right Column: Categories Table */}
        <div className="lg:col-span-7 theme-card bg-card overflow-hidden">
          <div className="p-4.5 bg-muted/60 border-b border-border flex items-center justify-between">
            <span className="font-bold text-xs text-foreground uppercase tracking-wider">
              Daftar Kategori Aktif ({categories.length})
            </span>
          </div>

          <div className="divide-y divide-border">
            {categories.map((cat) => {
              const deleteActionWithId = deletePortfolioCategoryAction.bind(null, cat.id);

              return (
                <div
                  key={cat.id}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-muted/40 transition-colors"
                >
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="theme-pill px-2 py-0.5 bg-primary/10 text-primary font-mono text-[10px] font-bold">
                        #{cat.order}
                      </span>
                      <h3 className="font-bold text-sm text-foreground">{cat.name}</h3>
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground truncate">
                      Slug: /{cat.slug}
                    </div>
                    {cat.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 pt-0.5">
                        {cat.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                    <Link
                      href={`/admin/portofolio/kategori/${cat.id}/edit`}
                      className="p-2 rounded-lg bg-card border border-border text-foreground hover:bg-muted font-bold transition-all theme-btn"
                      title="Edit Kategori"
                    >
                      <Edit className="size-3.5" />
                    </Link>

                    <form action={deleteActionWithId}>
                      <button
                        type="submit"
                        title="Hapus Kategori"
                        className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground border border-destructive/20 font-bold transition-all cursor-pointer"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
