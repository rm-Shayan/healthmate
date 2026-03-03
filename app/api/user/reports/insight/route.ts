import { NextRequest } from "next/server";
import { 
    generateReportInsight, 
    deleteAiInsight
} from "@controllers/aiInsight.controller"; // Apne path ke mutabiq adjust karein

// POST: /api/user/reports/insight (Naya analysis generate karne ke liye)
export async function POST(req: NextRequest) {
    return await generateReportInsight(req);
}


// DELETE: /api/user/reports/insight?id=123
export async function DELETE(req: NextRequest) {
    return await deleteAiInsight(req);
}