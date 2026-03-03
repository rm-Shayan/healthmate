import { createAsyncThunk } from "@reduxjs/toolkit";
import { vitalsService } from "@/services/vitals.service";

// 1. Fetch all vitals
export const fetchVitalsThunk = createAsyncThunk(
    "vitals/fetchAll",
    async (type: string | undefined, { rejectWithValue }) => {
        try {
            const response = await vitalsService.getAllVitals(type);
            if (!response.success) return rejectWithValue(response.message);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to fetch vitals");
        }
    }
);

// 2. Add new vital
export const addVitalThunk = createAsyncThunk(
    "vitals/add",
    async (vitalData: any, { rejectWithValue }) => {
        try {
            const response = await vitalsService.addVital(vitalData);
            if (!response.success) return rejectWithValue(response.message);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to add vital");
        }
    }
);

// 3. Update vital
export const updateVitalThunk = createAsyncThunk(
    "vitals/update",
    async ({ id, updates }: { id: string; updates: any }, { rejectWithValue }) => {
        try {
            const response = await vitalsService.updateVital(id, updates);
            if (!response.success) return rejectWithValue(response.message);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to update vital");
        }
    }
);

// 4. Delete vital
export const deleteVitalThunk = createAsyncThunk(
    "vitals/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await vitalsService.deleteVital(id);
            if (!response.success) return rejectWithValue(response.message);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to delete vital");
        }
    }
);
