import React, { useState } from 'react';
import type { Song, PageTab } from '../types';
import { SongItem } from '../components/SongItem';

interface MySongsProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onToggleLike: (songId: string) => void;
  onNavigate: (tab: PageTab) => void;
}

export const MySongs: React.FC<MySongsProps> = ({
  songs,
  currentSong,
  isPlaying,
  onPlaySong,
  onToggleLike,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'favorites') return song.isLiked;
    return true;
  });

  return (
    <main className="container">
      {/* Welcome Banner */}
      <div className="banner">
        <div className="banner-content">
          <h2>Your Personal Collection 🎧</h2>
          <p>Access your favorite tracks, custom uploads, and recently played songs.</p>
        </div>
        <button 
          className="banner-btn"
          onClick={() => onNavigate('regular-songs')}
        >
          Explore Regular Songs
        </button>
      </div>

      {/* Page Header */}
      <header className="page-header">
        <h1>My Songs</h1>
        <p>{filteredSongs.length} songs saved in your library</p>

        {/* Search Bar */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search in your saved songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Badges */}
        <div className="filter-tags">
          <button
            className={`tag ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Songs
          </button>
          <button
            className={`tag ${activeFilter === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveFilter('favorites')}
          >
            Favorites ❤️
          </button>
          <button
            className={`tag ${activeFilter === 'downloaded' ? 'active' : ''}`}
            onClick={() => setActiveFilter('downloaded')}
          >
            Downloaded 📥
          </button>
          <button
            className={`tag ${activeFilter === 'recent' ? 'active' : ''}`}
            onClick={() => setActiveFilter('recent')}
          >
            Recently Played 🕒
          </button>
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
