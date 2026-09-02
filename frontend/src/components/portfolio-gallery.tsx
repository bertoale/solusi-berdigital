"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Lock,
  ExternalLink,
  Globe,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";
import { getPublicImageUrl } from "@/lib/s3";

interface PortfolioGalleryProps {
  images: string[];
  title: string;
  slug: string;
  liveUrl?: string | null;
  clientType: string;
  clientName: string;
  fullDescription: string;
}

export function PortfolioGallery({
  images,
  title,
  slug,
  liveUrl,
  clientType,
  clientName,
  fullDescription,
}: PortfolioGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayUrl = liveUrl
    ? liveUrl.replace(/^https?:\/\//, "")
    : `${slug}.solusiberdigital.id`;

  const hasImages = images && images.length > 0;
  const currentImage = hasImages ? images[activeIndex] : null;

  const nextImage = () => {
    if (images.length > 1) {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="space-y-8">
      {/* macOS Style Claymorphic Window Container */}
      <div className="theme-card bg-card/95 p-5 sm:p-8 space-y-6 rounded-[2rem] border border-border">
        {/* macOS Window Titlebar Header (Claymorphism Controls) */}
        <div className="flex items-center justify-between pb-4 border-b border-border/80 gap-3">
          {/* 3 Tactile 3D Window Control Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div
              title="Close"
              className="size-4 rounded-full bg-rose-500 shadow-[inset_1.5px_1.5px_3px_rgba(255,255,255,0.8),inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.35),1px_2px_4px_rgba(225,29,72,0.3)] transition-transform hover:scale-110"
            />
            <div
              title="Minimize"
              className="size-4 rounded-full bg-amber-400 shadow-[inset_1.5px_1.5px_3px_rgba(255,255,255,0.8),inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.35),1px_2px_4px_rgba(245,158,11,0.3)] transition-transform hover:scale-110"
            />
            <div
              title="Maximize"
              className="size-4 rounded-full bg-emerald-500 shadow-[inset_1.5px_1.5px_3px_rgba(255,255,255,0.8),inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.35),1px_2px_4px_rgba(16,185,129,0.3)] transition-transform hover:scale-110"
            />
          </div>

          {/* Recessed Claymorphic Searchbar / URL Address Bar */}
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Buka Website Live Demo"
              className="flex-1 max-w-md mx-auto hidden sm:flex items-center justify-center gap-1.5 px-4 py-2 theme-inset bg-background/80 border border-border/60 text-muted-foreground hover:text-foreground font-mono text-xs truncate transition-colors group cursor-pointer"
            >
              <Lock className="size-3 text-emerald-500 shrink-0" />
              <span className="text-muted-foreground/60">https://</span>
              <span className="text-foreground font-semibold truncate group-hover:text-primary transition-colors">
                {displayUrl}
              </span>
              <ExternalLink className="size-3 text-muted-foreground group-hover:text-primary shrink-0 ml-1" />
            </a>
          ) : (
            <div className="flex-1 max-w-md mx-auto hidden sm:flex items-center justify-center gap-1.5 px-4 py-2 theme-inset bg-background/80 border border-border/60 text-muted-foreground font-mono text-xs truncate">
              <Globe className="size-3 text-primary/60 shrink-0" />
              <span className="text-muted-foreground/60">https://</span>
              <span className="text-foreground font-semibold truncate">{displayUrl}</span>
            </div>
          )}

          {/* Status Badge */}
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold shrink-0 theme-pill px-3 py-1 bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="size-3.5" />
            <span className="hidden sm:inline">Verified Project</span>
          </div>
        </div>

        {/* Viewport: Image Showcase Stage if Images Exist */}
        {hasImages && currentImage && (
          <div className="space-y-4">
            {/* Main Active Image Display */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-[1.5rem] overflow-hidden theme-inset bg-muted/40 border border-border/80 group">
              <Image
                src={getPublicImageUrl(currentImage)}
                alt={`${title} - Preview ${activeIndex + 1}`}
                fill
                priority
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 900px"
              />

              {/* Navigation Arrows for Multi-image */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    title="Gambar Sebelumnya"
                    className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full theme-btn bg-background/80 hover:bg-background backdrop-blur-md flex items-center justify-center text-foreground border border-border opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    title="Gambar Selanjutnya"
                    className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full theme-btn bg-background/80 hover:bg-background backdrop-blur-md flex items-center justify-center text-foreground border border-border opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <ChevronRight className="size-5" />
                  </button>

                  {/* Indicator Counter Badge */}
                  <div className="absolute bottom-4 right-4 theme-pill px-3 py-1 bg-background/90 backdrop-blur-md border border-border text-xs font-mono font-bold text-foreground">
                    {activeIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails Row (Jika Gambar Lebih dari 1) */}
            {images.length > 1 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <ImageIcon className="size-3.5 text-primary" />
                  <span>Galeri Screenshot ({images.length} Tampilan Layar)</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {images.map((img, idx) => {
                    const isActive = idx === activeIndex;
                    const thumbUrl = getPublicImageUrl(img);

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={`relative aspect-[16/10] rounded-xl overflow-hidden transition-all cursor-pointer ${
                          isActive
                            ? "ring-2 ring-primary ring-offset-2 scale-105 shadow-md"
                            : "opacity-60 hover:opacity-100 hover:scale-102 theme-card-flat"
                        }`}
                      >
                        <Image
                          src={thumbUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover object-top"
                          sizes="150px"
                        />
                        <span className="absolute bottom-1 right-1 text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-background/90 text-foreground border border-border/80">
                          #{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Project Details / Full Description inside Viewport */}
        <div className="p-6 sm:p-10 theme-inset bg-card/60 border border-border/80 rounded-[1.5rem] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-border/60">
            <div className="space-y-1">
              <span className="text-xs font-mono text-primary font-bold block uppercase tracking-wider">
                {clientType} • {clientName}
              </span>
              <h2 className="theme-text text-xl sm:text-2xl font-bold text-foreground">
                Dokumentasi & Rincian Proyek
              </h2>
            </div>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="theme-btn inline-flex items-center gap-2 text-xs font-bold px-4 py-2 bg-primary text-primary-foreground transition-all"
              >
                <span>Kunjungi Demo</span>
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>

          {/* Deskripsi Biasa / Lengkap */}
          <div className="text-sm sm:text-base text-foreground/90 leading-relaxed whitespace-pre-line font-normal space-y-4">
            {fullDescription}
          </div>
        </div>
      </div>
    </div>
  );
}
