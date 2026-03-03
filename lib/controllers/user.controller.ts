import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import dbConnect from "@lib/db/db";
import { asyncHandler } from "@lib/api/asynchandler";
import { ApiError } from "@lib/api/ApiError";
import { ApiResponse } from "@lib/api/ApiResponse";
import { uploadToCloudinary } from "../utils/cloudianry";

// --- 1. GET CURRENT USER ---
export const getCurrentUser = asyncHandler(async (req: NextRequest) => {
  await dbConnect();

  // Note: User ID should be obtained from middleware (currently extracted from headers for implementation)
  const userId = req.headers.get("x-user-id");

  if (!userId) throw new ApiError(401, "Unauthorized access.");

  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) throw new ApiError(404, "User not found.");

  return NextResponse.json(
    new ApiResponse(200, user, "User fetched successfully."),
  );
});

// --- 2. UPDATE USER DETAILS ---
export const updateAccountDetails = asyncHandler(async (req: NextRequest) => {
  await dbConnect();
  const { name, email } = await req.json();
  const userId = req.headers.get("x-user-id");

  if (!userId) throw new ApiError(401, "Unauthorized access.");

  if (!name && !email) {
    throw new ApiError(400, "Please provide at least one field to update.");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        name: name,
        email: email,
      },
    },
    { new: true }, // Return updated document
  ).select("-password");

  return NextResponse.json(
    new ApiResponse(200, user, "Account details updated successfully."),
  );
});
// --- 3. CHANGE PASSWORD ---
export const changeCurrentPassword = asyncHandler(async (req: NextRequest) => {
  await dbConnect();
  const { oldPassword, newPassword } = await req.json();
  const userId = req.headers.get("x-user-id");

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old and new passwords are required.");
  }

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found.");

  // Password verification
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password.");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return NextResponse.json(
    new ApiResponse(200, {}, "Password changed successfully."),
  );
});

// --- 4. UPDATE AVATAR / PROFILE PICTURE ---
export const updateUserAvatar = asyncHandler(async (req: NextRequest) => {
  await dbConnect();

  const userId = req.headers.get("x-user-id");

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // Receive FormData
  const formData = await req.formData();
  const file = formData.get("avatar") as File;

  if (!file) {
    throw new ApiError(400, "Avatar file is missing.");
  }

  // ✅ File → Buffer convert
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 🔥 Upload to Cloudinary
  const result: any = await uploadToCloudinary(
    buffer,
    "avatars",
    file.type
  );
  // Optional: Old avatar delete karna (agar store kar rahe ho publicId)
  const existingUser = await User.findById(userId);

  if (existingUser?.avatarPublicId) {
    const cloudinaryInst = (await import("@/lib/services/cloudinary")).default;
    await cloudinaryInst.uploader.destroy(existingUser.avatarPublicId);
  }
  // Database update
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        avatar: result.secure_url,
        avatarPublicId: result.public_id,
      },
    },
    { new: true },
  ).select("-password");

  return NextResponse.json(
    new ApiResponse(200, user, "Avatar updated successfully."),
  );
});
// --- 5. DELETE ACCOUNT (Optional but Professional) ---
export const deleteAccount = asyncHandler(async (req: NextRequest) => {
  await dbConnect();
  const userId = req.headers.get("x-user-id");

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found.");

  await User.findByIdAndDelete(userId);

  // Clear session cookies
  const response = NextResponse.json(
    new ApiResponse(200, null, "Account deleted successfully."),
  );

  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");

  return response;
});
