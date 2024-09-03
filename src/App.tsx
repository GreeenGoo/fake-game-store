import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/game/active-games"
import { Game } from "./pages/game/single-game"
import NavBar from "./components/ui/NavBar"
import { AllGames } from "./pages/game/all-games"
import CreateUpdateGame from "./pages/game/create-update-game"
import { UserProfilePage } from "./pages/profile"
import { Card } from "./pages/card"
import MyOrders from "./pages/orders/my-orders"
import AllOrders from "./pages/orders/all-orders"
import { UserProvider } from "../src/context/UserContext"
import ProtectedRoute from "./ProtectedRoute"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/games/active" element={<Home />} />
            <Route path="/games/:id" element={<Game />} />
            <Route path="/not-authorized" element={<p>Not Authorized</p>} />
            <Route
              path="/games/all"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AllGames />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/add"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <CreateUpdateGame />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/me"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/me/orders/current"
              element={
                <ProtectedRoute allowedRoles={["USER"]}>
                  <Card />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/me/orders"
              element={
                <ProtectedRoute allowedRoles={["USER"]}>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AllOrders />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
