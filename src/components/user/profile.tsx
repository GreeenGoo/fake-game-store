import { ChangePassword } from "@/pages/authentication/change-password"
import { VerificationModal } from "@/pages/authentication/verification"
import { Button } from "@mui/material"

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
    <div className="p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="font-medium text-gray-700">Name:</div>
            <div className="text-gray-600">{user.name}</div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-gray-700">Email:</div>
            <div className="text-gray-600">{user.email}</div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-gray-700">Role:</div>
            <div className="text-gray-600">{user.role}</div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-gray-700">Date of Birth:</div>
            <div className="text-gray-600">
              {user.birthDate ? (
                user.birthDate.toString()
              ) : (
                <span className="italic text-gray-500">There is no data</span>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-gray-700">Status:</div>
            <div
              className={`flex flex-row justify-center items-center gap-4 text-gray-600 ${
                user.activeStatus === "ACTIVE"
                  ? "text-green-600"
                  : user.activeStatus === "UNVERIFIED"
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              <p>{user.activeStatus}</p>
              {user.activeStatus === "UNVERIFIED" && (
                <Button variant="contained" onClick={openVerification} color="warning">
                  Verify
                </Button>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-gray-700">Address:</div>
            <div className="text-gray-600">
              {user.address ? (
                user.address
              ) : (
                <span className="italic text-gray-500">There is no data</span>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-gray-700">Phone:</div>
            <div className="text-gray-600">
              {user.phone ? (
                user.phone.toString()
              ) : (
                <span className="italic text-gray-500">There is no data</span>
              )}
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />
        <Button variant="contained" onClick={openChangePassword} className="w-full">
          Change Password
        </Button>
      </div>
      <ChangePassword isOpen={isChangePasswordOpen} onClose={closeChangePassword} />
      <VerificationModal isOpen={isVerificationOpen} onClose={closeVerification} />{" "}
    </div>
  )
}
