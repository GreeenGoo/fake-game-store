type AddFields<T, U> = T & U;

export type Login = {
  email: string
  password: string
}

export type LoggedInUser = {
  token: string
  user: User
}

export type User = {
  id: string
  name: string
  email: string
  role: string
  birthDate: Date
  activeStatus: string
  address: string
  phone: string
}

export type SignUp = AddFields<Login, {
  name: string;
  confirmPassword: string;
}>;
