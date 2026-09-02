import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getBlogById, getAllBlogCategories } from "@/lib/data-store";
import { updateBlogAction } from "@/lib/actions";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiptapEditor } from "@/components/tiptap-editor";
import { SingleImageUploader } from "@/components/single-image-uploader";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogEditPage({ params }: Props) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  const categories = await getAllBlogCategories();
  const updateActionWithId = updateBlogAction.bind(null, blog.id);

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/blog"
          className="theme-btn inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground px-3.5 py-1.5 rounded-xl bg-card border border-border mb-4 transition-all"
        >
          <ArrowLeft className="size-3.5" />
          <span>Kembali ke Daftar Artikel</span>
        </Link>
        <h1 className="theme-text text-2xl font-extrabold tracking-tight text-foreground">
          Edit Artikel: {blog.title}
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Perbarui cover gambar S3, teks konten menggunakan rich text editor Tiptap, ringkasan, atau status tayang artikel ini.
        </p>
      </div>

      {/* Edit Form */}
      <form action={updateActionWithId} className="theme-card bg-card/95 backdrop-blur-md p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Judul Artikel *
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={blog.title}
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
              defaultValue={blog.slug}
              className="w-full h-11 px-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-mono rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                Kategori Artikel *
              </label>
              <Link
                href="/admin/blog/kategori"
                className="text-[11px] font-bold text-primary hover:underline"
              >
                + Kelola Kategori
              </Link>
            </div>
            <select
              name="category"
              defaultValue={blog.category}
              className="w-full h-11 px-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Penulis (Author)
            </label>
            <input
              type="text"
              name="author"
              defaultValue={blog.author}
              className="w-full h-11 px-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
            />
          </div>

          {/* S3 Single Image Uploader for Blog Cover */}
          <div className="space-y-1.5 sm:col-span-2">
            <SingleImageUploader
              name="imagePath"
              folder="blog"
              initialImagePath={blog.imagePath}
              label="Gambar Cover / Thumbnail Artikel (Upload ke S3)"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Ringkasan / Excerpt *
            </label>
            <textarea
              name="excerpt"
              required
              rows={2}
              defaultValue={blog.excerpt}
              className="w-full p-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
            />
          </div>

          {/* Tiptap Rich Text Editor */}
          <div className="space-y-1.5 sm:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                Konten Lengkap Artikel (Tiptap Rich Text Editor) *
              </label>
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Sparkles className="size-3 text-primary" />
                Estimasi waktu baca dihitung otomatis
              </span>
            </div>
            <TiptapEditor
              name="content"
              initialContent={blog.content}
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Tags (Pisahkan dengan koma)
            </label>
            <input
              type="text"
              name="tags"
              defaultValue={blog.tags?.join(", ") || ""}
              className="w-full h-11 px-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
            />
          </div>

          <div className="sm:col-span-2 flex items-center gap-2.5 pt-2">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              defaultChecked={blog.isPublished}
              className="size-4.5 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="isPublished" className="text-xs font-bold text-foreground cursor-pointer">
              Tampilkan artikel ini di halaman blog publik
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex items-center justify-end gap-3">
          <Link
            href="/admin/blog"
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
