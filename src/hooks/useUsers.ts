import { useQuery, keepPreviousData, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/service/user.service";
import { UserQueryParams } from "@/types";
import { toast } from "sonner";

export const useUsers = (params: UserQueryParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userService.getUsers(params),
    placeholderData: keepPreviousData,
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: "ACTIVE" | "INACTIVE" }) =>
      userService.updateUserStatus(userId, status),
    onSuccess: (_, variables) => {
      toast.success("User status updated successfully");

      // Update the cache manually for all "users" queries to ensure immediate UI refresh
      queryClient.setQueriesData({ queryKey: ["users"] }, (oldData: any) => {
        if (!oldData || !oldData.data || !oldData.data.data) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: oldData.data.data.map((user: any) =>
              user.userId === variables.userId ? { ...user, status: variables.status } : user
            ),
          },
        };
      });

      return queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update user status");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => userService.deleteUser(userId),
    onSuccess: () => {
      toast.success("User deleted successfully");
      return queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete user");
    },
  });
};