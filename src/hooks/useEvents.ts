import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eventService } from "@/service/event.service";
import { EventQueryParams, PublishEventRequest } from "@/types";
import { toast } from "sonner"; // Assuming sonner is used for toasts, or I'll use a generic toast if not.

export const useCreateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PublishEventRequest) => eventService.publishEvent(data),
        onSuccess: (response) => {
            if (response.data) {
                toast.success("Event published successfully!");
                queryClient.invalidateQueries({ queryKey: ["events"] });
            }
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Failed to publish event";
            toast.error(message);
        },
    });
};

export const useEvents = (params: EventQueryParams) => {
    return useQuery({
        queryKey: ["events", params],
        queryFn: () => eventService.getEvents(params),
        placeholderData: (previousData) => previousData,
    });
};
