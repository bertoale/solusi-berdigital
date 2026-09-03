import { NextRequest, NextResponse } from "next/server";
import { setAdminSession, verifyPassword } from "@/lib/auth";
import { findUserByEmail } from "@/lib/data-store";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Akun tidak ditemukan di database" },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Password yang Anda masukkan salah" },
        { status: 401 }
      );
    }

    await setAdminSession({
      email: user.email,
      name: "Administrator Solusi Berdigital",
      role: "admin",
      loggedInAt: Date.now(),
    });

    return NextResponse.json({
      success: true,
      message: "Login admin berhasil",
      user: {
        email: user.email,
        name: "Administrator Solusi Berdigital",
        role: "admin",
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Format request login tidak valid" },
      { status: 400 }
    );
  }
}
