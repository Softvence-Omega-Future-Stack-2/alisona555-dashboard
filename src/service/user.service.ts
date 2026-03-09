import { api } from "@/lib/axios";
import { ApiResponse, UserManagementData, UserQueryParams } from "../types";

export const userService = {
  getUsers: async (params: UserQueryParams): Promise<ApiResponse<UserManagementData>> => {
    const res = await api.get("/dashboard/users", { params });
    return res.data;
  },

  getUserById: async (id: string) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },

  updateUserStatus: async (userId: string, status: "ACTIVE" | "INACTIVE"): Promise<ApiResponse<any>> => {
    const res = await api.patch(`/user/${userId}/status`, { status });
    return res.data;
  },

  deleteUser: async (userId: string): Promise<ApiResponse<any>> => {
    const res = await api.delete(`/user/${userId}`);
    return res.data;
  },
};

