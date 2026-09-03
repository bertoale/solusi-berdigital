import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getAllBlogs } from "@/lib/data-store";
import { deleteBlogAction } from "@/lib/actions";
import {
  BookOpen,
  Plus,
  Pencil,
  ExternalLink,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { AdminDeleteButton } from "@/components/admin/admin-delete-button";

export default async function AdminBlogListPage() {
  const session = await getAdminSession();
  if (!session) redirect("/login");

  const blogs = await getAllBlogs();

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary theme-inset">
              <BookOpen className="size-5" />
            </div>
            <h1 className="theme-text text-2xl font-extrabold tracking-tight text-foreground">
              Manajemen Artikel Blog & Edukasi
            </h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Kelola artikel tips digital marketing, panduan website UMKM, dan konten SEO.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="theme-btn inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-xs sm:text-sm px-5 h-11 rounded-xl shrink-0"
        >
          <Plus className="size-4" />
          <span>Tulis Artikel Baru</span>
        </Link>
      </div>

      {/* Blogs Table in Claymorphism */}
      <div className="theme-card bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/60 border-b border-border text-muted-foreground font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Judul Artikel</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Penulis</th>
                <th className="px-6 py-4">Tanggal Tayang</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4 font-semibold text-foreground">
                    <div className="space-y-0.5 max-w-sm">
                      <div className="font-bold text-sm text-foreground line-clamp-1">{blog.title}</div>
                      <div className="font-mono text-[11px] text-muted-foreground">/blog/{blog.slug}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="theme-pill px-3 py-1 bg-primary/10 text-primary font-bold text-[10px] border border-primary/20">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">{blog.author}</td>
                  <td className="px-6 py-4 text-muted-foreground font-mono text-[11px]">
                    {blog.publishedAt
                      ? new Date(blog.publishedAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {blog.isPublished ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                        <CheckCircle2 className="size-3.5" />
                        Terbit
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground font-bold text-[11px]">
                        <XCircle className="size-3.5" />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        title="Lihat Artikel Publik"
                        className="theme-btn p-2 rounded-xl bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="size-3.5" />
                      </Link>
                      <Link
                        href={`/admin/blog/${blog.id}/edit`}
                        title="Edit Artikel"
                        className="theme-btn p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <Pencil className="size-3.5" />
                      </Link>
                      <AdminDeleteButton
                        action={deleteBlogAction.bind(null, blog.id)}
                        itemTitle={blog.title}
                        title="Hapus Artikel"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
