import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useCheckoutCurrentOrder } from "@/features/order"
import { OrderDto } from "@/types/order"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

type MyOrdersListProps = {
  orders: OrderDto[]
  handlePayment: (orderId: string) => void
}

export default function MyOrdersList({ orders, handlePayment }: MyOrdersListProps) {
  const checkoutOrder = useCheckoutCurrentOrder()

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
      header: "Total Price"
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
          <button
            onClick={() => checkoutOrder.mutate()}
            className="text-green-500 hover:text-green-700"
          >
            Checkout
          </button>
        ) : row.original.paymentStatus === "WAITING" ? (
          <button
            onClick={() => handlePayment(row.original.id)}
            className="text-green-500 hover:text-green-700"
          >
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
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
