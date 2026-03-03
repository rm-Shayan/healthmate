import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateInsightThunk, getInsightThunk, askAiThunk } from "./aiINsight.thunk";

// IAiInsight interface jo humne backend par define ki thi
interface IAiInsight {
  _id?: string;
  reportId: string;
  summaryEnglish: string;
  summaryUrdu: string;
  abnormalValues: string[];
  doctorQuestions: string[];
  suggestions: string;
  createdAt?: string;
}

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

interface AiState {
  insight: IAiInsight | null;
  chatHistory: ChatMessage[];
  loading: boolean;        // Report analysis ke liye
  chatLoading: boolean;    // Follow-up chat ke liye
  error: string | null;
}

const initialState: AiState = {
  insight: null,
  chatHistory: [],
  loading: false,
  chatLoading: false,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    // State reset karne ke liye (jab user report page se bahar jaye)
    resetAiState: (state) => {
      state.insight = null;
      state.chatHistory = [];
      state.error = null;
      state.loading = false;
      state.chatLoading = false;
    },
    // Manual chat message add karne ke liye (User side)
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.chatHistory.push({ role: "user", content: action.payload });
    }
  },
  extraReducers: (builder) => {
    // --- Generate Insight ---
    builder
      .addCase(generateInsightThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateInsightThunk.fulfilled, (state, action: PayloadAction<IAiInsight>) => {
        state.loading = false;
        state.insight = action.payload;
      })
      .addCase(generateInsightThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // --- Get Existing Insight ---
    builder
      .addCase(getInsightThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInsightThunk.fulfilled, (state, action: PayloadAction<IAiInsight | null>) => {
        state.loading = false;
        state.insight = action.payload;
      })
      .addCase(getInsightThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // --- Ask AI Follow-up ---
    builder
      .addCase(askAiThunk.pending, (state) => {
        state.chatLoading = true;
      })
      .addCase(askAiThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.chatLoading = false;
        state.chatHistory.push({ role: "model", content: action.payload });
      })
      .addCase(askAiThunk.rejected, (state, action) => {
        state.chatLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAiState, addUserMessage } = aiSlice.actions;
export default aiSlice.reducer;