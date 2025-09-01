"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import type { Video } from "@/lib/tmdb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface MovieVideosProps {
  videos: Video[]
}

export function MovieVideos({ videos }: MovieVideosProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  if (videos.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Trailers & Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-0 -my-6">
              <div
                className="aspect-video relative bg-muted flex items-center justify-center group"
                onClick={() => setSelectedVideo(video)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-120 brightness-90 group-hover:brightness-120"
                  style={{ backgroundImage: `url(https://i.ytimg.com/vi/${video.key}/maxresdefault.jpg)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                <Button
                  size="lg"
                  className="relative z-10 rounded-full w-16 h-16 group-hover:scale-110 transition-transform"
                >
                  <Play className="h-6 w-6 ml-1" />
                </Button>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold text-sm line-clamp-2">{video.name}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl w-full p-1">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>{selectedVideo?.name}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            {selectedVideo && (
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`}
                title={selectedVideo.name}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
