import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { deleteCookie } from "cookies-next";

export interface User {
  userId: string;
  username: string;
  email: string;
  role: string;
  status: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setAuth: (accessToken: string, refreshToken: string, user: User) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      setAuth: (accessToken, refreshToken, user) =>
        set({ accessToken, refreshToken, user }),

      setAccessToken: (accessToken) => set({ accessToken }),

      logout: () => {
        deleteCookie("accessToken");
        deleteCookie("userRole");
        set({ accessToken: null, refreshToken: null, user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
