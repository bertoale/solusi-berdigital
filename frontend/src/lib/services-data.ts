export interface StaticService {
  id: string;
  slug: string;
  title: string;
  category: string;
  badgeText?: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  recommendedFor: string;
  deliveryTime: string;
  priceStartingFrom?: string;
  features: string[];
  deliverables: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export const staticServices: StaticService[] = [
  {
    id: "srv-company-profile",
    slug: "company-profile",
    title: "Website Profil Perusahaan (Company Profile)",
    category: "Branding & Kredibilitas",
    badgeText: "Paling Populer",
    shortDesc:
      "Tingkatkan wibawa usaha dan kepercayaan calon klien dengan website profil yang elegan, cepat dibuka, dan terdaftar resmi di Google Maps.",
    fullDesc:
      "Website profil perusahaan dirancang khusus untuk mempresentasikan kredibilitas legalitas, visi misi, portofolio proyek, dan daftar layanan bisnis Anda secara profesional. Sangat krusial bagi perusahaan yang sering mengajukan penawaran tender, mencari mitra B2B, atau ingin calon pelanggan langsung yakin saat mencari nama usaha Anda di Google Search.",
    iconName: "Building2",
    recommendedFor:
      "Perusahaan B2B, Kontraktor, Klinik & Faskes, Kantor Hukum, Konsultan, Yayasan, Sekolah, Pabrik, & UMKM Berkembang",
    deliveryTime: "Estimasi: 3 - 5 Hari Kerja",
    priceStartingFrom: "Rp 1.500.000",
    features: [
      "Halaman Beranda, Tentang Kami, Layanan, Portofolio & Kontak Lengkap",
      "Tombol WhatsApp interaktif & Integrasi Google Maps Lokasi Usaha",
      "Gratis Domain (.com) & Server Cloud Hosting Cepat 1 Tahun Pertama",
      "Desain responsif sempurna di Android, iPhone, Tablet & Laptop",
      "Email Bisnis Profesional dengan Domain Sendiri (nama@perusahaan.com)",
      "Setup Google Analytics & Pendaftaran Google Search Console",
    ],
    deliverables: [
      { title: "Desain UI/UX Eksklusif", desc: "Desain disesuaikan dengan warna dan identitas brand korporat Anda." },
      { title: "Optimasi SEO Dasar", desc: "Struktur heading, meta tag, dan sitemap siap terindeks mesin pencari Google." },
      { title: "Garansi Teknis 1 Tahun", desc: "Bantuan teknis dan monitoring performa jika terjadi kendala server." },
    ],
    faqs: [
      {
        question: "Berapa lama proses pengerjaan Company Profile?",
        answer: "Rata-rata 3 hingga 5 hari kerja setelah data teks, profil, dan foto aset perusahaan kami terima secara lengkap.",
      },
      {
        question: "Apakah saya bisa mengubah konten di kemudian hari?",
        answer: "Tentu! Tim kami siap mendampingi penyesuaian konten atau materi promosi baru kapan saja.",
      },
      {
        question: "Apakah sudah termasuk email domain seperti info@namabisnis.com?",
        answer: "Ya! Setiap paket sudah termasuk akun email bisnis domain profesional tanpa biaya tambahan.",
      },
    ],
  },
  {
    id: "srv-online-store",
    slug: "toko-online",
    title: "Toko Online & Katalog WhatsApp",
    category: "Penjualan & Retail",
    badgeText: "Tingkatkan Order",
    shortDesc:
      "Pamerkan produk dengan katalog foto rapi tanpa repot koding. Pelanggan bisa memilih barang dan pesanan langsung otomatis masuk ke WhatsApp Anda.",
    fullDesc:
      "Toko Online Katalog WhatsApp adalah solusi paling efisien untuk menjual produk ritel tanpa terpotong komisi platform marketplace 10-15%. Pelanggan dapat memfilter kategori barang, memilih varian ukuran/warna, dan sistem akan langsung merangkum rincian order ke WhatsApp admin secara otomatis.",
    iconName: "Store",
    recommendedFor:
      "Fashion & Hijab, Kuliner & Frozen Food, Skincare, Grosir, Distributor, Retailer, Toko Bangunan, Sparepart, & Toko Oleh-oleh",
    deliveryTime: "Estimasi: 4 - 7 Hari Kerja",
    priceStartingFrom: "Rp 1.800.000",
    features: [
      "Katalog produk dengan foto jernih, harga promo, & variasi ukuran/warna",
      "Sistem checkout praktis langsung merangkum format order ke WhatsApp",
      "Halaman kelola produk simpel untuk upload produk baru langsung dari HP",
      "Bebas biaya komisi penjualan per transaksi (100% omzet milik Anda)",
      "Fitur pencarian produk cepat, kategori filter, dan penanda Stok Habis",
      "Integrasi hitung ongkir otomatis kurir ekspedisi populer",
    ],
    deliverables: [
      { title: "Website Katalog Responsif", desc: "Toko online super cepat dan nyaman dijelajahi calon pembeli dari HP." },
      { title: "Sistem Order-to-WhatsApp", desc: "Format chat WhatsApp rapi memuat nama barang, varian, jumlah, dan total belanja." },
      { title: "Input Produk Awal", desc: "Tim kami bantu input hingga 20 produk pertama lengkap dengan foto dan deskripsi." },
    ],
    faqs: [
      {
        question: "Apakah pembeli harus mendaftar akun terlebih dahulu untuk belanja?",
        answer: "Tidak perlu. Sistem dibuat seringkas mungkin agar pembeli tidak malas dan konversi belanja lebih tinggi.",
      },
      {
        question: "Apakah ada batasan jumlah produk yang bisa saya upload?",
        answer: "Kapasitas produk tidak dibatasi untuk penggunaan wajar (hingga ribuan SKU produk).",
      },
    ],
  },
  {
    id: "srv-landing-page",
    slug: "landing-page",
    title: "Landing Page Iklan & Promosi (High-Converting)",
    category: "Marketing & Iklan",
    badgeText: "Cocok Iklan Ads",
    shortDesc:
      "Halaman khusus satu produk atau promo berorientasi penjualan tinggi. Sangat ringan dan siap disambungkan ke iklan Facebook, Instagram, TikTok & Google Ads.",
    fullDesc:
      "Landing Page satu halaman berkonversi tinggi yang dirancang menggunakan psikologi copywriting AIDA (Attention, Interest, Desire, Action). Halaman sangat cepat dibuka (< 1.5 detik) untuk mencegah calon pembeli kabur saat mengklik iklan berbayar (Meta Ads, TikTok Ads, Google Search Ads).",
    iconName: "Megaphone",
    recommendedFor:
      "Pengiklan Meta & Google Ads, Produk Herbal, Properti & Agen, Kursus/Pelatihan, Event & Seminar, Jasa Service, & Produk Viral",
    deliveryTime: "Estimasi: 2 - 4 Hari Kerja",
    priceStartingFrom: "Rp 950.000",
    features: [
      "Struktur copywriting persuasif yang memicu aksi beli cepat",
      "Struktur kode ringan teroptimasi PageSpeed tinggi di semua jaringan HP",
      "Pemasangan Meta Pixel, TikTok Pixel & Google Analytics siap pakai",
      "Tombol Call-to-Action (CTA) bertebaran strategis di sepanjang halaman",
      "Fitur Countdown Timer diskon & formulir order lead langsung ke WhatsApp",
      "Desain banner promo grafis menarik & review testimoni interaktif",
    ],
    deliverables: [
      { title: "Optimasi Copywriting", desc: "Struktur narasi masalah vs solusi yang terbukti memikat audiens iklan." },
      { title: "Setup Conversion Tracking", desc: "Testing event 'Purchase' dan 'Lead' Pixel agar data iklan terbaca akurat." },
      { title: "Kecepatan Skor 90+", desc: "Skor audit Google PageSpeed hijau untuk biaya per klik (CPC) iklan lebih murah." },
    ],
    faqs: [
      {
        question: "Apakah tim Solusi Berdigital bisa membantu penulisan kata-kata iklannya?",
        answer: "Ya! Anda cukup memberikan poin keunggulan produk, tim kami yang menyusun alur copywriting persuasifnya.",
      },
      {
        question: "Apakah bisa dipasang form order instan?",
        answer: "Bisa, baik form order WA, form submit database email, maupun tombol direct checkout.",
      },
    ],
  },
  {
    id: "srv-custom-system",
    slug: "aplikasi-kasir-pos",
    title: "Aplikasi Kasir (POS) & Sistem Bisnis Kustom",
    category: "Operasional & Otomasi",
    badgeText: "Otomatisasi Usaha",
    shortDesc:
      "Ucapkan selamat tinggal pada catatan manual di buku. Pantau stok barang, catat omzet harian kasir, dan lihat laporan keuntungan dari mana saja.",
    fullDesc:
      "Aplikasi Kasir (Point of Sale) dan sistem manajemen bisnis berbasis web yang dapat dibuka melalui Tablet Android, iPad, Laptop, maupun Smartphone. Dilengkapi pencatatan transaksi kasir kilat, cetak struk Bluetooth thermal, pemisahan akses PIN kasir vs owner, serta rekap laba kotor harian otomatis.",
    iconName: "Calculator",
    recommendedFor:
      "Resto & Cafe, Minimarket, Apotek, Bengkel, Toko Bangunan, Salon/Barbershop, Petshop, Ekspedisi, & Manajemen Stok Multi-Cabang",
    deliveryTime: "Estimasi: 7 - 14 Hari Kerja",
    priceStartingFrom: "Rp 3.500.000",
    features: [
      "Sistem kasir (Point of Sale) cetak struk Bluetooth thermal & scan barcode",
      "Manajemen stok barang masuk, mutasi & sisa stok gudang secara real-time",
      "Akses bertingkat dengan keamanan PIN (Kasir, Supervisor, Owner)",
      "Laporan penjualan & grafik keuntungan harian, mingguan, dan bulanan",
      "Dapat diakses online dari rumah/luar kota tanpa harus datang ke toko",
      "Bebas biaya langganan bulanan mahal (Hak milik sistem sepenuhnya)",
    ],
    deliverables: [
      { title: "Web App POS Siap Pakai", desc: "Sistem kasir modern terpasang di server cloud aman dengan database terenkripsi." },
      { title: "Konfigurasi Printer Kasir", desc: "Panduan menghubungkan printer thermal Bluetooth atau USB ke tablet/laptop." },
      { title: "Buku Panduan & SOP", desc: "Panduan lengkap pengoperasian kasir dan penutupan buku shift harian." },
    ],
    faqs: [
      {
        question: "Apakah sistem kasir ini ada biaya langganan per bulannya?",
        answer: "Tidak ada biaya lisensi bulanan per kasir. Anda hanya memperpanjang sewa hosting & domain standar per tahun.",
      },
      {
        question: "Bisa dipakai di printer bluetooth apa saja?",
        answer: "Mendukung hampir seluruh merk printer kasir thermal standar 58mm dan 80mm di pasaran.",
      },
    ],
  },
];
