import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getAllPortfolios, getAllPortfolioCategories } from "@/lib/data-store";
import { getPublicImageUrl } from "@/lib/s3";
import {
  Briefcase,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Portofolio & Hasil Pengerjaan | Solusi Berdigital",
  description:
    "Jelajahi galeri hasil pembuatan website, company profile, toko online katalog WhatsApp, dan sistem POS kasir yang telah kami kembangkan untuk klien di Indonesia.",
};

export default async function PortofolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = "all" } = await searchParams;
  const portfolios = await getAllPortfolios({
    onlyPublished: true,
    category: category === "all" ? undefined : category,
  });

  const dbCategories = await getAllPortfolioCategories();
  const categoryPills = [
    { label: "Semua Proyek", value: "all" },
    ...dbCategories.map((c) => ({ label: c.name, value: c.slug })),
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden bg-noise">
      {/* Background Ambient Glow & Dot Matrix */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute top-10 right-1/3 w-[600px] h-[450px] bg-primary/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-warning/15 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      {/* Hero Header */}
      <section className="relative py-16 sm:py-20 lg:py-24 border-b border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 theme-pill bg-card text-foreground border border-border text-xs font-bold tracking-wide">
              <Briefcase className="size-3.5 text-primary" />
              <span>GALERI PROYEK & HASIL PENGERJAAN NYATA</span>
            </div>
            <h1 className="theme-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-balance leading-tight">
              Karya Nyata yang Membantu{" "}
              <span className="theme-text-primary text-primary">Bisnis Klien Bertumbuh</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-balance">
              Setiap website dirancang unik sesuai model bisnis klien. Lihat bagaimana kami memadukan kecepatan akses, estetika visual, dan alur konversi penjualan yang efektif.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Portfolios Grid */}
      <section className="py-12 sm:py-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-10">
          
          {/* Dynamic Category Filter Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-3">
            {categoryPills.map((cat) => {
              const isActive = (category || "all").toLowerCase() === cat.value.toLowerCase();
              return (
                <Link
                  key={cat.value}
                  href={`/portofolio?category=${cat.value}`}
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

          {/* Grid of Portfolio Cards */}
          {portfolios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolios.map((item) => {
                const firstImage = item.images && item.images.length > 0 ? item.images[0].imagePath : null;

                return (
                  <div
                    key={item.id}
                    className="theme-card bg-card/95 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between group space-y-6"
                  >
                    <div className="space-y-5">
                      {/* Thumbnail Image dari table portfolio_images (Image Pertama) */}
                      {firstImage && (
                        <Link
                          href={`/portofolio/${item.slug}`}
                          className="block relative w-full aspect-[16/10] rounded-2xl overflow-hidden theme-inset bg-muted/40 border border-border/80 group/thumb"
                        >
                          <Image
                            src={getPublicImageUrl(firstImage)}
                            alt={`${item.title} Thumbnail`}
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover/thumb:scale-105"
                            sizes="(max-width: 768px) 100vw, 600px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity" />
                          {item.images.length > 1 && (
                            <span className="absolute bottom-3 right-3 theme-pill px-2.5 py-1 bg-background/90 backdrop-blur-md text-[10px] font-mono font-bold text-foreground border border-border">
                              {item.images.length} Gambar
                            </span>
                          )}
                        </Link>
                      )}

                      {/* Category */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="theme-pill text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 bg-primary/10 text-primary border border-primary/20">
                          {item.category}
                        </span>
                      </div>

                      {/* Client & Title */}
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-primary font-bold block">
                          {item.clientType}
                        </span>
                        <h2 className="theme-text text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                          <Link href={`/portofolio/${item.slug}`}>
                            {item.title}
                          </Link>
                        </h2>
                      </div>

                      {/* Deskripsi Singkat */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>

                      {/* Highlights list */}
                      <div className="space-y-2 pt-1">
                        {item.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs text-foreground/90 font-medium">
                            <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Action Bar */}
                    <div className="pt-6 mt-6 border-t border-border/70 flex items-center justify-between gap-3">
                      <Link
                        href={`/portofolio/${item.slug}`}
                        className="theme-btn inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-xs sm:text-sm px-6 h-11 rounded-xl flex-1 sm:flex-initial"
                      >
                        <span>Lihat Rincian Proyek</span>
                        <ArrowRight className="size-4" />
                      </Link>

                      <a
                        href={SITE_CONFIG.getWhatsappUrl(
                          `Halo Solusi Berdigital, saya tertarik dengan proyek ${item.title}`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="theme-btn inline-flex items-center justify-center gap-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold text-xs px-4 h-11 rounded-xl border border-border transition-colors"
                      >
                        <span>Tanya Proyek Ini</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 sm:p-16 text-center theme-card bg-card/80 border border-border space-y-3 max-w-xl mx-auto">
              <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary theme-card-flat">
                <Briefcase className="size-7" />
              </div>
              <h3 className="theme-text text-lg font-bold text-foreground">
                Belum Ada Portofolio Proyek
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Portofolio proyek sedang disiapkan. Tambahkan portofolio baru melalui panel dashboard Admin.
              </p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
