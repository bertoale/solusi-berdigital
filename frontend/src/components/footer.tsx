"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SITE_CONFIG } from "@/lib/site-config";
import { PhoneCall, Mail, MapPin, Lock } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  // Jika berada di admin dashboard atau halaman login, sembunyikan footer publik
  if (pathname?.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  return (
    <footer className="border-t border-border/80 bg-card/60 text-foreground pt-14 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12">
          {/* Col 1: Brand & Bio (2 Cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative size-10 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Image
                  src="/logo-solusi-berdigital.png"
                  alt="Logo Solusi Berdigital"
                  width={40}
                  height={40}
                  className="object-contain size-full"
                />
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">
                Solusi Berdigital
              </span>
            </Link>

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Jasa pembuatan website profesional, toko online WhatsApp, dan
              sistem bisnis digital siap pakai untuk UMKM, korporat, dan
              pengusaha di seluruh Indonesia.
            </p>
          </div>

          {/* Col 2: Pilihan Layanan */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground tracking-tight">
              Pilihan Layanan
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link
                  href="/layanan/company-profile"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Company Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/layanan/toko-online"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Toko Online WhatsApp
                </Link>
              </li>
              <li>
                <Link
                  href="/layanan/landing-page"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Landing Page Iklan
                </Link>
              </li>
              <li>
                <Link
                  href="/layanan/sistem-bisnis-kustom"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Sistem Bisnis & Inventory
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigasi Halaman */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground tracking-tight">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link
                  href="/layanan"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Semua Layanan
                </Link>
              </li>
              <li>
                <Link
                  href="/portofolio"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Portofolio & Studi Kasus
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Blog & Edukasi Digital
                </Link>
              </li>
              <li>
                <Link
                  href="/#cara-kerja"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Alur Cara Kerja
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontak & WhatsApp Direct */}
          <div className="space-y-3.5">
            <h4 className="font-bold text-sm text-foreground tracking-tight">
              Hubungi Kami
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-muted-foreground">
              <div className="flex flex-col gap-2">
                <a
                  href={SITE_CONFIG.getWhatsappUrl(
                    "Halo Solusi Berdigital, saya ingin konsultasi layanan digital."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-btn inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold text-xs px-4 h-9.5 rounded-xl active:scale-[0.98] transition-all w-full sm:w-auto shadow-xs"
                >
                  <PhoneCall className="size-3.5 shrink-0" />
                  <span>Chat via WhatsApp</span>
                </a>
                <a
                  href={SITE_CONFIG.getMailtoUrl("Konsultasi Layanan Solusi Berdigital")}
                  className="theme-btn inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold text-xs px-4 h-9.5 rounded-xl border border-border transition-colors w-full sm:w-auto shadow-xs"
                >
                  <Mail className="size-3.5 text-primary shrink-0" />
                  <span>Kirim Email</span>
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                <span>Badung, Bali & Layanan Online Seluruh Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Separator Component */}
        <Separator className="my-2" />

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Solusi Berdigital. Hak Cipta
            Dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors text-[11px] opacity-70 hover:opacity-100"
            >
              <Lock className="size-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
