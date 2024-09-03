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

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/games/all" element={<AllGames />} />
            <Route path="/games/active" element={<Home />} />
            <Route path="/games/:id" element={<Game />} />
            <Route path="/games/add" element={<CreateUpdateGame />} />
            <Route path="/users/me" element={<UserProfilePage />} />
            <Route path="/users/me/orders/current" element={<Card />} />
            <Route path="/users/me/orders" element={<MyOrders />} />
            <Route path="/orders" element={<AllOrders />} />
            <Route path="/login" element={<p>Please login</p>} />
          </Routes>
        </Router>
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
