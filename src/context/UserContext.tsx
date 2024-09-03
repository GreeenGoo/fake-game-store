import { createContext, useContext, useState, useEffect } from "react"
import { User } from "@/types/user"

export type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext({} as UserContextType)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

const useUser = () => useContext(UserContext)

export default useUser
