import { SingleGame } from "@/components/game/single-game"
import { useGetSingleGame } from "@/features/games"
import { useParams } from "react-router-dom"

const defaultImage = "https://via.placeholder.com/150?text=No+Image"

export function Game() {
  const { id } = useParams<{ id: string }>()
  if (!id) return <p>Error: Game ID was not found!</p>

  const { singleGameData, isLoading, isError } = useGetSingleGame(id)

  if (!singleGameData) return <p>No game data available</p>
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error was occured while fetching game data</p>

  return (
    <div>
      <SingleGame game={singleGameData.data} />
    </div>
  )
}
