import { CreateGame, CreateOrUpdateGame, Game as SingleGame } from "@/types/game"
import GameService from "@/api/games"
import { GlobalResponse } from "@/types"
import { GamesList } from "@/types/game"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// const QUERY_KEY = "games"
// export function getQueryKey(id?: string) {
//   if (id) return [QUERY_KEY, id]
//   return [QUERY_KEY]
// }

export function useAllGamesList() {
  const {
    data: gamesData,
    isLoading,
    isError
  } = useQuery<GlobalResponse<GamesList>>({
    queryKey: ["games/all"],
    queryFn: GameService.getAll
  })

  return {
    data: gamesData,
    isLoading,
    isError
  }
}

export function useActiveGamesList() {
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
      queryClient.invalidateQueries({ queryKey: ["games/all"] })
    }
  })

  return mutation
}

export function useUpdateGame() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (game: CreateOrUpdateGame) => GameService.updateGame(game),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games/all"] })
    }
  })

  return mutation
}

export function useDeleteGame() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: string) => GameService.deleteGame(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games/all"] })
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
    queryKey: ["games"],
    queryFn: () => GameService.getSingleGame(id)
  })

  return {
    singleGameData,
    isLoading,
    isError
  }
}

export function useGenres() {
  const {
    data: genres,
    isLoading,
    isError
  } = useQuery<GlobalResponse<Array<string>>>({
    queryKey: ["games/genres"],
    queryFn: () => GameService.getGenres()
  })

  return {
    genres,
    isLoading,
    isError
  }
}

export function usePlayerSupports() {
  const {
    data: playerSupports,
    isLoading,
    isError
  } = useQuery<GlobalResponse<Array<string>>>({
    queryKey: ["games/player-support"],
    queryFn: () => GameService.getPlayerSupport()
  })

  return {
    playerSupports,
    isLoading,
    isError
  }
}

export function useAddGameKey() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: string) => GameService.addGameKey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games/all"] })
    }
  })

  return mutation
}

export function useGetKeysAmount(id: string) {
  const {
    data: amount,
    isLoading,
    isError
  } = useQuery<GlobalResponse<number>>({
    queryKey: ["games/keys"],
    queryFn: () => GameService.getGameKeysAmount(id)
  })

  return { amount, isLoading, isError }
}
