"use client";

import React from "react";
import Image from "next/image";
import {
  Building2,
  Store,
  Megaphone,
  Calculator,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  badgeText?: string;
  shortDesc: string;
  icon: typeof Building2;
  recommendedFor: string;
  deliveryTime: string;
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: "company-profile",
    title: "Website Profil Perusahaan (Company Profile)",
    category: "Branding & Kredibilitas",
    badgeText: "Paling Populer",
    shortDesc:
      "Tingkatkan wibawa usaha dan kepercayaan calon klien dengan website profil yang elegan, cepat dibuka, dan terdaftar resmi di Google Maps.",
    icon: Building2,
    recommendedFor:
      "Perusahaan B2B, Kontraktor, Klinik & Faskes, Kantor Hukum, Konsultan, Yayasan, Sekolah, Pabrik, & UMKM Berkembang",
    deliveryTime: "Estimasi: 3 - 5 Hari Kerja",
    features: [
      "Halaman Beranda, Tentang Kami, Layanan, Portofolio & Kontak",
      "Tombol WhatsApp interaktif & Integrasi Google Maps",
      "Gratis Domain (.com) & Server Cloud Hosting 1 Tahun Pertama",
      "Desain responsif sempurna di Android, iPhone, Tablet & Laptop",
    ],
  },
  {
    id: "online-store",
    title: "Toko Online & Katalog WhatsApp",
    category: "Penjualan & Retail",
    badgeText: "Tingkatkan Order",
    shortDesc:
      "Pamerkan produk dengan katalog foto rapi tanpa repot koding. Pelanggan bisa memilih barang dan pesanan langsung otomatis masuk ke WhatsApp Anda.",
    icon: Store,
    recommendedFor:
      "Fashion & Hijab, Kuliner & Frozen Food, Skincare, Grosir, Distributor, Retailer, Toko Bangunan, Sparepart, & Toko Oleh-oleh",
    deliveryTime: "Estimasi: 4 - 7 Hari Kerja",
    features: [
      "Katalog produk dengan foto jernih, harga promo, & variasi ukuran/warna",
      "Sistem checkout praktis langsung merangkum format order ke WA",
      "Halaman admin super simpel untuk upload produk baru langsung dari HP",
      "Bebas biaya komisi penjualan per transaksi (100% omzet milik Anda)",
    ],
  },
  {
    id: "landing-page",
    title: "Landing Page Iklan & Promosi (High-Converting)",
    category: "Marketing & Iklan",
    badgeText: "Cocok Iklan Ads",
    shortDesc:
      "Halaman khusus satu produk atau promo berorientasi penjualan tinggi. Sangat ringan dan siap disambungkan ke iklan Facebook, Instagram, TikTok & Google Ads.",
    icon: Megaphone,
    recommendedFor:
      "Pengiklan Meta & Google Ads, Produk Herbal, Properti & Agen, Kursus/Pelatihan, Event & Seminar, Jasa Service, & Produk Viral",
    deliveryTime: "Estimasi: 2 - 4 Hari Kerja",
    features: [
      "Struktur copywriting persuasif yang memicu aksi beli cepat",
      "Struktur kode ringan teroptimasi PageSpeed tinggi",
      "Pemasangan Meta Pixel & Google Analytics siap pakai",
      "Tombol Call-to-Action (CTA) bertebaran strategis di sepanjang halaman",
    ],
  },
  {
    id: "custom-system",
    title: "Aplikasi Kasir (POS) & Sistem Bisnis Kustom",
    category: "Operasional & Otomasi",
    badgeText: "Otomatisasi Usaha",
    shortDesc:
      "Ucapkan selamat tinggal pada catatan manual di buku. Pantau stok barang, catat omzet harian kasir, dan lihat laporan keuntungan dari mana saja.",
    icon: Calculator,
    recommendedFor:
      "Resto & Cafe, Minimarket, Apotek, Bengkel, Toko Bangunan, Salon/Barbershop, Petshop, Ekspedisi, & Manajemen Stok Multi-Cabang",
    deliveryTime: "Estimasi: 7 - 14 Hari Kerja",
    features: [
      "Sistem kasir (Point of Sale) cetak struk & scan barcode",
      "Manajemen stok barang masuk & sisa stok gudang secara real-time",
      "Akses bertingkat dengan keamanan PIN (Kasir, Supervisor, Owner)",
      "Laporan penjualan & grafik keuntungan harian, mingguan, bulanan",
    ],
  },
];

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
          <path d="M50 0V400M150 0V400M250 0V400M350 0V400" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
          <path d="M0 50H400M0 150H400M0 250H400M0 350H400" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="250" cy="150" r="4" fill="var(--color-warning)" fillOpacity="0.4" />
          <circle cx="150" cy="250" r="4" fill="var(--color-primary)" fillOpacity="0.3" />
        </svg>

        {/* Edge Fade transitions */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        
        {/* Section Header with Side Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-12 sm:mb-16">
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground text-balance leading-tight">
              Solusi Pembuatan Website & Sistem Sesuai Kebutuhan Bisnis Anda
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-balance leading-relaxed">
              Semua paket sudah termasuk domain .com & server cloud hosting cepat tahun pertama, desain rapi, serta panduan bantuan pemakaian sampai Anda lancar menggunakannya.
            </p>
          </div>

          {/* Cutout Image enlarged to match title & subtitle height */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 justify-end items-center relative">
            <div className="relative w-full h-[280px] lg:h-[320px] xl:h-[350px] max-w-[360px] flex items-center justify-center">
              {/* Soft ambient back-glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-warning/15 to-transparent rounded-full blur-3xl -z-10" />
              <Image
                src="/service-image.png"
                alt="Solusi Berdigital Services"
                fill
                priority
                sizes="(max-width: 1200px) 35vw, 360px"
                className="object-contain object-right drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Uniform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="relative rounded-3xl border border-border/80 bg-card/90 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group"
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
                    <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary group-hover:scale-105 transition-transform">
                      <Icon className="size-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <div className="text-xs sm:text-sm text-primary font-semibold leading-relaxed">
                        Cocok untuk: <span className="text-muted-foreground font-normal">{service.recommendedFor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Feature Checklist Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/70 space-y-3">
                    <div className="text-xs font-bold text-foreground uppercase tracking-wide">
                      Fasilitas Lengkap yang Anda Dapatkan:
                    </div>
                    <ul className="space-y-2.5">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                          <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-6 mt-6 border-t border-border/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="text-xs text-muted-foreground font-medium hidden sm:flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>Garansi Penyesuaian Desain & Bantuan Teknis</span>
                  </div>
                  <a
                    href={`https://wa.me/6285858089376?text=Halo%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(
                      service.title
                    )}.%20Boleh%20minta%20info%20lebih%20lengkapnya?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-xs sm:text-sm px-6 h-11 rounded-xl shadow-md active:scale-[0.98] transition-all w-full sm:w-auto"
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
        <div className="mt-12 sm:mt-16 md:mt-20 p-6 sm:p-8 lg:p-10 rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-md flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <ShieldCheck className="size-4" />
              <span>Konsultasi Bebas Biaya Awal</span>
            </div>
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground tracking-tight">
              Belum tahu paket mana yang paling pas untuk bisnis Anda?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Ceritakan ide produk atau usaha Anda kepada tim kami via WhatsApp. Kami akan berikan rekomendasi struktur website terbaik beserta estimasi anggarannya.
            </p>
          </div>

          <a
            href="https://wa.me/6285858089376?text=Halo%20saya%20mau%20tanya%20rekomendasi%20paket%20website%20yang%20cocok%20untuk%20usaha%20saya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold text-sm sm:text-base px-8 h-12 rounded-2xl shadow-lg shadow-success/20 active:scale-[0.98] shrink-0 transition-all w-full sm:w-auto"
          >
            <PhoneCall className="size-4 sm:size-5 shrink-0" />
            <span>Tanya Rekomendasi via WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
