/**
 * Menghitung estimasi waktu baca artikel secara otomatis berdasarkan jumlah kata.
 * Standar kecepatan membaca rata-rata: ~200 kata per menit.
 */
export function calculateReadingTime(content: string | undefined | null): string {
  if (!content) return "1 menit baca";

  // Hapus tag HTML jika konten berupa format HTML dari Tiptap
  const cleanText = content
    .replace(/<[^>]*>?/gm, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = cleanText.split(" ").filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} menit baca`;
}
