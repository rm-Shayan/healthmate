import { createAsyncThunk } from "@reduxjs/toolkit";
import { aiService } from "@/services/aiInsight.service";

export const generateInsightThunk = createAsyncThunk(
  "ai/generate",
  async (reportId: string, { rejectWithValue }) => {
    try {
      const res = await aiService.generateInsight(reportId);
      return res.data; // ApiResponse ka data field
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getInsightThunk = createAsyncThunk(
  "ai/get",
  async (reportId: string, { rejectWithValue }) => {
    try {
      const res = await aiService.getInsight(reportId);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const askAiThunk = createAsyncThunk(
  "ai/ask",
  async ({ reportId, userQuestion }: { reportId: string; userQuestion: string }, { rejectWithValue }) => {
    try {
      const res = await aiService.askFollowUp(reportId, userQuestion);
      return res.data.answer;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);