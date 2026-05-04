import api from "@/lib/axios";
import { DashboardStats } from "@/types/dashboard";

export const dashboardApi = {
    getStats: async (): Promise<{ data: DashboardStats }> => {
        const response = await api.get("/dashboard/stats");
        return response.data;
    },
};