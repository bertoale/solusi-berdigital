import { NextRequest, NextResponse } from "next/server";
import { getAdminCredentials, setAdminSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const credentials = getAdminCredentials();

    if (email === credentials.email && password === credentials.password) {
      await setAdminSession({
        email: credentials.email,
        name: credentials.name,
        role: "admin",
        loggedInAt: Date.now(),
      });

      return NextResponse.json({
        success: true,
        message: "Login admin berhasil",
        user: {
          email: credentials.email,
          name: credentials.name,
          role: "admin",
        },
      });
    }

    return NextResponse.json(
      { success: false, error: "Email atau password admin tidak valid" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Format request login tidak valid" },
      { status: 400 }
    );
  }
}
