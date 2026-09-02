-- ============================================================================
-- TABEL: portfolios
-- Deskripsi: Menyimpan data studi kasus & portofolio proyek klien
-- ============================================================================

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
