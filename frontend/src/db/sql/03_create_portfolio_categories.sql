-- ============================================================================
-- TABEL: portfolio_categories
-- Deskripsi: Menyimpan kategori / klasifikasi proyek portofolio
-- ============================================================================

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
