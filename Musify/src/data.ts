import type { Song, Playlist } from './types';

// All dummy songs removed - library starts clean for user's YouTube tracks!
export const initialMySongs: Song[] = [];

export const initialRegularSongs: Song[] = [];

export const samplePlaylists: Playlist[] = [
  {
    id: 'pl-1',
    title: 'Chill Lo-Fi & Study',
    description: 'Relaxing music and focus tracks fetched from YouTube.',
    icon: '☕',
    gradientClass: 'grad-1',
    songIds: [],
  },
  {
    id: 'pl-2',
    title: 'Workout & Energy',
    description: 'High tempo beats and motivation.',
    icon: '🔥',
    gradientClass: 'grad-4',
    songIds: [],
  },
  {
    id: 'pl-3',
    title: 'Top Hits & Favorites',
    description: 'Your top saved songs.',
    icon: '🌟',
    gradientClass: 'grad-2',
    songIds: [],
  },
  {
    id: 'pl-4',
    title: 'Late Night Drive',
    description: 'Moody synthwave and late night vibes.',
    icon: '🌃',
    gradientClass: 'grad-5',
    songIds: [],
  },
];
