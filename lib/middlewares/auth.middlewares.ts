// lib/proxy/auth.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/helpers/verify-jwt";

export async function authMiddleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  console.log(`🛡️  [Proxy] Request to: ${pathname}`);

  const cookieToken = req.cookies.get("accessToken")?.value;
  const authHeader = req.headers.get("authorization")?.split(" ")[1];
  const token = cookieToken || authHeader;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: Access token missing" },
      { status: 401 }
    );
  }

  try {
    const payload: any = verifyJwt(token);
    const userId = payload?._id || payload?.id || payload?.sub;

    if (!userId) throw new Error("User ID missing in token");

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", userId);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });

  } catch (error: any) {
    const response = NextResponse.json(
      { success: false, message: "Session expired. Please login again." },
      { status: 401 }
    );

    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }
}