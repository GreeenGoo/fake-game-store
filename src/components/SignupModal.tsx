import { useSnackbar } from "notistack"
import { useState } from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { SignUp, User } from "@/types/user"
import { useSignUp } from "@/features/authentication"
import LoadingSpinner from "./loading-spinner"
import SignUpForm from "./authentication/SignUp"

type SignUpProps = {
  isOpen: boolean
  onClose: () => void
  onRegister: (newToken: string, user: User) => void
}

export default function LoginModal({ isOpen, onClose, onRegister }: SignUpProps) {
  const signUpQuery = useSignUp()
  const { enqueueSnackbar } = useSnackbar()
  const [signUp, setSignUp] = useState<SignUp>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
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
      enqueueSnackbar("Passwords do not match", { variant: "warning" })
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
      }
    })
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
          width: 1000
        }}
      >
        {signUpQuery.isPending ? (
          <LoadingSpinner />
        ) : (
          <SignUpForm
            signUp={signUp}
            signUpQuery={signUpQuery}
            onClose={onClose}
            handleSubmit={handleSubmit}
            handleSignUpChange={handleSignUpChange}
          />
        )}
      </Box>
    </Modal>
  )
}
