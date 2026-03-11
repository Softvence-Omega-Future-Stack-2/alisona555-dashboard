import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/service/auth.service";

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const { tokens, user } = response

      // Set cookie for middleware access (global)
      setCookie("accessToken", tokens.accessToken, { path: "/" });
      setCookie("userRole", user.role, { path: "/" });

      setAuth(tokens.accessToken, tokens.refreshToken, user);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authService.changePassword,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear all cookies and state is handled inside authService.logout
      // Redirect to home or login page
      window.location.href = "/";
    },
  });
};
