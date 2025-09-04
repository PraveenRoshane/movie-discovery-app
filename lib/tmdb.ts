const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_title: string
  popularity: number
  video: boolean
}

export interface TVSeries {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_name: string
  popularity: number
  origin_country: string[]
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[]
  runtime: number
  budget: number
  revenue: number
  status: string
  tagline: string
  homepage: string
  production_companies: { id: number; name: string; logo_path: string | null }[]
  production_countries: { iso_3166_1: string; name: string }[]
  spoken_languages: { iso_639_1: string; name: string }[]
}

export interface TVSeriesDetails extends TVSeries {
  genres: { id: number; name: string }[]
  episode_run_time: number[]
  number_of_episodes: number
  number_of_seasons: number
  status: string
  tagline: string
  homepage: string
  production_companies: { id: number; name: string; logo_path: string | null }[]
  production_countries: { iso_3166_1: string; name: string }[]
  spoken_languages: { iso_639_1: string; name: string }[]
  seasons: {
    id: number
    name: string
    overview: string
    poster_path: string | null
    season_number: number
    episode_count: number
    air_date: string
  }[]
  created_by: {
    id: number
    name: string
    profile_path: string | null
  }[]
  networks: {
    id: number
    name: string
    logo_path: string | null
    origin_country: string
  }[]
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

export interface Review {
  id: string
  author: string
  content: string
  created_at: string
  rating: number | null
}

export interface Genre {
  id: number
  name: string
}

export interface Person {
  id: number
  name: string
  profile_path: string | null
  known_for_department: string
  popularity: number
  adult: boolean
  gender: number
  known_for: (Movie | TVSeries)[]
}

export interface PersonDetails extends Omit<Person, "known_for"> {
  biography: string
  birthday: string | null
  deathday: string | null
  place_of_birth: string | null
  homepage: string | null
  imdb_id: string | null
  also_known_as: string[]
}

export interface PersonCredits {
  cast: (Movie & { character: string; credit_id: string; order: number })[]
  crew: (Movie & { job: string; department: string; credit_id: string })[]
}

export interface PersonTVCredits {
  cast: (TVSeries & { character: string; credit_id: string; episode_count: number })[]
  crew: (TVSeries & { job: string; department: string; credit_id: string; episode_count: number })[]
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type MediaItem = Movie | TVSeries

export interface FilterOptions {
  genres?: number[]
  year?: number
  rating?: number
  language?: string
  sortBy?:
  | "popularity.desc"
  | "popularity.asc"
  | "release_date.desc"
  | "release_date.asc"
  | "vote_average.desc"
  | "vote_average.asc"
}

export interface Season {
  id: number
  name: string
  overview: string
  poster_path: string | null
  season_number: number
  episode_count: number
  air_date: string
}

export interface Episode {
  id: number
  name: string
  overview: string
  still_path: string | null
  episode_number: number
  season_number: number
  air_date: string
  vote_average: number
  vote_count: number
  runtime: number | null
}

export interface SeasonDetails extends Season {
  episodes: Episode[]
}

class TMDBApi {
  private apiKey: string

  constructor() {
    if (!TMDB_API_KEY) {
      throw new Error("TMDB API key is required")
    }
    this.apiKey = TMDB_API_KEY
  }

  private async fetchFromTMDB<T>(endpoint: string): Promise<T> {
    const url = `${TMDB_BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${this.apiKey}`

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }

    return response.json()
  }

  // Movie endpoints
  async getTrending(timeWindow: "day" | "week" = "week"): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB(`/trending/movie/${timeWindow}`)
  }

  async getPopular(page = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB(`/movie/popular?page=${page}`)
  }

  async getTopRated(page = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB(`/movie/top_rated?page=${page}`)
  }

  async getNowPlaying(page = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB(`/movie/now_playing?page=${page}`)
  }

  async getUpcoming(page = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB(`/movie/upcoming?page=${page}`)
  }

  async searchMovies(query: string, page = 1): Promise<TMDBResponse<Movie>> {
    const encodedQuery = encodeURIComponent(query)
    return this.fetchFromTMDB(`/search/movie?query=${encodedQuery}&page=${page}`)
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.fetchFromTMDB(`/movie/${movieId}`)
  }

  async getMovieCredits(movieId: number): Promise<{ cast: Cast[] }> {
    return this.fetchFromTMDB(`/movie/${movieId}/credits`)
  }

  async getMovieVideos(movieId: number): Promise<{ results: Video[] }> {
    return this.fetchFromTMDB(`/movie/${movieId}/videos`)
  }

  async getMovieReviews(movieId: number, page = 1): Promise<TMDBResponse<Review>> {
    return this.fetchFromTMDB(`/movie/${movieId}/reviews?page=${page}`)
  }

  // TV endpoints
  async getTVTrending(timeWindow: "day" | "week" = "week"): Promise<TMDBResponse<TVSeries>> {
    return this.fetchFromTMDB(`/trending/tv/${timeWindow}`)
  }

  async getTVPopular(page = 1): Promise<TMDBResponse<TVSeries>> {
    return this.fetchFromTMDB(`/tv/popular?page=${page}`)
  }

  async getTVTopRated(page = 1): Promise<TMDBResponse<TVSeries>> {
    return this.fetchFromTMDB(`/tv/top_rated?page=${page}`)
  }

  async getTVOnTheAir(page = 1): Promise<TMDBResponse<TVSeries>> {
    return this.fetchFromTMDB(`/tv/on_the_air?page=${page}`)
  }

  async getTVAiringToday(page = 1): Promise<TMDBResponse<TVSeries>> {
    return this.fetchFromTMDB(`/tv/airing_today?page=${page}`)
  }

  async searchTV(query: string, page = 1): Promise<TMDBResponse<TVSeries>> {
    const encodedQuery = encodeURIComponent(query)
    return this.fetchFromTMDB(`/search/tv?query=${encodedQuery}&page=${page}`)
  }

  async getTVDetails(tvId: number): Promise<TVSeriesDetails> {
    return this.fetchFromTMDB(`/tv/${tvId}`)
  }

  async getTVCredits(tvId: number): Promise<{ cast: Cast[] }> {
    return this.fetchFromTMDB(`/tv/${tvId}/credits`)
  }

  async getTVVideos(tvId: number): Promise<{ results: Video[] }> {
    return this.fetchFromTMDB(`/tv/${tvId}/videos`)
  }

  async getTVReviews(tvId: number, page = 1): Promise<TMDBResponse<Review>> {
    return this.fetchFromTMDB(`/tv/${tvId}/reviews?page=${page}`)
  }

  // Season and Episode endpoints
  async getSeasonDetails(tvId: number, seasonNumber: number): Promise<SeasonDetails> {
    return this.fetchFromTMDB(`/tv/${tvId}/season/${seasonNumber}`)
  }

  async getEpisodeDetails(tvId: number, seasonNumber: number, episodeNumber: number): Promise<Episode> {
    return this.fetchFromTMDB(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`)
  }

  // Person endpoints
  async searchPeople(query: string, page = 1): Promise<TMDBResponse<Person>> {
    const encodedQuery = encodeURIComponent(query)
    return this.fetchFromTMDB(`/search/person?query=${encodedQuery}&page=${page}`)
  }

  async getPersonDetails(personId: number): Promise<PersonDetails> {
    return this.fetchFromTMDB(`/person/${personId}`)
  }

  async getPersonMovieCredits(personId: number): Promise<PersonCredits> {
    return this.fetchFromTMDB(`/person/${personId}/movie_credits`)
  }

  async getPersonTVCredits(personId: number): Promise<PersonTVCredits> {
    return this.fetchFromTMDB(`/person/${personId}/tv_credits`)
  }

  async getPersonImages(personId: number): Promise<{ profiles: { file_path: string }[] }> {
    return this.fetchFromTMDB(`/person/${personId}/images`)
  }

  // Multi search endpoint
  async searchMulti(
    query: string,
    page = 1,
  ): Promise<TMDBResponse<MediaItem & { media_type: "movie" | "tv" | "person" }>> {
    const encodedQuery = encodeURIComponent(query)
    return this.fetchFromTMDB(`/search/multi?query=${encodedQuery}&page=${page}`)
  }

  async getMovieGenres(): Promise<{ genres: Genre[] }> {
    return this.fetchFromTMDB("/genre/movie/list")
  }

  async getTVGenres(): Promise<{ genres: Genre[] }> {
    return this.fetchFromTMDB("/genre/tv/list")
  }

  async discoverMovies(page = 1, filters: FilterOptions = {}): Promise<TMDBResponse<Movie>> {
    const params = new URLSearchParams()
    params.set("page", page.toString())

    if (filters.genres?.length) {
      params.set("with_genres", filters.genres.join(","))
    }
    if (filters.year) {
      params.set("year", filters.year.toString())
    }
    if (filters.rating) {
      params.set("vote_average.gte", filters.rating.toString())
    }
    if (filters.language) {
      params.set("with_original_language", filters.language)
    }
    if (filters.sortBy) {
      params.set("sort_by", filters.sortBy)
    }

    return this.fetchFromTMDB(`/discover/movie?${params.toString()}`)
  }

  async discoverTV(page = 1, filters: FilterOptions = {}): Promise<TMDBResponse<TVSeries>> {
    const params = new URLSearchParams()
    params.set("page", page.toString())

    if (filters.genres?.length) {
      params.set("with_genres", filters.genres.join(","))
    }
    if (filters.year) {
      params.set("first_air_date_year", filters.year.toString())
    }
    if (filters.rating) {
      params.set("vote_average.gte", filters.rating.toString())
    }
    if (filters.language) {
      params.set("with_original_language", filters.language)
    }
    if (filters.sortBy) {
      params.set("sort_by", filters.sortBy)
    }

    return this.fetchFromTMDB(`/discover/tv?${params.toString()}`)
  }

  // Helper function to get full image URL
  getImageUrl(path: string | null, size: "w200" | "w300" | "w400" | "w500" | "w780" | "original" = "w500"): string {
    if (!path) return "/abstract-movie-poster.png"
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
  }

  // Helper function to get backdrop URL
  getBackdropUrl(path: string | null, size: "w300" | "w780" | "w1280" | "original" = "w1280"): string {
    if (!path) return "/movie-backdrop.png"
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
  }

  // Helper function to get profile image URL
  getProfileUrl(path: string | null, size: "w45" | "w185" | "h632" | "original" = "w185"): string {
    if (!path) return "/person-placeholder.png"
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
  }

  isMovie(item: MediaItem): item is Movie {
    return "title" in item
  }

  isTVSeries(item: MediaItem): item is TVSeries {
    return "name" in item
  }
}

export const tmdbApi = new TMDBApi()