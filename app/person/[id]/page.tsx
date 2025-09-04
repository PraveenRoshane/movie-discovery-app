import { tmdbApi } from "@/lib/tmdb"
import { notFound } from "next/navigation"
import { PersonHero } from "@/components/person-hero"
import { PersonFilmography } from "@/components/person-filmography"

interface PersonPageProps {
    params: { id: string }
}

export default async function PersonPage({ params }: PersonPageProps) {
    const { id } = await params;
    const personId = Number.parseInt(id)

    if (isNaN(personId)) {
        notFound()
    }

    try {
        const [person, movieCredits, tvCredits] = await Promise.all([
            tmdbApi.getPersonDetails(personId),
            tmdbApi.getPersonMovieCredits(personId),
            tmdbApi.getPersonTVCredits(personId),
        ])

        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4">
                    <PersonHero person={person} />
                </div>
                <div className="container mx-auto px-4 py-8">
                    <PersonFilmography movieCredits={movieCredits} tvCredits={tvCredits} />
                </div>
            </div>
        )
    } catch (error) {
        console.error("Error fetching person details:", error)
        notFound()
    }
}