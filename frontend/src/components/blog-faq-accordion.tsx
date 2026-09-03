"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { BlogFaqItem } from "@/db/schema";

interface BlogFaqAccordionProps {
  faqs: BlogFaqItem[];
}

export function BlogFaqAccordion({ faqs }: BlogFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Buka yang pertama secara default

  if (!faqs || faqs.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-6 pt-8 border-t border-border">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 theme-pill px-3.5 py-1 bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
          <HelpCircle className="size-3.5" />
          <span>FAQ & TANYA JAWAB</span>
        </div>
        <h2 className="theme-text text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="text-xs text-muted-foreground">
          Informasi penting dan ringkasan tanya jawab terkait topik artikel ini.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`theme-card transition-all duration-300 overflow-hidden border ${
                isOpen
                  ? "bg-card border-primary/40 shadow-sm"
                  : "bg-card/70 border-border/80 hover:border-border"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-bold text-sm sm:text-base text-foreground leading-snug">
                  {faq.question}
                </span>
                <div
                  className={`size-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 theme-card-flat ${
                    isOpen
                      ? "rotate-180 bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <ChevronDown className="size-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line border-t border-border/40">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
