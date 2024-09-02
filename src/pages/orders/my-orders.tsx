"use client"

import { useMemo } from "react"

import { useGetCurrentUserOrders, usePayCurrentOrder } from "@/features/order"
import { PayForOrder } from "@/types/order"
import MyOrdersList from "@/components/order/my-orders"

export default function MyOrders() {
  const { data: ordersData, isLoading, isError } = useGetCurrentUserOrders()
  const payOrder = usePayCurrentOrder()

  console.log(ordersData)

  const data = useMemo(
    () =>
      ordersData?.data
        .filter((order) => order.totalPrice > 0)
        .map((order) => ({
          id: order.id,
          userId: order.userId,
          totalPrice: order.totalPrice,
          createdAt: new Date(order.createdAt),
          status: order.status,
          paymentStatus: order.paymentStatus,
          games: order.games
        })) || [],
    [ordersData]
  )

  const handlePayment = (orderId: string) => {
    const payForOrderProps: PayForOrder = { orderId: orderId, isPaidSuccessfully: true }
    payOrder.mutate(payForOrderProps)
  }

  return <MyOrdersList orders={data} handlePayment={handlePayment} />
}
