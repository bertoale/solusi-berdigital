import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";

export function OrganizationSchema() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://solusiberdigital.id/#organization",
    name: "Solusi Berdigital",
    alternateName: "Solusi Berdigital Web Development & IT Solution",
    url: "https://solusiberdigital.id",
    logo: "https://solusiberdigital.id/logo-solusi-berdigital.png",
    image: "https://solusiberdigital.id/logo-solusi-berdigital.png",
    description:
      "Jasa pembuatan website profesional, toko online katalog WhatsApp, landing page iklan, dan sistem informasi & aplikasi bisnis kustom untuk UMKM dan perusahaan di Indonesia.",
    telephone: `+${SITE_CONFIG.whatsapp}`,
    email: SITE_CONFIG.email,
    priceRange: "Rp 1.000.000 - Rp 10.000.000",
    currenciesAccepted: "IDR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, QRIS",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dalung, Kuta Utara",
      addressLocality: "Badung",
      addressRegion: "Bali",
      postalCode: "80361",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.6478,
      longitude: 115.1786,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "21:00",
      },
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "Indonesia",
      },
      {
        "@type": "AdministrativeArea",
        name: "Bali",
      },
      {
        "@type": "AdministrativeArea",
        name: "Badung",
      },
      {
        "@type": "AdministrativeArea",
        name: "Denpasar",
      },
    ],
    sameAs: [
      SITE_CONFIG.getWhatsappUrl(),
      "https://www.instagram.com/solusiberdigital",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Pengembangan Web & Aplikasi",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Jasa Pembuatan Website Profil Perusahaan (Company Profile)",
            description: "Website profil bisnis kredibel terintegrasi Google Maps dengan gratis domain & hosting.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Jasa Pembuatan Toko Online WhatsApp",
            description: "Website katalog produk belanja online langsung terhubung checkout pesanan ke WhatsApp.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Jasa Pembuatan Landing Page Iklan",
            description: "Halaman penawaran terstruktur loading cepat untuk campaign Google Ads dan Meta Ads.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Jasa Sistem Informasi & Aplikasi Bisnis Kustom",
            description: "Sistem manajemen inventory stok, pencatatan transaksi operasional, dan dashboard web kustom.",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://solusiberdigital.id/#website",
    url: "https://solusiberdigital.id",
    name: "Solusi Berdigital",
    publisher: {
      "@id": "https://solusiberdigital.id/#organization",
    },
    inLanguage: "id-ID",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

// Alias for backwards compatibility
export const SeoGeoSchema = OrganizationSchema;
