import { SingleGame } from "@/components/game/single-game"
import LoadingSpinner from "@/components/loading-spinner"
import { useGetSingleGame } from "@/features/games"
import { useParams } from "react-router-dom"

export function Game() {
  const { id } = useParams<{ id: string }>()
  if (!id) return <p>Error: Game ID was not found!</p>

  const { singleGameData, isLoading, isError } = useGetSingleGame(id)

  if (!singleGameData) return <p>No game data available</p>
  if (isLoading) return <LoadingSpinner />
  if (isError) return <p>Error was occured while fetching game data</p>

  return (
    <div>
      <SingleGame game={singleGameData.data} />
    </div>
  )
}
