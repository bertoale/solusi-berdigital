"use client";

import React from "react";
import Image from "next/image";
import {
  Building2,
  Store,
  Megaphone,
  Database,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { staticServices } from "@/lib/services-data";
import { SITE_CONFIG } from "@/lib/site-config";

const iconMap: Record<string, typeof Building2> = {
  Building2,
  Store,
  Megaphone,
  Database,
};

export function ServicesSection() {
  return (
    <section
      className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-slate-50/70 via-primary/[0.035] to-slate-50/70 dark:from-primary/[0.07] dark:via-primary/[0.03] dark:to-transparent border-b border-border/60 relative overflow-hidden bg-noise"
      id="layanan"
    >
      {/* Structural Blueprint, Dot Matrix, Ambient PNG & Mesh Lighting Backdrop */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        {/* Rich Ambient Brand Aurora Glow Orbs */}
        <div className="absolute -top-24 right-1/4 w-[650px] h-[450px] bg-gradient-to-br from-primary/10 via-primary-muted/10 to-transparent rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-warning/10 via-primary/5 to-transparent rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 right-10 w-[550px] h-[400px] bg-gradient-to-tl from-primary/10 via-warning/5 to-transparent rounded-full blur-[130px]" />

        {/* Modern Dot Matrix Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-10 dark:opacity-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Custom SVG Blueprint Vector Lines */}
        <svg
          className="absolute -top-10 -right-10 w-96 h-96 text-primary/[0.06] dark:text-primary/[0.08]"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 0V400M150 0V400M250 0V400M350 0V400"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <path
            d="M0 50H400M0 150H400M0 250H400M0 350H400"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            cx="250"
            cy="150"
            r="4"
            fill="var(--color-warning)"
            fillOpacity="0.4"
          />
          <circle
            cx="150"
            cy="250"
            r="4"
            fill="var(--color-primary)"
            fillOpacity="0.3"
          />
        </svg>

        {/* Edge Fade transitions */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Section Header with Side Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-12 sm:mb-16">
          <div className="lg:col-span-7 xl:col-span-7 space-y-4">
            <h2 className="theme-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground text-balance leading-tight">
              Solusi Pembuatan Website & Sistem Sesuai Kebutuhan Bisnis Anda
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-balance leading-relaxed">
              Paket website sudah mencakup domain .com dan cloud hosting tahun
              pertama, desain responsif, panduan penggunaan, serta dukungan
              teknis selama masa garansi.
            </p>
          </div>

          {/* Cutout Image enlarged to match title & subtitle height */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 justify-end items-center relative">
            <div className="relative w-full h-[260px] lg:h-[300px] xl:h-[340px] max-w-[420px] xl:max-w-[460px] flex items-center justify-center">
              {/* Soft ambient back-glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-warning/15 to-transparent rounded-full blur-3xl -z-10" />
              <Image
                src="/solution.png"
                alt="Solusi Berdigital Services"
                fill
                priority
                sizes="(max-width: 1200px) 40vw, 460px"
                className="object-contain object-right drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Uniform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {staticServices.map((service) => {
            const Icon = iconMap[service.iconName] || Building2;
            return (
              <div
                key={service.id}
                className="relative theme-card bg-card/95 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group"
              >
                <div className="space-y-5">
                  {/* Top Bar: Category, Badge & Delivery Time */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/15">
                        {service.category}
                      </span>
                      {service.badgeText && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-warning/20 text-warning border border-warning/40">
                          <Sparkles className="size-3 fill-current" />
                          <span>{service.badgeText}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5 text-emerald-500" />
                      {service.deliveryTime}
                    </span>
                  </div>

                  {/* Title & Icon Header */}
                  <div className="flex items-start gap-4">
                    <Link
                      href={`/layanan/${service.slug}`}
                      className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary group-hover:scale-105 transition-transform"
                    >
                      <Icon className="size-6" />
                    </Link>
                    <div className="space-y-1">
                      <Link href={`/layanan/${service.slug}`} className="block">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                      </Link>
                      <div className="text-xs sm:text-sm text-primary font-semibold leading-relaxed">
                        Cocok untuk:{" "}
                        <span className="text-muted-foreground font-normal">
                          {service.recommendedFor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Feature Checklist Box */}
                  <div className="p-4 sm:p-5 theme-inset bg-muted/40 space-y-3">
                    <div className="text-xs font-bold text-foreground uppercase tracking-wide">
                      Fasilitas Lengkap yang Anda Dapatkan:
                    </div>
                    <ul className="space-y-2.5">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90"
                        >
                          <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-6 mt-6 border-t border-border/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <Link
                    href={`/layanan/${service.slug}`}
                    className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 py-1"
                  >
                    <span>Lihat Detail Lengkap</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <a
                    href={SITE_CONFIG.getWhatsappUrl(
                      `Halo saya tertarik dengan layanan ${service.title}. Boleh minta info lebih lengkapnya?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 theme-btn bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-xs sm:text-sm px-6 h-11 rounded-xl active:scale-[0.98] transition-all w-full sm:w-auto"
                  >
                    <span>Konsultasikan Paket Ini</span>
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="mt-12 sm:mt-16 md:mt-20 p-6 sm:p-8 lg:p-10 theme-card bg-gradient-to-br from-card via-card to-primary/5 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <ShieldCheck className="size-4" />
              <span>Konsultasi Bebas Biaya Awal</span>
            </div>
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground tracking-tight">
              Belum tahu paket mana yang paling pas untuk bisnis Anda?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Ceritakan ide produk atau usaha Anda kepada tim kami via WhatsApp.
              Kami akan berikan rekomendasi struktur website terbaik beserta
              estimasi anggarannya.
            </p>
          </div>

          <a
            href={SITE_CONFIG.getWhatsappUrl(
              "Halo saya mau tanya rekomendasi paket website yang cocok untuk usaha saya"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 theme-btn bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold text-sm sm:text-base px-8 h-12 rounded-2xl active:scale-[0.98] shrink-0 transition-all w-full sm:w-auto"
          >
            <PhoneCall className="size-4 sm:size-5 shrink-0" />
            <span>Tanya Rekomendasi via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
