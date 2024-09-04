import ChangePasswordForm from "@/components/authentication/change-password"
import { useChangePassword } from "@/features/user"
import { ChangeUserPassword } from "@/types/user"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "@/components/loading-spinner"

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
      alert("New passwords do not match.")
      return
    }

    setIsLoading(true)

    mutate(passwordChange, {
      onSuccess: () => {
        alert("Password changed successfully.")
        localStorage.removeItem("authToken")
        navigate("/games/active")
        onClose()
        window.location.reload()
      },
      onError: () => {
        alert(errorMessage || "An error occurred while changing password.")
      },
      onSettled: () => {
        setIsLoading(false)
      }
    })
  }

  if (!isOpen) return null

  if (isLoading || isChangePasswordLoading) {
    return <LoadingSpinner />
  }

  return (
    <ChangePasswordForm
      passwordChange={passwordChange}
      isLoading={isLoading}
      onClose={onClose}
      handleSubmit={handleSubmit}
      handlePasswordChanges={handlePasswordChanges}
    />
  )
}
