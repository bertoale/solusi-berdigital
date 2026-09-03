"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AdminFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "action"> {
  action: (formData: FormData) => Promise<{ success: boolean; error?: string } | void>;
  successMessage?: string;
  loadingMessage?: string;
  redirectUrl?: string;
  children: React.ReactNode;
}

export function AdminForm({
  action,
  successMessage = "Data berhasil disimpan",
  loadingMessage = "Menyimpan data...",
  redirectUrl,
  children,
  ...props
}: AdminFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Bersihkan highlight error sebelumnya
    form.querySelectorAll(".input-field-error").forEach((el) => {
      el.classList.remove("input-field-error");
    });

    // 1. Validasi manual HTML5 constraint
    if (!form.checkValidity()) {
      // Cari field pertama yang invalid
      const invalidElements = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        ":invalid"
      );

      if (invalidElements.length > 0) {
        const firstInvalid = invalidElements[0];
        
        // Highlight field merah
        invalidElements.forEach((el) => {
          el.classList.add("input-field-error");
        });

        // Cari label atau nama field untuk pesan toast yang informatif
        const labelEl = firstInvalid.closest(".space-y-1\\.5")?.querySelector("label") ||
          firstInvalid.parentElement?.querySelector("label");
        const fieldName = labelEl?.textContent?.replace(/\*/g, "").trim() || firstInvalid.name || "Field";

        toast.error(`Mohon lengkapi: ${fieldName} wajib diisi!`);

        // Scroll halus dan beri fokus ke input yang belum diisi
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        firstInvalid.focus();
      }
      return;
    }

    const formData = new FormData(form);

    startTransition(async () => {
      const toastId = toast.loading(loadingMessage);
      try {
        const res = await action(formData);
        if (res && !res.success) {
          toast.error(res.error || "Gagal menyimpan data", { id: toastId });
          return;
        }

        toast.success(successMessage, { id: toastId });
        if (redirectUrl) {
          router.push(redirectUrl);
          router.refresh();
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Terjadi kesalahan saat memproses data";
        toast.error(message, { id: toastId });
      }
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onInput={(e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("input-field-error")) {
          target.classList.remove("input-field-error");
        }
      }}
      {...props}
    >
      <fieldset disabled={isPending} className="contents">
        {children}
      </fieldset>
    </form>
  );
}
