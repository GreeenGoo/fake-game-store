import React, { useState } from "react"
import { SignUp, User } from "@/types/user"
import { useSignUp } from "@/features/authentication"
import SignUpForm from "@/components/authentication/sign-up"
import NotificationSnackbar from "@/components/snackbar"
import axios from "axios"

type SignUpProps = {
  isOpen: boolean
  onClose: () => void
  onRegister: (newToken: string, user: User) => void
}

const SignUpPanel: React.FC<SignUpProps> = ({ isOpen, onClose, onRegister }) => {
  const signUpQuery = useSignUp()
  const [signUp, setSignUp] = useState<SignUp>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("error")

  if (!isOpen) return null

  const handleSignUpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setSignUp((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (signUp.password !== signUp.confirmPassword) {
      setSnackbarMessage("Passwords do not match")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
      return
    }

    signUpQuery.mutate(signUp, {
      onSuccess: (data) => {
        onRegister(data.data.token, data.data.user)
        setSignUp({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        })
        onClose()
        setSnackbarMessage("Registration successful.")
        setSnackbarSeverity("success")
        setSnackbarOpen(true)
      },
      onError: (error) => {
        const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error.errorMessage
        : "An unexpected error occurred."
      setSnackbarMessage(errorMessage)
        setSnackbarSeverity("error")
        setSnackbarOpen(true)
      }
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <>
      <SignUpForm
        signUp={signUp}
        signUpQuery={signUpQuery}
        onClose={onClose}
        handleSubmit={handleSubmit}
        handleSignUpChange={handleSignUpChange}
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

export default SignUpPanel
