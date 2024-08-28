import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/home"
import { Game } from "./pages/game"
import NavBar from "./components/ui/NavBar"
import { AllGames } from "./pages/all-games"
import CreateUpdateGame from "./pages/create-update-game"

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/games/all" element={<AllGames />} />
        <Route path="/games/active" element={<Home />} />
        <Route path="/games/:id" element={<Game />} />
        <Route path="/games/add" element={<CreateUpdateGame />} />
      </Routes>
    </Router>
  )
}

export default App
