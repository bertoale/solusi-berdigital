import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getAllServices } from "@/lib/data-store";
import {
  Building2,
  Store,
  Megaphone,
  Calculator,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Layers,
  PhoneCall,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Layanan Pembuatan Website & Sistem Bisnis | Solusi Berdigital",
  description:
    "Pilihan layanan website profil perusahaan, toko online katalog WhatsApp, landing page iklan konversi tinggi, dan aplikasi kasir POS siap pakai.",
};

const iconMap: Record<string, typeof Building2> = {
  Building2,
  Store,
  Megaphone,
  Calculator,
};

export default async function LayananPage() {
  const services = await getAllServices();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden bg-noise">
      {/* Background Ambient Glow & Dot Matrix Texture */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-[650px] h-[450px] bg-gradient-to-br from-primary/15 via-primary-muted/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-0 w-[550px] h-[500px] bg-gradient-to-tr from-warning/15 via-primary/10 to-transparent rounded-full blur-[130px]" />
        <div className="absolute -bottom-20 right-10 w-[550px] h-[400px] bg-gradient-to-tl from-primary/15 via-warning/10 to-transparent rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-10 dark:opacity-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      {/* Hero Header Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 border-b border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 theme-pill bg-card text-foreground border border-border text-xs font-bold tracking-wide">
              <Layers className="size-3.5 text-primary" />
              <span>KATALOG LAYANAN DIGITAL LENGKAP</span>
            </div>
            <h1 className="theme-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-balance leading-tight">
              Solusi Digital Terbaik yang Disesuaikan dengan{" "}
              <span className="theme-text-primary text-primary">Karakter Bisnis Anda</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-balance">
              Mulai dari penguatan kredibilitas brand, peningkatan omzet ritel tanpa komisi, hingga otomatisasi rekap kasir harian. Semua paket dirancang siap pakai dan mudah dioperasikan.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.iconName] || Building2;
              return (
                <div
                  key={service.id}
                  className="theme-card bg-card/95 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between group"
                >
                  <div className="space-y-6">
                    {/* Category & Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="theme-pill text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 bg-primary/10 text-primary border border-primary/20">
                        {service.category}
                      </span>
                      {service.badgeText && (
                        <span className="theme-pill inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 bg-warning/20 text-warning border border-warning/40">
                          <Sparkles className="size-3 fill-current" />
                          <span>{service.badgeText}</span>
                        </span>
                      )}
                    </div>

                    {/* Title & Icon */}
                    <div className="flex items-start gap-4">
                      <div className="size-13 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary theme-inset group-hover:scale-105 transition-transform">
                        <Icon className="size-6" />
                      </div>
                      <div className="space-y-1">
                        <h2 className="theme-text text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug group-hover:text-primary transition-colors">
                          <Link href={`/layanan/${service.slug}`}>
                            {service.title}
                          </Link>
                        </h2>
                        <div className="text-xs sm:text-sm text-primary font-semibold">
                          Target: <span className="text-muted-foreground font-normal">{service.recommendedFor}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Features checklist inside theme-inset */}
                    <div className="p-4 sm:p-5 theme-inset bg-muted/40 border border-border/70 space-y-2.5">
                      <div className="text-xs font-bold text-foreground uppercase tracking-wide">
                        Fitur & Fasilitas Utama:
                      </div>
                      <ul className="space-y-2">
                        {service.features.slice(0, 4).map((f, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                            <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-6 mt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-muted-foreground block">Mulai dari:</span>
                      <span className="theme-text text-lg sm:text-xl font-extrabold text-foreground">
                        {service.priceStartingFrom || "Hubungi Kami"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Link
                        href={`/layanan/${service.slug}`}
                        className="theme-btn inline-flex items-center justify-center gap-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold text-xs px-4 h-11 rounded-xl border border-border transition-all flex-1 sm:flex-initial"
                      >
                        <span>Lihat Detail</span>
                      </Link>
                      <a
                        href={`https://wa.me/6285858089376?text=Halo%20Solusi%20Berdigital%2C%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(
                          service.title
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="theme-btn inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-xs px-5 h-11 rounded-xl transition-all flex-1 sm:flex-initial"
                      >
                        <span>Konsultasi</span>
                        <ArrowRight className="size-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Consultation Banner */}
          <div className="mt-16 sm:mt-20 p-8 sm:p-10 theme-card bg-gradient-to-br from-card via-card to-primary/5 border border-primary/20 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3.5 py-1 theme-pill border border-emerald-500/20">
                <ShieldCheck className="size-4" />
                <span>Konsultasi & Rekomendasi Bebas Biaya</span>
              </div>
              <h3 className="theme-text text-xl sm:text-2xl font-bold text-foreground">
                Punya Kebutuhan Sistem Khusus di Luar Paket Ini?
              </h3>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Diskusikan alur kerja bisnis atau kebutuhan integrasi API Anda. Kami siap merancang solusi digital yang tepat guna dan efisien.
              </p>
            </div>
            <a
              href="https://wa.me/6285858089376?text=Halo%20Solusi%20Berdigital%2C%20saya%20ingin%20konsultasi%20sistem%20kustom"
              target="_blank"
              rel="noopener noreferrer"
              className="theme-btn inline-flex items-center justify-center gap-2.5 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold text-sm sm:text-base px-8 h-12 rounded-2xl shrink-0 transition-all w-full sm:w-auto"
            >
              <PhoneCall className="size-4.5" />
              <span>Diskusi via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
