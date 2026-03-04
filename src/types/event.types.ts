export type EventStatus = "ACTIVE" | "INACTIVE";
export type EventType = "PAID" | "FREE";

export interface Event {
    eventId: string;
    title: string;
    description: string;
    category: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    duration: string;
    price: number;
    capacity: number;
    availableSeats: number | null;
    venueName: string;
    city: string;
    address: string;
    latitude: number;
    longitude: number;
    thumbnail: string;
    about: string;
    cancellationPolicy: string;
    whatToExpect: string;
    isFamilyFriendly: boolean;
    isPoluler: boolean;
    ageLimit: string;
    highlights: string[];
    status: EventStatus;
    createdAt: string;
    updatedAt: string;
}

export interface PublishEventRequest {
    title: string;
    description: string;
    category: string;
    eventDate: string; // ISO string
    startTime: string; // e.g., "10:00"
    endTime: string; // e.g., "13:00"
    duration: string; // e.g., "3 hours"
    price: number;
    capacity: number;
    venueName: string;
    city: string;
    address: string;
    latitude: number;
    longitude: number;
    thumbnail: File;
    about: string;
    cancellationPolicy: string;
    whatToExpect: string;
    isFamilyFriendly: boolean;
    ageLimit: number;
    highlights: string;
    status: EventStatus;
    eventType: EventType;
}

export interface EventQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
    minPrice?: number;
}

export interface EventListResponse {
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    eventData: {
        totalActiveEvent: number;
        totalIncativeEvent: number;
        totalFreeEvent: number;
        totalPaidEvent: number;
    };
    data: Event[];
}
