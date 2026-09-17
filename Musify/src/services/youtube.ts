import type { Song } from '../types';

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const cleanUrl = url.trim();
  
  // Handles:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  // - https://www.youtube.com/shorts/VIDEO_ID
  const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|shorts\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = cleanUrl.match(regExp);
  if (match && match[1]) {
    return match[1];
  }

  // Direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return cleanUrl;
  }

  return null;
}

export async function fetchYouTubeSongInfo(url: string): Promise<Song> {
  const videoId = extractYouTubeId(url);
  if (!videoId) {
    throw new Error('Invalid YouTube URL or Video ID. Please enter a valid YouTube link.');
  }

  const defaultThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const canonicalUrl = `https://www.youtube.com/watch?v=${videoId}`;

  try {
    // Attempt to fetch from Noembed (supports CORS for YouTube)
    const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(canonicalUrl)}`);
    if (response.ok) {
      const data = await response.json();
      if (data && data.title) {
        return {
          id: `yt-${videoId}-${Date.now()}`,
          title: data.title || 'YouTube Track',
          artist: data.author_name || 'YouTube Music',
          album: 'YouTube Stream',
          duration: 'Stream',
          icon: '▶',
          thumbnailUrl: data.thumbnail_url || defaultThumbnail,
          youtubeId: videoId,
          youtubeUrl: canonicalUrl,
          isLiked: false,
          addedAt: Date.now(),
        };
      }
    }
  } catch (err) {
    console.warn('oEmbed fetch error, falling back to basic metadata:', err);
  }

  // Fallback if oEmbed is unreachable
  return {
    id: `yt-${videoId}-${Date.now()}`,
    title: `YouTube Video (${videoId})`,
    artist: 'YouTube Music',
    album: 'YouTube Stream',
    duration: 'Stream',
    icon: '▶',
    thumbnailUrl: defaultThumbnail,
    youtubeId: videoId,
    youtubeUrl: canonicalUrl,
    isLiked: false,
    addedAt: Date.now(),
  };
}
