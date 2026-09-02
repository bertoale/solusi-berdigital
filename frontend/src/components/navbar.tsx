"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // If in admin dashboard, let AdminLayout render its own specialized admin topbar/sidebar
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Layanan", href: "/layanan" },
    { label: "Portofolio", href: "/portofolio" },
    { label: "Blog", href: "/blog" },
    { label: "Cara Kerja", href: "/#cara-kerja" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between max-w-7xl">
        {/* Brand Logo with Image */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative size-10 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Image
              src="/logo-solusi-berdigital.png"
              alt="Logo Solusi Berdigital"
              width={40}
              height={40}
              priority
              className="object-contain size-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-foreground leading-none">
                Solusi Berdigital
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground font-medium leading-tight mt-0.5">
              Jasa Website & Sistem Bisnis
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-colors",
                  isActive
                    ? "text-foreground font-semibold bg-muted/80"
                    : "hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Action Button styled with Shadcn buttonVariants */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/6285858089376?text=Halo%20Solusi%20Berdigital%2C%20saya%20ingin%20konsultasi%20pembuatan%20website"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold shadow-md h-10 px-5 rounded-xl transition-all active:scale-[0.98] gap-2"
            )}
          >
            {/* WhatsApp Icon */}
            <svg
              className="w-4 h-4 fill-current shrink-0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zM12.05 20.2c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.22.25-.86.84-.86 2.06 0 1.21.88 2.39 1 2.56.12.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.3z" />
            </svg>
            <span>Konsultasi WA</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-2 border-t border-border">
            <a
              href="https://wa.me/6285858089376?text=Halo%20Solusi%20Berdigital%2C%20saya%20ingin%20konsultasi%20pembuatan%20website"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold h-11 rounded-xl shadow-md flex items-center justify-center gap-2"
              )}
            >
              <span>Chat WhatsApp Sekarang</span>
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
