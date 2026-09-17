import React from 'react';
import type { PageTab } from '../types';

interface NavbarProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <button 
          className="logo"
          onClick={() => onSelectTab('my-songs')}
        >
          MusifY <span>🎵</span>
        </button>
        <ul className="nav-links">
          <li>
            <button
              className={`nav-link ${currentTab === 'my-songs' ? 'active' : ''}`}
              onClick={() => onSelectTab('my-songs')}
            >
              My Songs
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentTab === 'regular-songs' ? 'active' : ''}`}
              onClick={() => onSelectTab('regular-songs')}
            >
              Regular Songs
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentTab === 'playlists' ? 'active' : ''}`}
              onClick={() => onSelectTab('playlists')}
            >
              Playlist
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
