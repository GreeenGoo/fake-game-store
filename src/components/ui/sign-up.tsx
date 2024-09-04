import React, { useState } from "react"
import { Button } from "./Button"
import { SignUp, User } from "@/types/user"
import { useSignUp } from "@/features/authentication"

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Register</h2>
          <Button variant="destructive" onClick={onClose}>
            <i className="fas fa-times"></i>
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={signUp.name}
              onChange={handleSignUpChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={signUp.email}
              onChange={handleSignUpChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={signUp.password}
              onChange={handleSignUpChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={signUp.confirmPassword}
              onChange={handleSignUpChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="default" disabled={signUpQuery.isPending}>
              {signUpQuery.isPending ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPanel
