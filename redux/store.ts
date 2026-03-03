import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/auth.slice";
import reportReducer from "./feature/report/report.slice";
import logger from "redux-logger";
import aiReducer from "./feature/aiInsught/aiInsight.slice";
import vitalsReducer from "./feature/vitals/vitals.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
    ai: aiReducer,
    vitals: vitalsReducer,
  },
  // Logger ko sirf development mode mein chalane ke liye
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV !== "production"
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;