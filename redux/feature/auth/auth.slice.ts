import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { 
  registerUserThunk, 
  loginUserThunk, 
  verifyEmailThunk, 
  logoutUserThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  refreshTokenThunk
} from "./auth.thunk";
import {
  getCurrentUserThunk,
  updateAccountThunk,
  updateAvatarThunk,
  changePasswordThunk,
  deleteAccountThunk
} from "../user/user.thunk"

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isRegistered: boolean; 
  forgotPassOtpSent: boolean; 
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isRegistered: false,
  forgotPassOtpSent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAuthState: (state) => {
      state.isRegistered = false;
      state.forgotPassOtpSent = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- LOGIN ---
      .addCase(loginUserThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUserThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // --- REGISTER ---
      .addCase(registerUserThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUserThunk.fulfilled, (state) => { state.loading = false; state.isRegistered = true; })
      .addCase(registerUserThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // --- VERIFY EMAIL (OTP) ---
      .addCase(verifyEmailThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(verifyEmailThunk.fulfilled, (state) => { state.loading = false; state.isRegistered = false; })
      .addCase(verifyEmailThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // --- FORGOT PASSWORD ---
      .addCase(forgotPasswordThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(forgotPasswordThunk.fulfilled, (state) => { state.loading = false; state.forgotPassOtpSent = true; })
      .addCase(forgotPasswordThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // --- RESET PASSWORD ---
      .addCase(resetPasswordThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(resetPasswordThunk.fulfilled, (state) => { state.loading = false; state.forgotPassOtpSent = false; })
      .addCase(resetPasswordThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // --- REFRESH TOKEN ---
      .addCase(refreshTokenThunk.pending, (state) => { state.loading = true; })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(refreshTokenThunk.rejected, (state, action) => { state.loading = false; state.isAuthenticated = false; state.user = null; })

      // --- GET CURRENT USER ---
      .addCase(getCurrentUserThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getCurrentUserThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // --- UPDATE ACCOUNT ---
      .addCase(updateAccountThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateAccountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(updateAccountThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // --- UPDATE AVATAR ---
      .addCase(updateAvatarThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateAvatarThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(updateAvatarThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // --- CHANGE PASSWORD ---
      .addCase(changePasswordThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(changePasswordThunk.fulfilled, (state) => { state.loading = false; })
      .addCase(changePasswordThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // --- LOGOUT & DELETE ACCOUNT ---
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(deleteAccountThunk.pending, (state) => { state.loading = true; })
      .addCase(deleteAccountThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(deleteAccountThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const { clearError, resetAuthState } = authSlice.actions;
export default authSlice.reducer;