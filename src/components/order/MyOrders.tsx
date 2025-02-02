import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { OrderDto } from "@/types/Order"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

type MyOrdersListProps = {
  orders: OrderDto[]
  handlePayment: (orderId: string) => void
  handleCheckoutOrder: () => void
}

export default function MyOrdersList({
  orders,
  handlePayment,
  handleCheckoutOrder
}: MyOrdersListProps) {
  const columns: ColumnDef<OrderDto>[] = [
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string)
        return date.toLocaleDateString()
      }
    },
    {
      accessorKey: "games",
      header: "Games",
      cell: ({ row }) => {
        return row.original.games.map((game) => game.game.name).join(", ")
      }
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ getValue }) => {
        const value = getValue() as number
        return value.toFixed(2)
      }
    },
    {
      accessorKey: "status",
      header: "Status"
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status"
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) =>
        row.original.paymentStatus === "UNPAID" ? (
          <button onClick={() => handleCheckoutOrder()} className="button">
            Checkout
          </button>
        ) : row.original.paymentStatus === "WAITING" ? (
          <button onClick={() => handlePayment(row.original.id)} className="button">
            Pay Now
          </button>
        ) : null
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
              <TableCell colSpan={columns.length} className="no-orders">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
