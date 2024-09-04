import { useState } from "react"
import { useGetCurrentUser } from "@/features/user"
import ProfilePage from "@/components/user/profile"
import LoadingSpinner from "@/components/loading-spinner"
import NotificationSnackbar from "@/components/snackbar"

export function UserProfilePage() {
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false)
  const [isVerificationOpen, setVerificationOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("error")

  const openChangePassword = () => setChangePasswordOpen(true)
  const closeChangePassword = () => setChangePasswordOpen(false)

  const openVerification = () => setVerificationOpen(true)
  const closeVerification = () => setVerificationOpen(false)

  const { data, isLoading, isError } = useGetCurrentUser()

  if (isError) {
    setSnackbarMessage("Failed to load user data.")
    setSnackbarSeverity("error")
    setSnackbarOpen(true)
    return null
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!data) {
    setSnackbarMessage("No user data available.")
    setSnackbarSeverity("error")
    setSnackbarOpen(true)
    return null
  }

  const user = data.data

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <>
      <ProfilePage
        user={user}
        openChangePassword={openChangePassword}
        closeChangePassword={closeChangePassword}
        isChangePasswordOpen={isChangePasswordOpen}
        openVerification={openVerification}
        closeVerification={closeVerification}
        isVerificationOpen={isVerificationOpen}
      />
      <NotificationSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
        severity={snackbarSeverity}
      />
    </>
  )
}
