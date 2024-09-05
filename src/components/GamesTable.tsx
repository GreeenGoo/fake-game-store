/* eslint-disable @typescript-eslint/no-var-requires */
import { useEffect, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useNavigate } from "react-router-dom"
import AddIcon from "@mui/icons-material/Add"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { Game, GamesList } from "@/types/game"
import { useAddGameToCard, useDeleteGameFromCard } from "@/features/order"
import { useSnackbar } from "notistack"
import useUser from "@/context/UserContext"
import { Stack, Pagination, Button } from "@mui/material"

export default function GamesTable({
  data,
  amountOfPages,
  onChangePage,
  currentPageNumber
}: {
  data: GamesList
  amountOfPages: number
  onChangePage: (number: number) => void
  currentPageNumber: number
}) {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const addGameToCard = useAddGameToCard()
  const deleteGameFromCard = useDeleteGameFromCard()

  const { user } = useUser()
  const [addedGames, setAddedGames] = useState<Game["id"][]>([])

  if (!data) {
    return null
  }

  const handleAddToOrder = (id: string) => {
    addGameToCard.mutate(id, {
      onError: () => {
        enqueueSnackbar("Error when adding a game to your cart", {
          variant: "error",
          autoHideDuration: 4000
        })
      },
      onSuccess: () => {
        setAddedGames([...addedGames, id])
        enqueueSnackbar("Added to your cart", { variant: "success", autoHideDuration: 4000 })
      }
    })
  }

  const handleDeleteFromOrder = (id: string) => {
    deleteGameFromCard.mutate(id, {
      onError: () => {
        enqueueSnackbar("Error when deleting a game from your cart", {
          variant: "error",
          autoHideDuration: 4000
        })
      },
      onSuccess: () => {
        const foundI = addedGames.indexOf(id)
        if (foundI !== -1) {
          const newAddedGames = [...addedGames]
          newAddedGames.splice(foundI, 1)
          setAddedGames(newAddedGames)
          enqueueSnackbar("Removed from your cart", { variant: "success", autoHideDuration: 4000 })
        } else {
          enqueueSnackbar("Error when deleting a game from your cart", {
            variant: "error",
            autoHideDuration: 4000
          })
        }
      }
    })
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">Game</TableCell>
              <TableCell align="right">Developer</TableCell>
              <TableCell align="right">Release Date</TableCell>
              <TableCell align="right">Genres</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Copies</TableCell>
              <TableCell align="right">Rating</TableCell>
              {user?.role === "USER" ? <TableCell align="right">Cart</TableCell> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.allGamesList.map((row, i) => (
              <TableRow
                key={row.name + i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => navigate(`/games/${row.id}`)}
                  sx={{ maxWidth: 100 }}
                >
                  <img
                    src={
                      row.thumbnail !== ""
                        ? row.thumbnail
                        : "https://image.api.playstation.com/vulcan/ap/rnd/202208/0921/46OCOSLlnvNL5Ari9TUslJ07.jpg"
                    }
                    alt={row.name}
                    loading="lazy"
                  />
                </TableCell>
                <TableCell
                  align="right"
                  onClick={() => navigate(`/games/${row.id}`)}
                  sx={{ maxWidth: 100 }}
                >
                  {row.name}
                </TableCell>
                <TableCell align="right" onClick={() => navigate(`/games/${row.id}`)}>
                  {row.developer}
                </TableCell>
                <TableCell align="right" onClick={() => navigate(`/games/${row.id}`)}>
                  {typeof row.releaseDate === "number"
                    ? new Date(row.releaseDate).toLocaleDateString()
                    : row.releaseDate.toLocaleDateString()}
                </TableCell>
                <TableCell align="right" onClick={() => navigate(`/games/${row.id}`)}>
                  {row.genreList.join(", ")}
                </TableCell>
                <TableCell align="right" onClick={() => navigate(`/games/${row.id}`)}>
                  {row.price}
                </TableCell>
                <TableCell align="right" onClick={() => navigate(`/games/${row.id}`)}>
                  {row.quantity}
                </TableCell>
                <TableCell align="right" onClick={() => navigate(`/games/${row.id}`)}>
                  {row.rating}
                </TableCell>
                {user?.role === "USER" ? (
                  <TableCell align="right">
                    <Button
                      disabled={!row.active || !row.quantity}
                      variant="outlined"
                      onClick={() => {
                        handleAddToOrder(row.id)
                      }}
                    >
                      <div className="flex flex-row justify-center items-center">
                        <AddIcon color="success" />
                        <p>Add</p>
                      </div>
                    </Button>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination
          page={currentPageNumber}
          count={amountOfPages}
          shape="rounded"
          onChange={(_, pageN) => {
            onChangePage(pageN)
          }}
        />
      </Stack>
    </>
  )
}
