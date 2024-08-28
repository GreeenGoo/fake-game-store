import { useGenres, usePlayerSupports } from "@/features/games"
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { ChangeEvent, useState } from "react"
import DatePicker from "../components/ui/date-picker"

export default function CreateUpdateGame() {
  const genres = useGenres()
  const playerSupport = usePlayerSupports()

  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedPlayerSupport, setSelectedPlayerSupport] = useState<string[]>([])
  const [thumbnail, setThumbnail] = useState<string | ArrayBuffer | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [date, setDate] = useState<string>("")

  const handleDateChange = (newDate: string) => {
    setDate(newDate)
  }

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnail(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = (imageToRemove: string) => {
    setImages((prevImages) => prevImages.filter((image) => image !== imageToRemove))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages: string[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        reader.onloadend = () => {
          newImages.push(reader.result as string)
          if (newImages.length === files.length) {
            setImages((prevImages) => [...prevImages, ...newImages])
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleSelectGenre = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value: selectedGenre } = event.target

    setSelectedGenres((prevGenres) =>
      prevGenres.includes(selectedGenre)
        ? prevGenres.filter((genre) => genre !== selectedGenre)
        : [...prevGenres, selectedGenre]
    )

    console.log(selectedGenre)
  }

  const handleSelectPlayerSupport = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value: selectedPlayerSupport } = event.target

    setSelectedPlayerSupport((prevPlayerSupports) =>
      prevPlayerSupports.includes(selectedPlayerSupport)
        ? prevPlayerSupports.filter((genre) => genre !== selectedPlayerSupport)
        : [...prevPlayerSupports, selectedPlayerSupport]
    )

    console.log(selectedPlayerSupport)
  }

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">New Game</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Game title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="game_title"
                    name="game_title"
                    type="text"
                    placeholder="Assasin's Creed"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description (write a few sentences about the game)
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  placeholder="Assassin's Creed is an action-adventure game series set in historical open-world environments, where players..."
                />
              </div>
            </div>

            <div>
              <h3>Select Genres:</h3>
              <select multiple={true} value={selectedGenres} onChange={handleSelectGenre}>
                {genres.genres?.data.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>

              <div>
                <h4>Selected genres:</h4>
                <ul>
                  {selectedGenres.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3>Select Player Supports:</h3>
              <select
                multiple={true}
                value={selectedPlayerSupport}
                onChange={handleSelectPlayerSupport}
              >
                {playerSupport.playerSupports?.data.map((playerSupport, index) => (
                  <option key={index} value={playerSupport}>
                    {playerSupport}
                  </option>
                ))}
              </select>

              <div>
                <h4>Selected Player Supports:</h4>
                <ul>
                  {selectedPlayerSupport.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {thumbnail ? (
                  <img
                    src={thumbnail as string}
                    alt="Thumbnail"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                )}
                <input
                  type="file"
                  id="thumbnail"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="sr-only"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={() => document.getElementById("thumbnail")?.click()}
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="images" className="block text-sm font-medium leading-6 text-gray-900">
                Images
              </label>
              <div className="mt-2 flex flex-col gap-x-3">
                <div className="flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Uploaded ${index}`}
                        className="h-24 w-24 rounded-md object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                        onClick={() => handleRemoveImage(image)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="developer"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Developer:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="developer"
                    name="developer"
                    type="text"
                    placeholder="Nintendo Co."
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="p-4">
              <DatePicker selectedDate={date} onDateChange={handleDateChange} />
              <p className="mt-4 text-gray-700">Release Date: {date}</p>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="systemRequirenments"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                System Requirenments:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="systemRequirenments"
                    name="systemRequirenments"
                    type="text"
                    placeholder="Windows 11, Intel Core i7, 16 GB RAM, RTX 3060, 30 GB storage"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price, $:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="59.99"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
