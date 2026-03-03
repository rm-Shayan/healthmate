import { NextRequest } from "next/server";
import { askAiFollowUp } from "@controllers/aiInsight.controller";

// POST: /api/user/reports/insight/chat
export async function POST(req: NextRequest) {
    return await askAiFollowUp(req);
}