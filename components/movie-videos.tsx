import type { Video } from "@/lib/tmdb"
import { HeroVideoDialog } from "./magicui/hero-video-dialog"

interface MovieVideosProps {
  videos: Video[]
}

export function MovieVideos({ videos }: MovieVideosProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Trailers & Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <HeroVideoDialog
            key={video.id}
            animationStyle="from-center"
            videoSrc={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
            thumbnailSrc={`https://i.ytimg.com/vi/${video.key}/maxresdefault.jpg`}
            thumbnailAlt={video.name}
          />
        ))}
      </div>
    </section>
  )
}
