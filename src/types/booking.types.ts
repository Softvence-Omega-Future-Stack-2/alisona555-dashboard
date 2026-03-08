import { PaginationInfo } from "./api.types";

export interface BookingEvent {
    eventId: string;
    title: string;
    category: string;
    eventType: string;
    thumbnail: string;
    description: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    duration: string;
    isFamilyFriendly: boolean;
    isPoluler: boolean;
    price: number;
    capacity: number;
    availableSeats: number | null;
    venueName: string;
    address: string;
    city: string;
    latitude: number;
    longitude: number;
    about: string;
    whatToExpect: string;
    cancellationPolicy: string;
    ageLimit: string;
    highlights: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface BookingUser {
    userId: string;
    username: string;
    email: string;
}

export interface Booking {
    bookingId: string;
    userId: string;
    eventId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    status: "CONFIRMED" | "PENDING" | "FAILED" | "CANCELLED";
    bookingConfarmStatus: string;
    price: number;
    quentity: number;
    createdAt: string;
    updatedAt: string;
    user: BookingUser;
    event: BookingEvent;
}

export interface BookingSummary {
    totalBookings: number;
    totalRevenue: number;
}

export interface BookingManagementData {
    summary: BookingSummary;
    pagination: PaginationInfo;
    data: Booking[];
}

export interface BookingQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}
