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
    return response.data
  },

  getAllActive: async () => {
    const response = await api.get(`/${RESOURCE}/active`)
    if (response.status !== 200) {
      throw Error("Error fetching data")
    }
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

  deleteGame: async (id: string) => {
    const token = "Bearer " + localStorage.getItem("authToken")
    const res = await api.delete(`/${RESOURCE}/${id}`, {
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
    return response.data
  },

  getGenres: async () => {
    const response = await api.get<{ data: Array<string>; status: string; error: any }>(`/games/genres`)
    if (response.status !== 200) {
      throw Error("Error fetching genres")
    }
    return response.data
  },

  getPlayerSupport: async () => {
    const response = await api.get<{ data: Array<string>; status: string; error: any }>(`/games/player-support`)
    if (response.status !== 200) {
      throw Error("Error fetching player supports")
    }
    return response.data
  },
}
