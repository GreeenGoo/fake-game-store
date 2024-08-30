import api from "."
import {
  ForgotPassword,
  Login,
  ResetPasswordWithCode,
  ResetPasswordWithCodePlusCode,
  SignUp
} from "@/types/user"

const RESOURCE = "auth"

export default {
  login: async (login: Login) => {
    const res = await api.post(`/${RESOURCE}/login`, login)
    return res.data
  },
  signUp: async (signUp: SignUp) => {
    const res = await api.post(`/${RESOURCE}/signup`, signUp)
    return res.data
  },
  sendCodeForResetingPassword: async (email: ForgotPassword) => {
    const res = await api.post(`/${RESOURCE}/forgot-password`, email)
    return res.data
  },

  useResetPasswordWithCode: async (resetPasswordData: ResetPasswordWithCodePlusCode) => {
    const token = "Bearer " + localStorage.getItem("authToken")
    const { password, confirmPassword } = resetPasswordData
    const resetBody: ResetPasswordWithCode = {
      password: password,
      confirmPassword: confirmPassword
    }
    const res = await api.patch(
      `/${RESOURCE}/reset-password/${resetPasswordData.code}`,
      resetBody,
      {
        headers: {
          Authorization: token
        }
      }
    )
    return res.data
  }
}
