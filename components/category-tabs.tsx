"use client"

import { useRouter } from "next/navigation"
import { TrendingUp, Star, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  {
    id: "trending",
    label: "Trending",
    description: "Popular this week",
    icon: TrendingUp,
  },
  {
    id: "popular",
    label: "Popular",
    description: "Most popular movies",
    icon: Star,
  },
  {
    id: "top-rated",
    label: "Top Rated",
    description: "Highest rated films",
    icon: Trophy,
  },
]

interface CategoryTabsProps {
  currentCategory: string
}

export function CategoryTabs({ currentCategory }: CategoryTabsProps) {
  const router = useRouter()

  const handleCategoryChange = (categoryId: string) => {
    router.push(`/?category=${categoryId}`)
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
            className={`flex items-center gap-2 h-auto p-4 transition-all duration-300 ${isActive
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
