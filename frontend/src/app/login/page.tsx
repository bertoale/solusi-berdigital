"use client";

import React, { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { loginAdminAction } from "@/lib/actions";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="admin-panel min-h-screen flex items-center justify-center bg-muted/40 px-4 py-12">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[550px] h-[500px] bg-primary/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[450px] bg-warning/15 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="relative size-12 shrink-0 flex items-center justify-center theme-card group-hover:scale-105 transition-transform bg-card">
              <Image
                src="/logo-solusi-berdigital.png"
                alt="Logo Solusi Berdigital"
                width={40}
                height={40}
                priority
                className="object-contain size-full p-1"
              />
            </div>
            <div className="text-left">
              <span className="theme-text font-bold text-lg tracking-tight text-foreground block">
                Solusi Berdigital
              </span>
              <span className="text-xs text-primary font-bold">
                Admin CMS Portal
              </span>
            </div>
          </Link>
          <p className="text-xs text-muted-foreground">
            Masuk dengan akun terdaftar untuk mengelola Portofolio dan Artikel Blog
          </p>
        </div>

        {/* Login Form Card */}
        <div className="theme-card bg-card/95 backdrop-blur-md p-6 sm:p-8 space-y-6">
          <form action={formAction} className="space-y-4">
            {state?.error && (
              <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold leading-relaxed">
                {state.error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                Email Admin
              </label>
              <div className="relative">
                <Mail className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@solusiberdigital.id"
                  className="w-full h-11 pl-10 pr-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-4 theme-inset bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium rounded-xl"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-sm theme-btn flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{isPending ? "Memverifikasi Database..." : "Masuk ke Dashboard"}</span>
              <ArrowRight className="size-4" />
            </Button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              ← Kembali ke Beranda Publik
            </Link>
          </div>
        </div>

        <div className="text-center text-[11px] text-muted-foreground flex items-center justify-center gap-1.5">
          <ShieldCheck className="size-3.5 text-emerald-500" />
          <span>Sesi terenkripsi HMAC & HTTP-Only Cookie</span>
        </div>
      </div>
    </div>
  );
}
