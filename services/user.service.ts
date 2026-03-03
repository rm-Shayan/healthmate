const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// User related endpoints
const USER_BASE_URL = BASE_URL ? `${BASE_URL}/user` : "/api/user";

// Auth related endpoints
const AUTH_BASE_URL = BASE_URL ? `${BASE_URL}/auth` : "/api/auth";

export const userService = {
  // 1. Get Current User (GET /api/user/me)
  getMe: async () => {
    const response = await fetch(`${USER_BASE_URL}/me`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      try {
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Failed to fetch user" };
      } catch {
        const errorText = await response.text();
        return { success: false, message: errorText || "Failed to fetch user" };
      }
    }
    return await response.json();
  },

  // 2. Update Account Details (PUT /api/user/update)
  updateAccount: async (data: { name?: string; email?: string }) => {
    const response = await fetch(`${USER_BASE_URL}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  // 3. Change Password (POST /api/user/change-password)
  changePassword: async (passwords: { oldPassword: string; newPassword: string }) => {
    const response = await fetch(`${USER_BASE_URL}/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwords),
    });
    return await response.json();
  },

  // 4. Update Avatar (PUT /api/user/update-avatar)
  // Note: FormData is used here because the controller expects a file
  updateAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch(`${USER_BASE_URL}/update-avatar`, {
      method: "PUT",
      // Note: Browser automatically sets Content-Type for FormData
      body: formData,
    });
    return await response.json();
  },

  // 5. Delete Account (DELETE /api/user/delete)
  deleteAccount: async () => {
    const response = await fetch(`${USER_BASE_URL}/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  },

  // 6. Refresh Token (POST /api/auth/refresh-token)
  refreshToken: async () => {
    const response = await fetch(`${AUTH_BASE_URL}/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      try {
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Failed to refresh token" };
      } catch {
        const errorText = await response.text();
        return { success: false, message: errorText || "Failed to refresh token" };
      }
    }
    return await response.json();
  },
};