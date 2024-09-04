import React, { FormEvent, useState } from "react"
import { useForgotPassword, useLogin, useResetPasswordWithCode } from "@/features/authentication"
import { ResetPasswordWithCodePlusCode, User } from "@/types/user"
import LoginForm from "@/components/authentication/login"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (token: string, role: User) => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resetCode, setResetCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [step, setStep] = useState<"login" | "forgot" | "reset">("login")

  const login = useLogin()
  const forgotPasswordMutation = useForgotPassword()
  const resetPasswordWithCode = useResetPasswordWithCode()

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = await login.mutateAsync({ email, password })
      if (data.data.token) {
        onLogin(data.data.token, data.data.user)
      }
      onClose()
    } catch (error) {
      console.error("Login failed:", error)
      alert("Login failed. Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await forgotPasswordMutation.mutateAsync({ email: resetEmail })
      setStep("reset")
    } catch (error) {
      console.error("Failed to send reset email:", error)
      alert("Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword || password.length < 8) {
      alert("Passwords do not match or less than 8 characters.")
      return
    }

    const resetPasswordData: ResetPasswordWithCodePlusCode = {
      password,
      confirmPassword,
      code: resetCode
    }

    setIsLoading(true)
    try {
      await resetPasswordWithCode.mutateAsync(resetPasswordData)
      alert("Password reset successfully.")
      setStep("login")
      onClose()
    } catch (error) {
      console.error("Password reset failed:", error)
      alert("Password reset failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <LoginForm
      step={step}
      handleResetPasswordSubmit={handleResetPasswordSubmit}
      resetCode={resetCode}
      setResetCode={setResetCode}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      isLoading={isLoading}
      setStep={setStep}
      handleForgotPasswordSubmit={handleForgotPasswordSubmit}
      resetEmail={resetEmail}
      setResetEmail={setResetEmail}
      handleLoginSubmit={handleLoginSubmit}
      email={email}
      setEmail={setEmail}
    />
  )
}

export default LoginModal
