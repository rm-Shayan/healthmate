import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "@/services/user.service";

// 1. Get Current User Thunk
export const getCurrentUserThunk = createAsyncThunk(
  "user/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getMe();
      if (!response.success) return rejectWithValue(response.message);
      return response.data; // User object return karega
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);

// 2. Update Account Details Thunk
export const updateAccountThunk = createAsyncThunk(
  "user/updateAccount",
  async (data: { name?: string; email?: string }, { rejectWithValue }) => {
    try {
      const response = await userService.updateAccount(data);
      if (!response.success) return rejectWithValue(response.message);
      return response.data; // Updated user object
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update profile");
    }
  }
);

// 3. Change Password Thunk
export const changePasswordThunk = createAsyncThunk(
  "user/changePassword",
  async (passwords: any, { rejectWithValue }) => {
    try {
      const response = await userService.changePassword(passwords);
      if (!response.success) return rejectWithValue(response.message);
      return response.message; 
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to change password");
    }
  }
);

// 4. Update Avatar Thunk
export const updateAvatarThunk = createAsyncThunk(
  "user/updateAvatar",
  async (file: File, { rejectWithValue }) => {
    try {
      const response = await userService.updateAvatar(file);
      if (!response.success) return rejectWithValue(response.message);
      return response.data; // Updated user with new avatar URL
    } catch (error: any) {
      return rejectWithValue(error.message || "Avatar upload failed");
    }
  }
);

// 5. Delete Account Thunk
export const deleteAccountThunk = createAsyncThunk(
  "user/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.deleteAccount();
      if (!response.success) return rejectWithValue(response.message);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete account");
    }
  }
);