import { ChangeEvent, useState } from "react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet"
import { ActiveGamesList } from "@/components/game/active-games-grid"
import { useActiveGamesList, useGenres, usePlayerSupports } from "@/features/games"
import { CreditCard } from "lucide-react"
import { Card } from "../orders/cart"
import { GamesFiltering } from "@/types/game"
import FiltersForGames from "@/components/game/filters-for-games"
import GamesPagination from "@/components/game/pagination-for-games"
import LoadingSpinner from "@/components/loading-spinner"
import { useNavigate } from "react-router-dom"
import { useAddGameToCard } from "@/features/order"

export function ActiveGames() {
  const navigate = useNavigate()
  const addGameToCard = useAddGameToCard()
  const { genres, isLoading: isGenresLoading, isError: isGenresError } = useGenres()
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
  const { data, isLoading, isError } = useActiveGamesList(filters)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
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

  const handlePagination = (value: string) => {
    setFilters((prevState) => ({ ...prevState, pageNumber: value }))
  }

  const handleGameClick = (id: string) => {
    navigate(`/games/${id}`)
  }

  const handleAddToOrder = (id: string) => {
    addGameToCard.mutate(id)
  }

  if (isGenresLoading || isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen p-4 bg-gray-100 relative">
      <FiltersForGames
        sortBarValue={sortBarValue}
        pageSize={data?.data.allGamesHead.gamesPerPage || 0}
        searchKeyword={filters.searchKeyword}
        filteredGenres={filters.genres}
        filteredPlayerSupport={filters.playerSupport}
        genresList={genres?.data || []}
        playerSupportList={playerSupport.playerSupports?.data || []}
        handleReset={handleReset}
        handleChange={handleChange}
      />

      {isLoading && <p className="text-lg text-blue-600">Loading...</p>}
      {isError && <p className="text-lg text-red-600">Error fetching active games</p>}
      {data?.data.allGamesList && (
        <ActiveGamesList
          gamesData={data?.data.allGamesList}
          handleAddToOrder={handleAddToOrder}
          handleGameClick={handleGameClick}
        />
      )}

      <GamesPagination
        pageNumber={parseInt(filters.pageNumber)}
        handlePagination={handlePagination}
        totalPages={data?.data.allGamesHead.totalPages || 0}
      />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <button
            onClick={() => setIsSheetOpen(true)}
            className="fixed bottom-5 right-5 w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none"
          >
            <CreditCard className="h-8 w-8" />
          </button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
          <h2 className="text-xl font-bold mb-4">Card</h2>
          <Card />
        </SheetContent>
      </Sheet>
    </div>
  )
}
