import { AllGamesList } from "@/components/game/AllGamesList"
import GamesPagination from "@/components/game/GamesPagination"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useActivateGame, useAddGameKey, useAllGamesList, useGenres, usePlayerSupports } from "@/features/Games"
import { GamesFiltering } from "@/types/Game"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import NotificationSnackbar from "@/components/SnackBar"
import axios from "axios"
import Filters from "@/components/game/Filters"
import { SelectChangeEvent } from "@mui/material"
import { Button } from "@mui/material"
import "./styles/AllGames.css"

export function AllGames() {
  const navigate = useNavigate()
  const { genres, isLoading: isGenresLoading, isError: isGenresError } = useGenres()
  const { playerSupports, isLoading: isPlayerSupportLoading, isError: isPlayerSupportError } = usePlayerSupports()
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
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success")

  const handleChange = (
    event: SelectChangeEvent<string> | ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    if (name === "sortBy" && value !== "") {
      setSortBarValue(value)
      const [sortField, sortValue] = value.split("_")
      setFilters((prevState) => ({ ...prevState, sortField, sortValue }))
    } else if (name === "pageSize" && value !== "") {
      setFilters((prevState) => ({ ...prevState, [name]: value }))
    } else if (name === "searchKeyword") {
      setFilters((prevState) => ({ ...prevState, [name]: value }))
    } else if (name === "genreList") {
      const values = value as unknown as string[]
      const genreIndex = filters.genres.findIndex((el) => el === values[values.length - 1])
      if (genreIndex === -1) {
        const newValues = [...filters.genres, values[values.length - 1]]
        setFilters({ ...filters, genres: newValues })
      } else {
        const newValues = [...filters.genres]
        newValues.splice(genreIndex, 1)
        setFilters({ ...filters, genres: newValues })
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
      state: { myData: { type: "creating" } }
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
      state: { myData: { type: "updating", id } }
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
    <div className="container">
      {(isError || isGenresError || isPlayerSupportError) && <p className="error-message">Error fetching data</p>}
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
      <Button variant="contained" color="primary" onClick={handleAddGame} className="button">
        <i className="fas fa-plus"></i>
        <span>Add Game</span>
      </Button>
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