import { PayForOrder } from "@/types/Order"
import api from "./Index"
const RESOURCE = "orders"

export default {
  getAllOrders: async () => {
    const token = "Bearer " + localStorage.getItem("authToken")
    const response = await api.get(`/${RESOURCE}`, {
      headers: {
        Authorization: token
      }
    })

    if (response.status !== 200) {
      throw Error("Error fetching data")
    }
    return response.data
  },

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

  getCurrentUserOrders: async () => {
    const token = "Bearer " + localStorage.getItem("authToken")
    const response = await api.get(`/users/me/${RESOURCE}`, {
      headers: {
        Authorization: token
      }
    })

    if (response.status !== 200) {
      throw Error("Error fetching data")
    }
    return response.data
  },

  payCurrentOrder: async (payCurrentOrderProps: PayForOrder) => {
    const token = "Bearer " + localStorage.getItem("authToken")
    const res = await api.post(`/users/me/${RESOURCE}/current/pay`, payCurrentOrderProps, {
      headers: {
        Authorization: token
      }
    })
    return res.data
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
  },

  cleanCurrentUserCard: async () => {
    const token = "Bearer " + localStorage.getItem("authToken")
    const res = await api.delete(`/users/me/${RESOURCE}/current`, {
      headers: {
        Authorization: token
      }
    })
    return res.data
  }
}
