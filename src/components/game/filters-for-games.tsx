import { ChangeEvent } from "react"

type FiltersForGamesProps = {
  sortBarValue: string
  pageSize: number
  searchKeyword: string
  filteredGenres: string[]
  filteredPlayerSupport: string[]
  genresList: string[]
  playerSupportList: string[]
  handleReset: () => void
  handleChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
}

export default function FiltersForGames({
  sortBarValue,
  pageSize,
  searchKeyword,
  filteredGenres,
  filteredPlayerSupport,
  genresList,
  playerSupportList,
  handleReset,
  handleChange
}: FiltersForGamesProps) {
  return (
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
          value={pageSize}
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
          value={searchKeyword}
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
          value={filteredGenres}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {genresList.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <ul className="mt-2 list-disc list-inside text-gray-700">
          {filteredGenres &&
            Array.isArray(filteredGenres) &&
            filteredGenres.map((genre, index) => <li key={index}>{genre}</li>)}
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
          value={filteredPlayerSupport}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {playerSupportList.map((playerSupport, index) => (
            <option key={index} value={playerSupport}>
              {playerSupport}
            </option>
          ))}
        </select>
        <ul className="mt-2 list-disc list-inside text-gray-700">
          {filteredPlayerSupport &&
            Array.isArray(filteredPlayerSupport) &&
            filteredPlayerSupport.map((playerS, index) => <li key={index}>{playerS}</li>)}
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
  )
}
