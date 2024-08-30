import { useState } from "react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet"
import { ActiveGamesList } from "@/components/ui/active-games"
import { useActiveGamesList } from "@/features/games"
import { CreditCard } from "lucide-react"
import { Card } from "./card"

export function Home() {
  const gamesData = useActiveGamesList()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen p-4 bg-gray-100 relative">
      {gamesData.isLoading && <p className="text-lg text-blue-600">Loading...</p>}
      {gamesData.isError && <p className="text-lg text-red-600">Error fetching active games</p>}
      {gamesData.data && <ActiveGamesList gamesData={gamesData.data} />}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <button
            onClick={() => setIsSheetOpen(true)}
            className="fixed bottom-5 right-5 w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none"
          >
            <CreditCard className="h-8 w-8" />
          </button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
          <h2 className="text-xl font-bold mb-4">Card</h2>
          <Card />
        </SheetContent>
      </Sheet>
    </div>
  )
}
