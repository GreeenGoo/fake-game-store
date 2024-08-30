"use client"

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
import { useDeleteGameFromCard, useGetCurrentUserCard } from "@/features/order"
import { useMemo } from "react"

export function Card() {
  const { data: gamesData, isLoading, isError } = useGetCurrentUserCard()
  const deleteGameFromCard = useDeleteGameFromCard()

  const data: GameInCard[] = useMemo(
    () =>
      gamesData?.data.games.map((gameEntry) => ({
        id: gameEntry.game.id,
        name: gameEntry.game.name,
        thumbnail: gameEntry.game.thumbnail,
        price: gameEntry.game.price,
        quantity: gameEntry.quantity
      })) || [],
    [gamesData]
  )

  const handleDelete = (id: string) => {
    deleteGameFromCard.mutate(id)
  }

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
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button
          onClick={() => handleDelete(row.original.id)}
          className="text-red-500 hover:text-red-700"
        >
          <i className="fas fa-trash"></i>
        </button>
      )
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  console.log("Just to make sure it works.")

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
