import { cookies } from "next/headers";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const ADMIN_COOKIE_NAME = "sb_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari dalam detik
export interface AdminSession {
  email: string;
  name: string;
  role: string;
  loggedInAt: number;
  expiresAt: number;
}

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is missing! Please configure it in .env.");
  }
  return secret;
}

/**
 * Hash password menggunakan algoritma Bcrypt (Salt rounds: 10)
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Verifikasi kecocokan password plaintext dengan bcrypt hash (Aman terhadap timing attack)
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // Jika hash tersimpan adalah bcrypt ($2a$, $2b$, dsb.)
  if (hash.startsWith("$2a$") || hash.startsWith("$2b$") || hash.startsWith("$2y$")) {
    return bcrypt.compare(password, hash);
  }
  // Fallback jika belum di-hash (timing-safe comparison)
  const bufA = Buffer.from(password);
  const bufB = Buffer.from(hash);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Buat HMAC-SHA256 signature untuk data string
 */
function createSignature(payload: string): string {
  const secret = getAuthSecret();
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

/**
 * Verifikasi signature HMAC secara timing-safe
 */
function verifySignature(payload: string, signature: string): boolean {
  const expectedSig = createSignature(payload);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length) return false;
  return crypto.timingSafeEqual(sigBuf, expBuf);
}


/**
 * Membaca dan memvalidasi sesi admin dari cookie terenkripsi/tertanda tangan kriptografis
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!sessionToken) return null;

  try {
    const parts = sessionToken.split(".");
    if (parts.length !== 2) return null;

    const [encodedPayload, signature] = parts;

    // 1. Verifikasi integritas kriptografis token HMAC
    if (!verifySignature(encodedPayload, signature)) {
      console.warn("Peringatan Keamanan: Percobaan manipulasi cookie sesi terdeteksi!");
      return null;
    }

    // 2. Decode payload JSON
    const payloadJson = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const session: AdminSession = JSON.parse(payloadJson);

    // 3. Validasi masa berlaku (Expiration)
    if (!session.expiresAt || Date.now() > session.expiresAt) {
      return null;
    }

    // 4. Validasi role
    if (session.role !== "admin" || !session.email) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Membuat dan menyimpan sesi admin ke cookie HTTP-Only yang aman dan ditandatangani
 */
export async function setAdminSession(sessionData: Omit<AdminSession, "expiresAt">): Promise<void> {
  const cookieStore = await cookies();
  const now = Date.now();
  const expiresAt = now + SESSION_MAX_AGE * 1000;

  const session: AdminSession = {
    ...sessionData,
    expiresAt,
  };

  const payloadString = JSON.stringify(session);
  const encodedPayload = Buffer.from(payloadString).toString("base64url");
  const signature = createSignature(encodedPayload);
  const signedToken = `${encodedPayload}.${signature}`;

  cookieStore.set(ADMIN_COOKIE_NAME, signedToken, {
    httpOnly: true, // Tidak bisa diakses oleh JavaScript/XSS
    secure: process.env.NODE_ENV === "production", // Wajib HTTPS di production
    sameSite: "lax", // Perlindungan CSRF
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/**
 * Menghapus sesi admin saat logout
 */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
