import { NextRequest, NextResponse } from "next/server";
import Report from "@/models/report.model";
import dbConnect from "@lib/db/db";
import { asyncHandler } from "@lib/api/asynchandler";
import { ApiError } from "@lib/api/ApiError";
import { ApiResponse } from "@lib/api/ApiResponse";
import { uploadToCloudinary } from "../utils/cloudianry";
import mongoose from "mongoose";

// --- 1. UPLOAD NEW REPORT --- //
export const uploadReport = asyncHandler(async (req: NextRequest) => {
  await dbConnect();

  const userId = req.headers.get("x-user-id");
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(401, "Invalid User ID.");
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  console.log("--- REPORT UPLOAD DEBUG ---");
  if (file) {
    console.log("File Name:", file.name);
    console.log("File Type:", file.type);
    console.log("File Size:", file.size);
  } else {
    console.log("No file found in FormData.");
  }
  console.log("Category:", formData.get("category"));
  console.log("Report Date:", formData.get("reportDate"));

  if (!file) {
    throw new ApiError(400, "No file provided.");
  }

  const categoryValue = formData.get("category");
  const category =
    typeof categoryValue === "string" ? categoryValue : "General";

  const dateValue = formData.get("reportDate");
  const reportDate =
    typeof dateValue === "string" ? dateValue : new Date().toISOString();

  // Convert File → Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const isPDF =
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf");

  // 🔥 Upload to Cloudinary
  const uploadResult = await uploadToCloudinary(
    buffer,
    "health_reports",
    file.type || (isPDF ? "application/pdf" : "image/png")
  );

  if (!uploadResult?.secure_url) {
    throw new ApiError(500, "Upload failed.");
  }

  // ❌ NEVER append .pdf manually
  const newReport = await Report.create({
    user: new mongoose.Types.ObjectId(userId) as any,
    fileName: file.name,
    fileUrl: uploadResult.secure_url,
    fileType: isPDF ? "pdf" : "image",
    category,
    reportDate: new Date(reportDate),
  });

  return NextResponse.json(
    new ApiResponse(201, newReport, "Report uploaded successfully.")
  );
});
// --- 2. GET ALL USER REPORTS (WITH PAGINATION) ---
export const getAllUserReports = asyncHandler(async (req: NextRequest) => {
  await dbConnect();
  const userId = req.headers.get("x-user-id");

  // Extract query parameters (e.g., /api/user/reports?page=1&limit=10)
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const reports = await Report.find({ user: userId as any })
    .sort({ reportDate: -1 }) // Chronological order
    .skip(skip)
    .limit(limit);

  const totalReports = await Report.countDocuments({ user: userId as any });

  return NextResponse.json(
    new ApiResponse(
      200,
      {
        reports,
        pagination: {
          total: totalReports,
          page,
          limit,
          totalPages: Math.ceil(totalReports / limit)
        }
      },
      "Reports fetched successfully."
    )
  );
});

// --- 3. GET SINGLE REPORT BY ID ---
export const getReportById = asyncHandler(
  async (
    req: NextRequest,
    context: { params: { id: string } }
  ) => {
    await dbConnect();

    const userId = req.headers.get("x-user-id");
    const reportId = context.params?.id;

    // ✅ Proper validations
    if (!reportId) {
      throw new ApiError(400, "Report ID is required.");
    }

    if (!userId) {
      throw new ApiError(401, "User ID missing in headers.");
    }

    if (!mongoose.Types.ObjectId.isValid(reportId)) {
      throw new ApiError(400, "Invalid Report ID.");
    }

    const report = await Report.findOne({
      _id: reportId,
      user: userId,
    }as any);

    if (!report) {
      throw new ApiError(404, "Report not found or unauthorized.");
    }

    return NextResponse.json(
      new ApiResponse(200, report, "Report details fetched.")
    );
  }
);

// --- 4. EDIT/UPDATE REPORT ---
export const updateReport = asyncHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
  await dbConnect();
  const userId = req.headers.get("x-user-id");
  const reportId = params.id;
  const { fileName, category, reportDate } = await req.json();

  const report = await Report.findOneAndUpdate(
    { _id: reportId, user: userId as any },
    {
      $set: {
        fileName,
        category,
        reportDate: reportDate ? new Date(reportDate) : undefined
      }
    },
    { new: true }
  );

  if (!report) throw new ApiError(404, "Report not found to update.");

  return NextResponse.json(
    new ApiResponse(200, report, "Report updated successfully.")
  );
});

// --- 5. DELETE REPORT ---
export const deleteReport = asyncHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
  await dbConnect();
  const userId = req.headers.get("x-user-id");
  const reportId = params.id;

  const report = await Report.findOneAndDelete({ _id: reportId, user: userId as any });

  if (!report) throw new ApiError(404, "Report not found or already deleted.");

  // Note: Optional Cloudinary deletion logic can be added here

  return NextResponse.json(
    new ApiResponse(200, null, "Report deleted successfully.")
  );
});