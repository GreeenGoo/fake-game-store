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
  },

  checkoutCurrentOrder: async () => {
    const token = "Bearer " + localStorage.getItem("authToken")
    const res = await api.post(
      `/users/me/${RESOURCE}/current/checkout`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    )
    return res.data
  },

  addGameToCard: async (id: string) => {
    const token = "Bearer " + localStorage.getItem("authToken")
    const res = await api.post(
      `/users/me/${RESOURCE}/current/game/${id}`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    )
    return res.data
  },

  deleteGameFromCard: async (id: string) => {
    const token = "Bearer " + localStorage.getItem("authToken")
    const res = await api.delete(`/users/me/${RESOURCE}/current/game/${id}`, {
      headers: {
        Authorization: token
      }
    })
    return res.data
  }
}
