import { api } from "@/lib/axios";
import { ApiResponse, BookingManagementData, BookingQueryParams } from "@/types";

export const bookingService = {
    getBookings: async (params: BookingQueryParams): Promise<ApiResponse<BookingManagementData>> => {
        const res = await api.get("/dashboard/bookings", { params });
        return res.data;
    },
};
