import api from "@/api"
import { Game as SingleGame } from "@/types/game"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const defaultImage = "https://via.placeholder.com/150?text=No+Image"

export function Game() {
  const { id } = useParams<{ id: string }>()
  const [game, setGame] = useState<SingleGame | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await api.get<{ data: SingleGame; status: string; error: any }>(`/games/${id}`);
        setGame(response.data.data);
      } catch (error: any) {
        setError("Failed to fetch game data")
      } finally {
        setLoading(false)
      }
    }

    fetchGame()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!game) return <p>No game data available</p>

  const releaseDate = game.releaseDate ? new Date(game.releaseDate).toLocaleDateString() : "N/A"
  const price = game.price !== undefined ? `$${game.price.toFixed(2)}` : "N/A"
  const rating = game.rating !== undefined ? game.rating : "N/A"

  console.log(game)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
      <img
        src={game.thumbnail || defaultImage}
        alt={game.name}
        onError={(e) => (e.currentTarget.src = defaultImage)}
        className="w-full max-w-md mb-4 rounded-lg shadow-md"
      />
      <p className="text-lg mb-4">{game.description || "No description available"}</p>
      <p className="text-lg mb-2">
        <strong>Developer:</strong> {game.developer || "Unknown"}
      </p>
      <p className="text-lg mb-2">
        <strong>Price:</strong> {price}
      </p>
      <p className="text-lg mb-2">
        <strong>Release Date:</strong> {releaseDate}
      </p>
      <p className="text-lg mb-2">
        <strong>Rating:</strong> {rating}
      </p>
      <p className="text-lg mb-2">
        <strong>Genres:</strong>{" "}
        {game.genreList && game.genreList.length > 0
          ? game.genreList.join(", ")
          : "No genres available"}
      </p>
      <p className="text-lg mb-2">
        <strong>Player Support:</strong>{" "}
        {game.playerSupport && game.playerSupport.length > 0
          ? game.playerSupport.join(", ")
          : "No player support information"}
      </p>
      <p className="text-lg mb-2">
        <strong>System Requirements:</strong>{" "}
        {game.systemRequirements || "No system requirements specified"}
      </p>
      <p className="text-lg mb-2">
        <strong>SKU:</strong> {game.sku || "No SKU available"}
      </p>
    </div>
  )
}
