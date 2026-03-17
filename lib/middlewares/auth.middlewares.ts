// lib/proxy/auth.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/helpers/verify-jwt";
import { ApiError } from "../api/ApiError";

export async function authMiddleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  console.log(`🛡️  [Proxy] Request to: ${pathname}`);

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const authHeader = req.headers.get("authorization")?.split(" ")[1];

  // Token priority: Header (Authorization) > Cookie (AccessToken) > Cookie (RefreshToken)
  const token = authHeader || accessToken || refreshToken;

  if (!token) {
    return NextResponse.json(new ApiError(401, "Authentication token missing"), { status: 401 });
  }

  try {
    // Try verifying as Access Token first
    const payload = verifyJwt(token, process.env.ACCESS_TOKEN_SECRET) as any;

    // If verification failed and we have a refresh token (or the token itself is the refresh token)
    if (!payload && token === refreshToken) {
        const decodedRefresh = verifyJwt(token, process.env.REFRESH_TOKEN_SECRET) as any;
        if (decodedRefresh) {
            const userId = decodedRefresh._id || decodedRefresh.id || decodedRefresh.sub;
            if (userId) {
                const requestHeaders = new Headers(req.headers);
                requestHeaders.set("x-user-id", userId);
                return NextResponse.next({
                  request: { headers: requestHeaders },
                });
            }
        }
    }

    const userId = payload?._id || payload?.id || payload?.sub;

    if (!userId) {
        throw new Error("Invalid token: User ID missing");
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", userId);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });

  } catch (error: any) {
    console.error(`🛡️ [Proxy] Auth Failed: ${error.message}`);
    const response = NextResponse.json(
      { success: false, message: "Session expired or invalid. Please login again." },
      { status: 401 }
    );

    // Clear cookies if token is invalid
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }
}