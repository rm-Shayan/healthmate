import { getVitalById, updateVital, deleteVital } from "@controllers/vitals.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return getVitalById(req, { params: resolvedParams });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return updateVital(req, { params: resolvedParams });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return deleteVital(req, { params: resolvedParams });
}
