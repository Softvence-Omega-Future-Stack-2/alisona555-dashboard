import { api } from "@/lib/axios";
import { ApiResponse, User, UserManagementData, UserQueryParams } from "../types";

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
  getMe: async (): Promise<ApiResponse<User>> => {
    const res = await api.get("/user/getMe");
    return res.data;
  },
  updateProfile: async (data: FormData): Promise<ApiResponse<User>> => {
    const res = await api.patch("/user/update-profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};

