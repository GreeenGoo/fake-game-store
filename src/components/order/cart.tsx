import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { GameInCard } from "@/types/game"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

type CartProps = {
  orders: GameInCard[]
  handleDelete: (id: string) => void
  handleCheckout: () => void
  handleClearCart: () => void
}

export default function Cart({ orders, handleDelete, handleCheckout, handleClearCart }: CartProps) {
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
    data: orders,
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
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-900">Total:</span>
          <span className="text-lg font-semibold text-gray-900">
            ${orders.reduce((acc, game) => acc + game.price * game.quantity, 0).toFixed(2)}
          </span>
        </div>
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => handleClearCart()}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Clear Cart
          </button>
          <button
            onClick={() => handleCheckout()}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
