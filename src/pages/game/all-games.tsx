import { AllGamesList } from "@/components/game/all-games-list"
import GamesPagination from "@/components/game/pagination-for-games"
import LoadingSpinner from "@/components/loading-spinner"
import {
  useActivateGame,
  useAddGameKey,
  useAllGamesList,
  useGenres,
  usePlayerSupports
} from "@/features/games"
import { GamesFiltering } from "@/types/game"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import NotificationSnackbar from "@/components/snackbar"
import axios from "axios"
import Filters from "@/components/Filters"
import { SelectChangeEvent } from "@mui/material"

export function AllGames() {
  const navigate = useNavigate()
  const { genres, isLoading: isGenresLoading, isError: isGenresError } = useGenres()
  const {
    playerSupports,
    isLoading: isPlayerSupportLoading,
    isError: isPlayerSupportError
  } = usePlayerSupports()
  const [sortBarValue, setSortBarValue] = useState<string>("")
  const [filters, setFilters] = useState<GamesFiltering>({
    sortField: "",
    sortValue: "",
    pageNumber: "1",
    pageSize: "10",
    searchKeyword: "",
    genres: [],
    playerSupport: []
  })
  const { data: gamesData, isLoading, isError } = useAllGamesList(filters)
  const { mutate: activateGame, isActivationgGameLoading } = useActivateGame()
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null)
  const tableRef = useRef<HTMLTableElement | null>(null)
  const addGameKey = useAddGameKey()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success")

  const handleChange = (
    event:
      | SelectChangeEvent<string>
      | ChangeEvent<HTMLSelectElement | HTMLInputElement>
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    if (name === "sortBy" && value !== "") {
      setSortBarValue(value)
      const [sortField, sortValue] = value.split("_")
      setFilters((prevState) => ({
        ...prevState,
        sortField,
        sortValue
      }))
    } else if (name === "pageSize" && value !== "") {
      setFilters((prevState) => ({
        ...prevState,
        [name]: value
      }))
    } else if (name === "searchKeyword") {
      setFilters((prevState) => ({
        ...prevState,
        [name]: value
      }))
    } else if (name === "genreList") {
      const values = value as unknown as string[]
      const genreI = filters.genres.findIndex((el) => el === values[values.length - 1])
      if (genreI === -1) {
        const newValues = [...filters.genres, values[values.length - 1]]
        setFilters({ ...filters, genres: newValues })
        return
      } else {
        const newValues = [...filters.genres]
        newValues.splice(genreI, 1)
        setFilters({ ...filters, genres: newValues })
        return
      }
    } else if (name === "playerSupport") {
      setFilters((prevState) => {
        const newPlayerSupport = prevState.playerSupport.includes(value)
          ? prevState.playerSupport.filter((playerS) => playerS !== value)
          : [...prevState.playerSupport, value]

        return { ...prevState, playerSupport: newPlayerSupport }
      })
    }
  }

  const handlePagination = (value: string) => {
    setFilters((prevState) => ({ ...prevState, pageNumber: value }))
  }

  const handleReset = () => {
    setFilters({
      sortField: "",
      sortValue: "",
      pageNumber: "1",
      pageSize: "10",
      searchKeyword: "",
      genres: [],
      playerSupport: []
    })
    setSortBarValue("")
  }

  const handleAddGame = () => {
    navigate(`/games/add`, {
      state: {
        myData: {
          type: "creating"
        }
      }
    })
  }

  const handleRowClick = (id: string) => {
    setSelectedGameId((prevSelected) => (prevSelected === id ? null : id))
  }

  const handleOpenGame = (id: string) => {
    navigate(`/games/${id}`)
  }

  const handleUpdateGame = (id: string) => {
    navigate(`/games/add`, {
      state: {
        myData: {
          type: "updating",
          id
        }
      }
    })
  }

  const handleAddKey = (id: string) => {
    addGameKey.mutate(id, {
      onSuccess: () => {
        setSnackbarMessage("Game key added successfully.")
        setSnackbarSeverity("success")
        setSnackbarOpen(true)
      },
      onError: (error) => {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.error?.errorMessage || "An unexpected error occurred."
          : "An unexpected error occurred."
        setSnackbarMessage(errorMessage)
        setSnackbarSeverity("error")
        setSnackbarOpen(true)
      }
    })
  }

  const handleActivateGame = (id: string, gameActivationStatus: boolean) => {
    activateGame([id, !gameActivationStatus], {
      onSuccess: () => {
        setSnackbarMessage("Game activation status updated successfully.")
        setSnackbarSeverity("success")
        setSnackbarOpen(true)
      },
      onError: (error) => {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.error?.errorMessage
          : "An unexpected error occurred."
        setSnackbarMessage(errorMessage)
        setSnackbarSeverity("error")
        setSnackbarOpen(true)
      }
    })
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
        setSelectedGameId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (isGenresLoading || isPlayerSupportLoading || isLoading || isActivationgGameLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 p-4 bg-gray-100">
      {(isError || isGenresError || isPlayerSupportError) && (
        <p className="text-lg text-red-600">Error fetching data</p>
      )}
      <Filters
        sortBarValue={sortBarValue}
        pageSize={gamesData?.data.allGamesHead.gamesPerPage || 0}
        searchKeyword={filters.searchKeyword}
        filteredGenres={filters.genres}
        filteredPlayerSupport={filters.playerSupport}
        genresList={genres?.data || []}
        playerSupportList={playerSupports?.data || []}
        handleReset={handleReset}
        handleChange={handleChange}
      />
      <button
        onClick={handleAddGame}
        className="bg-blue-500 border border-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 flex items-center space-x-2 mb-4"
      >
        <i className="fas fa-plus"></i>
        <span>Add Game</span>
      </button>
      {gamesData && (
        <AllGamesList
          games={gamesData?.data.allGamesList || []}
          tableRef={tableRef}
          selectedGameId={selectedGameId || ""}
          handleRowClick={handleRowClick}
          handleOpenGame={handleOpenGame}
          handleUpdateGame={handleUpdateGame}
          handleAddKey={handleAddKey}
          handleActivateGame={handleActivateGame}
        />
      )}
      <GamesPagination
        pageNumber={parseInt(filters.pageNumber)}
        handlePagination={handlePagination}
        totalPages={gamesData?.data.allGamesHead.totalPages || 0}
      />
      <NotificationSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
      />
    </div>
  )
}
