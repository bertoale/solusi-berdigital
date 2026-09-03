import React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { logoutAdminAction } from "@/lib/actions";
import {
  LayoutDashboard,
  Briefcase,
  BookOpen,
  LogOut,
  ExternalLink,
  Shield,
  Tag,
  FolderTree,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // Wajib autentikasi untuk semua halaman di dalam (dashboard)
  if (!session) {
    redirect("/login");
  }

  const navGroups = [
    {
      group: "Utama",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      ],
    },
    {
      group: "Portofolio",
      items: [
        { label: "Semua Portofolio", href: "/admin/portofolio", icon: Briefcase },
        { label: "Kategori Portofolio", href: "/admin/portofolio/kategori", icon: FolderTree },
      ],
    },
    {
      group: "Blog & Artikel",
      items: [
        { label: "Semua Artikel", href: "/admin/blog", icon: BookOpen },
        { label: "Kategori Blog", href: "/admin/blog/kategori", icon: Tag },
      ],
    },
  ];

  return (
    <div className="admin-panel min-h-screen bg-muted/30 text-foreground flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="w-full md:w-68 shrink-0 bg-card border-r border-border flex flex-col justify-between p-5 md:min-h-screen relative z-20">
        <div className="space-y-6">
          {/* Logo Brand */}
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative size-10 shrink-0 flex items-center justify-center theme-card bg-card">
              <Image
                src="/logo-solusi-berdigital.png"
                alt="Logo Solusi Berdigital"
                width={32}
                height={32}
                className="object-contain size-full p-1"
              />
            </div>
            <div>
              <span className="theme-text font-bold text-sm tracking-tight text-foreground block">
                Solusi Berdigital
              </span>
              <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
                Admin Panel
              </span>
            </div>
          </Link>

          {/* Nav Groups with Claymorphism */}
          <nav className="space-y-4">
            {navGroups.map((grp, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-wider px-4">
                  {grp.group}
                </span>
                <div className="space-y-0.5">
                  {grp.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-all hover:translate-x-1"
                      >
                        <Icon className="size-4 text-primary" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Bottom Profile & Actions */}
        <div className="pt-6 border-t border-border space-y-4">
          <Link
            href="/"
            target="_blank"
            className="theme-btn flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground bg-secondary/60 border border-border transition-all"
          >
            <span>Lihat Website Publik</span>
            <ExternalLink className="size-3.5" />
          </Link>

          {/* Admin User Info Card in Claymorphism */}
          <div className="p-3.5 theme-inset bg-muted/40 border border-border flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="size-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs shrink-0 theme-card-flat">
                {session.name ? session.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-foreground block truncate">
                  {session.name || "Administrator"}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono block truncate">
                  {session.email}
                </span>
              </div>
            </div>

            <form action={logoutAdminAction}>
              <button
                type="submit"
                title="Keluar / Logout"
                className="p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
              >
                <LogOut className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top bar for breadcrumb */}
        <header className="h-16 border-b border-border/80 bg-card/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Shield className="size-3.5 text-emerald-500" />
            <span>Mode Admin Terotentikasi</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground hidden sm:inline-block">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Page children content */}
        <div className="p-6 sm:p-8 lg:p-10 flex-1">{children}</div>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
