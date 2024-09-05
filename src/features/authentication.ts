import { useMutation, useQueryClient } from "@tanstack/react-query"
import AuthenticationService from "@/api/authentication"
import {
  ForgotPassword,
  LoggedInUser,
  Login,
  ResetPasswordWithCodePlusCode,
  SignUp
} from "@/types/user"
import { GlobalResponse } from "@/types"
import { useGetCurrentUser } from "./user"

export function useLogin() {
  const queryClient = useQueryClient()
  const mutation = useMutation<GlobalResponse<LoggedInUser>, Error, Login>({
    mutationFn: (login: Login) => AuthenticationService.login(login),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["login"] })
      localStorage.setItem("authToken", data.data.token)
    }
  })
  return mutation
}

export function useSignUp() {
  const queryClient = useQueryClient()
  const mutation = useMutation<GlobalResponse<LoggedInUser>, Error, SignUp>({
    mutationFn: (signUp: SignUp) => AuthenticationService.signUp(signUp),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["login"] })
      localStorage.setItem("authToken", data.data.token)
    }
  })
  return mutation
}

export function useForgotPassword() {
  const queryClient = useQueryClient()

  const mutation = useMutation<GlobalResponse<string>, Error, ForgotPassword>({
    mutationFn: (email: ForgotPassword) => AuthenticationService.sendCodeForResetingPassword(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] })
      localStorage.setItem("authToken", "")
    }
  })

  return mutation
}

export function useResetPasswordWithCode() {
  const queryClient = useQueryClient()

  const mutation = useMutation<GlobalResponse<LoggedInUser>, Error, ResetPasswordWithCodePlusCode>({
    mutationFn: (passwordData) => AuthenticationService.useResetPasswordWithCode(passwordData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] })
      localStorage.setItem("authToken", "")
    }
  })

  return mutation
}

export function useSendVerificationCode() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: AuthenticationService.sendVerificationEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] })
    }
  })

  return mutation
}

export function useVerifyUser() {
  const queryClient = useQueryClient()
  const { refetch } = useGetCurrentUser()
  const mutation = useMutation({
    retry: 10,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 60000),
    mutationFn: (code: string) => AuthenticationService.verifyUser(code),
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries({ queryKey: ["login"] })
    },
    onError: (error) => {
      console.log("useVerifyUser() failed", error)
    }
  })

  return mutation
}
