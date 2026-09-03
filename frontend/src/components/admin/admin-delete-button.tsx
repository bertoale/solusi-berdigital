"use client";

import React, { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AdminDeleteButtonProps {
  action: () => Promise<{ success: boolean; error?: string }>;
  confirmMessage?: string;
  itemTitle?: string;
  className?: string;
  title?: string;
}

export function AdminDeleteButton({
  action,
  confirmMessage,
  itemTitle,
  className,
  title = "Hapus Data",
}: AdminDeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const question = confirmMessage || (itemTitle ? `Yakin ingin menghapus "${itemTitle}"?` : "Yakin ingin menghapus data ini?");
    if (!window.confirm(question)) return;

    startTransition(async () => {
      const toastId = toast.loading("Menghapus data...");
      try {
        const res = await action();
        if (res && !res.success) {
          toast.error(res.error || "Gagal menghapus data", { id: toastId });
        } else {
          toast.success("Data berhasil dihapus", { id: toastId });
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Terjadi kesalahan saat menghapus data";
        toast.error(message, { id: toastId });
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      title={title}
      className={
        className ||
        "theme-btn p-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors cursor-pointer disabled:opacity-50"
      }
    >
      {isPending ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Trash2 className="size-3.5" />
      )}
    </button>
  );
}
