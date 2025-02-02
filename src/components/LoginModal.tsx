import { useSnackbar } from "notistack"
import { FormEvent, useState } from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { ResetPasswordWithCodePlusCode, User } from "@/types/user"
import LoginForm from "./authentication/Login"
import { useLogin, useForgotPassword, useResetPasswordWithCode } from "@/features/authentication"
import LoadingSpinner from "./loading-spinner"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (token: string, role: User) => void
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resetCode, setResetCode] = useState("")
  const [resetEmail, setResetEmail] = useState("")
  const [step, setStep] = useState<"login" | "forgot" | "reset">("login")
  const { enqueueSnackbar } = useSnackbar()

  const login = useLogin()
  const forgotPasswordMutation = useForgotPassword()
  const resetPasswordWithCode = useResetPasswordWithCode()

  const handleResetStates = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setResetCode("")
    setResetEmail("")
  }

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const data = await login.mutateAsync({ email, password })
    if (data.data.token) {
      onLogin(data.data.token, data.data.user)
    }
    handleResetStates()
    onClose()
  }

  const handleForgotPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await forgotPasswordMutation.mutateAsync({ email: resetEmail })
    setStep("reset")
  }

  const handleResetPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword || password.length < 8) {
      enqueueSnackbar("Passwords do not match or less than 8 characters.", { variant: "warning" })
      return
    }

    const resetPasswordData: ResetPasswordWithCodePlusCode = {
      password,
      confirmPassword,
      code: resetCode
    }

    await resetPasswordWithCode.mutateAsync(resetPasswordData)
    setPassword("")
    setConfirmPassword("")
    setStep("login")
    onClose()
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          p: 4,
          width: 350
        }}
      >
        {login.isPending || forgotPasswordMutation.isPending || resetPasswordWithCode.isPending ? (
          <LoadingSpinner />
        ) : (
          <LoginForm
            step={step}
            handleResetPasswordSubmit={handleResetPasswordSubmit}
            resetCode={resetCode}
            setResetCode={setResetCode}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            isLoading={login.isPending}
            setStep={setStep}
            handleForgotPasswordSubmit={handleForgotPasswordSubmit}
            resetEmail={resetEmail}
            setResetEmail={setResetEmail}
            handleLoginSubmit={handleLoginSubmit}
            email={email}
            setEmail={setEmail}
          />
        )}
      </Box>
    </Modal>
  )
}
