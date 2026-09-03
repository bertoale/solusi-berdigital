import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getServiceBySlug, getAllServices } from "@/lib/data-store";
import {
  Building2,
  Store,
  Megaphone,
  Calculator,
  Database,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Clock,
  Briefcase,
  PhoneCall,
} from "lucide-react";
import { ServiceFaqAccordion } from "@/components/service-faq-accordion";
import { ServiceDetailSchema } from "@/jsonLD";
import { SITE_CONFIG } from "@/lib/site-config";

interface Props {
  params: Promise<{ slug: string }>;
}

const iconMap: Record<string, typeof Building2> = {
  Building2,
  Store,
  Megaphone,
  Calculator,
  Database,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Layanan Tidak Ditemukan | Solusi Berdigital",
    };
  }

  return {
    title: `${service.title} | Solusi Berdigital`,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} | Solusi Berdigital`,
      description: service.shortDesc,
      url: `https://solusiberdigital.id/layanan/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const allServices = await getAllServices();
  const otherServices = allServices.filter((s) => s.id !== service.id).slice(0, 3);
  const Icon = iconMap[service.iconName] || Building2;

  return (
    <div className="min-h-screen bg-background relative bg-noise">
      <ServiceDetailSchema service={service} />
      {/* Ambient Aurora Glow */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute top-10 right-1/4 w-[600px] h-[400px] bg-primary/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-warning/15 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      {/* Top Breadcrumbs & Hero */}
      <section className="py-12 sm:py-16 border-b border-border/60 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Link
            href="/layanan"
            className="theme-btn inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground px-4 py-2 rounded-xl bg-card border border-border mb-6 transition-all"
          >
            <ArrowLeft className="size-3.5" />
            <span>Kembali ke Katalog Layanan</span>
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="theme-pill text-xs font-bold uppercase tracking-wider px-3.5 py-1 bg-primary/10 text-primary border border-primary/20">
                {service.category}
              </span>
              {service.badgeText && (
                <span className="theme-pill inline-flex items-center gap-1 text-xs font-bold px-3 py-1 bg-warning/20 text-warning border border-warning/40">
                  <Sparkles className="size-3.5 fill-current" />
                  <span>{service.badgeText}</span>
                </span>
              )}
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 ml-auto">
                <Clock className="size-3.5 text-primary" />
                {service.deliveryTime}
              </span>
            </div>

            <div className="flex items-start gap-4 pt-2">
              <div className="size-15 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary theme-inset">
                <Icon className="size-8" />
              </div>
              <div>
                <h1 className="theme-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                  {service.title}
                </h1>
                <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
                  {service.shortDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Detail Description & Modules */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Detailed Explanation */}
              <div className="space-y-4">
                <h2 className="theme-text text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Tentang Layanan Ini
                </h2>
                <div className="theme-card bg-card text-sm sm:text-base text-foreground/90 leading-relaxed whitespace-pre-line p-6 sm:p-8 rounded-2xl border border-border">
                  {service.fullDesc}
                </div>
              </div>

              {/* Recommended For Target Audience - Highlight Card */}
              <div className="p-6 sm:p-7 theme-card bg-primary-muted border-2 border-primary/30 space-y-3 rounded-2xl relative overflow-hidden shadow-md">
                <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wider text-primary">
                  <div className="size-6 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-xs">
                    <Briefcase className="size-3.5" />
                  </div>
                  <span>Sangat Direkomendasikan Untuk:</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-foreground leading-relaxed">
                  {service.recommendedFor}
                </p>
              </div>

              {/* All Features Included */}
              <div className="space-y-4">
                <h2 className="theme-text text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Fasilitas & Modul yang Anda Dapatkan
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {service.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4.5 theme-card bg-card flex items-start gap-3.5"
                    >
                      <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-foreground">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>


              {/* FAQ Section - Interactive Accordion matching Homepage Design */}
              {service.faqs && service.faqs.length > 0 && (
                <ServiceFaqAccordion
                  faqs={service.faqs}
                  serviceTitle={service.title}
                />
              )}

            </div>

            {/* Right Column: Sticky Pricing & Action Card on Desktop */}
            <div className="lg:col-span-4 relative">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="theme-card bg-card/95 backdrop-blur-md p-6 sm:p-8 space-y-6 border border-primary/20">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-muted-foreground block">
                      Investasi Pembuatan:
                    </span>
                    <div className="theme-text text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                      {service.priceStartingFrom || "Sesuai Kebutuhan"}
                    </div>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                      <ShieldCheck className="size-4" />
                      Garansi Desain & Domain 1 Th
                    </span>
                  </div>

                  <div className="border-t border-border/80 pt-4 space-y-3 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Estimasi Waktu:</span>
                      <span className="font-bold text-foreground">{service.deliveryTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Domain & Hosting:</span>
                      <span className="font-bold text-emerald-600">Gratis Tahun Ke-1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Konsultasi Awal:</span>
                      <span className="font-bold text-foreground">100% Gratis</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-3">
                    <a
                      href={SITE_CONFIG.getWhatsappUrl(
                        `Halo Solusi Berdigital, saya tertarik dengan layanan ${service.title}. Boleh minta info dan tahap pemesanannya?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-btn inline-flex items-center justify-center gap-2.5 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold text-sm h-12 rounded-xl active:scale-[0.98] transition-all w-full"
                    >
                      <PhoneCall className="size-4.5" />
                      <span>Pesan via WhatsApp</span>
                    </a>

                    <Link
                      href="/portofolio"
                      className="theme-btn inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold text-xs h-11 rounded-xl border border-border transition-colors w-full"
                    >
                      <span>Lihat Contoh Hasil Pengerjaan</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Other Services Recommendations */}
          {otherServices.length > 0 && (
            <div className="mt-16 sm:mt-20 pt-12 border-t border-border/80 space-y-6">
              <h2 className="theme-text text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Layanan Terkait Lainnya
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherServices.map((other) => (
                  <Link
                    key={other.id}
                    href={`/layanan/${other.slug}`}
                    className="p-6 theme-card bg-card border border-border group space-y-3"
                  >
                    <span className="theme-pill text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-primary/10 text-primary border border-primary/20">
                      {other.category}
                    </span>
                    <h3 className="theme-text font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                      {other.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {other.shortDesc}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-bold text-primary pt-1">
                      <span>Pelajari Layanan</span>
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
