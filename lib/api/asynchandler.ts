import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./ApiError";
import { ApiResponse } from "./ApiResponse";

export const asyncHandler = (fn: Function) => {
  return async (request: NextRequest, ...args: any[]) => {
    try {
      // 1. Controller function ko execute karo
      return await fn(request, ...args);
    } catch (error: any) {
      console.error("--- HEALTHMATE API ERROR ---");
      console.error(error);

      // 2. Agar error hamari ApiError class ka instance hai
      if (error instanceof ApiError) {
        return NextResponse.json(
          // ApiResponse(statusCode, data, message)
          new ApiResponse(error.statusCode, null, error.message),
          { status: error.statusCode }
        );
      }

      // 3. Agar koi unknown error hai (e.g. Database connection fail)
      return NextResponse.json(
        new ApiResponse(500, null, error.message || "Internal Server Error"),
        { status: 500 }
      );
    }
  };
};