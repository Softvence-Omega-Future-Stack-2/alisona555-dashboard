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
};

