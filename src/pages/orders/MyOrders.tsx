"use client"

import { useMemo, useState, useEffect } from "react"
import {
  useCheckoutCurrentOrder,
  useGetCurrentUserOrders,
  usePayCurrentOrder
} from "@/features/Order"
import { PayForOrder } from "@/types/Order"
import MyOrdersList from "@/components/order/MyOrders"
import LoadingSpinner from "@/components/LoadingSpinner"
import NotificationSnackbar from "@/components/SnackBar"
import axios from "axios"

export default function MyOrders() {
  const checkoutOrder = useCheckoutCurrentOrder()
  const { data: ordersData, isLoading, isError } = useGetCurrentUserOrders()
  const payOrder = usePayCurrentOrder()

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info")

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
    payOrder.mutate(payForOrderProps, {
      onSuccess: () => {
        setSnackbarMessage("Payment processed successfully.")
        setSnackbarSeverity("success")
        setSnackbarOpen(true)
      },
      onError: (error) => {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.error?.errorMessage
          : "An unexpected error occurred."
        setSnackbarMessage(errorMessage)
        setSnackbarSeverity("error")
        setSnackbarOpen(true)
      }
    })
  }

  const handleCheckoutOrder = () => {
    checkoutOrder.mutate(undefined, {
      onSuccess: () => {
        setSnackbarMessage("Checkout completed successfully.")
        setSnackbarSeverity("success")
        setSnackbarOpen(true)
      },
      onError: (error) => {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.error?.errorMessage
          : "An unexpected error occurred."
        setSnackbarMessage(errorMessage)
        setSnackbarSeverity("error")
        setSnackbarOpen(true)
      }
    })
  }

  useEffect(() => {
    if (isError) {
      setSnackbarMessage("Error fetching orders.")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
    }
  }, [isError])

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <MyOrdersList
        orders={data}
        handlePayment={handlePayment}
        handleCheckoutOrder={handleCheckoutOrder}
      />
      <NotificationSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
      />
    </div>
  )
}
