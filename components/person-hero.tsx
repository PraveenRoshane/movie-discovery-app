import Image from "next/image"
import { Calendar, MapPin, User, Award, Star } from "lucide-react"
import { tmdbApi, type PersonDetails } from "@/lib/tmdb"

interface PersonHeroProps {
    person: PersonDetails
}

export function PersonHero({ person }: PersonHeroProps) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return null
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const calculateAge = (birthday: string | null, deathday: string | null) => {
        if (!birthday) return null
        const birth = new Date(birthday)
        const end = deathday ? new Date(deathday) : new Date()
        const age = end.getFullYear() - birth.getFullYear()
        const monthDiff = end.getMonth() - birth.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
            return age - 1
        }
        return age
    }

    const age = calculateAge(person.birthday, person.deathday)

    return (
        <div className="relative overflow-hidden">
            <div className="relative py-16 lg:py-24">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    <div className="flex-shrink-0">
                        <div className="relative">
                            <div className="w-80 h-96 lg:w-96 lg:h-[480px] relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border/20">
                                <Image
                                    src={tmdbApi.getProfileUrl(person.profile_path, "h632") || "/placeholder.svg"}
                                    alt={person.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="font-semibold">{person.popularity.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">{person.name}</h1>
                            <div className="flex items-center gap-3">
                                <div className="px-4 py-2  rounded-full border border-primary/20">
                                    <span className="font-semibold">{person.known_for_department}</span>
                                </div>
                                {person.gender && (
                                    <div className="px-4 py-2 rounded-full border border-secondary/20">
                                        <span className="font-medium">
                                            {person.gender === 1 ? "Female" : person.gender === 2 ? "Male" : "Non-binary"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {person.birthday && (
                                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 space-y-3">
                                    <div className="flex items-center gap-3 text-primary">
                                        <Calendar className="h-5 w-5" />
                                        <span className="font-semibold">Born</span>
                                    </div>
                                    <div className="text-foreground">
                                        <p className="font-medium">{formatDate(person.birthday)}</p>
                                        {age && <p className="text-muted-foreground">{age} years old</p>}
                                    </div>
                                </div>
                            )}

                            {person.place_of_birth && (
                                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 space-y-3">
                                    <div className="flex items-center gap-3 text-primary">
                                        <MapPin className="h-5 w-5" />
                                        <span className="font-semibold">Birthplace</span>
                                    </div>
                                    <p className="text-foreground font-medium">{person.place_of_birth}</p>
                                </div>
                            )}
                        </div>

                        {person.biography && (
                            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-8 space-y-4">
                                <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                    <User className="h-6 w-6 text-primary" />
                                    Biography
                                </h2>
                                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                                    {person.biography
                                        .split("\n")
                                        .slice(0, 3)
                                        .map((paragraph, index) => (
                                            <p key={index} className="mb-4 last:mb-0">
                                                {paragraph}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        )}

                        {person.also_known_as.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                                    <Award className="h-5 w-5 text-primary" />
                                    Also Known As
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {person.also_known_as.slice(0, 6).map((name, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-muted/50 text-muted-foreground rounded-lg border border-border/50 font-medium hover:bg-muted/70 transition-colors"
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}