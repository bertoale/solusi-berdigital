import React from "react";
import { BlogView } from "@/lib/data-store";
import { getPublicImageUrl } from "@/lib/s3";

interface HomeBlogItemListSchemaProps {
  blogs: BlogView[];
}

export function HomeBlogItemListSchema({ blogs }: HomeBlogItemListSchemaProps) {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://solusiberdigital.com/#recent-blogs",
    name: "Artikel & Wawasan Bisnis Digital Terbaru",
    description: "Kumpulan panduan praktis dan artikel edukasi bisnis digital terbaru dari Solusi Berdigital.",
    numberOfItems: blogs.length,
    itemListElement: blogs.map((blog, index) => {
      const articleUrl = `https://solusiberdigital.com/blog/${blog.slug}`;
      const item: Record<string, unknown> = {
        "@type": "ListItem",
        position: index + 1,
        url: articleUrl,
        item: {
          "@type": "BlogPosting",
          "@id": `${articleUrl}#article`,
          url: articleUrl,
          headline: blog.title,
          description: blog.excerpt,
          datePublished: new Date(blog.publishedAt).toISOString(),
          dateModified: new Date(blog.updatedAt || blog.publishedAt).toISOString(),
          author: {
            "@type": "Person",
            name: blog.author,
          },
          publisher: {
            "@type": "Organization",
            name: "Solusi Berdigital",
            url: "https://solusiberdigital.com",
            logo: {
              "@type": "ImageObject",
              url: "https://solusiberdigital.com/logo-solusi-berdigital.png",
            },
          },
          articleSection: blog.category,
        },
      };

      if (blog.imagePath) {
        (item.item as Record<string, unknown>).image = getPublicImageUrl(blog.imagePath);
      }

      return item;
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
    />
  );
}
