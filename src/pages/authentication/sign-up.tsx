import React, { useState } from "react"
import { SignUp, User } from "@/types/user"
import { useSignUp } from "@/features/authentication"
import SignUpForm from "@/components/authentication/sign-up"

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
      alert("Passwords do not match")
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
      },
      onError: (error) => {
        alert("Something went wrong. Please try again.")
      }
    })
  }

  return (
    <SignUpForm
      signUp={signUp}
      signUpQuery={signUpQuery}
      onClose={onClose}
      handleSubmit={handleSubmit}
      handleSignUpChange={handleSignUpChange}
    />
  )
}

export default SignUpPanel
