import { api } from "@/lib/axios";

export const userService = {
  getUsers: async () => {
    const res = await api.get("/users");
    return res.data;
  },

  getUserById: async (id: string) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },
};
 
 