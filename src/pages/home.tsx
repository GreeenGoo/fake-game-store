import { useEffect, useState } from "react"
import { Button } from "../components/ui/Button"
import api from "../api"
import { GlobalResponse } from "@/types"
import { GamesList } from "@/types/game"
import { useNavigate } from "react-router-dom"

export function Home() {
  const [state, setState] = useState()

  const navigate = useNavigate();
  const [gamesData, setGamesData] = useState<GlobalResponse<GamesList>>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const defaultImage = 'https://via.placeholder.com/150?text=No+Image';

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await api.get<GlobalResponse<GamesList>>("/games/active")
        console.log("API response:", response.data);
        setGamesData(response.data)
      } catch (error: any) {
        setError("Failed to fetch all active games data")
      } finally {
        setLoading(false)
      }
    }
    handleFetch()
  }, [])

  console.log("Games Data:", gamesData)

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  const handleGameClick = (id: string) => {
    navigate(`/game/${id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
      {loading && <p className="text-lg text-blue-600">Loading...</p>}
      {error && <p className="text-lg text-red-600">{error}</p>}
      {gamesData ? (
        <div className="w-full max-w-4xl p-4 bg-white shadow-md rounded-lg overflow-y-auto" style={{ maxHeight: '80vh' }}>
          <p className="text-xl font-semibold mb-4">Total Games: {gamesData.data.allGamesHead.totalGamesCount}</p>
          <ul className="space-y-4">
            {gamesData.data.allGamesList.map((game) => (
              <li key={game.id} className="flex flex-col md:flex-row bg-gray-50 p-4 rounded-lg shadow-sm" onClick={() => handleGameClick(game.id)}>
                <img 
                  src={game.thumbnail} 
                  alt={game.name} 
                  onError={(e) => (e.currentTarget.src = defaultImage)} 
                  className="w-full md:w-1/3 h-auto object-cover rounded-lg mb-4 md:mb-0 md:mr-4" 
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">{game.name}</h2>
                  <p className="text-gray-700 mb-2">{game.description}</p>
                  <p className="text-lg font-bold">Price: {game.price}$</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg text-gray-600">No games data available</p>
      )}
    </div>
  );
};
