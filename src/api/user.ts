import { ChangeUserPassword } from "@/types/user"
import api from "."

const RESOURCE = "users"

export default {
  getCurrentUser: async () => {
    const token = "Bearer " + localStorage.getItem("authToken")
    const response = await api.get(`/${RESOURCE}/me`, {
      headers: {
        Authorization: token
      }
    })
    if (response.status !== 200) {
      throw Error("Error fetching data")
    }
    return response.data
  },
  changePassword: async (passwordInfo: ChangeUserPassword) => {
    const token = "Bearer " + localStorage.getItem("authToken")
    const res = await api.post(`/${RESOURCE}/me/update-password`, passwordInfo, {
      headers: {
        Authorization: token
      }
    })
    return res.data
  }
}
