type AddFields<T, U> = T & U

export type Login = {
  email: string
  password: string
}

export type LoggedInUser = {
  token: string
  user: User
}

type Role = "ADMIN" | "USER"

export type User = {
  id: string
  name: string
  email: string
  role: Role
  birthDate: Date
  activeStatus: string
  address: string
  phone: string
}

export type SignUp = AddFields<
  Login,
  {
    name: string
    confirmPassword: string
  }
>

export type ChangeUserPassword = {
  password: string
  newPassword: string
  newPasswordConfirm: string
}

export type ForgotPassword = {
  email: string
}

export type ResetPasswordWithCode = {
  password: string
  confirmPassword: string
}

export type ResetPasswordWithCodePlusCode = AddFields<ResetPasswordWithCode, { code: string }>
