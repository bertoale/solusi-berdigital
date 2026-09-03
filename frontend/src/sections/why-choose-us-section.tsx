"use client";

import React from "react";
import {
  Clock,
  Gift,
  Headphones,
  ShieldCheck,
  CalendarCheck,
  Globe,
  Wrench,
  MessageCircle,
} from "lucide-react";

const advantages = [
  {
    num: "01",
    title: "Pengerjaan Cepat & Terstruktur",
    desc: "Tidak perlu menunggu berbulan-bulan. Tim kami bekerja terstruktur agar website bisnis Anda segera online dan siap dipakai promosi sesuai estimasi kesepakatan.",
    icon: Clock,
  },
  {
    num: "02",
    title: "Paket Lengkap All-in-One",
    desc: "Sudah termasuk sewa domain .com, server hosting cloud cepat tahun pertama, SSL keamanan, email bisnis, hingga optimasi tampilan di semua smartphone.",
    icon: Gift,
  },
  {
    num: "03",
    title: "Didampingi Sampai Bisa Pakai",
    desc: "Kami sediakan panduan lengkap dan layanan konsultasi via WhatsApp jika Anda ingin mengganti tulisan, foto produk, atau menambah materi.",
    icon: Headphones,
  },
  {
    num: "04",
    title: "Dukungan Pemeliharaan & Proteksi Teknis",
    desc: "Kami bantu menjaga stabilitas website Anda dengan backup data berkala dan penanganan cepat jika terjadi kendala teknis.",
    icon: ShieldCheck,
  },
];

export function WhyChooseUsSection() {
  return (
    <section
      className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-primary/[0.035] via-primary/[0.08] to-primary/[0.035] dark:from-primary/[0.08] dark:via-primary/[0.15] dark:to-primary/[0.08] border-b border-border/60 relative overflow-hidden bg-noise"
      id="keunggulan"
    >
      {/* Background Security Matrix, Dot Grid & Corner Guide Vectors */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        {/* Ambient Aurora Brand Mesh Lighting */}
        <div className="absolute top-1/2 -left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/15 via-primary/10 to-transparent blur-[140px] -translate-y-1/2" />
        <div className="absolute top-1/3 -right-20 w-[550px] h-[500px] rounded-full bg-gradient-to-bl from-warning/15 via-primary/10 to-transparent blur-[130px]" />

        {/* Modern Dot Matrix Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Custom SVG Precision Security Grid Motif */}
        <svg
          className="absolute -bottom-10 -left-10 w-96 h-96 text-primary/[0.07] dark:text-primary/[0.1]"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="6 8"
          />
          <circle
            cx="200"
            cy="200"
            r="100"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="200"
            r="40"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="200"
            y1="0"
            x2="200"
            y2="400"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <line
            x1="0"
            y1="200"
            x2="400"
            y2="200"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            cx="200"
            cy="40"
            r="3"
            fill="var(--color-warning)"
            fillOpacity="0.6"
          />
          <circle
            cx="360"
            cy="200"
            r="3"
            fill="var(--color-primary)"
            fillOpacity="0.5"
          />
        </svg>

        {/* Top & Bottom Edge Gradient Transitions */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <h2 className="theme-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground text-balance leading-tight">
            Solusi Nyaman untuk Pemilik Usaha yang Mau Hasil Maksimal
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-balance leading-relaxed">
            Fokus kami adalah membuat bisnis Anda terlihat profesional dan
            terpercaya di mata pelanggan, tanpa membebani Anda dengan urusan
            teknis.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Real Value & Operational Security Showcase Panel */}
          <div className="lg:col-span-5 relative">
            <div className="theme-card bg-primary text-primary-foreground p-7 sm:p-9 relative overflow-hidden space-y-6 border-2 border-primary-foreground/30 shadow-2xl">
              {/* Subtle Pattern & Gold Highlight */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-warning/15 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2 relative z-10">
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-primary-foreground leading-snug">
                  Transparan, Siap Pakai, & Terlindungi Penuh
                </h3>
                <p className="text-xs sm:text-sm text-primary-foreground/90 leading-relaxed font-normal">
                  Setiap proyek dikembangkan langsung oleh tim berdedikasi
                  dengan standar keamanan tinggi dan kemudahan akses pemilik
                  bisnis.
                </p>
              </div>

              {/* Concrete Value Modules inside Panel (SOLID AMBER/GOLD CLAY 3D) */}
              <div className="space-y-3.5 relative z-10 pt-2">
                {[
                  {
                    icon: CalendarCheck,
                    title: "Timeline Terarah",
                    desc: "Mulai 3 s/d 7 Hari Kerja Selesai",
                  },
                  {
                    icon: Globe,
                    title: "Website & Domain Resmi Milik Anda",
                    desc: "Bukan sistem sewa. Aset digital mandiri bisnis Anda",
                  },
                  {
                    icon: Wrench,
                    title: "Dukungan Pemeliharaan",
                    desc: "Backup Rutin & Bantuan Teknis",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-slate-950 border-2 border-amber-200/90 shadow-[0_8px_20px_-3px_rgba(0,0,0,0.35),0_0_12px_rgba(245,158,11,0.2),inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-3px_6px_rgba(180,83,9,0.35)] flex items-center justify-between gap-3.5 hover:scale-[1.015] hover:shadow-[0_12px_26px_-3px_rgba(0,0,0,0.45),0_0_16px_rgba(245,158,11,0.3),inset_0_2px_4px_rgba(255,255,255,0.85),inset_0_-3px_6px_rgba(180,83,9,0.4)] transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="size-11 rounded-full bg-primary text-amber-300 flex items-center justify-center shrink-0 shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.4)] border border-primary-foreground/20 group-hover:scale-105 transition-transform">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <span className="text-sm font-black block text-slate-950 leading-tight tracking-tight">
                            {item.title}
                          </span>
                          <span className="text-xs text-slate-900/90 font-bold leading-snug">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Support Badge */}
              <div className="pt-2 border-t border-primary-foreground/20 flex items-center gap-2 text-xs text-primary-foreground/90 font-medium">
                <MessageCircle className="w-4 h-4 text-warning shrink-0" />
                <span>Konsultasi & panduan langsung via WhatsApp</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Structured List of 4 Advantages */}
          <div className="lg:col-span-7 space-y-4">
            {advantages.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="p-5 sm:p-6 theme-card bg-card transition-all duration-300 group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
                >
                  {/* Left: Icon Centered to Card (Round Claymorphic Circle) */}
                  <div className="size-12 sm:size-13 rounded-full bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center shrink-0 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.9),inset_-2px_-2px_5px_rgba(12,53,106,0.14),0_4px_10px_rgba(12,53,106,0.08)] dark:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.15),inset_-2px_-2px_5px_rgba(0,0,0,0.4),0_4px_10px_rgba(0,0,0,0.3)] border border-primary/25 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon className="size-6 transition-transform duration-300" />
                  </div>

                  {/* Right: Content Details */}
                  <div className="space-y-1 flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
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
