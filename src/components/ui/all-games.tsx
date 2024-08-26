import { GlobalResponse } from "@/types"
import { GamesList } from "@/types/game"
import { useNavigate } from "react-router-dom"

type ListOfGames = {
  gamesData: GlobalResponse<GamesList>
}

export function AllGamesList({ gamesData }: ListOfGames) {
  const navigate = useNavigate()
  const games = gamesData.data.allGamesList
  console.log(games)

  const handleGameClick = (id: string) => {
    navigate(`/games/${id}`)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Genre
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Developer
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Release Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Rating
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Active
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {games.map((game) => (
            <tr key={game.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {game.id}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hover:text-blue-500 hover:underline cursor-pointer"
                onClick={() => handleGameClick(game.id)}
              >
                {game.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {game.genreList.join(", ")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {game.developer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(game.releaseDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${game.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {game.rating.toFixed(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {game.active ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
