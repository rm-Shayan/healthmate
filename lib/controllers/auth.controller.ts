import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import dbConnect from "@lib/db/db";
import { asyncHandler } from "@lib/api/asynchandler";
import { ApiError } from "@lib/api/ApiError";
import { ApiResponse } from "@lib/api/ApiResponse";
import { cookies } from "next/headers";
import { sendEmail } from "@lib/utils/resend";
import { verifyJwt } from "../helpers/verify-jwt";
// --- 1. SIGNUP WITH OTP ---
export const registerUser = asyncHandler(async (req: NextRequest) => {
    await dbConnect();
    const { name, email, password } = await req.json();

    if ([name, email, password].some(f => !f?.trim())) {
        throw new ApiError(400, "All fields (Name, Email, Password) are required.");
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) throw new ApiError(409, "User with this email already exists.");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 3600000); // 1 hour expiry

    const user = await User.create({
        name,
        email,
        password,
        verifyToken: otp,
        verifyTokenExpiry: expiry,
        isVerified: false
    });

    await sendEmail(email, "HealthMate - Verify Your Account", otp);

    const createdUser = await User.findById(user._id).select("-password -refreshToken -verifyToken");

    return NextResponse.json(
        new ApiResponse(201, createdUser, "Registration successful! Please check your email for the OTP.")
    );
});

// --- 2. VERIFY EMAIL ---
export const verifyEmail = asyncHandler(async (req: NextRequest) => {
    await dbConnect();
    const { email, otp } = await req.json();

    const user = await User.findOne({
        email,
        verifyToken: otp,
        verifyTokenExpiry: { $gt: Date.now() }
    });

    if (!user) throw new ApiError(400, "Invalid OTP or email has expired.");

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    return NextResponse.json(new ApiResponse(200, null, "Email verified successfully."));
});

// --- 3. LOGIN ---
export const loginUser = asyncHandler(async (req: NextRequest) => {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User does not exist.");

    if (!user.isVerified) {
        throw new ApiError(403, "Please verify your email before logging in.");
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) throw new ApiError(401, "Invalid password.");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const cookieStore = await cookies();
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" as const,
    };

    cookieStore.set("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 });
    cookieStore.set("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 });

    return NextResponse.json(
        new ApiResponse(200, { user: { name: user.name, email: user.email }, accessToken }, "Login successful.")
    );
});

// --- 4. FORGOT PASSWORD ---
export const forgotPassword = asyncHandler(async (req: NextRequest) => {
    await dbConnect();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "No user found with this email.");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.forgotPasswordToken = otp;
    user.forgotPasswordTokenExpiry = new Date(Date.now() + 600000); // 10 mins
    await user.save({ validateBeforeSave: false });

    await sendEmail(email, "HealthMate - Reset Password OTP", otp);

    return NextResponse.json(new ApiResponse(200, null, "Password reset OTP has been sent to your email."));
});

// --- 5. RESET PASSWORD ---
export const resetPassword = asyncHandler(async (req: NextRequest) => {
    await dbConnect();
    const { email, otp, newPassword } = await req.json();
    const normalizedEmail = email?.toLowerCase()?.trim();
    const otpCleaned = otp?.trim();

    console.log("--- RESET PASSWORD DEBUG ---");
    console.log("Email:", normalizedEmail);
    console.log("OTP Received:", otpCleaned);

    if (!normalizedEmail || !otpCleaned || !newPassword) {
        throw new ApiError(400, "Email, OTP, and New Password are required.");
    }

    const user = await User.findOne({
        email: normalizedEmail,
        forgotPasswordToken: otpCleaned,
        forgotPasswordTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
        // Check if user exists at all to give better error message
        const userExists = await User.findOne({ email: normalizedEmail });
        if (!userExists) {
            console.error("User not found for email:", normalizedEmail);
            throw new ApiError(404, "No user found with this email.");
        }
        console.error("Invalid OTP or OTP expired for email:", normalizedEmail);
        throw new ApiError(400, "Invalid OTP or OTP has expired.");
    }

    console.log("User found, updating password for:", user.email);
    user.password = newPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    // Explicitly using save to trigger the hashing hook
    await user.save();
    console.log("Password reset successful for:", user.email);

    return NextResponse.json(new ApiResponse(200, null, "Password has been reset successfully."));
});

// --- 6. LOGOUT ---
export const logoutUser = asyncHandler(async (req: NextRequest) => {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return NextResponse.json(new ApiResponse(200, null, "User logged out successfully."));
});


// Refresh Token Controller
export const refreshToken = asyncHandler(async (req: NextRequest) => {
    await dbConnect();

    // 1️⃣ Get refresh token from cookie or header
    const cookieToken = req.cookies.get("refreshToken")?.value;
    const authHeader = req.headers.get("authorization")?.split(" ")[1];

    const token = cookieToken || authHeader;

    if (!token) throw new ApiError(401, "Refresh token missing");

    // 2️⃣ Verify refresh token using helper
    const decoded: any = verifyJwt(token, process.env.REFRESH_TOKEN_SECRET);

    if (!decoded?._id) throw new ApiError(401, "Invalid refresh token");

    // 3️⃣ Find user
    const user = await User.findById(decoded._id);
    if (!user) throw new ApiError(404, "User not found");

    if (user.refreshToken !== token) throw new ApiError(401, "Refresh token mismatch");

    // 4️⃣ Generate new tokens using model methods
    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    // Update DB with new refresh token
    user.refreshToken = newRefreshToken;
    await user.save();

    // 5️⃣ Send response + set cookie
    const response = NextResponse.json(
        new ApiResponse(
            200,
            {
                accessToken: newAccessToken,
                user: {
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                }
            },
            "Token refreshed"
        )
    );

    response.cookies.set("refreshToken", newRefreshToken, {
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    response.cookies.set("accessToken", newAccessToken, { // Set correct access token
        httpOnly: true,
        path: "/",
        maxAge: 15 * 60 * 60,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return response;
});