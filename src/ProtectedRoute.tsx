import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import useUser from "./context/UserContext"
import { Role } from "./types/user"

type ProtectedRouteProps = {
  children: ReactNode
  allowedRoles: Role[]
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user } = useUser()

  if (!user || !allowedRoles.includes(user?.role)) {
    return <Navigate to="/not-authorized" />
  }

  return <>{children}</>
}

export default ProtectedRoute