import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { userService } from "@/service/user.service";
import { UserQueryParams } from "@/types";

export const useUsers = (params: UserQueryParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userService.getUsers(params),
    placeholderData: keepPreviousData,
  });
};