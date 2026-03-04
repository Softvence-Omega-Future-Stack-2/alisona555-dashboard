"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/service/dashboard.service";

export const useDashboardData = () => {
    return useQuery({
        queryKey: ["dashboard-home"],
        queryFn: dashboardService.getHomeData,
    });
};
