"use client"

import { GameInCard } from "@/types/game"
import {
  useCheckoutCurrentOrder,
  useCleanCurrentUserCard,
  useDeleteGameFromCard,
  useGetCurrentUserCard
} from "@/features/order"
import { useMemo } from "react"
import Cart from "@/components/order/cart"
import LoadingSpinner from "@/components/loading-spinner"

export function Card() {
  const { data: gamesData, isLoading, isError } = useGetCurrentUserCard()
  const deleteGameFromCard = useDeleteGameFromCard()
  const checkoutOrder = useCheckoutCurrentOrder()
  const clearCard = useCleanCurrentUserCard()

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
    deleteGameFromCard.mutate(id)
  }

  const handleCheckout = () => {
    checkoutOrder.mutate()
  }

  const handleClearCart = () => {
    clearCard.mutate()
  }

  if (isLoading || deleteGameFromCard.isPending || checkoutOrder.isPending || clearCard.isPending)
    return <LoadingSpinner />

  return (
    <Cart
      orders={data}
      handleDelete={handleDelete}
      handleCheckout={handleCheckout}
      handleClearCart={handleClearCart}
    />
  )
}
