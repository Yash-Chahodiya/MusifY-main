import React from 'react';
import type { Song } from '../types';

interface SongItemProps {
  song: Song;
  index: number;
  isPlaying: boolean;
  isCurrent: boolean;
  onPlay: (song: Song) => void;
  onToggleLike: (songId: string) => void;
  onDelete?: (songId: string) => void;
}

export const SongItem: React.FC<SongItemProps> = ({
  song,
  index,
  isPlaying,
  isCurrent,
  onPlay,
  onToggleLike,
  onDelete,
}) => {
  return (
    <div 
      className={`song-item ${isCurrent ? 'playing' : ''}`}
      onClick={() => onPlay(song)}
    >
      <div className="song-left">
        <span className="song-index">{index + 1}</span>
        
        {song.thumbnailUrl ? (
          <img 
            src={song.thumbnailUrl} 
            alt={song.title} 
            className="song-thumb"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div 
            className="song-thumb"
            style={song.gradient ? { background: song.gradient } : undefined}
          >
            {song.icon || '🎵'}
          </div>
        )}

        <div className="song-info">
          <h3 style={isCurrent ? { color: 'var(--accent-light)' } : undefined}>
            {song.title}
          </h3>
          <p>{song.artist}</p>
        </div>
      </div>

      <div className="song-album">
        {song.album || 'YouTube'}
      </div>

      <div className="song-right">
        <span className="song-duration">{song.duration || 'Stream'}</span>
        
        <button
          className={`btn-icon btn-like ${song.isLiked ? 'liked' : ''}`}
          title={song.isLiked ? 'Unlike' : 'Like'}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(song.id);
          }}
        >
          {song.isLiked ? '❤️' : '🤍'}
        </button>

        <button
          className="btn-play"
          title={isCurrent && isPlaying ? 'Pause' : 'Play'}
          onClick={(e) => {
            e.stopPropagation();
            onPlay(song);
          }}
        >
          {isCurrent && isPlaying ? '⏸' : '▶'}
        </button>

        {onDelete && (
          <button
            className="btn-icon"
            title="Remove Song"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(song.id);
            }}
            style={{ fontSize: '0.9rem', opacity: 0.7 }}
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
};
