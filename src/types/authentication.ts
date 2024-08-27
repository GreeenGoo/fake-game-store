export type Login = {
  email: string
  password: string
}

export type LoggedInUser = {
  token: string
  user: User
}

type User = {
  id: string
  name: string
  email: string
  role: string
  birthDate: Date
  activeStatus: string
  address: string
  phone: string
}