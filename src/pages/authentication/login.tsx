import React, { FormEvent, useState } from "react"
import { useForgotPassword, useLogin, useResetPasswordWithCode } from "@/features/authentication"
import { ResetPasswordWithCodePlusCode, User } from "@/types/user"
import LoginForm from "@/components/authentication/login"
import LoadingSpinner from "@/components/loading-spinner"
import NotificationSnackbar from "@/components/snackbar"

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
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("error")

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
      setSnackbarMessage("Login failed. Please check your credentials and try again.")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPasswordSubmit = async (e: FormEvent) => {
    // e.preventDefault()
    // console.log("Start")
    // setIsLoading(true)
    // try {
    //   await forgotPasswordMutation.mutateAsync({ email: resetEmail })
    //   setStep("reset")
    //   console.log("We're here")
    //   setSnackbarMessage("Reset email sent successfully. Please check your inbox.")
    //   setSnackbarSeverity("success")
    //   setSnackbarOpen(true)
    // } catch (error) {
    //   setSnackbarMessage("Failed to send reset email. Please try again.")
    //   setSnackbarSeverity("error")
    //   setSnackbarOpen(true)
    // } finally {
    //   setIsLoading(false)
    // }
    // console.log("End")
  }

  const handleResetPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword || password.length < 8) {
      setSnackbarMessage("Passwords do not match or less than 8 characters.")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
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
      setSnackbarMessage("Password reset successfully.")
      setSnackbarSeverity("success")
      setSnackbarOpen(true)
      setStep("login")
      setPassword("")
      onClose()
    } catch (error) {
      console.error("Password reset failed:", error)
      setSnackbarMessage("Password reset failed. Please try again.")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  if (!isOpen) return null

  if (
    isLoading ||
    login.isPending ||
    forgotPasswordMutation.isPending ||
    resetPasswordWithCode.isPending
  ) {
    return <LoadingSpinner />
  }

  return (
    <>
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
      <NotificationSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
        severity={snackbarSeverity}
      />
    </>
  )
}

export default LoginModal
