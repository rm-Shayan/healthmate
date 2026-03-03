const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
const VITALS_BASE_URL = `${API_URL}/user/vitals`;

export const vitalsService = {
    // 1. Add New Vital Entry
    addVital: async (vitalData: any) => {
        const response = await fetch(VITALS_BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vitalData),
        });
        return await response.json();
    },

    // 2. Get All User Vitals
    getAllVitals: async (type?: string) => {
        const url = type ? `${VITALS_BASE_URL}?type=${type}` : VITALS_BASE_URL;
        const response = await fetch(url, {
            method: "GET",
        });
        return await response.json();
    },

    // 3. Get Single Vital by ID
    getVitalById: async (id: string) => {
        const response = await fetch(`${VITALS_BASE_URL}/${id}`, {
            method: "GET",
        });
        return await response.json();
    },

    // 4. Update Vital Entry
    updateVital: async (id: string, updates: any) => {
        const response = await fetch(`${VITALS_BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        });
        return await response.json();
    },

    // 5. Delete Vital Entry
    deleteVital: async (id: string) => {
        const response = await fetch(`${VITALS_BASE_URL}/${id}`, {
            method: "DELETE",
        });
        return await response.json();
    },
};
