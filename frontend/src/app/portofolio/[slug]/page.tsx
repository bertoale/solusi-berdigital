import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPortfolioBySlug, getAllPortfolios } from "@/lib/data-store";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);
  if (!item) {
    return { title: "Portofolio Tidak Ditemukan | Solusi Berdigital" };
  }
  return {
    title: `Proyek: ${item.title} | Solusi Berdigital`,
    description: item.description,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    notFound();
  }

  const allPortfolios = await getAllPortfolios({ onlyPublished: true });
  const otherProjects = allPortfolios.filter((p) => p.id !== portfolio.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden bg-noise">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute top-10 right-1/4 w-[600px] h-[400px] bg-primary/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-warning/15 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      {/* Top Header Section */}
      <section className="py-12 sm:py-16 border-b border-border/60 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Link
            href="/portofolio"
            className="theme-btn inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground px-4 py-2 rounded-xl bg-card border border-border mb-6 transition-all"
          >
            <ArrowLeft className="size-3.5" />
            <span>Kembali ke Semua Portofolio</span>
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="theme-pill text-xs font-bold uppercase tracking-wider px-3.5 py-1 bg-primary/10 text-primary border border-primary/20">
                {portfolio.category}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                Klien: <strong className="text-foreground font-semibold">{portfolio.clientName}</strong>
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                Industri: <strong className="text-foreground font-semibold">{portfolio.clientType}</strong>
              </span>
            </div>

            <h1 className="theme-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              {portfolio.title}
            </h1>

            {/* Deskripsi Singkat */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl font-normal">
              {portfolio.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="py-12 sm:py-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-12">
          
          {/* macOS Style Claymorphic Window & Multi-Image Gallery */}
          <PortfolioGallery
            images={(portfolio.images || []).map((img) => img.imagePath)}
            title={portfolio.title}
            slug={portfolio.slug}
            liveUrl={portfolio.liveUrl}
            clientType={portfolio.clientType}
            clientName={portfolio.clientName}
            fullDescription={portfolio.fullDescription}
          />

          {/* Features Implemented */}
          <div className="space-y-4">
            <h2 className="theme-text text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Fitur & Standar Teknologi yang Diterapkan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolio.features.map((feat, idx) => (
                <div key={idx} className="p-5 theme-card bg-card flex items-start gap-3.5">
                  <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-foreground">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Consultation Box */}
          <div className="p-8 sm:p-10 theme-card bg-gradient-to-br from-card via-card to-primary/5 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="theme-text text-xl sm:text-2xl font-bold text-foreground">
                Ingin Membuat Website dengan Kualitas Seperti Ini?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Konsultasikan konsep bisnis Anda bersama tim kami. Dapatkan penawaran harga terbaik dan estimasi waktu pengerjaan.
              </p>
            </div>
            <a
              href={`https://wa.me/6285858089376?text=Halo%20Solusi%20Berdigital%2C%20saya%20tertarik%20dengan%20proyek%20${encodeURIComponent(
                portfolio.title
              )}%20dan%20ingin%20membuat%20website%20serupa.`}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-btn inline-flex items-center justify-center gap-2.5 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold text-sm px-6 h-12 rounded-2xl shrink-0 transition-all w-full sm:w-auto"
            >
              <PhoneCall className="size-4.5" />
              <span>Konsultasi Proyek Serupa</span>
            </a>
          </div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <div className="pt-10 border-t border-border space-y-6">
              <h2 className="theme-text text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Portofolio Proyek Lainnya
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherProjects.map((item) => (
                  <Link
                    key={item.id}
                    href={`/portofolio/${item.slug}`}
                    className="p-6 theme-card bg-card border border-border group space-y-3"
                  >
                    <span className="theme-pill text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-primary/10 text-primary border border-primary/20">
                      {item.category}
                    </span>
                    <h3 className="theme-text font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-bold text-primary pt-1">
                      <span>Lihat Rincian Proyek</span>
                      <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
