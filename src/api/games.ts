import api from "."

import { CreateGame, Game as SingleGame } from "@/types/game"
const RESOURCE = "games"

export default {
  getAllActive: async () => {
    const response = await api.get(`/${RESOURCE}/active`)
    if (response.status !== 200) {
      throw Error("Error fetching data")
    }
    console.log("Response is", response)
    return response.data
  },

  createGame: async (game: CreateGame) => {
    const token =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2bGFkQWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzI0NTk1MjU3LCJleHAiOjE3MjU4MDQ4NTd9.XTHcVCkgu8RvcQ9sLae26viAZv4cLSLxgW3qSye4jdE"

    const res = await api.post(`/${RESOURCE}`, game, 
      {
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
