import React, { useState } from 'react';
import type { Playlist, Song } from '../types';
import { SongItem } from '../components/SongItem';

interface PlaylistsProps {
  playlists: Playlist[];
  playlistTracks: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onToggleLike: (songId: string) => void;
}

export const Playlists: React.FC<PlaylistsProps> = ({
  playlists,
  playlistTracks,
  currentSong,
  isPlaying,
  onPlaySong,
  onToggleLike,
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>(playlists[0]);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Playlists' },
    { id: 'custom', label: 'Created by You' },
    { id: 'study', label: 'Study & Focus' },
    { id: 'workout', label: 'Workout 🏃' },
    { id: 'relax', label: 'Relax & Chill' },
  ];

  const handleCreatePlaylist = () => {
    const name = window.prompt('Enter new playlist name:');
    if (name) {
      alert(`Playlist "${name}" created successfully!`);
    }
  };

  return (
    <main className="container">
      {/* Page Header */}
      <header
        className="page-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h1>Playlists</h1>
          <p>Your curated mixes, mood collections, and community favorites.</p>
        </div>
        <button
          className="tag active"
          style={{ padding: '10px 20px', fontSize: '0.95rem', borderRadius: '20px' }}
          onClick={handleCreatePlaylist}
        >
          + Create Playlist
        </button>
      </header>

      {/* Filter Categories */}
      <div className="filter-tags">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`tag ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Playlist Grid */}
      <section className="playlist-grid">
        {playlists.map((playlist) => {
          const isSelected = selectedPlaylist.id === playlist.id;
          return (
            <div
              key={playlist.id}
              className="playlist-card"
              style={isSelected ? { borderColor: 'var(--accent-light)' } : undefined}
              onClick={() => setSelectedPlaylist(playlist)}
            >
              <div className={`playlist-cover ${playlist.gradientClass}`}>
                {playlist.icon}
              </div>
              <h3>{playlist.title}</h3>
              <p>{playlist.description}</p>
              <div className="playlist-meta">{playlist.meta}</div>
            </div>
          );
        })}
      </section>

      {/* Featured / Selected Playlist Songs */}
      <section style={{ marginTop: '44px' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '14px' }}>
          Tracks in "{selectedPlaylist.title}"
        </h2>
        <div className="song-list">
          {playlistTracks.map((song, index) => (
            <SongItem
              key={song.id}
              song={song}
              index={index}
              isPlaying={isPlaying}
              isCurrent={currentSong?.id === song.id}
              onPlay={onPlaySong}
              onToggleLike={onToggleLike}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
