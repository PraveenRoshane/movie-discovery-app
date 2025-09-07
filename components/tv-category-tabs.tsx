"use client"

import { useRouter } from "next/navigation"
import { TrendingUp, Star, Trophy, Tv, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  {
    id: "trending",
    label: "Trending",
    description: "Popular this week",
    icon: TrendingUp,
  },
  {
    id: "on-the-air",
    label: "On The Air",
    description: "Currently airing",
    icon: Tv,
  },
  {
    id: "popular",
    label: "Popular",
    description: "Most popular shows",
    icon: Star,
  },
  {
    id: "top-rated",
    label: "Top Rated",
    description: "Highest rated series",
    icon: Trophy,
  },
  {
    id: "airing-today",
    label: "Airing Today",
    description: "New episodes today",
    icon: Calendar,
  },
]

interface TVCategoryTabsProps {
  currentCategory: string
}

export function TVCategoryTabs({ currentCategory }: TVCategoryTabsProps) {
  const router = useRouter()

  const handleCategoryChange = (categoryId: string) => {
    router.push(`/tv?category=${categoryId}`)
  }

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const Icon = category.icon
        const isActive = currentCategory === category.id

        return (
          <Button
            key={category.id}
            variant={isActive ? "default" : "outline"}
            onClick={() => handleCategoryChange(category.id)}
            className={`flex items-center gap-2 h-auto p-4 transition-all duration-300 cursor-pointer ${
              isActive
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "hover:bg-accent/50 hover:border-primary/50"
            }`}
          >
            <Icon className="h-4 w-4" />
            <div className="flex flex-col items-start">
              <span className="font-medium">{category.label}</span>
              <span className="text-xs opacity-80">{category.description}</span>
            </div>
          </Button>
        )
      })}
    </div>
  )
}
