import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { GameInCard } from "@/types/game"
import { useGetCurrentUserCard } from "@/features/order"

export function Card() {
  const { data: gamesData, isLoading, isError } = useGetCurrentUserCard()

  const data: GameInCard[] =
    gamesData?.data.games.map((gameEntry) => ({
      id: gameEntry.game.id,
      name: gameEntry.game.name,
      thumbnail: gameEntry.game.thumbnail,
      price: gameEntry.game.price,
      quantity: gameEntry.quantity
    })) || []

  const columns: ColumnDef<GameInCard>[] = [
    {
      accessorKey: "thumbnail",
      header: "Image",
      cell: ({ getValue }) => (
        <img
          src={getValue<string>()}
          alt="Thumbnail"
          className="w-12 h-12 rounded-full object-cover"
        />
      )
    },
    {
      accessorKey: "name",
      header: "Name"
    },
    {
      accessorKey: "price",
      header: "Price"
    },
    {
      accessorKey: "quantity",
      header: "Quantity"
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
