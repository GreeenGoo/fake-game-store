import api from "."
import { Login } from "@/types/authentication"

const RESOURCE = "auth"

export default {
  login: async (login: Login) => {
    const res = await api.post(`/${RESOURCE}/login`, login)
    return res.data
  }
}
