import * as schema from "./schema";

export function getDatabaseConfig() {
  return {
    host: process.env.DB_HOST || "mysql",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "123",
    database: process.env.DB_NAME || "solusi-berdigital",
  };
}

// Helper function to check if database configuration is available
export function isDatabaseConfigured(): boolean {
  const { host, database, user } = getDatabaseConfig();
  return Boolean(host && database && user);
}

export { schema };
