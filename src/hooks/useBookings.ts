import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { bookingService } from "@/service/booking.service";
import { BookingQueryParams } from "@/types";

export const useBookings = (params: BookingQueryParams) => {
    return useQuery({
        queryKey: ["bookings", params],
        queryFn: () => bookingService.getBookings(params),
        placeholderData: keepPreviousData,
    });
};

export const useUpdateBookingStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ bookingId, status }: { bookingId: string; status: string }) =>
            bookingService.updateBookingStatus(bookingId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
    });
};
