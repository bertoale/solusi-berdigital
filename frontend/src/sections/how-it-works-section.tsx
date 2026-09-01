"use client";

import React from "react";
import {
  Code2,
  Rocket,
  MessageSquareShare,
} from "lucide-react";

interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: typeof MessageSquareShare;
}

const steps: StepItem[] = [
  {
    step: "01",
    title: "Konsultasi & Penentuan Konsep",
    description:
      "Ceritakan kebutuhan atau ide bisnis Anda via WhatsApp. Tim kami siapkan rekomendasi struktur website, paket domain .com & cloud server, serta estimasi biaya yang transparan.",
    icon: MessageSquareShare,
  },
  {
    step: "02",
    title: "Pengerjaan & Review Interaktif",
    description:
      "Website dirakit dengan standar teknologi modern yang cepat di smartphone. Anda menerima tautan demo interaktif untuk meninjau langsung dan mengajukan penyesuaian.",
    icon: Code2,
  },
  {
    step: "03",
    title: "Peluncuran & Siap Dipakai",
    description:
      "Website resmi online dan siap menerima pesanan pelanggan. Dilengkapi video panduan pengoperasian mandiri serta garansi bantuan teknis penuh.",
    icon: Rocket,
  },
];

export function HowItWorksSection() {
  return (
    <section
      className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-background via-blue-50/40 to-background dark:via-blue-950/15 border-b border-border/60 relative overflow-hidden bg-noise"
      id="cara-kerja"
    >
      {/* Background Process Track Vectors, Dot Matrix & Edge Blend */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        {/* Rich Brand Aurora Glow Ambiance */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[350px] bg-gradient-to-r from-primary/10 via-primary-muted/10 to-transparent rounded-full blur-[130px]" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[300px] bg-gradient-to-l from-warning/15 via-primary/5 to-transparent rounded-full blur-[120px]" />

        {/* Modern Dot Matrix Mask */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-10 dark:opacity-10 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Custom SVG Process Alignment Track Vector */}
        <svg
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-40 text-primary/[0.06] hidden lg:block"
          viewBox="0 0 1200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="80" x2="1200" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="6 12" />
          <circle cx="200" cy="80" r="3" fill="var(--color-warning)" fillOpacity="0.6" />
          <circle cx="600" cy="80" r="3" fill="var(--color-primary)" fillOpacity="0.5" />
          <circle cx="1000" cy="80" r="3" fill="var(--color-warning)" fillOpacity="0.6" />
        </svg>

        {/* Top and Bottom Edge Fades */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16 lg:mb-20 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground text-balance leading-tight">
            Dari Ide Hingga Website Siap Pakai dalam{" "}
            <span className="text-primary">
              3 Langkah Praktis
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-balance leading-relaxed">
            Anda tidak perlu repot koding atau mengurus server. Seluruh proses teknis kami tangani dengan alur kerja yang jelas dan terarah.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP TIMELINE (Visible on lg+) */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative">
          
          {/* Continuous Solid Connector Bar with Animated Flow Beam */}
          <div className="absolute top-[44px] left-[80px] right-[80px] h-[3px] bg-primary/20 -z-0 overflow-hidden rounded-full">
            <div className="absolute top-0 bottom-0 w-36 bg-gradient-to-r from-transparent via-warning to-transparent blur-[1px] animate-timeline-beam-h" />
          </div>

          {/* 3 Steps Horizontal Track */}
          <div className="grid grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex flex-col group cursor-default">
                  
                  {/* Top: Signature Large Typographic Step Node */}
                  <div className="mb-6">
                    <div className="relative w-[88px] h-[88px] rounded-2xl bg-card border-2 border-primary/30 group-hover:border-warning shadow-md flex flex-col items-center justify-center transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-primary/15">
                      {/* Ambient micro-glow on hover */}
                      <div className="absolute -inset-1 bg-gradient-to-tr from-warning/25 to-primary/20 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                      <span className="font-mono text-2xl font-black text-warning group-hover:scale-105 transition-transform duration-300">
                        {item.step}
                      </span>
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Langkah
                      </span>
                    </div>
                  </div>

                  {/* Step Title & Icon */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET VERTICAL TIMELINE (Visible on < lg) */}
        {/* ========================================================================= */}
        <div className="lg:hidden relative">
          
          {/* Continuous Left Connector Line with Vertical Beam */}
          <div className="absolute top-6 bottom-10 left-[22px] w-[3px] -translate-x-1/2 bg-primary/20 z-0 overflow-hidden rounded-full">
            <div className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-warning to-transparent blur-[1px] animate-timeline-beam-v" />
          </div>

          <div className="space-y-8 relative z-10">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex items-start gap-4 sm:gap-5 group">
                  
                  {/* Step Number Badge */}
                  <div className="relative w-11 h-11 rounded-xl bg-card border-2 border-primary shadow-md flex items-center justify-center shrink-0 z-10 transition-transform duration-300 group-hover:scale-105">
                    <span className="font-mono text-sm font-black text-warning">
                      {item.step}
                    </span>
                  </div>

                  {/* Content Body */}
                  <div className="flex-1 bg-card p-5 sm:p-6 rounded-2xl border border-border/80 shadow-xs space-y-2.5 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-md">
                    <div className="flex items-center gap-2.5">
                      <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
