"use client"

import React, { useState } from "react"
import {
  CheckCircle2,
  LayoutGrid,
  ChevronRight,
  ShieldCheck,
} from "lucide-react"
import { SITE_CONFIG } from "@/lib/site-config"

interface ShowcaseItem {
  id: string
  title: string
  clientType: string
  category: string
  description: string
  features: string[]
  mockupType: "browser" | "mobile"
  previewData: {
    heroTitle: string
    heroSubtitle: string
    accentBadge: string
    stats: { label: string; value: string }[]
    elements: { title: string; subtitle: string; tag?: string }[]
  }
}

const showcases: ShowcaseItem[] = [
  {
    id: "company-profile",
    title: "PT Nusantara Prima Solusindo",
    clientType: "Kontraktor & Konsultan Teknik",
    category: "Website Profil Perusahaan",
    description:
      "Website korporasi dengan navigasi terstruktur, galeri proyek beresolusi tinggi, sertifikasi legalitas usaha, dan formulir penawaran harga cepat.",
    features: ["Loading 1.2 detik", "Terdaftar di Google Maps", "SEO On-Page Lengkap"],
    mockupType: "browser",
    previewData: {
      heroTitle: "Solusi Konstruksi & Rekayasa Teknik Terintegrasi",
      heroSubtitle: "Mitra terpercaya proyek infrastruktur & komersial sejak 2018.",
      accentBadge: "Verified Business",
      stats: [
        { label: "Proyek Selesai", value: "140+" },
        { label: "Kota Jangkauan", value: "18 Kota" },
        { label: "Sertifikasi ISO", value: "9001:2015" },
      ],
      elements: [
        { title: "Jasa Konstruksi Gedung", subtitle: "Struktur beton & baja bertingkat", tag: "Layanan" },
        { title: "Renovasi Komersial", subtitle: "Kantor, cafe & ruko siap pakai", tag: "Layanan" },
        { title: "Konsultasi MEP", subtitle: "Mekanikal & elektrikal berstandar SNI", tag: "Layanan" },
      ],
    },
  },
  {
    id: "online-store",
    title: "Katalog Sambal & Oleh-Oleh Bu Hj. Endang",
    clientType: "UMKM Kuliner & Retail",
    category: "Toko Online Katalog WhatsApp",
    description:
      "Katalog kuliner khas dengan foto menggugah selera, filter varian rasa pedas, dan tombol order otomatis yang langsung menyusun format WhatsApp ke admin.",
    features: ["Checkout 1-Klik ke WA", "100% Tanpa Potongan Komisi", "Update Produk dari HP"],
    mockupType: "browser",
    previewData: {
      heroTitle: "Cita Rasa Sambal Nusantara Asli & Higienis",
      heroSubtitle: "Dibuat dari cabai pilihan segar tanpa bahan pengawet kimia.",
      accentBadge: "Halal & P-IRT",
      stats: [
        { label: "Pesanan Dikirim", value: "12.500+" },
        { label: "Rating Pembeli", value: "4.9/5" },
        { label: "Varian Rasa", value: "8 Pilihan" },
      ],
      elements: [
        { title: "Sambal Bawang Cumi 200g", subtitle: "Rp 35.000 • Best Seller", tag: "Stok Ready" },
        { title: "Sambal Roa Manado 180g", subtitle: "Rp 42.000 • Ikan Asap Asli", tag: "Stok Ready" },
        { title: "Paket Hampers 3 Varian", subtitle: "Rp 99.000 • Box Eksklusif", tag: "Promo" },
      ],
    },
  },
  {
    id: "landing-page",
    title: "Workshop Digital Marketing Mastery",
    clientType: "Pelatihan & Konsultan Bisnis",
    category: "Landing Page Iklan Berkonversi",
    description:
      "Landing page khusus event dengan alur copywriting persuasif, countdown timer pendaftaran, silabus materi terperinci, dan integrasi Meta Pixel.",
    features: ["Kecepatan Mobile < 1.5s", "Tracking Meta & TikTok Ads", "Integrasi Tiket WA"],
    mockupType: "browser",
    previewData: {
      heroTitle: "Bongkar Rahasia Iklan Meta & TikTok Hasilkan Ratusan Juta",
      heroSubtitle: "Workshop intensif 2 hari bersama praktisi berpengalaman 7+ tahun.",
      accentBadge: "Batch 14 - Terbatas 30 Kursi",
      stats: [
        { label: "Alumni Terlatih", value: "1.200+" },
        { label: "Kepuasan Materi", value: "98.4%" },
        { label: "Sisa Kuota", value: "7 Kursi" },
      ],
      elements: [
        { title: "Modul 1: Riset Target Audiens", subtitle: "Menemukan pembeli ideal tanpa boncos" },
        { title: "Modul 2: Formula Video Kreatif", subtitle: "Hook 3 detik pertama yang bikin closing" },
        { title: "Modul 3: Scaling & Retargeting", subtitle: "Naikkan budget iklan tanpa bikin rugi" },
      ],
    },
  },
  {
    id: "pos-system",
    title: "Sistem Kasir & Gudang Resto Kopi Senja",
    clientType: "F&B & Multi-Outlet Cafe",
    category: "Sistem Bisnis & POS Kustom",
    description:
      "Sistem kasir web-based ringan yang berjalan mulus di tablet android dan laptop kasir. Mendukung cetak struk Bluetooth dan rekap omzet harian instan.",
    features: ["Cetak Struk Thermal", "Pemisahan Hak Akses PIN", "Laporan Omzet Real-Time"],
    mockupType: "browser",
    previewData: {
      heroTitle: "Dashboard Kasir & Manajemen Stok Terpusat",
      heroSubtitle: "Pantau omzet 3 cabang cafe dari satu layar smartphone pemilik.",
      accentBadge: "Shift Pagi - Kasir 01 Aktif",
      stats: [
        { label: "Transaksi Hari Ini", value: "Rp 4.850.000" },
        { label: "Total Struk", value: "128 Struk" },
        { label: "Stok Kopi Sisa", value: "14.2 Kg" },
      ],
      elements: [
        { title: "Kopi Susu Gula Aren (Regular)", subtitle: "Qty: 48 Cup • Rp 864.000", tag: "Terlaris" },
        { title: "Croissant Butter Toast", subtitle: "Qty: 22 Pcs • Rp 550.000", tag: "Menu Cafe" },
        { title: "Americano Arabica Single", subtitle: "Qty: 18 Cup • Rp 360.000", tag: "Menu Cafe" },
      ],
    },
  },
]

export function PortfolioShowcaseSection() {
  const [activeTab, setActiveTab] = useState(showcases[0].id)
  const current = showcases.find((item) => item.id === activeTab) || showcases[0]

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-[#0C356A]/[0.02] to-background border-b border-border/80 relative overflow-hidden bg-noise" id="showcase">
      {/* Background Ambient Glow & Dot Matrix */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#FFC436]/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#0C356A_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-muted text-foreground border border-border text-xs font-semibold tracking-wide mb-3">
            <LayoutGrid className="size-3.5 text-primary" />
            <span>CONTOH HASIL PENGERJAAN NYATA</span>
          </div>
          <h2 className="theme-text text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground text-balance">
            Preview Desain & Struktur Website yang Kami Bangun
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed text-balance">
            Lihat bagaimana kami merancang layout yang rapi, cepat dibuka, dan disesuaikan secara spesifik dengan karakteristik model bisnis Anda.
          </p>
        </div>

        {/* Tab Navigation Pill/Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {showcases.map((item) => {
            const isActive = item.id === activeTab
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.category}
              </button>
            )
          })}
        </div>

        {/* Active Showcase Card (Editorial Split Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-card border border-border rounded-xl p-6 sm:p-8 shadow-xs">
          
          {/* Left Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider">
                  {current.clientType}
                </span>
                <h3 className="text-2xl font-bold text-foreground tracking-tight leading-snug">
                  {current.title}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {current.description}
              </p>

              {/* Verified Highlights */}
              <div className="pt-2 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wide text-foreground block">
                  Standar Implementasi:
                </span>
                {current.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-foreground/90 font-medium">
                    <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inquire for similar model button */}
            <div className="pt-4 border-t border-border/80">
              <a
                href={SITE_CONFIG.getWhatsappUrl(
                  `Halo Solusi Berdigital, saya tertarik dengan model website seperti ${current.title} (${current.category})`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-xs px-5 h-10 rounded-lg border border-border transition-colors w-full sm:w-auto"
              >
                <span>Konsultasikan Model Serupa via WhatsApp</span>
                <ChevronRight className="size-4 opacity-70" />
              </a>
            </div>
          </div>

          {/* Right Live UI Mockup Simulation Column */}
          <div className="lg:col-span-7 bg-muted/40 border border-border/80 rounded-lg p-4 sm:p-6 flex flex-col justify-between">
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/80">
              <div className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full bg-red-400/80" />
                <div className="size-2.5 rounded-full bg-amber-400/80" />
                <div className="size-2.5 rounded-full bg-emerald-400/80" />
                <div className="ml-2 px-2.5 py-0.5 rounded bg-background text-foreground/80 font-mono text-[10px] sm:text-xs border border-border">
                  https://demo.{current.id}.solusiberdigital.id
                </div>
              </div>
              <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="size-3" />
                SSL Verified
              </span>
            </div>

            {/* Mockup Screen Content */}
            <div className="space-y-4 bg-background border border-border rounded-md p-4 sm:p-5 shadow-2xs">
              
              {/* Badge & Mockup Header */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  {current.previewData.accentBadge}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">Mobile-First UI</span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug">
                  {current.previewData.heroTitle}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {current.previewData.heroSubtitle}
                </p>
              </div>

              {/* Live Metric Stats */}
              <div className="grid grid-cols-3 gap-2 pt-2 pb-1 border-y border-border/60">
                {current.previewData.stats.map((st, idx) => (
                  <div key={idx} className="text-center p-2 rounded bg-muted/40">
                    <span className="font-extrabold text-xs sm:text-sm text-foreground block">
                      {st.value}
                    </span>
                    <span className="text-[10px] text-muted-foreground block truncate">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sample Product / Content Grid */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-semibold text-muted-foreground block">
                  Elemen & Struktur Konten:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {current.previewData.elements.map((el, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded border border-border/80 bg-card text-left space-y-0.5"
                    >
                      {el.tag && (
                        <span className="text-[9px] font-bold uppercase text-primary block">
                          {el.tag}
                        </span>
                      )}
                      <span className="text-xs font-semibold text-foreground block line-clamp-1">
                        {el.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground block line-clamp-1">
                        {el.subtitle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Mockup Footer Caption */}
            <div className="pt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Desain Kustom • Bukan Template Pasaran</span>
              <span>100% Responsif di Semua Perangkat</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
