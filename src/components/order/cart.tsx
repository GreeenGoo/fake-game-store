import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { GameInCard } from "@/types/game"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import "./styles/Cart.css"

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
        <img src={getValue<string>()} alt="Thumbnail" className="image-thumbnail" />
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
        <button onClick={() => handleDelete(row.original.id)} className="button">
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
    <div className="table-container">
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
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
              <TableCell colSpan={columns.length} className="no-results">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="total-container">
        <div className="total-text">Total:</div>
        <div className="total-price">
          ${orders.reduce((acc, game) => acc + game.price * game.quantity, 0).toFixed(2)}
        </div>
      </div>
      <div className="action-buttons">
        <button onClick={() => handleClearCart()} className="clear-cart-button">
          Clear Cart
        </button>
        <button onClick={() => handleCheckout()} className="checkout-button">
          Checkout
        </button>
      </div>
    </div>
  )
}