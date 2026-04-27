interface YouTubeEmbedProps {
  url: string;
  caption?: string;
}

function extractVideoId(url: string): string | null {
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function YouTubeEmbed({ url, caption }: YouTubeEmbedProps) {
  const videoId = extractVideoId(url);

  if (!videoId) {
    return (
      <div className="my-8 p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm not-prose">
        ⚠️ Invalid YouTube URL: {url}
      </div>
    );
  }

  return (
    <div className="my-8 not-prose">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-neutral-800 bg-neutral-900">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={caption || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
      {caption && (
        <p className="text-center text-sm text-neutral-500 mt-3 italic">
          {caption}
        </p>
      )}
    </div>
  );
}
