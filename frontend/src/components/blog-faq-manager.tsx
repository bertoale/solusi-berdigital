"use client";

import React, { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, HelpCircle } from "lucide-react";
import { BlogFaqItem } from "@/db/schema";

interface BlogFaqManagerProps {
  initialFaqs?: BlogFaqItem[];
  name?: string;
}

export function BlogFaqManager({
  initialFaqs = [],
  name = "blogFaqs",
}: BlogFaqManagerProps) {
  const [faqs, setFaqs] = useState<BlogFaqItem[]>(initialFaqs);

  const handleAddFaq = () => {
    setFaqs((prev) => [
      ...prev,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQuestion = (index: number, val: string) => {
    setFaqs((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], question: val };
      return copy;
    });
  };

  const handleUpdateAnswer = (index: number, val: string) => {
    setFaqs((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], answer: val };
      return copy;
    });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setFaqs((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === faqs.length - 1) return;
    setFaqs((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  return (
    <div className="space-y-4">
      {/* Hidden input to submit serialized JSON to Server Actions */}
      <input type="hidden" name={name} value={JSON.stringify(faqs)} />

      <div className="flex items-center justify-between pb-2 border-b border-border/80">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <HelpCircle className="size-4 text-primary" />
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              FAQ Artikel ({faqs.length} Pertanyaan)
            </label>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Otomatis disusun menjadi <span className="font-mono text-primary font-bold">JSON-LD FAQPage & Article</span> untuk Google Search Rich Snippets.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddFaq}
          className="theme-pill px-3.5 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="size-3.5" />
          <span>Tambah Pertanyaan FAQ</span>
        </button>
      </div>

      {faqs.length === 0 ? (
        <div className="p-6 text-center text-xs text-muted-foreground theme-inset bg-muted/20 border border-border/60 rounded-2xl space-y-2">
          <p className="font-medium">Belum ada FAQ khusus untuk artikel ini.</p>
          <button
            type="button"
            onClick={handleAddFaq}
            className="theme-btn text-xs font-bold text-primary px-3 py-1.5 rounded-lg bg-card border border-border hover:bg-muted transition-colors cursor-pointer"
          >
            + Tambah FAQ Pertama
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 theme-card bg-card/90 border border-border/80 rounded-2xl space-y-3.5 relative group"
            >
              {/* Header item */}
              <div className="flex items-center justify-between">
                <span className="theme-pill px-2.5 py-0.5 bg-primary/10 text-primary border border-primary/20 text-[10px] font-mono font-bold">
                  FAQ #{idx + 1}
                </span>

                <div className="flex items-center gap-1">
                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => handleMoveUp(idx)}
                      className="p-1 rounded-md bg-muted text-muted-foreground hover:text-foreground border border-border/60 cursor-pointer"
                      title="Pindahkan ke Atas"
                    >
                      <ArrowUp className="size-3" />
                    </button>
                  )}
                  {idx < faqs.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleMoveDown(idx)}
                      className="p-1 rounded-md bg-muted text-muted-foreground hover:text-foreground border border-border/60 cursor-pointer"
                      title="Pindahkan ke Bawah"
                    >
                      <ArrowDown className="size-3" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="p-1 rounded-md bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer ml-1"
                    title="Hapus FAQ Ini"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Question Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-foreground">
                  Pertanyaan (Question) *
                </label>
                <input
                  type="text"
                  required
                  value={faq.question}
                  onChange={(e) => handleUpdateQuestion(idx, e.target.value)}
                  placeholder="Contoh: Berapa lama waktu yang dibutuhkan untuk membuat website toko online?"
                  className="w-full h-10 px-3.5 theme-inset bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-semibold rounded-xl"
                />
              </div>

              {/* Answer Textarea */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-foreground">
                  Jawaban (Answer) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={faq.answer}
                  onChange={(e) => handleUpdateAnswer(idx, e.target.value)}
                  placeholder="Contoh: Rata-rata pengerjaan katalog toko online WhatsApp berkisar antara 3 hingga 5 hari kerja..."
                  className="w-full p-3 theme-inset bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium leading-relaxed rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
