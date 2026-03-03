import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    fetchVitalsThunk,
    addVitalThunk,
    updateVitalThunk,
    deleteVitalThunk
} from "./vitals.thunk";

interface Vital {
    _id: string;
    user: string;
    type: 'BP' | 'Sugar' | 'Weight' | 'Other';
    value: string;
    unit?: string;
    note?: string;
    readingDate: string;
    createdAt: string;
    updatedAt: string;
}

interface VitalsState {
    vitals: Vital[];
    loading: boolean;
    error: string | null;
}

const initialState: VitalsState = {
    vitals: [],
    loading: false,
    error: null,
};

const vitalsSlice = createSlice({
    name: "vitals",
    initialState,
    reducers: {
        clearVitalsError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Vitals
            .addCase(fetchVitalsThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchVitalsThunk.fulfilled, (state, action: PayloadAction<Vital[]>) => {
                state.loading = false;
                state.vitals = action.payload;
            })
            .addCase(fetchVitalsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Add Vital
            .addCase(addVitalThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(addVitalThunk.fulfilled, (state, action: PayloadAction<Vital>) => {
                state.loading = false;
                state.vitals.unshift(action.payload);
            })
            .addCase(addVitalThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update Vital
            .addCase(updateVitalThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(updateVitalThunk.fulfilled, (state, action: PayloadAction<Vital>) => {
                state.loading = false;
                const index = state.vitals.findIndex(v => v._id === action.payload._id);
                if (index !== -1) state.vitals[index] = action.payload;
            })
            .addCase(updateVitalThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete Vital
            .addCase(deleteVitalThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(deleteVitalThunk.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.vitals = state.vitals.filter(v => v._id !== action.payload);
            })
            .addCase(deleteVitalThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearVitalsError } = vitalsSlice.actions;
export default vitalsSlice.reducer;
