import { ActiveGamesList } from "@/components/ui/active-games"
import { useCreateGame, useActiveGamesList } from "@/features/games"
import { CreateGame } from "@/types/game"

export function Home() {
  const gamesData = useActiveGamesList()
  const createGame = useCreateGame()

  const createMockProduct: CreateGame = {
    name: "Trolls",
    thumbnail: "https://example.com/galactic-conquest-thumbnail.jpg",
    images: [
      "https://example.com/galactic-conquest-image1.jpg",
      "https://example.com/galactic-conquest-image2.jpg"
    ],
    developer: "Cool Developers",
    releaseDate: new Date("2024-08-25T12:00:00Z"),
    systemRequirements: "OS: Windows 11, CPU: Intel i7, RAM: 16GB, GPU: NVIDIA RTX 3080",
    price: 69.99,
    description: "Epic space strategy game with in-depth tactical gameplay and exploration.",
    genreList: ["STRATEGY", "SIMULATION", "ADVENTURE"],
    playerSupport: ["ONLINE_COMPETITIVE", "MMO"]
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
      <button className="color=black" onClick={() => createGame.mutate(createMockProduct)}>
        Add game
      </button>
      {gamesData.isLoading && <p className="text-lg text-blue-600">Loading...</p>}
      {gamesData.isError && <p className="text-lg text-red-600">Error fetching active games</p>}
      {gamesData.data && <ActiveGamesList gamesData={gamesData.data} />}
    </div>
  )
}
