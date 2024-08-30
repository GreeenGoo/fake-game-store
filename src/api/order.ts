import api from "."
const RESOURCE = "orders"

export default {
  getCurrentUserCard: async () => {
    const token = "Bearer " + localStorage.getItem("authToken")
    const response = await api.get(`/users/me/${RESOURCE}/current`, {
      headers: {
        Authorization: token
      }
    })

    if (response.status !== 200) {
      throw Error("Error fetching data")
    }
    return response.data
  }
}
