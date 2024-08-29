import { GlobalResponse } from "@/types"
import { User } from "@/types/user"
import { useQuery } from "@tanstack/react-query"
import UserService from "@/api/user"

export function useGetCurrentUser() {
  const { data, isLoading, isError } = useQuery<GlobalResponse<User>>({
    queryKey: ["users/me"],
    queryFn: UserService.getCurrentUser
  })

  return {
    data,
    isLoading,
    isError
  };
}
