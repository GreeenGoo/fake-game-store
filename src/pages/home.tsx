import { ActiveGamesList } from "@/components/ui/active-games"
import { useActiveGamesList } from "@/features/games"

export function Home() {
  const gamesData = useActiveGamesList()

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen p-4 bg-gray-100">
      {gamesData.isLoading && <p className="text-lg text-blue-600">Loading...</p>}
      {gamesData.isError && <p className="text-lg text-red-600">Error fetching active games</p>}
      {gamesData.data && <ActiveGamesList gamesData={gamesData.data} />}
    </div>
  )
}
