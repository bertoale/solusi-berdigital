-- ============================================================================
-- TABEL: portfolio_images
-- Deskripsi: Menyimpan relasi multi-gambar screenshot portofolio
-- ============================================================================

CREATE TABLE IF NOT EXISTS `portfolio_images` (
  `id` VARCHAR(128) NOT NULL,
  `portfolio_id` VARCHAR(128) NOT NULL,
  `image_path` TEXT NOT NULL COMMENT 'Path Gambar di S3, e.g. /portofolio/172530000-sample.webp',
  `order` INT NOT NULL DEFAULT 0 COMMENT 'Urutan tampil gambar (0 = thumbnail utama)',
  PRIMARY KEY (`id`),
  KEY `idx_portfolio_id` (`portfolio_id`),
  CONSTRAINT `fk_portfolio_images_portfolio` 
    FOREIGN KEY (`portfolio_id`) 
    REFERENCES `portfolios` (`id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
