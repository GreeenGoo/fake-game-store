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
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
              {gamesData.data.allGamesList.map((game) => (
                <div
                  key={game.id}
                  onClick={() => handleGameClick(game.id)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      alt={game.name}
                      src={game.thumbnail || defaultImage}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{game.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{game.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-600">No games data available</p>
      )}
    </div>
  )
}
