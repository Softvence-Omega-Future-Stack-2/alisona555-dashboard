import { api } from "@/lib/axios";

export const dashboardService = {
    getHomeData: async () => {
        const res = await api.get("/dashboard/home");

        return res.data;
    },
};


