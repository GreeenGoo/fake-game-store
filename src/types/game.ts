export type Game = {
  id: string
  name: string
  genreList: string[]
  thumbnail: string
  images: string[]
  developer: string
  releaseDate: Date
  systemRequirements: string
  playerSupport: string[]
  price: number
  description: string
  sku: string
  isActive: boolean
  rating: number
}

type GamesHead = {
  totalGamesCount: number
  totalPages: number
  gamesPerPage: number
  currentPageNumber: number
}

export type GamesList = {
    allGamesHead: GamesHead;
    allGamesList: Game[];
}
