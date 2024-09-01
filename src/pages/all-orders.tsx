import React, { useState, useEffect } from "react"
import { useAllOrders } from "@/features/order"
import { OrderDto } from "@/types/order"

export default function AllOrders() {
  const { data, isLoading, isError } = useAllOrders()
  const [orders, setOrders] = useState<OrderDto[]>([])

  useEffect(() => {
    if (data && data.status === "success") {
      setOrders(data.data)
    }
  }, [data])

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error fetching orders.</p>
  if (orders.length === 0) return <p>No orders found.</p>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Games
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.userId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${order.totalPrice.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.paymentStatus}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.games.length} game(s)
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
