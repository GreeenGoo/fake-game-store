import { ChangePassword } from "@/pages/authentication/ChangePassword"
import { VerificationModal } from "@/pages/authentication/Verification"
import { Button } from "@mui/material"
import "./styles/Profile.css"

type ProfilePageProps = {
  user: {
    name: string
    email: string
    role: string
    birthDate?: Date | null
    activeStatus: string
    address?: string | null
    phone?: string | null
  }
  openChangePassword: () => void
  openVerification: () => void
  isChangePasswordOpen: boolean
  closeChangePassword: () => void
  isVerificationOpen: boolean
  closeVerification: () => void
}

export default function ProfilePage({
  user,
  openChangePassword,
  openVerification,
  isChangePasswordOpen,
  closeChangePassword,
  isVerificationOpen,
  closeVerification
}: ProfilePageProps) {
  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <h1 className="profile-title">User Profile</h1>
        <div className="profile-details">
          <div className="profile-row">
            <div className="label">Name:</div>
            <div className="value">{user.name}</div>
          </div>
          <div className="profile-row">
            <div className="label">Email:</div>
            <div className="value">{user.email}</div>
          </div>
          <div className="profile-row">
            <div className="label">Role:</div>
            <div className="value">{user.role}</div>
          </div>
          <div className="profile-row">
            <div className="label">Date of Birth:</div>
            <div className="value">
              {user.birthDate ? (
                user.birthDate.toString()
              ) : (
                <span className="no-data">There is no data</span>
              )}
            </div>
          </div>
          <div className="profile-row">
            <div className="label">Status:</div>
            <div className={`status-row ${user.activeStatus.toLowerCase()}`}>
              <p>{user.activeStatus}</p>
              {user.activeStatus === "UNVERIFIED" && (
                <Button variant="contained" onClick={openVerification} color="warning">
                  Verify
                </Button>
              )}
            </div>
          </div>
          <div className="profile-row">
            <div className="label">Address:</div>
            <div className="value">
              {user.address ? user.address : <span className="no-data">There is no data</span>}
            </div>
          </div>
          <div className="profile-row">
            <div className="label">Phone:</div>
            <div className="value">
              {user.phone ? (
                user.phone.toString()
              ) : (
                <span className="no-data">There is no data</span>
              )}
            </div>
          </div>
        </div>

        <hr className="divider" />
        <Button variant="contained" onClick={openChangePassword} className="change-password-btn">
          Change Password
        </Button>
      </div>
      <ChangePassword isOpen={isChangePasswordOpen} onClose={closeChangePassword} />
      <VerificationModal isOpen={isVerificationOpen} onClose={closeVerification} />
    </div>
  )
}
