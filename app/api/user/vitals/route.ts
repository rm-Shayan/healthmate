import { addVital, getAllUserVitals } from "@controllers/vitals.controller";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return addVital(req);
}

export async function GET(req: NextRequest) {
    return getAllUserVitals(req);
}
