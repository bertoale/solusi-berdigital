import React from "react";

interface BlogFaq {
  question: string;
  answer: string;
}

interface BlogData {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  publishedAt: string | Date;
  updatedAt?: string | Date | null;
  tags?: string[] | null;
  blogFaqs?: BlogFaq[] | null;
}

interface BlogDetailSchemaProps {
  blog: BlogData;
  publicImageUrl?: string;
}

export function BlogDetailSchema({ blog, publicImageUrl }: BlogDetailSchemaProps) {
  const articleUrl = `https://solusiberdigital.id/blog/${blog.slug}`;
  const publishedDate = new Date(blog.publishedAt).toISOString();
  const modifiedDate = new Date(blog.updatedAt || blog.publishedAt).toISOString();

  // 1. Article / BlogPosting Schema
  const articleSchema: Record<string, unknown> = {
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    isPartOf: {
      "@type": "WebPage",
      "@id": articleUrl,
      url: articleUrl,
      name: blog.title,
    },
    headline: blog.title,
    description: blog.excerpt,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Solusi Berdigital",
      url: "https://solusiberdigital.id",
      logo: {
        "@type": "ImageObject",
        url: "https://solusiberdigital.id/logo-solusi-berdigital.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleSection: blog.category,
  };

  if (publicImageUrl) {
    articleSchema.image = [publicImageUrl];
  }
  if (blog.tags && blog.tags.length > 0) {
    articleSchema.keywords = blog.tags.join(", ");
  }

  // 2. FAQPage Schema (Jika memiliki FAQ)
  const faqList = (blog.blogFaqs || []).filter(
    (faq) => faq.question?.trim() && faq.answer?.trim()
  );

  const faqSchema =
    faqList.length > 0
      ? {
          "@type": "FAQPage",
          "@id": `${articleUrl}#faq`,
          mainEntity: faqList.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [articleSchema, ...(faqSchema ? [faqSchema] : [])],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
    />
  );
}
