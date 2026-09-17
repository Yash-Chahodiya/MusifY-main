import React, { useState } from 'react';
import type { Song } from '../types';

interface PlayerBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PlayerBar: React.FC<PlayerBarProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
}) => {
  const [showVideo, setShowVideo] = useState(false);

  if (!currentSong) return null;

  return (
    <>
      {/* Floating Video Drawer if user wants to watch */}
      {showVideo && currentSong.youtubeId && (
        <div
          style={{
            position: 'fixed',
            bottom: '86px',
            right: '24px',
            width: '320px',
            height: '180px',
            background: '#000',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
            zIndex: 300,
            border: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              zIndex: 10,
              background: 'rgba(0,0,0,0.6)',
              borderRadius: '50%',
              padding: '2px 8px',
              cursor: 'pointer',
              color: '#fff',
              fontSize: '12px',
            }}
            onClick={() => setShowVideo(false)}
          >
            ✕
          </div>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`}
            title={currentSong.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 'none' }}
          />
        </div>
      )}

      {/* Hidden audio iframe for background playing if video drawer is closed */}
      {!showVideo && currentSong.youtubeId && isPlaying && (
        <iframe
          style={{ position: 'fixed', bottom: '-999px', left: '-999px', opacity: 0, pointerEvents: 'none' }}
          width="200"
          height="112"
          src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1&enablejsapi=1`}
          title="Audio Player"
          allow="autoplay"
        />
      )}

      <footer className="player-bar">
        <div className="player-left">
          {currentSong.thumbnailUrl ? (
            <img
              src={currentSong.thumbnailUrl}
              alt={currentSong.title}
              className="player-thumb"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div
              className="player-thumb"
              style={currentSong.gradient ? { background: currentSong.gradient } : undefined}
            >
              {currentSong.icon || '🎵'}
            </div>
          )}
          <div className="player-details">
            <div className="player-title" title={currentSong.title}>
              {currentSong.title.length > 28
                ? `${currentSong.title.slice(0, 28)}...`
                : currentSong.title}
            </div>
            <div className="player-artist">{currentSong.artist}</div>
          </div>
        </div>

        <div className="player-center">
          <div className="player-controls">
            <button className="ctrl-btn" title="Previous" onClick={onPrev}>
              ⏮
            </button>
            <button
              className="ctrl-play"
              title={isPlaying ? 'Pause' : 'Play'}
              onClick={onTogglePlay}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className="ctrl-btn" title="Next" onClick={onNext}>
              ⏭
            </button>
          </div>
          <div className="player-progress-container">
            <span className="time-text">{isPlaying ? 'Playing' : 'Ready'}</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: isPlaying ? '65%' : '0%' }}
              ></div>
            </div>
            <span className="time-text">{currentSong.duration || 'Stream'}</span>
          </div>
        </div>

        <div className="player-right">
          {currentSong.youtubeId && (
            <button
              className="tag"
              style={{
                fontSize: '0.8rem',
                padding: '4px 10px',
                background: showVideo ? 'var(--accent)' : 'var(--bg-hover)',
                color: '#fff',
              }}
              onClick={() => setShowVideo(!showVideo)}
              title="Toggle Video Player"
            >
              {showVideo ? '📺 Hide Video' : '📺 View Video'}
            </button>
          )}
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>🔊</span>
          <div className="volume-bar">
            <div className="volume-fill"></div>
          </div>
        </div>
      </footer>
    </>
  );
};
