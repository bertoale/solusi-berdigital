import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getBlogBySlug, getAllBlogs } from "@/lib/data-store";
import { calculateReadingTime } from "@/lib/reading-time";
import { getPublicImageUrl } from "@/lib/s3";
import { BlogFaqAccordion } from "@/components/blog-faq-accordion";
import { BlogDetailSchema } from "@/jsonLD";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Tag,
  PhoneCall,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) {
    return { title: "Artikel Tidak Ditemukan | Solusi Berdigital" };
  }
  return {
    title: `${blog.title} | Solusi Berdigital`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.imagePath ? [getPublicImageUrl(blog.imagePath)] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const readTime = calculateReadingTime(blog.content);
  const allBlogs = await getAllBlogs({ onlyPublished: true });
  const relatedBlogs = allBlogs.filter((b) => b.id !== blog.id).slice(0, 2);
  const publicImageUrl = blog.imagePath ? getPublicImageUrl(blog.imagePath) : undefined;
  const faqList = (blog.blogFaqs || []).filter(
    (faq) => faq.question?.trim() && faq.answer?.trim()
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden bg-noise">
      <BlogDetailSchema blog={blog} publicImageUrl={publicImageUrl} />

      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute top-10 right-1/4 w-[600px] h-[400px] bg-primary/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-warning/15 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      {/* Header Section */}
      <section className="py-12 sm:py-16 border-b border-border/60 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link
            href="/blog"
            className="theme-btn inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground px-4 py-2 rounded-xl bg-card border border-border mb-6 transition-all"
          >
            <ArrowLeft className="size-3.5" />
            <span>Kembali ke Semua Artikel</span>
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="theme-pill text-xs font-bold uppercase tracking-wider px-3.5 py-1 bg-primary/10 text-primary border border-primary/20">
                {blog.category}
              </span>
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 ml-auto">
                <Clock className="size-3.5 text-primary" />
                {readTime}
              </span>
            </div>

            <h1 className="theme-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              {blog.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
              {blog.excerpt}
            </p>

            {/* Author info bar */}
            <div className="pt-4 border-t border-border/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs theme-card-flat">
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">{blog.author}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {new Date(blog.publishedAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Body */}
      <section className="py-12 sm:py-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-12">
          
          {/* Article Content inside theme-card */}
          <div className="theme-card bg-card/95 backdrop-blur-md p-6 sm:p-10 space-y-8">
            
            {/* Cover Image if available */}
            {blog.imagePath && (
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden theme-inset bg-muted/40 border border-border">
                <Image
                  src={getPublicImageUrl(blog.imagePath)}
                  alt={blog.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
              </div>
            )}

            <div
              className="prose prose-slate dark:prose-invert max-w-none text-foreground/90 text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags footer */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="pt-6 border-t border-border flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground flex items-center gap-1 mr-2">
                  <Tag className="size-3.5" />
                  Tags:
                </span>
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-muted text-muted-foreground border border-border/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Interactive FAQ Accordion for Article & SEO */}
            {faqList.length > 0 && (
              <BlogFaqAccordion faqs={faqList} />
            )}
          </div>

          {/* Consultation CTA Banner */}
          <div className="p-8 sm:p-10 theme-card bg-gradient-to-br from-card via-card to-primary/5 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="theme-text text-xl sm:text-2xl font-bold text-foreground">
                Siap Menerapkan Strategi Ini pada Bisnis Anda?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Tim Solusi Berdigital siap membantu merancang website dan sistem yang tepat sasaran untuk meningkatkan profitabilitas usaha Anda.
              </p>
            </div>
            <a
              href={SITE_CONFIG.getWhatsappUrl(
                "Halo Solusi Berdigital, saya sudah membaca artikel dan ingin konsultasi website"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-btn inline-flex items-center justify-center gap-2.5 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold text-sm px-6 h-12 rounded-2xl shrink-0 transition-all w-full sm:w-auto"
            >
              <PhoneCall className="size-4.5" />
              <span>Konsultasi via WhatsApp</span>
            </a>
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-border">
              <h2 className="theme-text text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Artikel Terkait Lainnya
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedBlogs.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="p-6 theme-card bg-card border border-border group space-y-3"
                  >
                    <span className="theme-pill text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-primary/10 text-primary border border-primary/20">
                      {rel.category}
                    </span>
                    <h3 className="theme-text font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-bold text-primary pt-1">
                      <span>Baca Artikel</span>
                      <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
