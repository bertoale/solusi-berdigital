"use client";

import React from "react";
import {
  ArrowRight,
  Clock,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

interface CTASectionProps {
  whatsappUrl?: string;
}

export function CTASection({
  whatsappUrl = "https://wa.me/6285858089376?text=Halo%20Solusi%20Berdigital%2C%20saya%20ingin%20konsultasi%20pembuatan%20website%20untuk%20bisnis%20saya.",
}: CTASectionProps) {
  const quickTopics = [
    "Website Company Profile",
    "Toko Online WhatsApp",
    "Landing Page Iklan",
    "Sistem Kasir (POS)",
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background via-primary/[0.03] to-background relative overflow-hidden">
      {/* Background Subtle Ambiance */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-primary/10 via-primary-muted/10 to-warning/10 rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* HIGH-IMPACT FEATURED CTA BANNER CARD */}
        <div className="relative rounded-3xl lg:rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-primary-hover text-primary-foreground p-8 sm:p-12 lg:p-16 shadow-2xl shadow-primary/25 border border-primary-foreground/20 overflow-hidden">
          {/* Ambient Lighting & Geometric Patterns Inside Banner */}
          <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
            {/* Vivid Aurora Glows */}
            <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-warning/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-primary-foreground/10 rounded-full blur-[110px]" />

            {/* Sharp Dot Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary-foreground)_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-15 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />

            {/* Technical Watermark Vector */}
            <svg
              className="absolute right-0 bottom-0 w-[500px] h-[350px] text-primary-foreground/[0.05] hidden lg:block"
              viewBox="0 0 500 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 350L500 0M80 350L500 80M160 350L500 160M240 350L500 240" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 10" />
              <circle cx="420" cy="80" r="70" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="420" cy="80" r="4" fill="var(--color-warning)" fillOpacity="0.8" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT COLUMN: Main Pitch & Action CTA */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-foreground/15 border border-primary-foreground/20 text-warning text-xs font-bold tracking-wide">
                <span className="size-2 rounded-full bg-warning animate-ping" />
                <span>KONSULTASI GRATIS & BEBAS DISKUSI</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-primary-foreground leading-[1.15] text-balance">
                Punya Rencana Bisnis Baru?{" "}
                <span className="text-warning drop-shadow-sm">
                  Mari Diskusikan Website yang Tepat
                </span>{" "}
                Sekarang.
              </h2>

              {/* High Contrast Subtext */}
              <p className="text-base sm:text-lg text-primary-foreground/90 max-w-xl leading-relaxed font-normal">
                Ceritakan ide atau kebutuhan sistem usaha Anda kepada tim kami. Respon cepat di jam kerja, tanpa formulir rumit, dan 100% bebas komitmen awal.
              </p>

              {/* CTA Buttons Group */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* PRIMARY GOLD CTA BUTTON */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-warning hover:bg-warning/90 text-primary font-extrabold text-base sm:text-lg px-8 h-14 rounded-2xl shadow-xl shadow-black/30 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all group"
                >
                  <svg
                    className="w-5 h-5 fill-current shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zM12.05 20.2c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.22.25-.86.84-.86 2.06 0 1.21.88 2.39 1 2.56.12.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.3z" />
                  </svg>
                  <span>Chat Sekarang di WhatsApp</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* SECONDARY OUTLINE CTA */}
                <a
                  href="#layanan"
                  className="inline-flex items-center justify-center px-6 h-14 rounded-2xl border-2 border-primary-foreground/30 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground font-bold text-sm transition-all"
                >
                  <span>Lihat Pilihan Layanan</span>
                </a>
              </div>

              {/* Trust Micro-Checkpoints */}
              <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-primary-foreground/80 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-warning shrink-0" />
                  <span>Bebas Konsultasi Kapan Saja</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-warning shrink-0" />
                  <span>Estimasi Biaya Transparan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-warning shrink-0" />
                  <span>Respon Cepat di Jam Kerja</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: High-Contrast Live WhatsApp Interactive Box */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl sm:rounded-3xl border-2 border-primary-foreground/25 bg-black/25 backdrop-blur-xl p-6 sm:p-7 shadow-2xl space-y-5">
                {/* Header inside Preview Box */}
                <div className="flex items-center justify-between pb-4 border-b border-primary-foreground/15">
                  <div className="flex items-center gap-3">
                    <div className="relative size-11 rounded-xl bg-primary-foreground/15 flex items-center justify-center text-warning font-bold">
                      <MessageSquare className="size-5" />
                      {/* Live Online Indicator */}
                      <span className="absolute -top-1 -right-1 size-3.5 rounded-full bg-emerald-400 border-2 border-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-primary-foreground">Konsultan Solusi Berdigital</h3>
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                        Online Siap Melayani
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-warning px-2.5 py-0.5 rounded-md bg-primary-foreground/15 border border-primary-foreground/20">Fast Reply</span>
                </div>

                {/* Chat Message Bubble */}
                <div className="p-4 rounded-2xl bg-primary-foreground/12 text-xs sm:text-sm text-primary-foreground leading-relaxed border border-primary-foreground/20 space-y-1">
                  <p className="font-bold text-warning">👋 Halo! Mau konsultasi kebutuhan apa?</p>
                  <p className="text-primary-foreground/90 text-xs">Pilih topik yang Anda butuhkan untuk langsung terhubung dengan tim kami:</p>
                </div>

                {/* Direct Topic Action Pills */}
                <div className="space-y-2.5">
                  {quickTopics.map((topic, idx) => (
                    <a
                      key={idx}
                      href={`https://wa.me/6285858089376?text=Halo%20saya%20ingin%20konsultasi%20tentang%20${encodeURIComponent(
                        topic
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-xl bg-primary-foreground/10 hover:bg-warning hover:text-primary border border-primary-foreground/20 text-xs sm:text-sm font-semibold text-primary-foreground transition-all group/item shadow-xs hover:shadow-md hover:font-bold"
                    >
                      <span>{topic}</span>
                      <ArrowRight className="size-4 text-warning group-hover/item:text-primary group-hover/item:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>

                <div className="pt-1 text-center text-xs text-primary-foreground/80">
                  <span>Klik topik di atas untuk langsung membuka chat WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
