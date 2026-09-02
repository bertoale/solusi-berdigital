"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { PhoneCall, Mail, MapPin, Lock } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  // If in admin dashboard, hide public footer
  if (pathname?.startsWith("/admin")) {
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
                  href="/layanan/aplikasi-kasir-pos"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Sistem Kasir & POS
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
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground tracking-tight">
              Hubungi Kami
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <PhoneCall className="size-4 text-whatsapp shrink-0" />
                <a
                  href="https://wa.me/6285858089376"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors font-semibold"
                >
                  +62 858-5808-9376
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-primary shrink-0" />
                <span>halo@solusiberdigital.id</span>
              </div>
              <div className="flex items-start gap-2">
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
              href="/admin/login"
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
