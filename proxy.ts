import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/lib/middlewares/auth.middlewares";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ❌ api/auth ko skip karo
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // ✅ baqi sab API routes par auth lagao
  if (pathname.startsWith("/api")) {
    return authMiddleware(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // 🔥 sirf API routes par proxy chalegi
};