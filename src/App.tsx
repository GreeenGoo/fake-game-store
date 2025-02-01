import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SnackbarProvider } from "notistack"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { ActiveGames } from "./pages/game/ActiveGames"
import { SingleGame } from "./pages/game/SingleGame"
import { AllGames } from "./pages/game/AllGames"
import CreateUpdateGame from "./pages/game/CreateUpdateGame"
import { UserProfilePage } from "./pages/user/profile"
import { Card } from "./pages/orders/cart"
import MyOrders from "./pages/orders/my-orders"
import AllOrders from "./pages/orders/all-orders"
import { UserProvider } from "../src/context/UserContext"
import ProtectedRoute from "./ProtectedRoute"
import AppBar from "./components/AppBar"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
        <UserProvider>
          <Router>
            <AppBar />
            <Routes>
              <Route path="/" element={<Navigate to="/games/active" replace />} />
              <Route path="/games/active" element={<ActiveGames />} />
              <Route path="/games/:id" element={<SingleGame />} />
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
      </SnackbarProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default App
