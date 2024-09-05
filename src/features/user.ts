import { GlobalResponse } from "@/types"
import { ChangeUserPassword, User } from "@/types/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import UserService from "@/api/user"
import { useState } from "react"

export function useGetCurrentUser() {
  const { data, isLoading, isError, refetch } = useQuery<GlobalResponse<User>>({
    queryKey: ["users/me"],
    queryFn: UserService.getCurrentUser
  })

  return {
    data,
    isLoading,
    isError,
    refetch
  }
}

export function useChangePassword() {
  const queryClient = useQueryClient()
  const [errorMessage, setErrorMessage] = useState<string>("")

  const mutation = useMutation({
    mutationFn: (passwordInfo: ChangeUserPassword) => {
      return UserService.changePassword(passwordInfo)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] })
      setErrorMessage("")
    },
    onError: () => {
      setErrorMessage("Error occurred while changing password.")
    }
  })

  return {
    ...mutation,
    errorMessage,
    isChangePasswordLoading: mutation.isPending
  }
}
