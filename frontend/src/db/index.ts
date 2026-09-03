import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  poolConnection: mysql.Pool | undefined;
};

const host = process.env.DB_HOST;
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

export const poolConnection =
  globalForDb.poolConnection ||
  mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.poolConnection = poolConnection;
}

export const db = drizzle(poolConnection, { schema, mode: "default" });
export { schema };

export async function testDatabaseConnection() {
  try {
    const conn = await poolConnection.getConnection();
    console.log(`\x1b[32m[DATABASE CONNECTED]\x1b[0m Berhasil terhubung ke MySQL: ${user}@${host}:${port || 3306}/${database}`);
    conn.release();
    return true;
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string };
    console.error(`\x1b[31m[DATABASE ERROR]\x1b[0m Gagal terhubung ke MySQL (${host}:${port || 3306}/${database}):`, err.message || error);
    return false;
  }
}
