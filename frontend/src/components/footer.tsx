"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PhoneCall, Mail, MapPin, CheckCircle2 } from "lucide-react";

export function Footer() {
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
              Jasa pembuatan website profesional, toko online, dan sistem
              digital siap pakai untuk UMKM, pebisnis, dan instansi di seluruh
              Indonesia.
            </p>
          </div>

          {/* Col 2: Pilihan Layanan */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground tracking-tight">
              Pilihan Layanan
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <a
                  href="#layanan"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Company Profile
                </a>
              </li>
              <li>
                <a
                  href="#layanan"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Toko Online WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="#layanan"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Landing Page Iklan
                </a>
              </li>
              <li>
                <a
                  href="#layanan"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Sistem Kasir & POS
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground tracking-tight">
              Navigasi
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <a
                  href="#layanan"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Layanan
                </a>
              </li>
              <li>
                <a
                  href="#cara-kerja"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Cara Kerja
                </a>
              </li>
              <li>
                <a
                  href="#keunggulan"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Keunggulan Kami
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-foreground transition-colors block py-0.5"
                >
                  Tanya Jawab (FAQ)
                </a>
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
                <span>Jakarta & Layanan Online Seluruh Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shadcn Separator Component */}
        <Separator className="my-2" />

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Solusi Berdigital. Hak Cipta
            Dilindungi.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              Dibuat untuk memajukan transformasi digital bisnis Indonesia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
