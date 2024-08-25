import { GlobalResponse } from "@/types"
import { GamesList } from "@/types/game"
import { useNavigate } from "react-router-dom"

const defaultImage = "https://via.placeholder.com/150?text=No+Image"

type ListOfGames = {
  gamesData: GlobalResponse<GamesList>
}

export function GamesListForUser({ gamesData }: ListOfGames) {
  const navigate = useNavigate()

  const handleGameClick = (id: string) => {
    navigate(`/game/${id}`)
  }
  return (
    <div>
      {gamesData ? (
        <div
          className="w-full max-w-4xl p-4 bg-white shadow-md rounded-lg overflow-y-auto"
          style={{ maxHeight: "80vh" }}
        >
          <p className="text-xl font-semibold mb-4">
            Total Games: {gamesData.data.allGamesHead.totalGamesCount}
          </p>
          <ul className="space-y-4">
            {gamesData.data.allGamesList.map((game) => (
              <li
                key={game.id}
                className="flex flex-col md:flex-row bg-gray-50 p-4 rounded-lg shadow-sm"
                onClick={() => handleGameClick(game.id)}
              >
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
  )
}
