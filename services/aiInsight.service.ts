const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
const INSIGHT_BASE_URL = `${API_URL}/user/reports/insight`;

export const aiService = {
  // 1. Analyze new report
  generateInsight: async (reportId: string) => {
    const response = await fetch(INSIGHT_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to generate AI insight");
    }

    return await response.json();
  },

  // 2. Fetch existing insight
  getInsight: async (reportId: string) => {
    const response = await fetch(`${INSIGHT_BASE_URL}/${reportId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch AI insight");
    }

    return await response.json();
  },

  // 3. AI Follow-up Chat
  askFollowUp: async (reportId: string, userQuestion: string) => {
    // Note: Use dedicated /chat route if available
    const response = await fetch(`${INSIGHT_BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId, userQuestion }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "AI Chat failed");
    }

    return await response.json();
  }
};