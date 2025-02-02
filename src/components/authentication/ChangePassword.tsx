import { ChangeUserPassword } from "@/types/user"
import { Button } from "@mui/material"
import "./styles/ChangePassword.css"

type ChangePasswordProps = {
  passwordChange: ChangeUserPassword
  isLoading: boolean
  onClose: () => void
  handleSubmit: (e: React.FormEvent) => void
  handlePasswordChanges: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ChangePasswordForm({
  passwordChange,
  isLoading,
  onClose,
  handleSubmit,
  handlePasswordChanges
}: ChangePasswordProps) {
  return (
    <div className="overlay">
      <div className="modal-container">
        <h2 className="modal-title">Change Password</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Old Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={passwordChange.password}
              onChange={(e) => handlePasswordChanges(e)}
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="newPassword" className="input-label">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              value={passwordChange.newPassword}
              onChange={(e) => handlePasswordChanges(e)}
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmNewPassword" className="input-label">
              Confirm New Password
            </label>
            <input
              id="newPasswordConfirm"
              type="password"
              name="newPasswordConfirm"
              value={passwordChange.newPasswordConfirm}
              onChange={(e) => handlePasswordChanges(e)}
              className="input-field"
              required
            />
          </div>
          <div className="button-container">
            <Button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Changing..." : "Change Password"}
            </Button>
            <Button onClick={onClose} className="cancel-button">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
