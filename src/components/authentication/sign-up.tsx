import { UseMutationResult } from "@tanstack/react-query"
import { Button } from "../ui/Button"
import { GlobalResponse } from "@/types"
import { LoggedInUser } from "@/types/user"
import { SignUp } from "@/types/user"

type SignUpProps = {
  signUp: SignUp
  signUpQuery: UseMutationResult<GlobalResponse<LoggedInUser>, Error, SignUp, unknown>
  onClose: () => void
  handleSubmit: (e: React.FormEvent) => void
  handleSignUpChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SignUpForm({
  signUp,
  onClose,
  signUpQuery,
  handleSubmit,
  handleSignUpChange
}: SignUpProps) {
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
