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
  authors: [{ name: "Solusi Berdigital" }],
  creator: "Solusi Berdigital",
  publisher: "Solusi Berdigital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://solusiberdigital.com"),
  openGraph: {
    title: "Jasa Pembuatan Website & Toko Online | Solusi Berdigital",
    description:
      "Jasa pembuatan website profesional, toko online WhatsApp, landing page & sistem bisnis kustom untuk UMKM & perusahaan di Indonesia. Gratis domain & hosting 1 tahun.",
    url: "https://solusiberdigital.com",
    siteName: "Solusi Berdigital",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa Pembuatan Website & Toko Online | Solusi Berdigital",
    description:
      "Jasa pembuatan website profesional, toko online WhatsApp, landing page & sistem bisnis kustom untuk UMKM & perusahaan di Indonesia. Gratis domain & hosting 1 tahun.",
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
    apple: "/apple-touch-icon.png",
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
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground tracking-[-0.01em]`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NKPNCGFQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <OrganizationSchema />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NKPNCGFQ');`}
        </Script>
      </body>
    </html>
  );
}
