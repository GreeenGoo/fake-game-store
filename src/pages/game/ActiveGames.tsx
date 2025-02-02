import { ChangeEvent, useState } from "react"
import { useActiveGamesList, useGenres, usePlayerSupports } from "@/features/Games"
import { GamesFiltering } from "@/types/Game"
import useUser from "@/context/UserContext"
import GamesTable from "@/components/game/GamesTable"
import Filters from "@/components/game/Filters"
import { SelectChangeEvent } from "@mui/material/Select"
import LoadingSpinner from "@/components/LoadingSpinner"
import CartDrawer from "@/components/CartDrawer"
import GamesPagination from "@/components/game/GamesPagination"

export function ActiveGames() {
  const { user } = useUser()

  const { genres } = useGenres()
  const playerSupport = usePlayerSupports()
  const [filters, setFilters] = useState<GamesFiltering>({
    sortField: "",
    sortValue: "",
    pageNumber: "1",
    pageSize: "10",
    searchKeyword: "",
    genres: [],
    playerSupport: []
  })
  const { data: gamesList, isPending } = useActiveGamesList(filters)
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

  const handlePagination = (value: string) => {
    setFilters((prevState) => ({ ...prevState, pageNumber: value }))
  }

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
        pageNumber: "1",
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
      const values = value as unknown as string[]
      const playerSupportI = filters.playerSupport.findIndex(
        (el) => el === values[values.length - 1]
      )
      if (playerSupportI === -1) {
        const newValues = [...filters.playerSupport, values[values.length - 1]]
        setFilters({ ...filters, playerSupport: newValues })
        return
      } else {
        const newValues = [...filters.playerSupport]
        newValues.splice(playerSupportI, 1)
        setFilters({ ...filters, playerSupport: newValues })
        return
      }
    }
  }

  return (
    <>
      <div className="flex flex-col items-center gap-10 p-4 bg-gray-100 relative pt-10">
        <Filters
          sortBarValue={sortBarValue}
          pageSize={gamesList?.data.allGamesHead.gamesPerPage || 0}
          searchKeyword={filters.searchKeyword}
          filteredGenres={filters.genres}
          filteredPlayerSupport={filters.playerSupport}
          genresList={genres?.data || []}
          playerSupportList={playerSupport.playerSupports?.data || []}
          handleReset={handleReset}
          handleChange={handleChange}
        />
        {isPending && <LoadingSpinner />}
        {gamesList?.data ? (
          <GamesTable
            data={gamesList?.data}
            amountOfPages={gamesList?.data.allGamesHead.totalPages ?? 0}
            onChangePage={(number) =>
              setFilters((prev) => ({ ...prev, pageNumber: number.toString() }))
            }
            currentPageNumber={gamesList?.data.allGamesHead.currentPageNumber ?? 0}
          />
        ) : null}
        <GamesPagination
          pageNumber={parseInt(filters.pageNumber)}
          handlePagination={handlePagination}
          totalPages={gamesList?.data.allGamesHead.totalPages || 0}
        />
        {user?.role === "USER" ? <CartDrawer /> : null}
      </div>
    </>
  )
}
