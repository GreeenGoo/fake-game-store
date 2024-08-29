import api from "."
import { Login, SignUp } from "@/types/user"

const RESOURCE = "auth"

export default {
  login: async (login: Login) => {
    const res = await api.post(`/${RESOURCE}/login`, login)
    return res.data
  },
  signUp: async (signUp: SignUp) => {
    const res = await api.post(`/${RESOURCE}/signup`, signUp)
    return res.data
  }
}
