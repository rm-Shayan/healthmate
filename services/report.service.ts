const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
const REPORT_BASE_URL = `${API_URL}/user/reports`;

export const reportService = {
  // 1. Upload Report (uses FormData for file)
  uploadReport: async (formData: FormData) => {
    const response = await fetch(REPORT_BASE_URL, {
      method: "POST",
      body: formData, // Browser automatically sets Content-Type
    });
    return await response.json();
  },

  // 2. Get All Reports with Pagination
  getAllReports: async (page = 1, limit = 10) => {
    const response = await fetch(`${REPORT_BASE_URL}?page=${page}&limit=${limit}`, {
      method: "GET",
    });
    return await response.json();
  },

  // 3. Get Report by ID
  getReportById: async (id: string) => {
    const response = await fetch(`${REPORT_BASE_URL}/${id}`, {
      method: "GET",
    });
    return await response.json();
  },

  // 4. Update Report
  updateReport: async (id: string, data: any) => {
    const response = await fetch(`${REPORT_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  // 5. Delete Report
  deleteReport: async (id: string) => {
    const response = await fetch(`${REPORT_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  },
};