"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/api/dashboard.api";

export const useDashboardStats = () => {
    return useQuery({
        queryKey:  ["dashboard", "stats"],
        queryFn:   () => dashboardApi.getStats(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};