import { api } from "@/lib/axios";
import { ApiResponse, BookingManagementData, BookingQueryParams } from "@/types";

export const bookingService = {
    getBookings: async (params: BookingQueryParams): Promise<ApiResponse<BookingManagementData>> => {
        const res = await api.get("/dashboard/bookings", { params });
        return res.data;
    },
    updateBookingStatus: async (bookingId: string, status: string): Promise<ApiResponse<any>> => {
        const res = await api.patch(`/booking/${bookingId}/status`, { status });
        return res.data;
    },
};
