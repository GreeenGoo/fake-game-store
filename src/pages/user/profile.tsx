import { useState } from "react"
import { useGetCurrentUser } from "@/features/User"
import ProfilePage from "@/components/user/Profile"
import LoadingSpinner from "@/components/LoadingSpinner"
// import { useSendVerificationCode } from "@/features/authentication"

export function UserProfilePage() {
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false)
  const [isVerificationOpen, setVerificationOpen] = useState(false)
  // const sendVerificationCode = useSendVerificationCode()
  const { data, isLoading } = useGetCurrentUser()

  const openChangePassword = () => setChangePasswordOpen(true)
  const closeChangePassword = () => setChangePasswordOpen(false)

  const openVerification = () => {
    // sendVerificationCode.mutate()
    setVerificationOpen(true)
  }
  const closeVerification = () => setVerificationOpen(false)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!data) {
    return null
  }

  const user = data.data

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
