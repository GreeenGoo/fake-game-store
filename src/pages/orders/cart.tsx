import { useMemo, useState } from "react"
import { GameInCard } from "@/types/Game"
import {
  useCheckoutCurrentOrder,
  useCleanCurrentUserCard,
  useDeleteGameFromCard,
  useGetCurrentUserCard
} from "@/features/Order"
import Cart from "@/components/order/Cart"
import LoadingSpinner from "@/components/LoadingSpinner"
import NotificationSnackbar from "@/components/SnackBar"
import axios from "axios"

export function Card() {
  const { data: gamesData, isLoading } = useGetCurrentUserCard()
  const deleteGameFromCard = useDeleteGameFromCard()
  const checkoutOrder = useCheckoutCurrentOrder()
  const clearCard = useCleanCurrentUserCard()

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success")

  const data: GameInCard[] = useMemo(
    () =>
      gamesData?.data.games.map((gameEntry) => ({
        id: gameEntry.game.id,
        name: gameEntry.game.name,
        thumbnail: gameEntry.game.thumbnail,
        price: gameEntry.game.price,
        quantity: gameEntry.quantity
      })) || [],
    [gamesData]
  )

  const handleDelete = (id: string) => {
    deleteGameFromCard.mutate(id, {
      onSuccess: () => {
        setSnackbarMessage("Game removed successfully.")
        setSnackbarSeverity("success")
        setSnackbarOpen(true)
      },
      onError: (error) => {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.error.errorMessage
          : "An unexpected error occurred."
        setSnackbarMessage(errorMessage)
        setSnackbarSeverity("error")
        setSnackbarOpen(true)
      }
    })
  }

  const handleCheckout = () => {
    checkoutOrder.mutate(undefined, {
      onSuccess: () => {
        setSnackbarMessage("Checkout successful.")
        setSnackbarSeverity("success")
        setSnackbarOpen(true)
      },
      onError: (error) => {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.error.errorMessage
          : "An unexpected error occurred."
        setSnackbarMessage(errorMessage)
        setSnackbarSeverity("error")
        setSnackbarOpen(true)
      }
    })
  }

  const handleClearCart = () => {
    clearCard.mutate(undefined, {
      onSuccess: () => {
        setSnackbarMessage("Cart cleared.")
        setSnackbarSeverity("success")
        setSnackbarOpen(true)
      },
      onError: (error) => {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.error.errorMessage
          : "An unexpected error occurred."
        setSnackbarMessage(errorMessage)
        setSnackbarSeverity("error")
        setSnackbarOpen(true)
      }
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  if (isLoading || deleteGameFromCard.isPending || checkoutOrder.isPending || clearCard.isPending) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Cart
        orders={data}
        handleDelete={handleDelete}
        handleCheckout={handleCheckout}
        handleClearCart={handleClearCart}
      />
      <NotificationSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
        severity={snackbarSeverity}
      />
    </>
  )
}
