import { AllGamesList } from "@/components/game/all-games-list"
import FiltersForGames from "@/components/game/filters-for-games"
import GamesPagination from "@/components/game/pagination-for-games"
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

export function AllGames() {
  const navigate = useNavigate()
  const genres = useGenres()
  const playerSupport = usePlayerSupports()
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
  const { mutate: activateGame, errorMessage, handlePopupMessage } = useActivateGame()
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null)
  const tableRef = useRef<HTMLTableElement | null>(null)
  const addGameKey = useAddGameKey()

  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === "sortBy" && value !== "") {
      setSortBarValue(event.target.value)
      const sortFieldAndOrder = value.split("_")
      setFilters((prevState) => ({
        ...prevState,
        sortField: sortFieldAndOrder[0],
        sortValue: sortFieldAndOrder[1]
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
      setFilters((prevState) => {
        const newGenres = prevState.genres.includes(value)
          ? prevState.genres.filter((genre) => genre !== value)
          : [...prevState.genres, value]

        return { ...prevState, genres: newGenres }
      })
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
          id: id
        }
      }
    })
  }

  const handleAddKey = (id: string) => {
    addGameKey.mutate(id)
  }

  const handleActivateGame = (id: string, gameActivationStatus: boolean) => {
    activateGame([id, !gameActivationStatus])
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

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen p-4 bg-gray-100">
      {isLoading && <p className="text-lg text-blue-600">Loading...</p>}
      {isError && <p className="text-lg text-red-600">Error fetching active games</p>}
      <FiltersForGames
        sortBarValue={sortBarValue}
        pageSize={gamesData?.data.allGamesHead.gamesPerPage || 0}
        searchKeyword={filters.searchKeyword}
        filteredGenres={filters.genres}
        filteredPlayerSupport={filters.playerSupport}
        genresList={genres.genres?.data || []}
        playerSupportList={playerSupport.playerSupports?.data || []}
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
    </div>
  )
}
