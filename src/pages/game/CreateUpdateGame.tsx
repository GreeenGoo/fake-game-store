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
import CreateUpdateGameForm from "@/components/game/CreateUpdateGame"
import LoadingSpinner from "@/components/loading-spinner"
import NotificationSnackbar from "@/components/snackbar"
import axios from "axios"
import { useSnackbar } from "notistack"

export default function CreateUpdateGame() {
  const genres = useGenres()
  const playerSupport = usePlayerSupports()
  const createGame = useCreateGame()
  const updateGame = useUpdateGame()
  const { enqueueSnackbar } = useSnackbar()
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

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success")

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
    const { ...createGame } = game
    return createGame
  }

  const convertToCreateOrUpdateGame = (game: Game): CreateOrUpdateGame => {
    const { ...createGame } = game
    return {
      ...createGame,
      releaseDate: createGame.releaseDate ? new Date(createGame.releaseDate) : new Date()
    } as CreateOrUpdateGame
  }

  const handleAddThumbnail = (imageURL: string) => {
    setNewGame((prevState) => ({
      ...prevState,
      thumbnail: imageURL
    }))
  }

  const handleAddImage = (imageURL: string) => {
    // const newArray: string[] = []
    // newArray.push(imageURL)
    setNewGame((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...[imageURL]]
    }))
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
    }
    else if (name === "releaseDate") {
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
    const valid = validateFields(newGame)
    if (!valid) {
      enqueueSnackbar("Not valid game data inputed", { variant: "error", autoHideDuration: 4000 })
    } else {
      if (isUpdate) {
        updateGame.mutate(newGame, {
          onSuccess: () => {
            setSnackbarMessage("Game updated successfully.")
            setSnackbarSeverity("success")
            setSnackbarOpen(true)
            navigate("/games/all")
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
      } else {
        const gameForCreation = convertToCreateGame(newGame)
        createGame.mutate(gameForCreation, {
          onSuccess: () => {
            setSnackbarMessage("Game created successfully.")
            setSnackbarSeverity("success")
            setSnackbarOpen(true)
            navigate("/games/all")
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
    }
  }

  const handleRemoveImage = (imageToRemove: string) => {
    setNewGame((prevState) => ({
      ...prevState,
      images: prevState.images.filter((image: string) => image !== imageToRemove)
    }))
  }

  if (genres.isLoading || playerSupport.isLoading || createGame.isPending || updateGame.isPending) {
    return <LoadingSpinner />
  }

  return (
    <>
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
        handleAddImage={handleAddImage}
        handleAddThumbnail={handleAddThumbnail}
      />
      <NotificationSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
      />
    </>
  )
}
