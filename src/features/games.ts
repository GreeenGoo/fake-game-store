import { CreateGame, Game as SingleGame } from "@/types/game"
import GameService from "@/api/games"
import { GlobalResponse } from "@/types"
import { GamesList } from "@/types/game"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Game } from "@/pages/game"

// const QUERY_KEY = "games"
// export function getQueryKey(id?: string) {
//   if (id) return [QUERY_KEY, id]
//   return [QUERY_KEY]
// }

export function useGamesList() {
  const {
    data: gamesData,
    isLoading,
    isError
  } = useQuery<GlobalResponse<GamesList>>({
    queryKey: ["games/active"],
    queryFn: GameService.getAllActive
  })

  return {
    data: gamesData,
    isLoading,
    isError
  }
}

export function useCreateGame() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (game: CreateGame) => GameService.createGame(game),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] })
    }
  })

  return mutation
}

export function useGetSingleGame(id: string) {
  const {
    data: singleGameData,
    isLoading,
    isError
  } = useQuery<GlobalResponse<SingleGame>>({
    queryKey: ["game"],
    queryFn: () => GameService.getSingleGame(id)
  })

  return {
    singleGameData,
    isLoading,
    isError
  }
}
