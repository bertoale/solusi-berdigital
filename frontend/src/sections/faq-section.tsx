"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

interface FAQItem {
  id: string;
  num: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "faq-1",
    num: "01",
    question:
      "Gimana kalau saya belum punya foto produk atau materi tulisan sama sekali?",
    answer:
      "Tenang, Anda tidak perlu bingung. Cukup ceritakan poin dasar usaha Anda via WhatsApp. Tim kami bantu susun kalimat penawaran yang rapi serta menyediakan foto pendukung berlisensi resmi yang relevan dengan bisnis Anda.",
  },
  {
    id: "faq-2",
    num: "02",
    question: "Berapa lama proses pembuatan sampai website benar-benar online?",
    answer:
      "Rata-rata 3 sampai 7 hari kerja sejak materi awal disepakati. Kami langsung kirim link demo preview interaktif agar Anda bisa mencoba tampilan website di HP sebelum resmi diluncurkan.",
  },
  {
    id: "faq-3",
    num: "03",
    question: "Apakah ada biaya bulanan atau perpanjangan tersembunyi?",
    answer:
      "Tidak ada biaya bulanan tersembunyi. Biaya pembuatan sudah all-in termasuk sewa domain .com dan cloud server berkecepatan tinggi selama 1 tahun pertama. Perpanjangan baru dilakukan tahun ke-2 dengan tarif transparan.",
  },
  {
    id: "faq-4",
    num: "04",
    question: "Bagaimana kalau ada bagian desain yang ingin saya revisi?",
    answer:
      "Kami berikan garansi penyesuaian desain selama masa preview agar sesuai dengan brief awal yang disepakati. Anda bebas meminta penyesuaian tata letak, warna, teks penawaran, maupun tombol WhatsApp.",
  },
  {
    id: "faq-5",
    num: "05",
    question:
      "Apakah saya bisa edit tulisan atau ganti harga produk sendiri dari HP?",
    answer:
      "Bisa banget! Kami buatkan panel admin yang simpel serta video panduan singkat. Anda bisa menambah produk, update foto, atau mengubah harga kapan saja langsung dari smartphone tanpa perlu paham koding.",
  },
  {
    id: "faq-6",
    num: "06",
    question: "Setelah website selesai, kalau ada kendala teknis bagaimana?",
    answer:
      "Anda tetap kami dampingi. Kami berikan garansi bantuan teknis, backup data rutin, dan Anda bisa langsung chat tim kami kapan pun membutuhkan bantuan pengoperasian.",
  },
];

export function FAQSection() {
  // Hanya 1 item yang terbuka dalam 1 waktu
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-background via-primary/[0.025] to-background dark:via-primary/[0.05] border-b border-border/60 relative overflow-hidden bg-noise"
      id="faq"
    >
      {/* Background Conversation Arc Vector, Dot Matrix & Edge Transitions */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        {/* Rich Ambient Mesh Aurora Glow */}
        <div className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-primary/10 via-primary-muted/10 to-transparent blur-[130px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-warning/10 via-primary/5 to-transparent blur-[120px]" />

        {/* Modern Dot Matrix Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-10 dark:opacity-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Custom SVG Dialogue Acoustic Arcs */}
        <svg
          className="absolute top-1/2 right-4 -translate-y-1/2 w-80 h-80 text-primary/[0.06] dark:text-primary/[0.08] hidden sm:block"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 150C50 94.7715 94.7715 50 150 50C205.228 50 250 94.7715 250 150"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
          <path
            d="M80 150C80 111.34 111.34 80 150 80C188.66 80 220 111.34 220 150"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M110 150C110 127.909 127.909 110 150 110C172.091 110 190 127.909 190 150"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <circle cx="150" cy="50" r="3" fill="var(--color-warning)" fillOpacity="0.5" />
        </svg>

        {/* Top Edge Gradient Transition */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* 2-COLUMN LAYOUT: Left (Title, Subtitle, WhatsApp CTA) | Right (Accordion) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Exactly top-aligned with the first accordion item */}
          <div className="lg:col-span-5 flex flex-col items-start justify-start text-left space-y-6">
            <h2 className="theme-text text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-foreground text-balance leading-[1.15] m-0 p-0">
              Pertanyaan yang Sering Diajukan Calon Klien
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Jawaban transparan tanpa bahasa teknis yang rumit seputar alur kerja, domain hosting, revisi, hingga pengoperasian mandiri.
            </p>

            {/* Direct WhatsApp Consultation Box (Desktop Only: Hidden on Mobile, Visible on lg+) */}
            <div className="hidden lg:block pt-2">
              <div className="p-5 sm:p-6 theme-card bg-card space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MessageCircle className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      Masih ada yang ingin ditanyakan?
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Konsultasikan langsung kebutuhan sistem Anda dengan tim kami.
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/6285858089376?text=Halo%20Solusi%20Berdigital%2C%20saya%20punya%20pertanyaan%20seputar%20pembuatan%20website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 theme-btn bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold text-xs sm:text-sm px-6 h-12 rounded-xl active:scale-[0.98] transition-all w-full group"
                >
                  <svg
                    className="w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zM12.05 20.2c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.22.25-.86.84-.86 2.06 0 1.21.88 2.39 1 2.56.12.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.3z" />
                  </svg>
                  <span>Tanya Tim via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Supporting Cutout Image below WhatsApp Box */}
              <div className="relative w-full max-w-[340px] h-[240px] xl:h-[260px] mx-auto flex items-center justify-center pt-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-warning/10 to-transparent rounded-full blur-2xl -z-10" />
                <Image
                  src="/faq-images.png"
                  alt="Solusi Berdigital Tim Bantuan FAQ"
                  fill
                  sizes="340px"
                  className="object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Accordion List & Mobile WhatsApp Card */}
          <div className="lg:col-span-7 space-y-3.5">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`theme-card-flat bg-card overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "border-primary/40 shadow-theme-card"
                      : "hover:border-primary/30"
                  }`}
                >
                  {/* Full-width Clickable Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                  >
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      {/* Monospace Step Number */}
                      <span
                        className={`font-mono text-xs sm:text-sm font-bold pt-0.5 shrink-0 ${
                          isOpen
                            ? "text-primary font-extrabold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {faq.num}
                      </span>

                      {/* Question Title */}
                      <h3
                        className={`text-sm sm:text-base font-bold leading-snug ${
                          isOpen
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    {/* Expand / Collapse Chevron */}
                    <div
                      className={`size-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "theme-btn bg-primary text-primary-foreground rotate-180"
                          : "bg-muted text-muted-foreground rotate-0"
                      }`}
                    >
                      <ChevronDown className="size-4" />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                      <p className="pt-2">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile-Only WhatsApp Consultation Card (Visible on Mobile, Hidden on lg+) */}
            <div className="block lg:hidden pt-4">
              <div className="p-5 sm:p-6 theme-card bg-card space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MessageCircle className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      Masih ada yang ingin ditanyakan?
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Konsultasikan langsung kebutuhan sistem Anda dengan tim kami.
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/6285858089376?text=Halo%20Solusi%20Berdigital%2C%20saya%20punya%20pertanyaan%20seputar%20pembuatan%20website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 theme-btn bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold text-xs sm:text-sm px-6 h-12 rounded-xl active:scale-[0.98] transition-all w-full group"
                >
                  <svg
                    className="w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zM12.05 20.2c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.22.25-.86.84-.86 2.06 0 1.21.88 2.39 1 2.56.12.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.3z" />
                  </svg>
                  <span>Tanya Tim via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
