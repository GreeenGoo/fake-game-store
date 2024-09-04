import {
  useCreateGame,
  useGenres,
  useGetSingleGame,
  usePlayerSupports,
  useUpdateGame
} from "@/features/games"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CreateGame, CreateOrUpdateGame, Game } from "@/types/game"
import CreateUpdateGameForm from "@/components/game/create-update-game"
import LoadingSpinner from "@/components/loading-spinner"

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
    quantity: 0,
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
          ? prevState.genreList.filter((genre: string) => genre !== value)
          : [...prevState.genreList, value]

        return { ...prevState, genreList: newGenres }
      })
    } else if (name === "playerSupport") {
      setNewGame((prevState) => {
        const newPlayerSupports = prevState.playerSupport.includes(value)
          ? prevState.playerSupport.filter(
              (singlePlayerSupport: string) => singlePlayerSupport !== value
            )
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

  const handleCancel = () => {
    const cancelCreatingGame = window.confirm(
      "Are you sure you'd like to cancel creating the game? The information will not be saved!"
    )
    if (cancelCreatingGame) {
      navigate("games/all")
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
      images: prevState.images.filter((image: string) => image !== imageToRemove)
    }))
  }

  if(genres.isLoading || playerSupport.isLoading || createGame.isPending || updateGame.isPending){
    return <LoadingSpinner />
  }

  return (
    <CreateUpdateGameForm
      gameTitle={newGame.name}
      gameDescription={newGame.description}
      newGameGenres={newGame.genreList}
      newGamePlayerSupport={newGame.playerSupport}
      genresList={genres.genres?.data || []}
      playerSupportList={playerSupport.playerSupports?.data || []}
      thumbnail={newGame.thumbnail}
      images={newGame.images}
      developer={newGame.developer}
      releaseDate={newGame.releaseDate}
      systemRequirements={newGame.systemRequirements}
      price={newGame.price}
      handlenewGameChanges={handlenewGameChanges}
      handleRemoveImage={handleRemoveImage}
      handleCancel={handleCancel}
      handleSave={handleSave}
    />
  )
}
