import React, { useState, useEffect } from "react"
import { useAllOrders } from "@/features/order"
import { OrderDto } from "@/types/order"
import AllOrdersList from "@/components/order/all-orders-list"
import LoadingSpinner from "@/components/loading-spinner"

export default function AllOrders() {
  const { data, isLoading, isError } = useAllOrders()
  const [orders, setOrders] = useState<OrderDto[]>([])

  useEffect(() => {
    if (data && data.status === "success") {
      setOrders(data.data)
    }
  }, [data])

  if (isLoading) return <LoadingSpinner />
  if (isError) return <p>Error fetching orders.</p>
  if (orders.length === 0) return <p>No orders found.</p>

  return <AllOrdersList orders={orders} />
}
