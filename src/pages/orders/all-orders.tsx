import React, { useState, useEffect } from "react"
import { useAllOrders } from "@/features/order"
import { OrderDto } from "@/types/order"
import AllOrdersList from "@/components/order/all-orders-list"
import LoadingSpinner from "@/components/loading-spinner"
import NotificationSnackbar from "@/components/snackbar"

export default function AllOrders() {
  const { data, isLoading, isError } = useAllOrders()
  const [orders, setOrders] = useState<OrderDto[]>([])
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info")

  useEffect(() => {
    if (data && data.status === "success") {
      setOrders(data.data)
    }
  }, [data])

  useEffect(() => {
    if (isError) {
      setSnackbarMessage("Error occurred while fetching orders.")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
    }
  }, [isError])

  if (isLoading) return <LoadingSpinner />
  if (orders.length === 0) return <p>No orders found.</p>

  return (
    <div>
      <AllOrdersList orders={orders} />
      <NotificationSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
      />
    </div>
  )
}
