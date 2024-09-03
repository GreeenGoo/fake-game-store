import { useState, useEffect, useRef } from "react"
import { Game } from "@/types/game"
import "@fortawesome/fontawesome-free/css/all.css"
import React from "react"
import { useActivateGame, useAddGameKey } from "@/features/games"
import { useNavigate } from "react-router-dom"

type ListOfGames = {
  games: Game[]
}

export function AllGamesList({ games }: ListOfGames) {
  const navigate = useNavigate()
  const { mutate: activateGame, errorMessage, handlePopupMessage } = useActivateGame()
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null)
  const tableRef = useRef<HTMLTableElement | null>(null)
  const addGameKey = useAddGameKey()

  const handleRowClick = (id: string) => {
    setSelectedGameId((prevSelected) => (prevSelected === id ? null : id))
  }

  const handleOpenGame = (id: string) => {
    navigate(`/games/${id}`)
  }

  const handleUpdateGame = (id: string) => {
    navigate(`/games/add`, {
      state: {
        myData: {
          type: "updating",
          id: id
        }
      }
    })
  }

  const handleAddKey = (id: string) => {
    addGameKey.mutate(id)
  }

  const handleActivateGame = (id: string, gameActivationStatus: boolean) => {
    activateGame([id, !gameActivationStatus])
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
        setSelectedGameId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="overflow-x-auto">
      <div>
        <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Genre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Keys
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Developer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Release Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {games.map((game) => (
              <React.Fragment key={game.id}>
                <tr
                  onClick={() => handleRowClick(game.id)}
                  className={`relative cursor-pointer ${
                    selectedGameId === game.id ? "bg-blue-100" : "hover:bg-gray-100"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {game.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {game.genreList.join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {game.quantity}
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
                {selectedGameId === game.id && (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 bg-gray-100">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleOpenGame(game.id)}
                          className="btn bg-blue-500 border border-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          <i className="fas fa-play mr-2"></i> Open Game
                        </button>
                        <button
                          onClick={() => handleUpdateGame(game.id)}
                          className="btn bg-blue-500 border border-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          <i className="fas fa-edit mr-2"></i> Change Game
                        </button>
                        <button
                          onClick={() => handleAddKey(game.id)}
                          className="btn bg-green-500 border border-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          <i className="fas fa-key mr-2"></i> Add Game Key
                        </button>
                        <button
                          onClick={() => handleActivateGame(game.id, game.active)}
                          className="btn bg-yellow-500 border border-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        >
                          <i className="fas fa-check-circle mr-2"></i> Activate/Deactivate Game
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
