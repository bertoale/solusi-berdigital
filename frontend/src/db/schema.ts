import { mysqlTable, text, varchar, timestamp, boolean, json, int, bigint, datetime } from "drizzle-orm/mysql-core";

// ==========================================
// 1. USERS TABLE (Akun Login: id, email, password)
// ==========================================
export const users = mysqlTable("users", {
  id: varchar("id", { length: 128 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// ==========================================
// 2. PORTFOLIOS TABLE (Studi Kasus - MySQL Schema)
// ==========================================
export const portfolios = mysqlTable("portfolios", {
  id: varchar("id", { length: 128 }).primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  title: text("title").notNull(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  clientType: varchar("client_type", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description").notNull(), // Deskripsi Singkat
  fullDescription: text("full_description").notNull(), // Deskripsi Biasa / Lengkap
  features: json("features").$type<string[]>().notNull(),
  mockupType: varchar("mockup_type", { length: 32 }).default("browser").notNull(),
  liveUrl: text("live_url"),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Portfolio = typeof portfolios.$inferSelect;
export type NewPortfolio = typeof portfolios.$inferInsert;

// ==========================================
// 3. PORTFOLIO IMAGES TABLE (Relasi Gambar Portofolio: imagePath)
// ==========================================
export const portfolioImages = mysqlTable("portfolio_images", {
  id: varchar("id", { length: 128 }).primaryKey(),
  portfolioId: varchar("portfolio_id", { length: 128 }).notNull(),
  imagePath: text("image_path").notNull(),
  order: int("order").default(0).notNull(),
});

export type PortfolioImage = typeof portfolioImages.$inferSelect;
export type NewPortfolioImage = typeof portfolioImages.$inferInsert;

export type PortfolioWithImages = Portfolio & {
  images: PortfolioImage[];
};

// ==========================================
// 4. PORTFOLIO CATEGORIES TABLE (Kategori Portofolio)
// ==========================================
export const portfolioCategories = mysqlTable("portfolio_categories", {
  id: varchar("id", { length: 128 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  description: text("description"),
  order: int("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type PortfolioCategory = typeof portfolioCategories.$inferSelect;
export type NewPortfolioCategory = typeof portfolioCategories.$inferInsert;

// ==========================================
// 5. ARTICLES & ARTICLE CATEGORIES (Mapping ke tabel sb-blog)
// ==========================================
export interface FAQItem {
  question: string;
  answer: string;
}
export type BlogFaqItem = FAQItem;

export const articleCategories = mysqlTable("article_categories", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { fsp: 3 }),
});

export type ArticleCategory = typeof articleCategories.$inferSelect;

export const articles = mysqlTable("articles", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  title: varchar("title", { length: 300 }).notNull(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  featuredImageUrl: varchar("featured_image_url", { length: 500 }),
  categoryId: bigint("category_id", { mode: "number", unsigned: true }).notNull(),
  status: varchar("status", { length: 20 }).default("draft").notNull(),
  tags: json("tags").$type<string[]>().default([]),
  faq: json("faq").$type<FAQItem[]>().default([]),
  topicMapItemId: bigint("topic_map_item_id", { mode: "number", unsigned: true }),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { fsp: 3 }),
});

export type Article = typeof articles.$inferSelect;
