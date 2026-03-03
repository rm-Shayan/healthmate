import jwt from "jsonwebtoken";

export const verifyJwt = (token: string, secret?: string) => {
  try {
    if (!token) return null;

    // Agar secret provide hai use karo, nahi to env wali
    const decoded = jwt.verify(token, secret || process.env.ACCESS_TOKEN_SECRET!);

    return decoded;
  } catch (error) {
    console.error("JWT Verification failed:", error);
    return null;
  }
};