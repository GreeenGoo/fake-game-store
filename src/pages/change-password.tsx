import { useChangePassword } from "@/features/user"
import { ChangeUserPassword } from "@/types/user"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

interface ChangePasswordProps {
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
  const { mutate, errorMessage, isError } = useChangePassword()
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={passwordChange.password}
              onChange={(e) => handlePasswordChanges(e)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              value={passwordChange.newPassword}
              onChange={(e) => handlePasswordChanges(e)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              id="newPasswordConfirm"
              type="password"
              name="newPasswordConfirm"
              value={passwordChange.newPasswordConfirm}
              onChange={(e) => handlePasswordChanges(e)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
