import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eventService } from "@/service/event.service";
import { EventQueryParams, PublishEventRequest } from "@/types";
import { toast } from "sonner";

export const useCreateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PublishEventRequest) => eventService.publishEvent(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["events"] });
            toast.success("Event published successfully!");

            await queryClient.refetchQueries({ queryKey: ["events"] });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Failed to publish event";
            toast.error(message);
        },
    });
};

export const useEvents = (params: EventQueryParams) => {
    // Clean params to ensure query key stability
    const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== undefined && v !== "")
    );

    return useQuery({
        queryKey: ["events", cleanParams],
        queryFn: () => eventService.getEvents(cleanParams as EventQueryParams),
        staleTime: 0,
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (eventId: string) => eventService.deleteEvent(eventId),
        onSuccess: async () => {
            console.log("Delete Event Success: Invalidating all 'events' queries...");
            toast.success("Event deleted successfully!");
            await queryClient.invalidateQueries({ queryKey: ["events"] });
            await queryClient.refetchQueries({ queryKey: ["events"] });
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
        onSuccess: async () => {
            console.log("Update Event Success: Invalidating all 'events' queries...");
            toast.success("Event updated successfully!");
            await queryClient.invalidateQueries({ queryKey: ["events"] });
            await queryClient.refetchQueries({ queryKey: ["events"] });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Failed to update event";
            toast.error(message);
        },
    });
};

export const useUpdateEventThumbnail = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ eventId, thumbnail }: { eventId: string; thumbnail: File }) =>
            eventService.updateEventThumbnail(eventId, thumbnail),
        onSuccess: async () => {
            toast.success("Thumbnail updated successfully!");
            await queryClient.invalidateQueries({ queryKey: ["events"] });
            await queryClient.refetchQueries({ queryKey: ["events"] });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Failed to update thumbnail";
            toast.error(message);
        },
    });
};
