import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getAllBlogs, getAllBlogCategories } from "@/lib/data-store";
import { calculateReadingTime } from "@/lib/reading-time";
import { getPublicImageUrl } from "@/lib/s3";
import {
  BookOpen,
  Clock,
  ArrowRight,
  User,
  Sparkles,
  Tag,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Wawasan Bisnis Digital | Solusi Berdigital",
  description:
    "Kumpulan artikel, tips digital marketing, panduan website UMKM, strategi katalog WhatsApp, dan efisiensi sistem kasir POS.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category = "all", q } = await searchParams;
  const blogs = await getAllBlogs({
    onlyPublished: true,
    category: category === "all" ? undefined : category,
    searchQuery: q,
  });

  const dbCategories = await getAllBlogCategories();
  const categoryPills = [
    { label: "Semua Topik", value: "all" },
    ...dbCategories.map((c) => ({ label: c.name, value: c.slug })),
  ];

  const featured = blogs[0];
  const regularBlogs = blogs.slice(1);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden bg-noise">
      {/* Background Ambient Glow & Dot Matrix */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute top-10 right-1/4 w-[600px] h-[450px] bg-primary/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-warning/15 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      {/* Hero Header */}
      <section className="relative py-16 sm:py-20 lg:py-24 border-b border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 theme-pill bg-card text-foreground border border-border text-xs font-bold tracking-wide">
              <BookOpen className="size-3.5 text-primary" />
              <span>EDUKASI & WAWASAN DIGITAL BISNIS</span>
            </div>
            <h1 className="theme-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-balance leading-tight">
              Panduan Praktis Mengembangkan{" "}
              <span className="theme-text-primary text-primary">Usaha di Era Digital</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-balance">
              Pelajari strategi optimasi website, tips meningkatkan penjualan WhatsApp tanpa biaya komisi, hingga cara mengotomatiskan pembukuan kasir UMKM.
            </p>
          </div>
        </div>
      </section>

      {/* Main Blog Section */}
      <section className="py-12 sm:py-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-12">
          
          {/* Dynamic Category Filter Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-3">
            {categoryPills.map((cat) => {
              const isActive = (category || "all").toLowerCase() === cat.value.toLowerCase();
              return (
                <Link
                  key={cat.value}
                  href={`/blog?category=${cat.value}`}
                  className={`px-5 py-2.5 theme-pill text-xs sm:text-sm font-bold transition-all border shrink-0 ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary theme-btn"
                      : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>

          {/* Featured Article Card */}
          {featured && (
            <div className="theme-card bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-10 border border-primary/20 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="theme-pill text-xs font-bold uppercase tracking-wider px-3.5 py-1 bg-primary/10 text-primary border border-primary/20">
                      {featured.category}
                    </span>
                    <span className="theme-pill inline-flex items-center gap-1 text-xs font-bold px-3 py-1 bg-warning/20 text-warning border border-warning/40">
                      <Sparkles className="size-3 fill-current" />
                      <span>Artikel Pilihan</span>
                    </span>
                  </div>

                  <h2 className="theme-text text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                    <Link href={`/blog/${featured.slug}`}>
                      {featured.title}
                    </Link>
                  </h2>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3 font-normal">
                    {featured.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2">
                    <div className="flex items-center gap-1.5 font-semibold text-foreground">
                      <User className="size-3.5 text-primary" />
                      <span>{featured.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-primary" />
                      <span>{calculateReadingTime(featured.content)}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="theme-btn inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-xs sm:text-sm px-6 h-11 rounded-xl transition-all"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Visual Image / Badge */}
                <div className="lg:col-span-5">
                  {featured.imagePath ? (
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="block relative w-full aspect-[16/10] rounded-2xl overflow-hidden theme-inset bg-muted/40 border border-border/80 group/thumb"
                    >
                      <Image
                        src={getPublicImageUrl(featured.imagePath)}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                        sizes="(max-width: 1024px) 100vw, 450px"
                      />
                    </Link>
                  ) : (
                    <div className="flex items-center justify-center p-8 theme-inset bg-muted/40 border border-border/80 rounded-2xl">
                      <div className="text-center space-y-3">
                        <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary theme-card-flat">
                          <BookOpen className="size-8" />
                        </div>
                        <span className="theme-text text-sm font-bold text-foreground block">Panduan Komprehensif</span>
                        <p className="text-xs text-muted-foreground">Strategi praktis & teruji untuk mempercepat pertumbuhan bisnis</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Grid of Other Articles */}
          {regularBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularBlogs.map((item) => (
                <article
                  key={item.id}
                  className="theme-card bg-card/95 backdrop-blur-md p-6 flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-4">
                    {/* Optional Card Cover Thumbnail */}
                    {item.imagePath && (
                      <Link
                        href={`/blog/${item.slug}`}
                        className="block relative w-full aspect-[16/10] rounded-xl overflow-hidden theme-inset bg-muted/40 border border-border/80 group/thumb"
                      >
                        <Image
                          src={getPublicImageUrl(item.imagePath)}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                          sizes="(max-width: 768px) 100vw, 350px"
                        />
                      </Link>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <span className="theme-pill text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-primary/10 text-primary border border-primary/15">
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                        <Clock className="size-3" />
                        {calculateReadingTime(item.content)}
                      </span>
                    </div>

                    <h3 className="theme-text text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug">
                      <Link href={`/blog/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-lg bg-muted text-muted-foreground border border-border/60"
                          >
                            <Tag className="size-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-5 border-t border-border/70 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">
                      Oleh: {item.author}
                    </span>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform"
                    >
                      <span>Baca Artikel</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            !featured && (
              <div className="p-12 sm:p-16 text-center theme-card bg-card/80 border border-border space-y-3 max-w-xl mx-auto">
                <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary theme-card-flat">
                  <BookOpen className="size-7" />
                </div>
                <h3 className="theme-text text-lg font-bold text-foreground">
                  Belum Ada Artikel Blog
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Artikel wawasan dan edukasi bisnis sedang dipersiapkan. Tulis dan publikasikan artikel baru melalui dashboard Admin.
                </p>
              </div>
            )
          )}

        </div>
      </section>
    </div>
  );
}
