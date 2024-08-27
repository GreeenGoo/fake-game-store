import api from "."

import { CreateGame, Game as SingleGame } from "@/types/game"
const RESOURCE = "games"

export default {
  getAll: async () => {
    const token = "Bearer " + localStorage.getItem("authToken")
    const response = await api.get(`/${RESOURCE}/all`, {
      headers: {
        Authorization: token
      }
    })
    if (response.status !== 200) {
      throw Error("Error fetching data")
    }
    console.log("Response is", response)
    return response.data
  },

  getAllActive: async () => {
    const response = await api.get(`/${RESOURCE}/active`)
    if (response.status !== 200) {
      throw Error("Error fetching data")
    }
    console.log("Response is", response)
    return response.data
  },

  createGame: async (game: CreateGame) => {
    const token = "Bearer " + localStorage.getItem("authToken")
    const res = await api.post(`/${RESOURCE}`, game, {
      headers: {
        Authorization: token
      }
    })
    return res.data
  },

  getSingleGame: async (id: string) => {
    const response = await api.get<{ data: SingleGame; status: string; error: any }>(`/games/${id}`)
    if (response.status !== 200) {
      throw Error("Error fetching data")
    }
    console.log("Response is", response)
    return response.data
  }
}