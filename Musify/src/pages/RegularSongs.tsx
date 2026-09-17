import React, { useState } from 'react';
import type { Song } from '../types';
import { SongItem } from '../components/SongItem';

interface RegularSongsProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onToggleLike: (songId: string) => void;
}

export const RegularSongs: React.FC<RegularSongsProps> = ({
  songs,
  currentSong,
  isPlaying,
  onPlaySong,
  onToggleLike,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const genres = [
    { id: 'all', label: 'All Genres' },
    { id: 'pop', label: 'Pop' },
    { id: 'hiphop', label: 'Hip-Hop / Rap' },
    { id: 'rock', label: 'Rock & Indie' },
    { id: 'electronic', label: 'Electronic / Dance' },
    { id: 'acoustic', label: 'Acoustic & Chill' },
  ];

  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <main className="container">
      {/* Page Header */}
      <header className="page-header">
        <h1>Regular Songs</h1>
        <p>Explore today's most popular hits, global chart toppers, and trending tracks.</p>

        {/* Search Input */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by song name, artist, or album..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Genre Filter Badges */}
        <div className="filter-tags">
          {genres.map((g) => (
            <button
              key={g.id}
              className={`tag ${selectedGenre === g.id ? 'active' : ''}`}
              onClick={() => setSelectedGenre(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </header>

      {/* Song List */}
      <section className="song-list">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
            <SongItem
              key={song.id}
              song={song}
              index={index}
              isPlaying={isPlaying}
              isCurrent={currentSong?.id === song.id}
              onPlay={onPlaySong}
              onToggleLike={onToggleLike}
            />
          ))
        ) : (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>
            No songs found matching your search.
          </p>
        )}
      </section>
    </main>
  );
};
