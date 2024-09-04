import VerificationForm from "@/components/authentication/verification"
import { useSendVerificationCode, useVerifyUser } from "@/features/authentication"
import React, { useState } from "react"

interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose }) => {
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const verifyUser = useVerifyUser()
  const sendVerificationCode = useSendVerificationCode()

  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)
    try {
      sendVerificationCode.mutate()
      verifyUser.mutate(verificationCode)

      setIsLoading(false)
      alert("Verification code submitted.")
      onClose()
    } catch (error) {
      alert(error)
    }
  }

  if (!isOpen) return null

  return (
    <VerificationForm
      verificationCode={verificationCode}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      handleVerificationChange={handleVerificationChange}
      onClose={onClose}
    />
  )
}
