import { ChangeEvent, useEffect, useState } from "react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet"
import { ActiveGamesList } from "@/components/ui/active-games"
import { useActiveGamesList, useGenres, usePlayerSupports } from "@/features/games"
import { CreditCard } from "lucide-react"
import { Card } from "./card"
import { Game, GamesFiltering } from "@/types/game"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export function Home() {
  const genres = useGenres()
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
  const [games, setGames] = useState<Game[]>(data ? data.data.allGamesList : [])
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

  useEffect(() => {
    if (data) {
      setGames(data.data.allGamesList)
    }
  }, [data])

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

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen p-4 bg-gray-100 relative">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <select
            id="sortBy"
            name="sortBy"
            value={sortBarValue}
            onChange={(event) => handleChange(event)}
            className="border px-2 py-1 rounded w-full"
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

        <div className="flex-1 min-w-[200px]">
          <select
            id="pageSize"
            name="pageSize"
            value={filters.pageSize}
            onChange={(event) => handleChange(event)}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="">Games per page...</option>
            <option value="5">5 games</option>
            <option value="10">10 games</option>
            <option value="15">15 games</option>
            <option value="20">20 games</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <input
            id="searchKeyword"
            type="text"
            name="searchKeyword"
            value={filters.searchKeyword}
            onChange={handleChange}
            placeholder="Mario"
            className="border px-2 py-1 rounded w-full"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
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

        <div className="flex-1 min-w-[200px]">
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

        <div className="flex-1 min-w-[200px]">
          <button
            id="resetButton"
            name="resetButton"
            onClick={handleReset}
            className="bg-blue-500 border border-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 flex items-center space-x-2 mb-4"
          >
            <i className="fas fa-redo"></i>
            <span>Reset</span>
          </button>
        </div>
      </div>

      {isLoading && <p className="text-lg text-blue-600">Loading...</p>}
      {isError && <p className="text-lg text-red-600">Error fetching active games</p>}
      {games && <ActiveGamesList gamesData={games} />}

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
