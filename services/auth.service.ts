const BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/auth` 
  : "/api/auth";

export const authService = {
  // 1. User Registration
  register: async (userData: any) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    return await response.json();
  },

  // 2. Email Verification (OTP)
  verifyEmail: async (email: string, otp: string) => {
    const response = await fetch(`${BASE_URL}/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
      credentials: "include",
    });
    return await response.json();
  },

  // 3. User Login
  login: async (credentials: any) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    return await response.json();
  },

  // 4. Forgot Password (Request OTP)
  forgotPassword: async (email: string) => {
    const response = await fetch(`${BASE_URL}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      credentials: "include",
    });
    return await response.json();
  },

  // 5. Reset Password (Submit New Password)
  resetPassword: async (resetData: any) => {
    const response = await fetch(`${BASE_URL}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resetData), // email, otp, newPassword
      credentials: "include",
    });
    return await response.json();
  },

  // 6. Logout
  logout: async () => {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    return await response.json();
  },
};