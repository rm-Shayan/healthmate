import { NextRequest, NextResponse } from "next/server";
import Vitals from "@models/vital.model";
import dbConnect from "@lib/db/db";
import { asyncHandler } from "@lib/api/asynchandler";
import { ApiError } from "@lib/api/ApiError";
import { ApiResponse } from "@lib/api/ApiResponse";
import mongoose from "mongoose";

// --- 1. ADD NEW VITAL ENTRY ---
export const addVital = asyncHandler(async (req: NextRequest) => {
    await dbConnect();
    const userId = req.headers.get("x-user-id");
    if (!userId) throw new ApiError(401, "Unauthorized access.");

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid User ID format.");
    }

    const { type, value, unit, note, readingDate } = await req.json();

    if (!type || !value) {
        throw new ApiError(400, "Type and Value are required.");
    }

    const newVital = await Vitals.create({
        user: userId as any,
        type,
        value,
        unit,
        note,
        readingDate: readingDate ? new Date(readingDate) : new Date()
    });

    return NextResponse.json(
        new ApiResponse(201, newVital, "Vital record added successfully.")
    );
});

// --- 2. GET ALL USER VITALS ---
export const getAllUserVitals = asyncHandler(async (req: NextRequest) => {
    await dbConnect();
    const userId = req.headers.get("x-user-id");
    if (!userId) throw new ApiError(401, "Unauthorized access.");

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // Optional filter by type (BP, Sugar, etc.)

    const query: any = { user: userId as any };
    if (type) query.type = type;

    const vitals = await Vitals.find(query).sort({ readingDate: -1 });

    return NextResponse.json(
        new ApiResponse(200, vitals, "Vitals fetched successfully.")
    );
});

// --- 3. GET SINGLE VITAL BY ID ---
export const getVitalById = asyncHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
    await dbConnect();
    const userId = req.headers.get("x-user-id");
    const vitalId = params.id;

    const vital = await Vitals.findOne({ _id: vitalId, user: userId as any });
    if (!vital) throw new ApiError(404, "Vital record not found.");

    return NextResponse.json(
        new ApiResponse(200, vital, "Vital record details fetched.")
    );
});

// --- 4. UPDATE VITAL ENTRY ---
export const updateVital = asyncHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
    await dbConnect();
    const userId = req.headers.get("x-user-id");
    const vitalId = params.id;
    const updates = await req.json();

    const vital = await Vitals.findOneAndUpdate(
        { _id: vitalId, user: userId as any },
        { $set: updates },
        { returnDocument: 'after' }
    );

    if (!vital) throw new ApiError(404, "Vital record not found to update.");

    return NextResponse.json(
        new ApiResponse(200, vital, "Vital record updated successfully.")
    );
});

// --- 5. DELETE VITAL ENTRY ---
export const deleteVital = asyncHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
    await dbConnect();
    const userId = req.headers.get("x-user-id");
    const vitalId = params.id;

    const vital = await Vitals.findOneAndDelete({ _id: vitalId, user: userId as any });

    if (!vital) throw new ApiError(404, "Vital record not found.");

    return NextResponse.json(
        new ApiResponse(200, null, "Vital record deleted successfully.")
    );
});
