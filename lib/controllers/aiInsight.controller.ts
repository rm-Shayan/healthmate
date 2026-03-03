import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { ApiError } from "@/lib/api/ApiError";
import { asyncHandler } from "@/lib/api/asynchandler";
import { ApiResponse } from "@/lib/api/ApiResponse";
import Report from "@/models/report.model";
import AiInsight from "@/models/aiInsight.model";
import JSON5 from "json5";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../db/db";

// 🔹 Types for AI Response
export const generateReportInsight = asyncHandler(async (req: NextRequest) => {
  await dbConnect();
  const { reportId } = await req.json();
  const userId = req.headers.get("x-user-id");

  if (!reportId || !userId) throw new ApiError(400, "Report ID or User ID is missing.");

  const report = await Report.findOne({
    _id: new mongoose.Types.ObjectId(reportId as string),
    user: new mongoose.Types.ObjectId(userId as string)
  } as any);

  if (!report) throw new ApiError(404, "Report not found.");

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey!);

  try {
    // 🔹 FIX: Fetch with Headers and Options
    // Cloudinary URLs ko fetch karne ke liye hum simple fetch use kar rahe hain
    const fileRes = await fetch(report.fileUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/pdf, image/*' },
      cache: 'no-store'
    });

    if (!fileRes.ok) {
       console.error(`Download failed: ${fileRes.status} ${fileRes.statusText}`);
       throw new ApiError(500, `Failed to download report from storage. Status: ${fileRes.status}`);
    }

    const arrayBuffer = await fileRes.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");

    // 🔹 FIX: Model Name (Always use stable 1.5-flash for now)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const promptPart = `Analyze this medical report. Return ONLY a raw JSON object. 
    Required format:
    {
      "summaryEnglish": "Concise medical summary",
      "summaryUrdu": "Friendly Roman Urdu explanation",
      "abnormalValues": ["List abnormal markers"],
      "doctorQuestions": ["Questions for doctor"],
      "suggestions": "Diet/Lifestyle advice"
    }`;

    const mimeType = report.fileType === "pdf" ? "application/pdf" : "image/jpeg";

    const filePart = {
      inlineData: { data: base64Data, mimeType: mimeType },
    };

    const result = await model.generateContent([promptPart, filePart]);
    const response = await result.response;
    const rawText = response.text();
    
    // Clean and Parse JSON
    const cleanJsonStr = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedAI = JSON5.parse(cleanJsonStr);

    const insight = await AiInsight.create({
      reportId: new mongoose.Types.ObjectId(reportId) as any,
      summaryEnglish: parsedAI.summaryEnglish,
      summaryUrdu: parsedAI.summaryUrdu,
      abnormalValues: parsedAI.abnormalValues || [],
      doctorQuestions: parsedAI.doctorQuestions || [],
      suggestions: parsedAI.suggestions || ""
    });

    return NextResponse.json(new ApiResponse(201, insight, "AI Insight generated successfully."));

  } catch (error: any) {
    console.error("Gemini Error Detailed:", error);
    // Custom handling for Gemini specific errors
    if (error.message?.includes("fetch")) {
        throw new ApiError(500, "Network error: Could not reach the file storage.");
    }
    throw new ApiError(500, error.message || "AI Analysis Failed");
  }
});

export const getAiInsightByReportId = asyncHandler(
   async (req: NextRequest, { reportId }: { reportId: string })=> {
    await dbConnect();
    try {
      // ✅ reportId from dynamic route or query
      const userId = req.headers.get("x-user-id");

      if (!reportId) throw new ApiError(400, "reportId is required.");
      if (!userId) throw new ApiError(401, "User ID missing in headers.");

      if (!mongoose.Types.ObjectId.isValid(reportId)) {
        throw new ApiError(400, "Invalid reportId format.");
      }

      const insight = await AiInsight.findOne({
        reportId: new mongoose.Types.ObjectId(reportId) as any,
        user: new mongoose.Types.ObjectId(userId),
      });

      if (!insight) return NextResponse.json(new ApiResponse(200, null, "No AI insight found for this report."));

      return NextResponse.json(new ApiResponse(200, insight, "AI Insight fetched successfully."));
    } catch (error: any) {
      console.error("getAiInsightByReportId error:", error.message || error);
      throw error instanceof ApiError
        ? error
        : new ApiError(500, "Internal server error while fetching AI insight.");
    }
  }
);

export const askAiFollowUp = asyncHandler(async (req: NextRequest) => {
  await dbConnect();
  const { reportId, userQuestion } = await req.json();
  const userId = req.headers.get("x-user-id");

  if (!reportId || !userQuestion) throw new ApiError(400, "Question and Report ID are required.");
  if (!userId) throw new ApiError(401, "Unauthorized: User ID is required.");

  // 1. Find report to ensure ownership
  const report = await Report.findOne({
  _id: new mongoose.Types.ObjectId(reportId as string),
  user: new mongoose.Types.ObjectId(userId as string)
} as any); // <--- Just add 'as any' here

  if (!report) throw new ApiError(404, "Report not found or access denied.");

  // 2. Find insight for context
  const insight = await AiInsight.findOne({
    reportId: new mongoose.Types.ObjectId(reportId as string)
  } as any);
  if (!insight) throw new ApiError(404, "Analysis not found. Please analyze the report first.");


  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey!);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const chatContext = `
        Context: The patient's medical report summary is: ${insight.summaryEnglish}. 
        Abnormal values found: ${insight.abnormalValues.join(", ")}.
        
        Question: ${userQuestion}
        
        Instruction: Respond in a friendly, helpful way in Roman Urdu. Keep it concise, empathetic, and always advise the patient to consult a professional doctor for medical decisions.
    `;

  const result = await model.generateContent(chatContext);
  const response = await result.response;
  const text = response.text();

  return NextResponse.json(new ApiResponse(200, { answer: text }, "AI replied successfully."));
});
export const deleteAiInsight = asyncHandler(async (req: NextRequest) => {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const insightId = searchParams.get("id");


  if (!insightId) throw new ApiError(400, "Insight ID required.");

  await AiInsight.findByIdAndDelete(insightId);

  return NextResponse.json(new ApiResponse(200, null, "AI Insight deleted."));
});