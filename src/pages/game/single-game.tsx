import { useParams } from "react-router-dom"
import LoadingSpinner from "@/components/loading-spinner"
import { useGetSingleGame } from "@/features/games"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import CardActionArea from "@mui/material/CardActionArea"
import CardActions from "@mui/material/CardActions"
import { Box } from "@mui/material"
import { useAddGameToCard } from "@/features/order"
import useUser from "@/context/UserContext"

export function Game() {
  const { user } = useUser()
  const { id } = useParams<{ id: string }>()
  const addGameToCart = useAddGameToCard()

  if (!id) {
    return <p>Error: Game ID was not found!</p>
  }

  const { singleGameData, isLoading, isFetching } = useGetSingleGame(id)

  if (!singleGameData?.data) {
    return <p>No game data available</p>
  }

  const game = singleGameData.data

  if (isLoading || isFetching) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex flex-row justify-center items-center w-full h-full mt-24">
      <Card sx={{ maxWidth: "50%" }}>
        <CardActionArea disabled>
          <CardMedia component="img" height="140" image={game.thumbnail} alt={game.name} />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start"
                }}
              >
                <Typography gutterBottom variant="h5">
                  {game.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {game.developer}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Release Date: {new Date(game.releaseDate).toLocaleDateString("fi")}
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ color: "text.secondary" }}>
                Price: ${game.price}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "text.secondary", my: 3 }}>
              Genres:{" "}
              {game.genreList && game.genreList.length > 0
                ? game.genreList.join(", ").toLowerCase()
                : "No genres available"}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Player support:{" "}
              {game.playerSupport && game.playerSupport.length > 0
                ? game.playerSupport.join(", ").toLowerCase()
                : "No player support information"}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              System Requirements: {game.systemRequirements ?? "No system requirements specified"}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              SKU: {game.sku || "No SKU available"}
            </Typography>
          </CardContent>
        </CardActionArea>
        {user?.role === "USER" ? (
          <CardActions sx={{ ml: 1, pb: 2 }}>
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
