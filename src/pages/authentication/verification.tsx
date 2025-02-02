import VerificationForm from "@/components/authentication/Verification"
import { useSendVerificationCode, useVerifyUser } from "@/features/Authentication"
import React, { useState } from "react"
import LoadingSpinner from "@/components/LoadingSpinner"
import NotificationSnackbar from "@/components/SnackBar"
import axios from "axios"

interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose }) => {
  const [verificationCode, setVerificationCode] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("error")
  const verifyUser = useVerifyUser()
  const sendVerificationCode = useSendVerificationCode()

  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSnackbarMessage("")
    setSnackbarSeverity("error")

    try {
      await verifyUser.mutateAsync(verificationCode)

      setSnackbarMessage("Verification code submitted.")
      setSnackbarSeverity("success")
      onClose()
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error.errorMessage
        : "An unexpected error occurred."
      setSnackbarMessage(errorMessage)
    } finally {
      setSnackbarOpen(true)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  if (!isOpen) return null

  if (verifyUser.isPending || sendVerificationCode.isPending) {
    return <LoadingSpinner />
  }

  return (
    <>
      <VerificationForm
        verificationCode={verificationCode}
        isLoading={verifyUser.isPending || sendVerificationCode.isPending}
        handleSubmit={handleSubmit}
        handleVerificationChange={handleVerificationChange}
        onClose={onClose}
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
