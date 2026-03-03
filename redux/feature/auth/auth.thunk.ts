import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";

/**
 * 1. Register Thunk
 * Payload: { name, email, password }
 */
export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      if (!response.success) return rejectWithValue(response.message);
      return response.data; // User object minus sensitive fields
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to register. Please try again.");
    }
  }
);

/**
 * 7. Refresh Token Thunk
 * Aksar payload ki zaroorat nahi hoti kyunke refresh token cookie mein hota hai
 */
export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      // userService ya authService mein jo humne pehle function banaya tha
      const response = await  userService.refreshToken(); 
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      
      return response.data; // Naya accessToken aur user data return karega
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Session expired. Please login again."
      );
    }
  }
);

/**
 * 2. Verify Email (OTP) Thunk
 * Payload: { email, otp }
 */
export const verifyEmailThunk = createAsyncThunk(
  "auth/verifyEmail",
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await authService.verifyEmail(email, otp);
      if (!response.success) return rejectWithValue(response.message);
      return response.message; 
    } catch (error: any) {
      return rejectWithValue(error.message || "Invalid or expired OTP.");
    }
  }
);

/**
 * 3. Login Thunk
 * Payload: { email, password }
 */
export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      if (!response.success) return rejectWithValue(response.message);
      return response.data; // Contains { user, accessToken }
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed. Please check your credentials.");
    }
  }
);

/**
 * 4. Forgot Password Thunk
 * Payload: email (string)
 */
export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(email);
      if (!response.success) return rejectWithValue(response.message);
      return response.message;
    } catch (error: any) {
      return rejectWithValue(error.message || "Could not send reset OTP.");
    }
  }
);

/**
 * 5. Reset Password Thunk
 * Payload: { email, otp, newPassword }
 */
export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async (resetData: any, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(resetData);
      if (!response.success) return rejectWithValue(response.message);
      return response.message;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to reset password.");
    }
  }
);

/**
 * 6. Logout Thunk
 * No Payload
 */
export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.logout();
      if (!response.success) return rejectWithValue(response.message);
      return response.message;
    } catch (error: any) {
      return rejectWithValue(error.message || "Logout failed.");
    }
  }
);