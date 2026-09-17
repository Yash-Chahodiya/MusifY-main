export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: string;
  icon?: string;
  gradient?: string;
  isLiked?: boolean;
  youtubeId?: string;
  youtubeUrl?: string;
  thumbnailUrl?: string;
  addedAt?: number;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradientClass: string;
  songIds: string[];
}

export type PageTab = 'my-songs' | 'regular-songs' | 'playlists';
