import React from "react";
import type { StaticService } from "@/lib/services-data";

interface ServiceDetailSchemaProps {
  service: StaticService;
}

export function ServiceDetailSchema({ service }: ServiceDetailSchemaProps) {
  const cleanPrice = service.priceStartingFrom
    ? service.priceStartingFrom.replace(/[^0-9]/g, "")
    : "1000000";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://solusiberdigital.id/layanan/${service.slug}#service`,
    name: service.title,
    description: service.fullDesc,
    provider: {
      "@id": "https://solusiberdigital.id/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.features.map((feat) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: feat,
        },
      })),
    },
    offers: {
      "@type": "Offer",
      price: cleanPrice,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `https://solusiberdigital.id/layanan/${service.slug}`,
    },
  };

  const faqSchema =
    service.faqs && service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
