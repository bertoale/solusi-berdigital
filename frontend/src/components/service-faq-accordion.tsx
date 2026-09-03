"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

interface ServiceFaqItem {
  question: string;
  answer: string;
}

interface ServiceFaqAccordionProps {
  faqs: ServiceFaqItem[];
  serviceTitle: string;
}

export function ServiceFaqAccordion({ faqs, serviceTitle }: ServiceFaqAccordionProps) {
  // Buka item pertama secara default seperti di homepage
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-6 pt-6 border-t border-border/80">
      <div className="space-y-2">
        <h2 className="theme-text text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Jawaban transparan seputar proses pengerjaan, ketentuan teknis, dan pengoperasian layanan {serviceTitle}.
        </p>
      </div>

      {/* Accordion List - Samakan dengan homepage faq-section */}
      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const num = String(idx + 1).padStart(2, "0");

          return (
            <div
              key={idx}
              className={`theme-card-flat bg-card overflow-hidden transition-all duration-300 rounded-2xl border ${
                isOpen
                  ? "border-primary/40 shadow-theme-card"
                  : "border-border/80 hover:border-primary/30"
              }`}
            >
              {/* Full-width Clickable Trigger */}
              <button
                type="button"
                onClick={() => toggle(idx)}
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
                    {num}
                  </span>

                  {/* Question Title */}
                  <h3
                    className={`text-sm sm:text-base font-bold leading-snug ${
                      isOpen ? "text-primary" : "text-foreground"
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
      </div>

      {/* Direct WhatsApp Consultation Box persis seperti di homepage FAQ */}
      <div className="p-5 sm:p-6 theme-card bg-card space-y-4 rounded-2xl border border-border/80 mt-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <MessageCircle className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">
              Masih ada yang ingin ditanyakan seputar layanan ini?
            </h4>
            <p className="text-xs text-muted-foreground">
              Konsultasikan langsung kebutuhan spesifik bisnis Anda dengan tim kami via WhatsApp.
            </p>
          </div>
        </div>

        <a
          href={SITE_CONFIG.getWhatsappUrl(
            `Halo Solusi Berdigital, saya punya pertanyaan seputar layanan ${serviceTitle}`
          )}
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
  );
}
