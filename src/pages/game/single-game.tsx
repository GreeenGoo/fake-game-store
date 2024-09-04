import { SingleGame } from "@/components/game/single-game"
import LoadingSpinner from "@/components/loading-spinner"
import { useGetSingleGame } from "@/features/games"
import { useParams } from "react-router-dom"
import NotificationSnackbar from "@/components/snackbar"
import { useState, useEffect } from "react"

export function Game() {
  const { id } = useParams<{ id: string }>()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info")

  if (!id) return <p>Error: Game ID was not found!</p>

  const { singleGameData, isLoading, isError } = useGetSingleGame(id)

  useEffect(() => {
    if (isError) {
      setSnackbarMessage("Error occurred while fetching game data.")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
    }
  }, [isError])

  if (isLoading) return <LoadingSpinner />
  if (!singleGameData) return <p>No game data available</p>

  return (
    <div>
      <SingleGame game={singleGameData.data} />
      <NotificationSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
      />
    </div>
  )
}
