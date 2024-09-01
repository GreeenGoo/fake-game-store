import { useState, useEffect, useRef, ChangeEvent } from "react"
import { GlobalResponse } from "@/types"
import { Game, GamesFiltering, GamesList } from "@/types/game"
import "@fortawesome/fontawesome-free/css/all.css"
import React from "react"
import {
  useActivateGame,
  useAddGameKey,
  useAllGamesList,
  useDeleteGame,
  useGenres,
  usePlayerSupports
} from "@/features/games"
import { useNavigate } from "react-router-dom"
import { Popup } from "./popup-message"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"

type ListOfGames = {
  gamesData: GlobalResponse<GamesList>
}

export function AllGamesList({ gamesData }: ListOfGames) {
  const [filters, setFilters] = useState<GamesFiltering>({
    sortField: "",
    sortValue: "",
    pageNumber: "1",
    pageSize: "10",
    searchKeyword: "",
    genres: [],
    playerSupport: []
  })
  const genres = useGenres()
  const playerSupport = usePlayerSupports()
  const { data, isLoading, isError } = useAllGamesList(filters)
  const [games, setGames] = useState<Game[]>(data ? data.data.allGamesList : [])
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null)
  const tableRef = useRef<HTMLTableElement | null>(null)
  const deleteGame = useDeleteGame()
  const navigate = useNavigate()
  const addGameKey = useAddGameKey()
  const { mutate: activateGame, errorMessage, handlePopupMessage } = useActivateGame()
  const [sortBarValue, setSortBarValue] = useState<string>("")

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

  useEffect(() => {
    if (data) {
      setGames(data.data.allGamesList)
    }
  }, [data])

  const handlePagination = (value: string) => {
    setFilters((prevState) => ({ ...prevState, pageNumber: value }))
  }

  const handleRowClick = (id: string) => {
    setSelectedGameId((prevSelected) => (prevSelected === id ? null : id))
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

  const handleRemoveGame = (id: string) => {
    deleteGame.mutate(id)
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

  if (!data?.data.allGamesHead.totalPages) return <p>Data is empty</p>

  return (
    <div className="overflow-x-auto">
      <div>
        <div>
          <select
            id="sortBy"
            name="sortBy"
            value={sortBarValue}
            onChange={(event) => handleChange(event)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Sort by...</option>
            <option value="name_asc">Name (Ascending)</option>
            <option value="name_desc">Name (Descending)</option>
            <option value="releaseDate_asc">Release Date (Ascending)</option>
            <option value="releaseDate_desc">Release Date (Descending)</option>
            <option value="price_asc">Price (Ascending)</option>
            <option value="price_desc">Price (Descending)</option>
            <option value="averageRating_asc">Average Rating (Ascending)</option>
            <option value="averageRating_desc">Average Rating (Descending)</option>
          </select>
        </div>
        <div>
          <select
            id="pageSize"
            name="pageSize"
            value={filters.pageSize}
            onChange={(event) => handleChange(event)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Games per page...</option>
            <option value="5">5 games</option>
            <option value="10">10 games</option>
            <option value="15">15 games</option>
            <option value="20">20 games</option>
          </select>
        </div>
        <div>
          <input
            id="searchKeyword"
            type="text"
            name="searchKeyword"
            value={filters.searchKeyword}
            onChange={handleChange}
            placeholder="Mario"
            min="0"
            step="1"
          />
        </div>
        <div>
          <label htmlFor="genres" className="block text-sm font-medium text-gray-700">
            Select Genres
          </label>
          <select
            id="genreList"
            name="genreList"
            multiple
            value={filters.genres}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {genres.genres?.data.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {filters.genres &&
              Array.isArray(filters.genres) &&
              filters.genres.map((genre, index) => <li key={index}>{genre}</li>)}
          </ul>
        </div>

        <div>
          <label htmlFor="playerSupport" className="block text-sm font-medium text-gray-700">
            Select PlayerSupport
          </label>
          <select
            id="playerSupport"
            name="playerSupport"
            multiple
            value={filters.playerSupport}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {playerSupport.playerSupports?.data.map((playerSupport, index) => (
              <option key={index} value={playerSupport}>
                {playerSupport}
              </option>
            ))}
          </select>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {filters.playerSupport &&
              Array.isArray(filters.playerSupport) &&
              filters.playerSupport.map((playerS, index) => <li key={index}>{playerS}</li>)}
          </ul>
        </div>
        <button
          id="resetButton"
          name="resetButton"
          onClick={handleReset}
          className="bg-blue-500 border border-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 flex items-center space-x-2 mb-4"
        >
          <i className="fas fa-redo"></i>
          <span>Reset</span>
        </button>
        <button
          onClick={handleAddGame}
          className="bg-blue-500 border border-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 flex items-center space-x-2 mb-4"
        >
          <i className="fas fa-plus"></i>
          <span>Add Game</span>
        </button>
        <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Genre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Keys
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Developer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Release Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {games.map((game) => (
              <React.Fragment key={game.id}>
                <tr
                  onClick={() => handleRowClick(game.id)}
                  className={`relative cursor-pointer ${
                    selectedGameId === game.id ? "bg-blue-100" : "hover:bg-gray-100"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {game.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {game.genreList.join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {game.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {game.developer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(game.releaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${game.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {game.rating.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {game.active ? "Yes" : "No"}
                  </td>
                </tr>
                {selectedGameId === game.id && (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 bg-gray-100">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleOpenGame(game.id)}
                          className="btn bg-blue-500 border border-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          <i className="fas fa-play mr-2"></i> Open Game
                        </button>
                        <button
                          onClick={() => handleUpdateGame(game.id)}
                          className="btn bg-blue-500 border border-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          <i className="fas fa-edit mr-2"></i> Change Game
                        </button>
                        <button
                          onClick={() => handleRemoveGame(game.id)}
                          className="btn bg-red-500 border border-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          <i className="fas fa-trash mr-2"></i> Remove Game
                        </button>
                        <button
                          onClick={() => handleAddKey(game.id)}
                          className="btn bg-green-500 border border-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          <i className="fas fa-key mr-2"></i> Add Game Key
                        </button>
                        <button
                          onClick={() => handleActivateGame(game.id, game.active)}
                          className="btn bg-yellow-500 border border-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        >
                          <i className="fas fa-check-circle mr-2"></i> Activate/Deactivate Game
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  parseInt(filters.pageNumber) <= 1 ? "pointer-events-none opacity-50" : undefined
                }
                href="#"
                onClick={() =>
                  handlePagination(Math.max(parseInt(filters.pageNumber) - 1, 1).toString())
                }
              />
            </PaginationItem>

            {Array.from({ length: data?.data.allGamesHead.totalPages || 0 }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={parseInt(filters.pageNumber) === index + 1}
                  onClick={() => handlePagination((index + 1).toString())}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {parseInt(filters.pageNumber) < (data?.data.allGamesHead.totalPages || 0) && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  handlePagination(
                    Math.min(
                      parseInt(filters.pageNumber) + 1,
                      data?.data.allGamesHead.totalPages || 0
                    ).toString()
                  )
                }
                className={
                  parseInt(filters.pageNumber) === data?.data.allGamesHead.totalPages ? "pointer-events-none opacity-50" : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        {errorMessage && <Popup message={errorMessage} onClose={handlePopupMessage} />}
      </div>
    </div>
  )
}
