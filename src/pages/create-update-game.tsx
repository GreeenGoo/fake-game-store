import {
  useCreateGame,
  useGenres,
  useGetSingleGame,
  usePlayerSupports,
  useUpdateGame
} from "@/features/games"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Popup } from "@/components/ui/popup-message"
import { CreateGame, CreateOrUpdateGame, Game } from "@/types/game"

export default function CreateUpdateGame() {
  const genres = useGenres()
  const playerSupport = usePlayerSupports()
  const createGame = useCreateGame()
  const updateGame = useUpdateGame()

  const navigate = useNavigate()
  const location = useLocation()

  const [newGame, setNewGame] = useState<CreateOrUpdateGame>({
    id: "",
    name: "",
    genreList: [],
    thumbnail: "",
    images: [],
    developer: "",
    releaseDate: new Date(),
    systemRequirements: "",
    playerSupport: [],
    price: 0,
    description: ""
  })

  const [popupState, setPopupState] = useState<{ show: boolean; message: string }>({
    show: false,
    message: ""
  })

  const isUpdate = Boolean(location.state?.myData?.id)
  const { singleGameData } = isUpdate
    ? useGetSingleGame(location.state.myData?.id)
    : { singleGameData: null }

  useEffect(() => {
    if (isUpdate && singleGameData) {
      const gameForUploading = convertToCreateOrUpdateGame(singleGameData.data)
      setNewGame(gameForUploading)
    }
  }, [isUpdate, singleGameData])

  const validateFields = (game: CreateGame): boolean => {
    return (
      game.name.trim() !== "" &&
      game.genreList.length > 0 &&
      game.thumbnail.trim() !== "" &&
      game.images.length > 0 &&
      game.developer.trim() !== "" &&
      game.releaseDate instanceof Date &&
      !isNaN(game.releaseDate.getTime()) &&
      game.systemRequirements.trim() !== "" &&
      game.playerSupport.length > 0 &&
      game.price > 0 &&
      game.description.trim() !== ""
    )
  }

  const convertToCreateGame = (game: CreateOrUpdateGame): CreateGame => {
    const { id, ...createGame } = game
    console.log("Create game is ", createGame)
    return createGame
  }

  const convertToCreateOrUpdateGame = (game: Game): CreateOrUpdateGame => {
    const { sku, active, rating, ...createGame } = game
    console.log("Create or update game is ", createGame)
    return {
      ...createGame,
      releaseDate: createGame.releaseDate ? new Date(createGame.releaseDate) : new Date()
    } as CreateOrUpdateGame
  }

  const handlenewGameChanges = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    if (name === "genreList") {
      setNewGame((prevState) => {
        const newGenres = prevState.genreList.includes(value)
          ? prevState.genreList.filter((genre) => genre !== value)
          : [...prevState.genreList, value]

        return { ...prevState, genreList: newGenres }
      })
    } else if (name === "playerSupport") {
      setNewGame((prevState) => {
        const newPlayerSupports = prevState.playerSupport.includes(value)
          ? prevState.playerSupport.filter((singlePlayerSupport) => singlePlayerSupport !== value)
          : [...prevState.playerSupport, value]

        return { ...prevState, playerSupport: newPlayerSupports }
      })
    } else if (name === "thumbnail") {
      const { files } = event.target as HTMLInputElement
      const file = files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setNewGame((prevState) => ({
            ...prevState,
            thumbnail: reader.result as string
          }))
        }
        reader.readAsDataURL(file)
      }
    } else if (name === "images") {
      const { files } = event.target as HTMLInputElement
      if (files) {
        const newImages: string[] = []
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          const reader = new FileReader()
          reader.onloadend = () => {
            newImages.push(reader.result as string)
            if (newImages.length === files.length) {
              setNewGame((prevState) => ({
                ...prevState,
                images: [...prevState.images, ...newImages]
              }))
            }
          }
          reader.readAsDataURL(file)
        }
      }
    } else if (name === "releaseDate") {
      setNewGame((prevState) => ({
        ...prevState,
        releaseDate: new Date(value)
      }))
    } else if (name === "price") {
      setNewGame((prevState) => ({
        ...prevState,
        price: parseFloat(value) || 0
      }))
    } else setNewGame((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleShowPopup = (message: string) => {
    setPopupState({ show: true, message })
  }

  const handleClosePopup = () => {
    setPopupState({ show: false, message: "" })
  }

  const handleCancel = () => {
    const cancelCreatingGame = window.confirm(
      "Are you sure you'd like to cancel creating the game? The information will not be saved!"
    )
    if (cancelCreatingGame) {
      navigate(-1)
    }
  }

  const handleSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    if (validateFields(newGame)) {
      if (isUpdate) {
        updateGame.mutate(newGame)
        navigate(`/games/all`)
      } else {
        const gameForCreation = convertToCreateGame(newGame)
        createGame.mutate(gameForCreation)
        navigate(`/games/all`)
      }
    } else {
      handleShowPopup("Fill all the necessary fields")
    }
  }

  const handleRemoveImage = (imageToRemove: string) => {
    setNewGame((prevState) => ({
      ...prevState,
      images: prevState.images.filter((image) => image !== imageToRemove)
    }))
  }

  return (
    <form className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="space-y-6">
        <div className="border-b border-gray-300 pb-6">
          <h2 className="text-2xl font-bold text-gray-900">New Game</h2>
        </div>

        <div className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="game_title" className="block text-sm font-medium text-gray-700">
              Game Title
            </label>
            <input
              id="name"
              name="name"
              value={newGame.name}
              onChange={(event) => handlenewGameChanges(event)}
              type="text"
              placeholder="Assassin's Creed"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-2"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={newGame.description}
              onChange={(event) => handlenewGameChanges(event)}
              placeholder="Assassin's Creed is an action-adventure game series..."
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-2"
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
              value={newGame.genreList}
              onChange={(event) => handlenewGameChanges(event)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {genres.genres?.data.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <ul className="mt-2 list-disc list-inside text-gray-700">
              {newGame.genreList &&
                Array.isArray(newGame.genreList) &&
                newGame.genreList.map((genre, index) => <li key={index}>{genre}</li>)}
            </ul>
          </div>

          <div>
            <label htmlFor="playerSupport" className="block text-sm font-medium text-gray-700">
              Select Player Supports
            </label>
            <select
              id="playerSupport"
              name="playerSupport"
              multiple
              value={newGame.playerSupport}
              onChange={(event) => handlenewGameChanges(event)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {playerSupport.playerSupports?.data.map((playerSupport, index) => (
                <option key={index} value={playerSupport}>
                  {playerSupport}
                </option>
              ))}
            </select>
            <ul className="mt-2 list-disc list-inside text-gray-700">
              {newGame.playerSupport.map((support, index) => (
                <li key={index}>{support}</li>
              ))}
            </ul>
          </div>

          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
              Thumbnail
            </label>
            <div className="mt-2 flex items-center">
              {newGame.thumbnail ? (
                <img
                  src={newGame.thumbnail as string}
                  alt="Thumbnail"
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon aria-hidden="true" className="h-16 w-16 text-gray-300" />
              )}
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                onChange={(event) => handlenewGameChanges(event)}
                className="sr-only"
              />
              <button
                type="button"
                className="ml-4 px-3 py-1.5 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                onClick={() => document.getElementById("thumbnail")?.click()}
              >
                Change
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {newGame.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Uploaded ${index}`}
                      className="h-24 w-24 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
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
                name="images"
                accept="image/*"
                multiple
                onChange={(event) => handlenewGameChanges(event)}
                className="mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="developer" className="block text-sm font-medium text-gray-700">
              Developer
            </label>
            <input
              id="developer"
              name="developer"
              type="text"
              value={newGame.developer}
              onChange={(event) => handlenewGameChanges(event)}
              placeholder="Nintendo Co."
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-2"
            />
          </div>

          <div>
            <label htmlFor="release_date" className="block text-sm font-medium text-gray-700">
              Release Date
            </label>
            <input
              type="date"
              name="releaseDate"
              value={
                newGame.releaseDate instanceof Date
                  ? newGame.releaseDate.toISOString().split("T")[0]
                  : ""
              }
              onChange={(event) => handlenewGameChanges(event)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="system_requirements"
              className="block text-sm font-medium text-gray-700"
            >
              System Requirements
            </label>
            <input
              id="system_requirements"
              name="systemRequirements"
              value={newGame.systemRequirements}
              onChange={(event) => handlenewGameChanges(event)}
              type="text"
              placeholder="Windows 11, Intel Core i7, 16 GB RAM, RTX 3060, 30 GB storage"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-2"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              id="price"
              name="price"
              value={newGame.price}
              onChange={(event) => handlenewGameChanges(event)}
              type="number"
              placeholder="59.99"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => handleCancel()}
            type="button"
            className="text-sm font-semibold text-gray-900 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={(event) => handleSave(event)}
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Save
          </button>
          {popupState.show && <Popup message={popupState.message} onClose={handleClosePopup} />}
        </div>
      </div>
    </form>
  )
}
