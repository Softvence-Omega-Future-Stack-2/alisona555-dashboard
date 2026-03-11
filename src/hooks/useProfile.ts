import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/service/user.service";
import { toast } from "sonner";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => userService.getMe(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => userService.updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update profile");
    },
  });
};
