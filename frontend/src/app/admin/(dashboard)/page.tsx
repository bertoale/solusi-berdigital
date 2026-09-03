import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getAllPortfolios, getAllBlogs } from "@/lib/data-store";
import {
  Briefcase,
  BookOpen,
  Plus,
  ArrowRight,
  ShieldCheck,
  Database,
  ExternalLink,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/login");
  }

  const portfolios = await getAllPortfolios();
  const blogs = await getAllBlogs();

  const stats = [
    {
      title: "Total Portofolio",
      count: portfolios.length,
      published: portfolios.filter((p) => p.isPublished).length,
      href: "/admin/portofolio",
      addHref: "/admin/portofolio/new",
      icon: Briefcase,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Artikel Blog & Edukasi",
      count: blogs.length,
      published: blogs.filter((b) => b.isPublished).length,
      href: "/admin/blog",
      addHref: "/admin/blog/new",
      icon: BookOpen,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="max-w-6xl space-y-8">
      {/* Welcome Banner */}
      <div className="theme-card bg-gradient-to-r from-card via-card to-primary/5 p-6 sm:p-8 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3.5 py-1 theme-pill border border-emerald-500/20">
            <ShieldCheck className="size-3.5" />
            <span>Sistem CMS Aktif</span>
          </div>
          <h1 className="theme-text text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Selamat Datang, {session.name}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal">
            Kelola data portofolio studi kasus dan artikel edukasi bisnis Solusi Berdigital dari sini.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="theme-btn inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold text-xs px-4.5 h-11 rounded-xl border border-border transition-colors"
          >
            <span>Buka Website Publik</span>
            <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={i}
              className="theme-card bg-card p-6 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className={`size-13 rounded-2xl ${st.bg} flex items-center justify-center ${st.color} theme-inset`}>
                  <Icon className="size-6" />
                </div>
                <Link
                  href={st.addHref}
                  className="theme-pill px-3 py-1 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <Plus className="size-3.5" />
                  <span>Tambah Baru</span>
                </Link>
              </div>

              <div>
                <span className="text-xs font-bold text-muted-foreground block">{st.title}</span>
                <div className="theme-text text-3xl font-extrabold text-foreground tracking-tight mt-0.5">
                  {st.count}
                </div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  {st.published} Item Tayang Aktif
                </span>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <Link
                  href={st.href}
                  className="text-xs font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>Kelola Semua Data</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Database Guidance Card */}
      <div className="theme-card bg-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary theme-inset">
            <Database className="size-5" />
          </div>
          <div>
            <h2 className="theme-text text-base sm:text-lg font-bold text-foreground">
              Status Database & Environment (MySQL Drizzle ORM)
            </h2>
            <p className="text-xs text-muted-foreground">
              Mock repository aktif. Skema Drizzle ORM MySQL siap di <code className="text-primary font-mono text-[11px] font-bold">src/db/schema.ts</code>. Halaman Layanan bersifat statis.
            </p>
          </div>
        </div>

        <div className="p-5 theme-inset bg-muted/40 border border-border/80 text-xs text-muted-foreground space-y-2 rounded-2xl">
          <p className="font-bold text-foreground">
            Langkah saat ingin menghubungkan database MySQL:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-foreground/85 font-medium">
            <li>Pastikan variabel <code className="text-primary font-mono font-bold">DB_NAME</code>, <code className="text-primary font-mono font-bold">DB_HOST</code>, <code className="text-primary font-mono font-bold">DB_PORT</code>, <code className="text-primary font-mono font-bold">DB_USERNAME</code>, dan <code className="text-primary font-mono font-bold">DB_PASSWORD</code> di <code className="text-primary font-mono font-bold">.env.local</code> telah sesuai dengan container MySQL.</li>
            <li>Jalankan migrasi skema tabel Drizzle ORM.</li>
            <li>Seluruh CRUD Portofolio, Blog, dan REST API akan otomatis tersimpan di database MySQL Anda.</li>
          </ol>
        </div>
      </div>

      {/* Recent Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Portfolios */}
        <div className="theme-card bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="theme-text font-bold text-sm text-foreground">Portofolio Terkini</h3>
            <Link href="/admin/portofolio" className="text-xs text-primary font-bold hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="space-y-2">
            {portfolios.length > 0 ? (
              portfolios.slice(0, 4).map((port) => (
                <div
                  key={port.id}
                  className="p-3.5 theme-inset bg-muted/30 border border-border/70 flex items-center justify-between gap-3 text-xs rounded-xl"
                >
                  <div className="overflow-hidden">
                    <span className="font-bold text-foreground block truncate">{port.title}</span>
                    <span className="text-[11px] text-muted-foreground font-mono">{port.category}</span>
                  </div>
                  <Link
                    href={`/admin/portofolio/${port.id}/edit`}
                    className="theme-btn px-3 py-1.5 rounded-lg bg-card border border-border text-foreground hover:bg-muted font-bold shrink-0"
                  >
                    Edit
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-muted-foreground theme-inset bg-muted/20 border border-border/60 rounded-xl">
                Belum ada portofolio. Klik &quot;+ Tambah Baru&quot; di atas untuk membuat.
              </div>
            )}
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="theme-card bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="theme-text font-bold text-sm text-foreground">Artikel Blog Terkini</h3>
            <Link href="/admin/blog" className="text-xs text-primary font-bold hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="space-y-2">
            {blogs.length > 0 ? (
              blogs.slice(0, 4).map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 theme-inset bg-muted/30 border border-border/70 flex items-center justify-between gap-3 text-xs rounded-xl"
                >
                  <div className="overflow-hidden">
                    <span className="font-bold text-foreground block truncate">{b.title}</span>
                    <span className="text-[11px] text-muted-foreground font-mono">{b.category}</span>
                  </div>
                  <Link
                    href={`/admin/blog/${b.id}/edit`}
                    className="theme-btn px-3 py-1.5 rounded-lg bg-card border border-border text-foreground hover:bg-muted font-bold shrink-0"
                  >
                    Edit
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-muted-foreground theme-inset bg-muted/20 border border-border/60 rounded-xl">
                Belum ada artikel. Klik &quot;+ Tambah Baru&quot; di atas untuk menulis artikel.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
