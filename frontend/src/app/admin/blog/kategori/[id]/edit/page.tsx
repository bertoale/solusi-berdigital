import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getBlogCategoryById } from "@/lib/data-store";
import { updateBlogCategoryAction } from "@/lib/actions";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogCategoryEditPage({ params }: Props) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const category = await getBlogCategoryById(id);

  if (!category) {
    notFound();
  }

  const updateActionWithId = updateBlogCategoryAction.bind(null, category.id);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href="/admin/blog/kategori"
          className="theme-btn inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground px-3.5 py-1.5 rounded-xl bg-card border border-border mb-4 transition-all"
        >
          <ArrowLeft className="size-3.5" />
          <span>Kembali ke Daftar Kategori Blog</span>
        </Link>
        <h1 className="theme-text text-2xl font-extrabold tracking-tight text-foreground">
          Edit Kategori Blog: {category.name}
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Perbarui nama, slug, dan deskripsi kategori blog.
        </p>
      </div>

      <form action={updateActionWithId} className="theme-card bg-card/95 backdrop-blur-md p-6 sm:p-8 space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground uppercase tracking-wide">
            Nama Kategori *
          </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={category.name}
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
            defaultValue={category.slug}
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
            defaultValue={category.order}
            className="w-full h-11 px-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground uppercase tracking-wide">
            Deskripsi Singkat (Opsional)
          </label>
          <textarea
            name="description"
            rows={4}
            defaultValue={category.description || ""}
            placeholder="Deskripsi tujuan kategori ini..."
            className="w-full p-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
          />
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
          <Link
            href="/admin/blog/kategori"
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
      </form>
    </div>
  );
}
