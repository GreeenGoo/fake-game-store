import { useSnackbar } from "notistack"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import AuthenticationService from "@/api/Authentication"
import {
  ForgotPassword,
  LoggedInUser,
  Login,
  ResetPasswordWithCodePlusCode,
  SignUp
} from "@/types/User"
import { GlobalResponse } from "@/types/Index"
import { useGetCurrentUser } from "./User"

export function useLogin() {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const mutation = useMutation<GlobalResponse<LoggedInUser>, Error, Login>({
    mutationFn: (login: Login) => AuthenticationService.login(login),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["login"] })
      localStorage.setItem("authToken", data.data.token)
      enqueueSnackbar("You have successfully logged in as " + data.data.user.name, {
        variant: "success",
        autoHideDuration: 4000
      })
    },
    onError: () => {
      enqueueSnackbar("Login failed", { variant: "error", autoHideDuration: 4000 })
    }
  })
  return mutation
}

export function useSignUp() {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const mutation = useMutation<GlobalResponse<LoggedInUser>, Error, SignUp>({
    mutationFn: (signUp: SignUp) => AuthenticationService.signUp(signUp),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["login"] })
      localStorage.setItem("authToken", data.data.token)
      enqueueSnackbar("Successful signup")
    },
    onError: () => {
      enqueueSnackbar("Signup failed", { variant: "error", autoHideDuration: 4000 })
    }
  })
  return mutation
}

export function useForgotPassword() {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const mutation = useMutation<GlobalResponse<string>, Error, ForgotPassword>({
    mutationFn: (email: ForgotPassword) => AuthenticationService.sendCodeForResetingPassword(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] })
      localStorage.setItem("authToken", "")
      enqueueSnackbar("Reset email sent successfully. Please check your inbox.", {
        variant: "success",
        autoHideDuration: 4000
      })
    },
    onError: () => {
      enqueueSnackbar("Failed to send reset email. Please try again.", {
        variant: "error",
        autoHideDuration: 4000
      })
    }
  })

  return mutation
}

export function useResetPasswordWithCode() {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const mutation = useMutation<GlobalResponse<LoggedInUser>, Error, ResetPasswordWithCodePlusCode>({
    mutationFn: (passwordData) => AuthenticationService.useResetPasswordWithCode(passwordData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] })
      localStorage.setItem("authToken", "")
      enqueueSnackbar("Password reset successfully.", {
        variant: "success",
        autoHideDuration: 4000
      })
    },
    onError: () => {
      enqueueSnackbar("Password reset failed. Please try again.", {
        variant: "error",
        autoHideDuration: 4000
      })
    }
  })

  return mutation
}

export function useSendVerificationCode() {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const mutation = useMutation({
    mutationFn: AuthenticationService.sendVerificationEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] })
      enqueueSnackbar("Verification code successfully sent to your email", {
        variant: "success",
        autoHideDuration: 4000
      })
    },
    onError: () => {
      enqueueSnackbar("Failed to send verification code", {
        variant: "error",
        autoHideDuration: 4000
      })
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
