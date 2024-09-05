import { UseMutationResult } from "@tanstack/react-query"
import { Box, Button, TextField } from "@mui/material"
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
  signUpQuery,
  handleSubmit,
  handleSignUpChange,
  onClose
}: SignUpProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Register</h2>
          <Button variant="contained" onClick={onClose}>
            <i className="fas fa-times"></i>
          </Button>
        </div>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <TextField
            required
            label="Name"
            name="name"
            value={signUp.name}
            onChange={handleSignUpChange}
          />
          <TextField
            required
            label="Email"
            name="email"
            value={signUp.email}
            onChange={handleSignUpChange}
          />
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            value={signUp.password}
            onChange={handleSignUpChange}
          />
          <TextField
            required
            label="Confirm password"
            type="password"
            name="confirmPassword"
            value={signUp.confirmPassword}
            onChange={handleSignUpChange}
          />
          <Button type="submit" variant="contained" disabled={signUpQuery.isPending}>
            {signUpQuery.isPending ? "Registering..." : "Register"}
          </Button>
        </Box>
      </div>
    </div>
  )
}
