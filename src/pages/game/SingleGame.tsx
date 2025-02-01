import { useParams } from "react-router-dom"
import LoadingSpinner from "@/components/loading-spinner"
import { useGetSingleGame } from "@/features/games"
import { useAddGameToCard } from "@/features/order"
import useUser from "@/context/UserContext"
import SingleGameComponent from "@/components/game/SingleGame"

export function SingleGame() {
  const { user } = useUser()
  const { id } = useParams<{ id: string }>()
  const addGameToCart = useAddGameToCard()

  if (!id) {
    return <p>Error: Game ID was not found!</p>
  }

  const { singleGameData, isLoading, isFetching } = useGetSingleGame(id)

  if (!singleGameData?.data) {
    return <p>No game data available</p>
  }

  const game = singleGameData.data

  if (isLoading || isFetching) {
    return <LoadingSpinner />
  }

  return <SingleGameComponent game={game} user={user} addGameToCart={addGameToCart} />
}
