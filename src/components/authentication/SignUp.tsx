import { UseMutationResult } from "@tanstack/react-query"
import { Box, Button, TextField } from "@mui/material"
import { GlobalResponse } from "@/types/Index"
import { LoggedInUser } from "@/types/User"
import { SignUp } from "@/types/User"
import "./styles/SignUp.css"

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
    <div className="signup-form-overlay">
      <div className="signup-form-container">
        <div className="signup-form-header">
          <h2 className="signup-form-title">Register</h2>
        </div>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="signup-form-body"
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
          <Button
            type="submit"
            variant="contained"
            disabled={signUpQuery.isPending}
            className="signup-form-submit-button"
          >
            {signUpQuery.isPending ? "Registering..." : "Register"}
          </Button>
          <Button variant="outlined" onClick={onClose} className="signup-form-close-button">
            Close
          </Button>
        </Box>
      </div>
    </div>
  )
}
