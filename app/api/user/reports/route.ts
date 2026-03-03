import { uploadReport, getAllUserReports } from "@/lib/controllers/report.controllers";
import { NextRequest } from "next/server";

// 1. POST Request: Nayi report upload karne ke liye
export async function POST(req: NextRequest) {
    return uploadReport(req);
}

// 2. GET Request: Saari reports (paginated) fetch karne ke liye
export async function GET(req: NextRequest) {
    return getAllUserReports(req);
}