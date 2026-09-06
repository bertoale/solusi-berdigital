import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { OrganizationSchema } from "@/jsonLD";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  // Title (56 karakter): Mencakup primary high-intent keywords tanpa terpotong di Google Search
  title: "Jasa Pembuatan Website & Toko Online | Solusi Berdigital",
  // Description (159 karakter): Target pasar luas (UMKM & bisnis), ragam layanan, USP & free domain/hosting
  description:
    "Jasa pembuatan website profesional, toko online WhatsApp, landing page & sistem bisnis kustom untuk UMKM & perusahaan di Indonesia. Gratis domain & hosting 1 tahun.",
  keywords: [
    "jasa pembuatan website",
    "jasa bikin website",
    "toko online whatsapp",
    "jasa landing page iklan",
    "website company profile",
    "sistem bisnis kustom",
    "aplikasi inventory web",
    "jasa website umkm",
    "jasa website indonesia",
    "solusi berdigital",
  ],
  authors: [{ name: "Solusi Berdigital" }],
  creator: "Solusi Berdigital",
  publisher: "Solusi Berdigital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Canonical URL Configuration
  metadataBase: new URL("https://solusiberdigital.com"),
  alternates: {
    canonical: "https://solusiberdigital.com",
  },
  openGraph: {
    title: "Jasa Pembuatan Website & Toko Online | Solusi Berdigital",
    description:
      "Jasa pembuatan website profesional, toko online WhatsApp, landing page & sistem kasir untuk UMKM & bisnis di Indonesia. Gratis domain & hosting 1 tahun.",
    url: "https://solusiberdigital.com",
    siteName: "Solusi Berdigital",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa Pembuatan Website & Toko Online | Solusi Berdigital",
    description:
      "Jasa pembuatan website profesional, toko online WhatsApp, landing page & sistem kasir untuk UMKM & bisnis di Indonesia. Gratis domain & hosting 1 tahun.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/solusi-berdigital.ico",
    shortcut: "/solusi-berdigital.ico",
    apple: "/solusi-berdigital.ico",
  },
  verification: {
    google: "MhrVTLOPosbInYUqsjpikBdVu8BXuiq_2gALQk4QGuI",
  },
  other: {
    "geo.region": "ID-BA",
    "geo.placename": "Badung, Bali, Indonesia",
    "geo.position": "-8.6478;115.1786",
    "ICBM": "-8.6478, 115.1786",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="icon" href="/solusi-berdigital.ico" sizes="any" />
      </head>
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground tracking-[-0.01em]`}
      >
        <OrganizationSchema />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LY8XBQQZ3G"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LY8XBQQZ3G');
          `}
        </Script>
      </body>
    </html>
  );
}
