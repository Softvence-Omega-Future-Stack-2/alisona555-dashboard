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

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (eventId: string) => eventService.deleteEvent(eventId),
        onSuccess: (response) => {
            // Some DELETE endpoints don't return data, just a 200/204 status.
            toast.success("Event deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Failed to delete event";
            toast.error(message);
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
            eventService.updateEvent(eventId, data),
        onSuccess: (response) => {
            if (response.data) {
                toast.success("Event updated successfully!");
                queryClient.invalidateQueries({ queryKey: ["events"] });
            }
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Failed to update event";
            toast.error(message);
        },
    });
};
