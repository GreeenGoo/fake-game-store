import { Game } from "@/pages/game"

export type Game = {
  id: string
  name: string
  genreList: string[]
  quantity: number
  thumbnail: string
  images: string[]
  developer: string
  releaseDate: Date
  systemRequirements: string
  playerSupport: string[]
  price: number
  description: string
  sku: string
  active: boolean
  rating: number
}

export type CreateGame = Omit<Game, "id" | "sku" | "active" | "rating">

export type CreateOrUpdateGame = Omit<Game, "sku" | "active" | "rating">

type GamesHead = {
  totalGamesCount: number
  totalPages: number
  gamesPerPage: number
  currentPageNumber: number
}

export type GamesList = {
  allGamesHead: GamesHead
  allGamesList: Game[]
}

export type GameInCard = {
  id: string
  thumbnail: string
  name: string
  price: number
  quantity: number
}
