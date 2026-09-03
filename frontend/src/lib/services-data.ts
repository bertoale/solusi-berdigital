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
    title: "Website Profil Perusahaan",
    category: "Branding & Kredibilitas",
    badgeText: "Paling Populer",
    shortDesc:
      "Tingkatkan kredibilitas bisnis dan kepercayaan calon klien dengan website profil profesional yang cepat diakses dan terintegrasi peta lokasi (Google Maps).",
    fullDesc:
      "Website profil perusahaan dirancang khusus untuk mempresentasikan legalitas, visi misi, portofolio proyek, dan daftar layanan bisnis Anda secara profesional. Sangat krusial bagi perusahaan yang mengajukan penawaran tender, mencari mitra B2B, atau ingin calon pelanggan menemukan profil usaha resmi Anda di Google Search.",
    iconName: "Building2",
    recommendedFor:
      "Perusahaan B2B, Kontraktor, Klinik & Faskes, Kantor Hukum, Konsultan, Yayasan, Sekolah, Pabrik, & UMKM Berkembang",
    deliveryTime: "Estimasi: 3 - 5 Hari Kerja",
    priceStartingFrom: "Rp 1.500.000",
    features: [
      "Halaman Beranda, Tentang Kami, Layanan, Portofolio & Kontak",
      "Tombol WhatsApp interaktif & Integrasi Google Maps",
      "Domain (.com) & Cloud Hosting Cepat 1 Tahun Pertama",
      "Desain responsif untuk tampilan optimal di HP, tablet, & laptop",
      "Email Bisnis Profesional dengan Domain Sendiri (nama@perusahaan.com)",
      "Setup Google Analytics & Pendaftaran Google Search Console",
    ],
    deliverables: [
      { title: "Desain UI/UX Profesional", desc: "Desain disesuaikan dengan identitas warna dan brand korporat Anda." },
      { title: "Optimasi SEO On-Page Dasar", desc: "Struktur heading, meta tag, dan sitemap standar agar siap terindeks mesin pencari." },
      { title: "Garansi & Dukungan Teknis 1 Tahun", desc: "Bantuan teknis dan monitoring performa jika terjadi kendala server." },
    ],
    faqs: [
      {
        question: "Berapa lama estimasi pengerjaan website Company Profile?",
        answer: "Rata-rata 3 hingga 5 hari kerja setelah materi utama (profil usaha, daftar layanan, dan foto aset pendukung) kami terima lengkap.",
      },
      {
        question: "Apakah saya bisa memperbarui isi konten website secara mandiri?",
        answer: "Bisa. Kami menyediakan panduan cara memperbarui teks dan foto secara mandiri, serta bantuan teknis jika Anda menemui kendala selama masa garansi awal proyek.",
      },
      {
        question: "Apakah sudah termasuk email bisnis dengan domain sendiri?",
        answer: "Ya, sudah termasuk pembuatan akun email bisnis berbasis domain (webmail standar) di tahun pertama tanpa biaya tambahan.",
      },
      {
        question: "Apakah website langsung otomatis menempati halaman pertama Google?",
        answer: "Kami memasang fondasi SEO On-Page standar (struktur heading, meta tag, sitemap, dan verifikasi Google Search Console). Namun, posisi peringkat di hasil pencarian ditentukan secara bertahap oleh algoritma mesin pencari serta aktivitas bisnis Anda.",
      },
    ],
  },
  {
    id: "srv-online-store",
    slug: "toko-online",
    title: "Toko Online & Katalog WhatsApp",
    category: "Penjualan & Retail",
    badgeText: "Paling Praktis",
    shortDesc:
      "Pamerkan produk dengan katalog rapi tanpa repot koding. Pelanggan bisa memilih barang dan pesanan langsung otomatis terangkum ke WhatsApp Anda.",
    fullDesc:
      "Toko Online Katalog WhatsApp adalah solusi efisien untuk menjual produk ritel tanpa potongan komisi platform marketplace 10-15%. Pelanggan dapat memfilter kategori barang, memilih varian ukuran/warna, dan sistem akan langsung merangkum rincian order ke WhatsApp admin secara rapi.",
    iconName: "Store",
    recommendedFor:
      "Fashion & Hijab, Kuliner & Frozen Food, Skincare, Grosir, Distributor, Retailer, Toko Bangunan, Sparepart, & Toko Oleh-oleh",
    deliveryTime: "Estimasi: 4 - 7 Hari Kerja",
    priceStartingFrom: "Rp 1.800.000",
    features: [
      "Katalog produk dengan foto jernih, harga, & variasi ukuran/warna",
      "Sistem checkout praktis langsung merangkum format order ke WhatsApp",
      "Halaman kelola produk praktis untuk tambah & update stok dari HP",
      "Bebas biaya komisi penjualan per transaksi (100% omzet milik Anda)",
      "Fitur pencarian produk cepat, kategori filter, dan penanda Stok Habis",
      "Format pesanan memuat alamat lengkap pembeli untuk mempermudah cek ongkir",
    ],
    deliverables: [
      { title: "Website Katalog Responsif", desc: "Katalog online yang ringan dan nyaman dijelajahi calon pembeli dari smartphone." },
      { title: "Sistem Order-to-WhatsApp", desc: "Format chat WhatsApp terstruktur memuat nama barang, varian, jumlah, dan total belanja." },
      { title: "Bantuan Input Produk Awal", desc: "Bantuan input hingga 15–20 produk pertama lengkap dengan foto dan deskripsi standar." },
    ],
    faqs: [
      {
        question: "Bagaimana cara pembeli bertransaksi di katalog WhatsApp ini?",
        answer: "Pembeli memilih produk dan varian di website, lalu saat checkout, sistem otomatis merangkum daftar pesanan dan alamat ke dalam format chat WhatsApp admin toko untuk diproses langsung.",
      },
      {
        question: "Apakah ada potongan komisi dari setiap transaksi penjualan?",
        answer: "Tidak ada potongan komisi sama sekali. Seluruh nilai transaksi 100% langsung masuk ke rekening bank atau pembayaran Anda tanpa perantara pihak ketiga.",
      },
      {
        question: "Berapa kapasitas produk yang dapat dimasukkan ke katalog?",
        answer: "Sangat memadai untuk ratusan produk katalog UMKM. Anda dapat menambah, mengubah harga, atau menghapus produk secara fleksibel melalui panel kelola produk.",
      },
      {
        question: "Apakah sistem ini mendukung pembayaran otomatis (Payment Gateway)?",
        answer: "Alur bawaan menggunakan konfirmasi WhatsApp yang praktis dan bebas biaya admin per transaksi. Jika bisnis Anda membutuhkan integrasi gateway pembayaran otomatis atau cek ongkir API ekspedisi, fitur tersebut dapat ditambahkan sebagai modul kustom lanjutan.",
      },
    ],
  },
  {
    id: "srv-landing-page",
    slug: "landing-page",
    title: "Landing Page Iklan & Promosi Produk",
    category: "Marketing & Iklan",
    badgeText: "Siap Iklan Ads",
    shortDesc:
      "Halaman fokus untuk satu produk atau penawaran promo. Dirancang ringan, terstruktur, dan siap dihubungkan ke iklan Meta Ads, TikTok Ads, maupun Google Ads.",
    fullDesc:
      "Landing Page satu halaman yang dirancang terstruktur menggunakan alur pengenalan masalah, keunggulan produk, hingga penawaran promo. Halaman dioptimasi seringan mungkin agar pengunjung mobile tidak menunggu lama saat mengklik iklan berbayar (Meta Ads, TikTok Ads, Google Search Ads).",
    iconName: "Megaphone",
    recommendedFor:
      "Pengiklan Meta & Google Ads, Produk Herbal, Properti & Agen, Kursus/Pelatihan, Event & Seminar, Jasa Service, & Produk Viral",
    deliveryTime: "Estimasi: 2 - 4 Hari Kerja",
    priceStartingFrom: "Rp 950.000",
    features: [
      "Struktur alur informasi terarah (masalah, keunggulan produk, hingga penawaran)",
      "Struktur kode ringan dioptimasi untuk akses cepat di jaringan seluler",
      "Pemasangan Meta Pixel & Google Analytics siap pakai",
      "Penempatan tombol Call-to-Action (CTA) yang jelas di bagian penting",
      "Fitur hitung mundur promo (opsional) & formulir pesanan langsung ke WhatsApp",
      "Tata letak visual menarik dengan penataan testimoni dan bukti sosial produk",
    ],
    deliverables: [
      { title: "Penyusunan Alur Pesan (Copywriting)", desc: "Membantu merapikan poin keunggulan dan alur pesan promosi agar mudah dipahami pengunjung." },
      { title: "Integrasi Pelacakan Iklan", desc: "Pemasangan dan pengujian event standar (misal: Lead / Click WhatsApp) pada Pixel & Analytics." },
      { title: "Optimasi Kecepatan Mobile", desc: "Kompresi aset visual dan struktur halaman ringan agar cepat dimuat di perangkat seluler." },
    ],
    faqs: [
      {
        question: "Apakah tim Solusi Berdigital bisa membantu menyusun kata-kata penawaran?",
        answer: "Ya. Anda cukup memberikan poin keunggulan produk dan materi promosi dasar, tim kami akan membantu merapikan alur copywriting agar mudah dipahami pengunjung.",
      },
      {
        question: "Apakah biaya pembuatan sudah termasuk saldo atau anggaran pasang iklan?",
        answer: "Biaya yang tertera adalah untuk jasa perancangan, copywriting, dan pembuatan teknis landing page. Saldo iklan dibayarkan terpisah langsung ke platform iklan terkait (Meta Ads / Google Ads) sesuai alokasi budget Anda.",
      },
      {
        question: "Apakah pembuatan landing page menjamin produk pasti langsung laris terjual?",
        answer: "Landing page dirancang cepat diakses dan menyajikan penawaran secara meyakinkan untuk mempermudah calon pembeli mengambil tindakan. Namun, hasil akhir penjualan tetap dipengaruhi oleh daya tarik produk, kesesuaian harga, serta target audiens iklan yang Anda pasang.",
      },
      {
        question: "Apakah landing page sudah siap dihubungkan dengan pelacak iklan (Pixel)?",
        answer: "Ya, kami bantu memasangkan kode pelacakan Meta Pixel dan Google Analytics standar untuk memantau data kunjungan dan klik tombol aksi.",
      },
    ],
  },
  {
    id: "srv-custom-system",
    slug: "sistem-bisnis-kustom",
    title: "Sistem Informasi & Aplikasi Bisnis Kustom",
    category: "Operasional & Otomasi",
    badgeText: "Solusi Kustom",
    shortDesc:
      "Kelola inventaris stok, pencatatan transaksi, dan alur operasional dalam satu sistem web terpadu yang dirancang sesuai alur kerja bisnis Anda.",
    fullDesc:
      "Sistem Informasi & Aplikasi Bisnis Kustom dirancang bagi bisnis yang membutuhkan pengelolaan operasional terstruktur di luar batasan aplikasi generik. Sistem dapat disesuaikan untuk modul manajemen stok/inventory gudang, pencatatan transaksi operasional (kasir/POS/invoicing), sistem antrean atau reservasi, hingga dashboard monitoring bisnis berbasis web yang dapat diakses aman dari laptop, tablet, maupun smartphone.",
    iconName: "Database",
    recommendedFor:
      "Gudang & Distributor, Bengkel, Apotek, Klinik, Retail/Grosir, Resto, Jasa, & Bisnis dengan Alur Khusus",
    deliveryTime: "Estimasi: 7 - 14 Hari Kerja",
    priceStartingFrom: "Rp 3.500.000",
    features: [
      "Manajemen stok & inventory (barang masuk/keluar, mutasi, & opname)",
      "Pencatatan transaksi operasional (pesanan, kasir/POS, atau invoicing)",
      "Akses multi-user bertingkat dengan keamanan PIN/akun (Staff, Gudang, Owner)",
      "Laporan data transaksi, rekap aktivitas operasional, & ringkasan omzet",
      "Dapat diakses secara online dari perangkat laptop, tablet, atau smartphone",
      "Tanpa biaya langganan bulanan platform (hanya perpanjangan sewa cloud server tahunan standar)",
    ],
    deliverables: [
      { title: "Web App Kustom Siap Pakai", desc: "Sistem aplikasi bisnis berbasis web yang diinstal di cloud server aman dengan database terisolasi." },
      { title: "Konfigurasi Alur Data & Modul", desc: "Pengaturan struktur data awal, penyesuaian formulir input, serta pengujian fungsionalitas modul sesuai kebutuhan usaha." },
      { title: "Buku Panduan & SOP Operasional", desc: "Panduan pengoperasian sistem dan dokumentasi alur kerja untuk mempermudah tim staf Anda." },
    ],
    faqs: [
      {
        question: "Sistem atau modul operasional apa saja yang umumnya bisa dibuat?",
        answer: "Kami dapat membangun modul manajemen inventori/stok gudang, pencatatan transaksi operasional (kasir/invoicing), pemantauan alur kerja internal, hingga dashboard rekap data berbasis web sesuai kebutuhan usaha Anda.",
      },
      {
        question: "Apakah ada biaya langganan bulanan per akun pengguna?",
        answer: "Tidak ada biaya lisensi bulanan per user. Anda hanya menanggung perpanjangan sewa cloud hosting/server dan domain standar secara tahunan.",
      },
      {
        question: "Bagaimana memastikan sistem yang dibuat sesuai dengan alur usaha kami?",
        answer: "Sebelum tahap pembuatan dimulai, kita akan mendiskusikan alur kerja (SOP) dan menyusun rincian fitur yang disepakati (Scope of Work) agar aplikasi yang dibangun tepat guna dan mudah dioperasikan staf Anda.",
      },
      {
        question: "Bagaimana jika di kemudian hari ada kebutuhan penambahan fitur baru?",
        answer: "Sistem dirancang secara terstruktur sehingga dapat dikembangkan lebih lanjut. Jika di masa depan ada penambahan fitur di luar kesepakatan awal, pengembangannya dapat dijadwalkan secara terpisah dengan estimasi yang transparan.",
      },
    ],
  },
];
