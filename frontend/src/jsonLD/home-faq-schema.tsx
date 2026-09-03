import React from "react";

export function HomeFaqSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Gimana kalau saya belum punya foto produk atau materi tulisan sama sekali?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tenang, Anda tidak perlu bingung. Cukup ceritakan poin dasar usaha Anda via WhatsApp. Tim kami bantu susun kalimat penawaran yang rapi serta menyediakan foto pendukung berlisensi resmi yang relevan dengan bisnis Anda.",
        },
      },
      {
        "@type": "Question",
        name: "Berapa lama proses pembuatan sampai website benar-benar online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rata-rata 3 sampai 7 hari kerja sejak materi awal disepakati. Kami langsung kirim link demo preview interaktif agar Anda bisa mencoba tampilan website di HP sebelum resmi diluncurkan.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah ada biaya bulanan atau perpanjangan tersembunyi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tidak ada biaya bulanan tersembunyi. Biaya pembuatan sudah all-in termasuk sewa domain .com dan cloud server berkecepatan tinggi selama 1 tahun pertama. Perpanjangan baru dilakukan tahun ke-2 dengan tarif transparan.",
        },
      },
      {
        "@type": "Question",
        name: "Bagaimana kalau ada bagian desain yang ingin saya revisi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kami berikan garansi penyesuaian desain selama masa preview agar sesuai dengan brief awal yang disepakati. Anda bebas meminta penyesuaian tata letak, warna, teks penawaran, maupun tombol WhatsApp.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah saya bisa edit tulisan atau ganti harga produk sendiri dari HP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bisa banget! Kami buatkan panel admin yang simpel serta video panduan singkat. Anda bisa menambah produk, update foto, atau mengubah harga kapan saja langsung dari smartphone tanpa perlu paham koding.",
        },
      },
      {
        "@type": "Question",
        name: "Setelah website selesai, kalau ada kendala teknis bagaimana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Anda tetap kami dampingi. Kami berikan garansi bantuan teknis, panduan pengoperasian sistem, serta bantuan konsultasi jika Anda menemui kendala teknis pasca-peluncuran.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
