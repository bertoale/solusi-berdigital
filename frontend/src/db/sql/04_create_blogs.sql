-- ============================================================================
-- TABEL: blogs
-- Deskripsi: Menyimpan artikel, edukasi, dan wawasan bisnis digital
-- ============================================================================

CREATE TABLE IF NOT EXISTS `blogs` (
  `id` VARCHAR(128) NOT NULL,
  `slug` VARCHAR(128) NOT NULL,
  `title` TEXT NOT NULL,
  `excerpt` TEXT NOT NULL COMMENT 'Ringkasan / Cuplikan Artikel',
  `content` TEXT NOT NULL COMMENT 'Konten Lengkap Tiptap HTML / Markdown',
  `category` VARCHAR(100) NOT NULL,
  `author` VARCHAR(100) NOT NULL DEFAULT 'Tim Solusi Berdigital',
  `image_path` TEXT NULL COMMENT 'Path Gambar Cover di S3, e.g. /blog/172530000-sample.webp',
  `tags` JSON NULL COMMENT 'Array tag string JSON',
  `is_published` BOOLEAN NOT NULL DEFAULT TRUE,
  `published_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_blogs_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
