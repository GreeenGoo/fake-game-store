import { useMutation, useQueryClient } from "@tanstack/react-query"
import AuthenticationService from "@/api/authentication"
import { ForgotPassword, LoggedInUser, Login, ResetPasswordWithCodePlusCode, SignUp } from "@/types/user"
import { GlobalResponse } from "@/types"

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
  const queryClient = useQueryClient();

  const mutation = useMutation<GlobalResponse<string>, Error, ForgotPassword>({
    mutationFn: (email: ForgotPassword) => AuthenticationService.sendCodeForResetingPassword(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      localStorage.setItem("authToken", "");
    },
  });

  return mutation;
}

export function useResetPasswordWithCode() {
  const queryClient = useQueryClient();

  const mutation = useMutation<GlobalResponse<LoggedInUser>, Error, ResetPasswordWithCodePlusCode>({
    mutationFn: (passwordData) => AuthenticationService.useResetPasswordWithCode(passwordData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      localStorage.setItem("authToken", "");
    },
  });

  return mutation;
}
