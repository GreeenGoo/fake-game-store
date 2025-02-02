import React, { useState, useEffect } from "react"
import { useAllOrders } from "@/features/Order"
import { OrderDto } from "@/types/Order"
import AllOrdersList from "@/components/order/AllOrders"
import LoadingSpinner from "@/components/LoadingSpinner"
import NotificationSnackbar from "@/components/SnackBar"

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
