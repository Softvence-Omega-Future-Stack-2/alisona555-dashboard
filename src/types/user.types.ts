import { PaginationInfo } from "./api.types";

export interface User {
    userId: string;
    username: string;
    email: string;
    profile: string | null;
    role: string;
    status: "ACTIVE" | "INACTIVE";
    provider: string;
    createdAt: string;
}

export interface DashboardStats {
    totalUser: number;
    totalActiveUser: number;
    totalBooking: number;
}

export interface UserManagementData {
    dashboard: DashboardStats;
    pagination: PaginationInfo;
    data: User[];
}

export interface UserQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}
export interface UserUpdateProfileRequest {
    username?: string;
    email?: string;
    profile?: File | string | null;
}
