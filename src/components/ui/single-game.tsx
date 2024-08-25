import { Game } from "@/types/game"

const defaultImage = "https://via.placeholder.com/150?text=No+Image"

type GamePropsType = {
  game: Game
}

export function SingleGame({ game }: GamePropsType) {
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
        <strong>Price:</strong> {game.price}
      </p>
      <p className="text-lg mb-2">
        <strong>Release Date:</strong> {new Date(game.releaseDate).toLocaleDateString()}
      </p>
      <p className="text-lg mb-2">
        <strong>Rating:</strong> {game.rating}
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
