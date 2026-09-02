"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  backgroundImageUrl?: string;
  cutoutImageUrl?: string;
  whatsappUrl?: string;
}

export function HeroSection({
  backgroundImageUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80",
  cutoutImageUrl = "/side-hello.png",
  whatsappUrl = "https://wa.me/6285858089376?text=Halo%20Solusi%20Berdigital%2C%20saya%20ingin%20konsultasi%20pembuatan%20website%20untuk%20meningkatkan%20penjualan%20bisnis%20saya.",
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background min-h-[580px] lg:min-h-[640px] flex items-center border-b border-border/60">
      {/* Supporting Background Image with uniform solid opacity (no gradient) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src={backgroundImageUrl}
          alt="Modern digital agency workspace background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 dark:opacity-15"
        />
        {/* Solid uniform tint overlay */}
        <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />
      </div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT COLUMN: Headline, Subtitle, WhatsApp CTA & Value Props */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Main Headline */}
            <h1 className="theme-text text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-foreground leading-[1.12] text-balance">
              Jasa Pembuatan Website &{" "}
              <span className="theme-text-primary text-primary">Toko Online Siap Pakai</span> untuk
              Bisnis Anda
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed font-normal">
              Kami bangun website profesional yang terintegrasi langsung ke
              WhatsApp bisnis Anda, cepat dibuka di smartphone, dan siap online
              mulai dari 3 hari kerja tanpa kerumitan teknis.
            </p>

            {/* CTA Group */}
            <div className="pt-2 w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 theme-btn bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold text-base px-8 py-4 rounded-2xl active:scale-[0.98] transition-all group"
              >
                {/* Official WhatsApp SVG Icon */}
                <svg
                  className="w-5 h-5 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zM12.05 20.2c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.22.25-.86.84-.86 2.06 0 1.21.88 2.39 1 2.56.12.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.3z" />
                </svg>
                <span>Konsultasi via WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Tangible Trust Points */}
            <div className="pt-4 border-t border-border/60 w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-medium text-foreground/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success shrink-0" />
                <span>Gratis Domain & Hosting 1 Th</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success shrink-0" />
                <span>Terintegrasi WhatsApp Bisnis</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                <span>Garansi Bantuan Teknis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT EDGE CHARACTER: Posisikan di tepi kanan layar */}
      <div className="hidden lg:block absolute right-0 bottom-0 z-10 pointer-events-none select-none h-[88%] max-h-[580px] w-auto aspect-[448/901]">
        {/* Ambient back-glow */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-blue-500/10 to-indigo-600/20 rounded-full blur-3xl -z-10" />

        <div className="relative w-full h-full">
          <Image
            src={cutoutImageUrl}
            alt="Solusi Berdigital - Karakter Halo"
            fill
            priority
            sizes="(max-width: 1200px) 300px, 360px"
            className="object-contain object-right-bottom drop-shadow-[-8px_16px_24px_rgba(0,0,0,0.18)] dark:drop-shadow-[-8px_16px_30px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>
    </section>
  );
}
