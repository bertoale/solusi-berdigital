-- ============================================================================
-- MASTER SCRIPT: Inisialisasi Seluruh Tabel Database MySQL
-- Database: solusi-berdigital
-- ============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Tabel Users (Akun Login: id, email, password)
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(128) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabel Kategori Portofolio
CREATE TABLE IF NOT EXISTS `portfolio_categories` (
  `id` VARCHAR(128) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(128) NOT NULL,
  `description` TEXT NULL,
  `order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_portfolio_categories_name` (`name`),
  UNIQUE KEY `uk_portfolio_categories_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Tabel Portofolio Proyek
CREATE TABLE IF NOT EXISTS `portfolios` (
  `id` VARCHAR(128) NOT NULL,
  `slug` VARCHAR(128) NOT NULL,
  `title` TEXT NOT NULL,
  `client_name` VARCHAR(255) NOT NULL,
  `client_type` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL COMMENT 'Deskripsi Singkat',
  `full_description` TEXT NOT NULL COMMENT 'Deskripsi Biasa / Lengkap',
  `features` JSON NOT NULL COMMENT 'Daftar fitur / teknologi JSON array',
  `mockup_type` VARCHAR(32) NOT NULL DEFAULT 'browser',
  `live_url` TEXT NULL COMMENT 'URL Website / Live Demo',
  `is_published` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_portfolios_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Tabel Gambar Portofolio (Relasi: image_path)
CREATE TABLE IF NOT EXISTS `portfolio_images` (
  `id` VARCHAR(128) NOT NULL,
  `portfolio_id` VARCHAR(128) NOT NULL,
  `image_path` TEXT NOT NULL COMMENT 'Path Gambar di S3, e.g. /portofolio/172530000-sample.webp',
  `order` INT NOT NULL DEFAULT 0 COMMENT 'Urutan tampil gambar (0 = thumbnail)',
  PRIMARY KEY (`id`),
  KEY `idx_portfolio_id` (`portfolio_id`),
  CONSTRAINT `fk_portfolio_images_portfolio` 
    FOREIGN KEY (`portfolio_id`) 
    REFERENCES `portfolios` (`id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Tabel Kategori Blog
CREATE TABLE IF NOT EXISTS `blog_categories` (
  `id` VARCHAR(128) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(128) NOT NULL,
  `description` TEXT NULL,
  `order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_blog_categories_name` (`name`),
  UNIQUE KEY `uk_blog_categories_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Tabel Artikel Blog (image_path & blog_faqs)
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
  `blog_faqs` JSON NULL COMMENT 'Array JSON FAQ [{question, answer}] untuk skema JSON-LD FAQPage',
  `is_published` BOOLEAN NOT NULL DEFAULT TRUE,
  `published_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_blogs_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
