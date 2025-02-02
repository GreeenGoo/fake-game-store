import ChangePasswordForm from "@/components/authentication/ChangePassword"
import { useChangePassword } from "@/features/user"
import { ChangeUserPassword } from "@/types/user"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "@/components/loading-spinner"
import NotificationSnackbar from "@/components/snackbar"

export type ChangePasswordProps = {
  isOpen: boolean
  onClose: () => void
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({ isOpen, onClose }) => {
  const [passwordChange, setPasswordChange] = useState<ChangeUserPassword>({
    password: "",
    newPassword: "",
    newPasswordConfirm: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success")

  const { mutate, errorMessage, isChangePasswordLoading } = useChangePassword()
  const navigate = useNavigate()

  const handlePasswordChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setPasswordChange((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordChange.newPassword !== passwordChange.newPasswordConfirm) {
      setSnackbarMessage("New passwords do not match.")
      setSnackbarSeverity("warning")
      setSnackbarOpen(true)
      return
    }

    setIsLoading(true)

    mutate(passwordChange, {
      onSuccess: () => {
        setSnackbarMessage("Password changed successfully.")
        setSnackbarSeverity("success")
        setSnackbarOpen(true)
        localStorage.removeItem("authToken")
        navigate("/games/active")
        onClose()
        window.location.reload()
      },
      onError: () => {
        const errorMsg = errorMessage || "An error occurred while changing password."
        setSnackbarMessage(errorMsg)
        setSnackbarSeverity("error")
        setSnackbarOpen(true)
      },
      onSettled: () => {
        setIsLoading(false)
      }
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  if (!isOpen) return null

  if (isLoading || isChangePasswordLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <ChangePasswordForm
        passwordChange={passwordChange}
        isLoading={isLoading}
        onClose={onClose}
        handleSubmit={handleSubmit}
        handlePasswordChanges={handlePasswordChanges}
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
