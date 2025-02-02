import { Game } from "@/types/Game"
import { User } from "@/types/User"
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material"
import { UseMutationResult } from "@tanstack/react-query"
import "./styles/SingleGame.css"

type SingleGameProp = {
  game: Game
  user: User | null
  addGameToCart: UseMutationResult<any, Error, string, unknown>
}

export default function SingleGame({ game, user, addGameToCart }: SingleGameProp) {
  return (
    <div className="single-game-container">
      <Card className="card-container">
        <CardActionArea disabled>
          <CardMedia component="img" height="300" image={game.thumbnail} alt={game.name} />
          <CardContent>
            <div className="card-header">
              <div className="card-info">
                <Typography className="card-title">{game.name}</Typography>
                <Typography className="card-subtext">{game.developer}</Typography>
                <Typography className="card-subtext">
                  Release Date: {new Date(game.releaseDate).toLocaleDateString("fi")}
                </Typography>
              </div>
              <Typography className="card-price">Price: ${game.price}</Typography>
            </div>
            <Typography className="card-genres">
              Genres:{" "}
              {game.genreList && game.genreList.length > 0
                ? game.genreList.join(", ").toLowerCase()
                : "No genres available"}
            </Typography>
            <Typography className="card-player-support">
              Player support:{" "}
              {game.playerSupport && game.playerSupport.length > 0
                ? game.playerSupport.join(", ").toLowerCase()
                : "No player support information"}
            </Typography>
            <Typography className="card-system-requirements">
              System Requirements: {game.systemRequirements ?? "No system requirements specified"}
            </Typography>
            <Typography className="card-sku">SKU: {game.sku || "No SKU available"}</Typography>
          </CardContent>
        </CardActionArea>
        {user?.role === "USER" ? (
          <CardActions className="card-actions">
            <Button
              size="small"
              color="primary"
              variant="contained"
              disabled={addGameToCart.isPending}
              onClick={() => addGameToCart.mutate(game.id)}
            >
              {addGameToCart.isPending ? "Adding..." : "Add to cart"}
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </div>
  )
}
