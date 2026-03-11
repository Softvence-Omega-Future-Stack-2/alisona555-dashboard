import { api } from "@/lib/axios";
import { ApiResponse, Event, EventListResponse, EventQueryParams, PublishEventRequest } from "@/types";

export const eventService = {
    publishEvent: async (data: PublishEventRequest): Promise<ApiResponse<Event>> => {
        const formData = new FormData();

        // Loop through keys and append to FormData
        Object.entries(data).forEach(([key, value]) => {
            // For boolean, convert to string as FormData usually expects strings/blobs
            if (typeof value === "boolean") {
                formData.append(key, value.toString());
            } else if (value instanceof File) {
                formData.append(key, value);
            } else if (value !== null && value !== undefined) {
                formData.append(key, value.toString());
            }
        });

        const res = await api.post("/event/publish-event", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    },
    getEvents: async (params: EventQueryParams): Promise<ApiResponse<EventListResponse>> => {
        const res = await api.get("/event", { params });
        return res.data;
    },
    deleteEvent: async (eventId: string): Promise<ApiResponse<any>> => {
        const res = await api.delete(`/event/${eventId}`);
        return res.data;
    },
    updateEvent: async (eventId: string, data: any): Promise<ApiResponse<Event>> => {
        const res = await api.patch(`/event/${eventId}`, data);
        return res.data;
    },
    updateEventThumbnail: async (eventId: string, thumbnail: File): Promise<ApiResponse<Event>> => {
        const formData = new FormData();
        formData.append("thumbnail", thumbnail);
        const res = await api.patch(`/event/${eventId}/thumbnail`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    },
};
