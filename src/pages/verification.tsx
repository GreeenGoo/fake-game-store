import React, { useState } from "react"

interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose }) => {
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    // TODO: Handle verification logic here

    setIsLoading(false)
    alert("Verification code submitted.") // Обработка после отправки
    onClose() // Закрытие модалки
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Verify Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <input
              id="verificationCode"
              type="text"
              value={verificationCode}
              onChange={handleVerificationChange}
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
              {isLoading ? "Verifying..." : "Submit"}
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
