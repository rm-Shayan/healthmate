import { createAsyncThunk } from "@reduxjs/toolkit";
import { reportService } from "@/services/report.service";

export const uploadReportThunk = createAsyncThunk(
  "report/upload",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await reportService.uploadReport(formData);
      if (!response.success) return rejectWithValue(response.message);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Upload failed");
    }
  }
);

export const fetchReportsThunk = createAsyncThunk(
  "report/fetchAll",
  async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await reportService.getAllReports(page, limit);
      if (!response.success) return rejectWithValue(response.message);
      return response.data; // { reports, pagination }
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch reports");
    }
  }
);

export const deleteReportThunk = createAsyncThunk(
  "report/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      console.log("DELETING REPORT ID:", id);
      const response = await reportService.deleteReport(id);
      console.log("DELETE RESPONSE:", response);
      if (!response.success) return rejectWithValue(response.message);
      return id; // ID return kar rahe hain state se nikalne ke liye
    } catch (error: any) {
      console.error("DELETE ERROR:", error);
      return rejectWithValue(error.message || "Failed to delete report");
    }
  }
);
// 4. Get Single Report by ID Thunk
export const fetchReportByIdThunk = createAsyncThunk(
  "report/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await reportService.getReportById(id);
      if (!response.success) return rejectWithValue(response.message);
      return response.data; // Report detail preview ke liye 
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch report details");
    }
  }
);

// 5. Update Report Thunk (Edit Details)
export const updateReportThunk = createAsyncThunk(
  "report/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      console.log("UPDATING REPORT ID:", id, "DATA:", data);
      const response = await reportService.updateReport(id, data);
      console.log("UPDATE RESPONSE:", response);
      if (!response.success) return rejectWithValue(response.message);
      return response.data; // Updated report object
    } catch (error: any) {
      console.error("UPDATE ERROR:", error);
      return rejectWithValue(error.message || "Failed to update report");
    }
  }
);