import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { bookingService } from "@/service/booking.service";
import { BookingQueryParams } from "@/types";

export const useBookings = (params: BookingQueryParams) => {
    return useQuery({
        queryKey: ["bookings", params],
        queryFn: () => bookingService.getBookings(params),
        placeholderData: keepPreviousData,
    });
};
