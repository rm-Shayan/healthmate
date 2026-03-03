import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
  uploadReportThunk, 
  fetchReportsThunk, 
  fetchReportByIdThunk, 
  updateReportThunk, 
  deleteReportThunk 
} from "./report.thunk";

interface ReportState {
  reports: any[]; // List of all reports [cite: 42]
  selectedReport: any | null; // Single report for preview 
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  reports: [],
  selectedReport: null,
  pagination: null,
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    clearReportError: (state) => {
      state.error = null;
    },
    resetSelectedReport: (state) => {
      state.selectedReport = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- FETCH ALL REPORTS (PAGINATED) ---
      .addCase(fetchReportsThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchReportsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.reports;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchReportsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // --- UPLOAD REPORT ---
      .addCase(uploadReportThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(uploadReportThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.reports.unshift(action.payload); // Latest report top par [cite: 46]
      })
      .addCase(uploadReportThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // --- FETCH REPORT BY ID ---
      .addCase(fetchReportByIdThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchReportByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedReport = action.payload; // Preview page ke liye data 
      })
      .addCase(fetchReportByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // --- UPDATE REPORT ---
      .addCase(updateReportThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateReportThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reports.findIndex(r => r._id === action.payload._id);
        if (index !== -1) state.reports[index] = action.payload; // Update list locally
        state.selectedReport = action.payload;
      })
      .addCase(updateReportThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // --- DELETE REPORT ---
      .addCase(deleteReportThunk.pending, (state) => { state.loading = true; })
      .addCase(deleteReportThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = state.reports.filter(r => r._id !== action.payload); // Remove from list
        state.selectedReport = null;
      })
      .addCase(deleteReportThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearReportError, resetSelectedReport } = reportSlice.actions;
export default reportSlice.reducer;