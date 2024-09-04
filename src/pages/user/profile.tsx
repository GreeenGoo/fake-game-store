import { useState } from "react"
import { useGetCurrentUser } from "@/features/user"
import ProfilePage from "@/components/user/profile"
import LoadingSpinner from "@/components/loading-spinner"

export function UserProfilePage() {
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false)
  const [isVerificationOpen, setVerificationOpen] = useState(false)

  const openChangePassword = () => setChangePasswordOpen(true)
  const closeChangePassword = () => setChangePasswordOpen(false)

  const openVerification = () => setVerificationOpen(true)
  const closeVerification = () => setVerificationOpen(false)

  const { data, isLoading, isError } = useGetCurrentUser()

  if (!data) {
    throw new Error("Something went wrong displaying user info.")
  }

  const user = data.data

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <ProfilePage
      user={user}
      openChangePassword={openChangePassword}
      closeChangePassword={closeChangePassword}
      isChangePasswordOpen={isChangePasswordOpen}
      openVerification={openVerification}
      closeVerification={closeVerification}
      isVerificationOpen={isVerificationOpen}
    />
  )
}
