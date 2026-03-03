import { getReportById, updateReport, deleteReport } from "@/lib/controllers/report.controllers";
import { NextRequest } from "next/server";

// Next.js 15 ya latest versions mein params Promise hota hai
type RouteParams = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params; // Yahan await zaroori hai
    return getReportById(req, { params: resolvedParams });
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params;
    return updateReport(req, { params: resolvedParams });
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params;
    return deleteReport(req, { params: resolvedParams });
}