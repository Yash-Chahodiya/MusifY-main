import React, { useState } from 'react';
import { fetchYouTubeSongInfo } from '../services/youtube';
import type { Song } from '../types';

interface AddSongBarProps {
  onSongAdded: (song: Song) => void;
  defaultDestinationName?: string;
}

export const AddSongBar: React.FC<AddSongBarProps> = ({
  onSongAdded,
  defaultDestinationName = 'your list',
}) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const song = await fetchYouTubeSongInfo(url.trim());
      onSongAdded(song);
      setUrl('');
      setSuccessMsg(`Added "${song.title.slice(0, 35)}..." to ${defaultDestinationName}!`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Failed to fetch YouTube song.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-song-container" style={{ margin: '20px 0' }}>
      <form 
        onSubmit={handleAdd}
        style={{
          display: 'flex',
          gap: '10px',
          background: 'var(--bg-card)',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>🔗</span>
        <input
          type="text"
          placeholder="Paste YouTube song link (e.g. https://www.youtube.com/watch?v=... or youtu.be/...)"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (errorMsg) setErrorMsg(null);
          }}
          disabled={isLoading}
          style={{
            flex: '1',
            minWidth: '240px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-main)',
            fontSize: '0.95rem',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          style={{
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            fontWeight: 600,
            cursor: isLoading || !url.trim() ? 'not-allowed' : 'pointer',
            opacity: isLoading || !url.trim() ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          {isLoading ? 'Fetching...' : '+ Add Song from YouTube'}
        </button>
      </form>

      {errorMsg && (
        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '8px', paddingLeft: '8px' }}>
          ⚠️ {errorMsg}
        </p>
      )}

      {successMsg && (
        <p style={{ color: 'var(--accent-green)', fontSize: '0.85rem', marginTop: '8px', paddingLeft: '8px' }}>
          ✓ {successMsg}
        </p>
      )}
    </div>
  );
};
