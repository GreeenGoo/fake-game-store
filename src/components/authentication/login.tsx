import { Box, Button, TextField } from "@mui/material"
import { FormEvent, SetStateAction } from "react"

type LoginFormProps = {
  step: string
  handleResetPasswordSubmit: (e: FormEvent) => void
  resetCode: string
  setResetCode: (value: string) => void
  password: string
  setPassword: (value: string) => void
  confirmPassword: string
  setConfirmPassword: (value: string) => void
  isLoading: boolean
  setStep: (value: SetStateAction<"reset" | "login" | "forgot">) => void
  handleForgotPasswordSubmit: (e: FormEvent) => void
  resetEmail: string
  setResetEmail: (value: string) => void
  handleLoginSubmit: (e: FormEvent) => void
  email: string
  setEmail: (value: string) => void
}

export default function LoginForm({
  step,
  handleResetPasswordSubmit,
  resetCode,
  setResetCode,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isLoading,
  setStep,
  handleForgotPasswordSubmit,
  resetEmail,
  setResetEmail,
  handleLoginSubmit,
  email,
  setEmail
}: LoginFormProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {step === "reset" ? "Reset Password" : step === "forgot" ? "Forgot Password" : "Login"}
        </h2>
        {step === "reset" ? (
          <Box component="form" noValidate autoComplete="off" onSubmit={handleResetPasswordSubmit}>
            <div className="flex flex-col justify-center gap-4 mb-8">
              <TextField
                required
                id="outlined-required"
                label="Reset Code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <TextField
                required
                id="outlined-required"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Button variant="contained" type="submit">
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
              <Button
                variant="outlined"
                type="button"
                onClick={() => setStep("login")}
                color="error"
              >
                Back to Login
              </Button>
            </div>
          </Box>
        ) : step === "forgot" ? (
          <Box component="form" noValidate autoComplete="off" onSubmit={handleForgotPasswordSubmit}>
            <div className="flex flex-col justify-center gap-4 mb-8">
              <TextField
                required
                id="outlined-required"
                label="Email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Button onClick={handleForgotPasswordSubmit} variant="contained" type="submit">
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
              <Button
                variant="outlined"
                type="button"
                onClick={() => setStep("login")}
                color="error"
              >
                Back to Login
              </Button>
            </div>
          </Box>
        ) : (
          <Box component="form" noValidate autoComplete="off" onSubmit={handleLoginSubmit}>
            <div className="flex flex-col justify-center gap-4 mb-8">
              <TextField
                required
                id="outlined-required"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Button variant="contained" type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <Button variant="outlined" type="button" onClick={() => setStep("forgot")}>
                Forgot Password?
              </Button>
            </div>
          </Box>
        )}
      </div>
    </div>
  )
}
