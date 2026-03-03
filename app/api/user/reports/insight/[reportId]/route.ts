import { NextRequest } from "next/server";
import { getAiInsightByReportId } from "@/lib/controllers/aiInsight.controller";

type RouteParams = {
  params: Promise<{ reportId: string }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { reportId } = await params; // ✅ unwrap Promise

  return getAiInsightByReportId(req, { reportId });
}