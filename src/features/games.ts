import { CreateGame, CreateOrUpdateGame, GamesFiltering, Game as SingleGame } from "@/types/Game"
import GameService from "@/api/Games"
import { GlobalResponse } from "@/types/Index"
import { GamesList } from "@/types/Game"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useSnackbar } from "notistack"

// const QUERY_KEY = "games"
// export function getQueryKey(id?: string) {
//   if (id) return [QUERY_KEY, id]
//   return [QUERY_KEY]
// }

export function useAllGamesList(filterSettings: GamesFiltering) {
  const {
    data: gamesData,
    isLoading,
    isError
  } = useQuery<GlobalResponse<GamesList>>({
    queryKey: ["games/all", filterSettings],
    queryFn: () => GameService.getAll(filterSettings)
  })

  return {
    data: gamesData,
    isLoading,
    isError
  }
}

export function useActiveGamesList(filterSettings: GamesFiltering) {
  const {
    data: gamesData,
    isLoading,
    isError,
    isPending
  } = useQuery<GlobalResponse<GamesList>>({
    queryKey: ["games/active", filterSettings],
    queryFn: () => GameService.getAllActive(filterSettings)
  })

  return {
    data: gamesData,
    isLoading,
    isError,
    isPending
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
  const { enqueueSnackbar } = useSnackbar()
  const {
    data: singleGameData,
    isLoading,
    isError,
    isFetching
  } = useQuery<GlobalResponse<SingleGame>>({
    queryKey: ["games"],
    queryFn: () => GameService.getSingleGame(id)
  })

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Error when fetching game data", { variant: "error", autoHideDuration: 4000 })
    }
  }, [isError])

  return {
    singleGameData,
    isLoading,
    isError,
    isFetching
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

export function useActivateGame() {
  const queryClient = useQueryClient()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const mutation = useMutation<GlobalResponse<SingleGame>, Error, [string, boolean]>({
    mutationFn: ([id, activate]) => GameService.activateGame(id, activate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games/all"] })
    },
    onError: () => {
      setErrorMessage("There should be at least one key to activate game.")
    }
  })

  const handlePopupMessage = () => {
    setErrorMessage(null)
  }

  return {
    ...mutation,
    errorMessage,
    handlePopupMessage,
    isActivationgGameLoading: mutation.isPending
  }
}
