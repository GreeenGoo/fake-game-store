"use client"

import { useMemo } from "react"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useGetCurrentUserOrders } from "@/features/order"

export default function MyOrders() {
  const { data: ordersData, isLoading, isError } = useGetCurrentUserOrders()

  console.log("Data on page is ", ordersData)
  // const payOrder = usePayOrder()

  const data = useMemo(
    () =>
      ordersData?.data
        .filter((order) => order.totalPrice > 0)
        .map((order) => ({
          id: order.id,
          totalPrice: order.totalPrice,
          createdAt: new Date(order.createdAt).toLocaleDateString(),
          status: order.status,
          paymentStatus: order.paymentStatus,
          games: order.games.map((gameEntry) => gameEntry.game.name).join(", ")
        })) || [],
    [ordersData]
  )

  const handlePayment = (orderId: string) => {
    console.log("Pay for order ", orderId)
    //   payOrder.mutate(orderId)
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "createdAt",
      header: "Date"
    },
    {
      accessorKey: "games",
      header: "Games"
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
        row.original.paymentStatus === "WAITING" ? (
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
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
