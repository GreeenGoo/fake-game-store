import { Game } from "@/types/Game"
import "@fortawesome/fontawesome-free/css/all.css"
import React from "react"
import "./styles/AllGamesList.css"

type ListOfGamesProps = {
  games: Game[]
  tableRef: React.MutableRefObject<HTMLTableElement | null>
  selectedGameId: string
  handleRowClick: (id: string) => void
  handleOpenGame: (id: string) => void
  handleUpdateGame: (id: string) => void
  handleAddKey: (id: string) => void
  handleActivateGame: (id: string, gameActivationStatus: boolean) => void
}

export function AllGamesList({
  games,
  tableRef,
  selectedGameId,
  handleRowClick,
  handleActivateGame,
  handleAddKey,
  handleOpenGame,
  handleUpdateGame
}: ListOfGamesProps) {
  return (
    <div className="table-container">
      <table ref={tableRef} className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Genre</th>
            <th>Keys</th>
            <th>Developer</th>
            <th>Release Date</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <React.Fragment key={game.id}>
              <tr
                onClick={() => handleRowClick(game.id)}
                className={`table-row ${selectedGameId === game.id ? "table-row-selected" : ""}`}
              >
                <td>{game.id}</td>
                <td>{game.name}</td>
                <td>{game.genreList.join(", ")}</td>
                <td>{game.quantity}</td>
                <td>{game.developer}</td>
                <td>{new Date(game.releaseDate).toLocaleDateString()}</td>
                <td>${game.price.toFixed(2)}</td>
                <td>{game.rating.toFixed(1)}</td>
                <td>{game.active ? "Yes" : "No"}</td>
              </tr>
              {selectedGameId === game.id && (
                <tr className="table-row-detail">
                  <td colSpan={8}>
                    <div className="table-actions">
                      <button
                        onClick={() => handleOpenGame(game.id)}
                        className="btn bg-blue text-white"
                      >
                        <i className="fas fa-play icon"></i> Open Game
                      </button>
                      <button
                        onClick={() => handleUpdateGame(game.id)}
                        className="btn bg-blue text-white"
                      >
                        <i className="fas fa-edit icon"></i> Change Game
                      </button>
                      <button
                        onClick={() => handleAddKey(game.id)}
                        className="btn bg-green text-white"
                      >
                        <i className="fas fa-key icon"></i> Add Game Key
                      </button>
                      <button
                        onClick={() => handleActivateGame(game.id, game.active)}
                        className="btn bg-yellow text-white"
                      >
                        <i className="fas fa-check-circle icon"></i> Activate/Deactivate Game
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
  )
}
