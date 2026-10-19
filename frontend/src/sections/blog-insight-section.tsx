import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogs } from "@/lib/data-store";
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

export async function BlogInsightSection() {
  const blogs = await getAllBlogs({ onlyPublished: true });
  const recentBlogs = blogs.slice(0, 3);

  // Jika belum ada artikel, tidak menampilkan section atau bisa kosong
  if (recentBlogs.length === 0) {
    return null;
  }

  return (
    <section
      className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-background via-primary/[0.025] to-background border-b border-border/60 relative overflow-hidden bg-noise"
      id="blog"
    >
      {/* Background Lighting & Dot Matrix */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-[550px] h-[500px] rounded-full bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent blur-[140px]" />
        <div className="absolute bottom-1/4 -left-20 w-[500px] h-[450px] rounded-full bg-gradient-to-tr from-warning/10 via-primary/5 to-transparent blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 theme-pill bg-card text-foreground border border-border text-xs font-bold tracking-wide">
              <Sparkles className="size-3.5 text-primary" />
              <span>BLOG & INSIGHT BISNIS</span>
            </div>

            <h2 className="theme-text text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Wawasan & Tips Praktis untuk{" "}
              <span className="theme-text-primary text-primary">Bisnis Digital</span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Kumpulan artikel edukatif seputar optimasi website, digital marketing, sistem kasir, dan strategi menumbuhkan omzet bisnis secara terukur.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/blog"
              className="theme-btn inline-flex items-center gap-2 bg-card hover:bg-muted/70 text-foreground border border-border font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all group"
            >
              <span>Lihat Semua Artikel</span>
              <ArrowRight className="size-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 3 Recent Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {recentBlogs.map((item) => (
            <article
              key={item.id}
              className="theme-card bg-card/95 backdrop-blur-md p-6 flex flex-col justify-between group space-y-4 border border-border/80 hover:border-primary/40 transition-colors"
            >
              <div className="space-y-4">
                {/* Thumbnail Image */}
                {item.imagePath ? (
                  <Link
                    href={`/blog/${item.slug}`}
                    className="block relative w-full aspect-[16/10] rounded-xl overflow-hidden theme-inset bg-muted/40 border border-border/80 group/thumb"
                  >
                    <Image
                      src={getPublicImageUrl(item.imagePath)}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    />
                  </Link>
                ) : (
                  <Link
                    href={`/blog/${item.slug}`}
                    className="flex items-center justify-center aspect-[16/10] rounded-xl overflow-hidden theme-inset bg-muted/30 border border-border/80 p-6 text-muted-foreground group/thumb"
                  >
                    <div className="text-center space-y-2">
                      <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary theme-card-flat">
                        <BookOpen className="size-6" />
                      </div>
                      <span className="text-xs font-semibold text-foreground block">
                        Solusi Berdigital
                      </span>
                    </div>
                  </Link>
                )}

                {/* Category & Reading Time */}
                <div className="flex items-center justify-between gap-2">
                  <span className="theme-pill text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-primary/10 text-primary border border-primary/15">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    <Clock className="size-3 text-primary" />
                    {calculateReadingTime(item.content)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="theme-text text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug">
                  <Link href={`/blog/${item.slug}`}>
                    {item.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 3).map((tag, idx) => (
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

              {/* Footer Meta */}
              <div className="pt-4 border-t border-border/70 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <User className="size-3.5 text-primary" />
                  <span>{item.author}</span>
                </div>
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
      </div>
    </section>
  );
}
