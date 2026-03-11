import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/auth.store";

export const authService = {
  login: async (data: { email: string; password: string }) => {
    const res = await api.post("/auth/sign-in", data);

    return res.data.data.data;
  },
  logout: async () => {
    // Some backends don't have a logout endpoint if using pure JWT
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API failed", error);
    }
    useAuthStore.getState().logout();
  },
  changePassword: async (data: { oldPassword: string; newPassword: string }) => {
    const res = await api.post("/auth/change-password", data);
    return res.data;
  },
};
