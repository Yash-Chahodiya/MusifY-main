import { useState } from 'react';
import type { PageTab, Song } from './types';
import { Navbar } from './components/Navbar';
import { PlayerBar } from './components/PlayerBar';
import { MySongs } from './pages/MySongs';
import { RegularSongs } from './pages/RegularSongs';
import { Playlists } from './pages/Playlists';
import {
  initialMySongs,
  initialRegularSongs,
  samplePlaylists,
  playlistPreviewTracks,
} from './data';
import './App.css';

function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('my-songs');
  const [mySongs, setMySongs] = useState<Song[]>(initialMySongs);
  const [regularSongs, setRegularSongs] = useState<Song[]>(initialRegularSongs);
  const [playlistTracks, setPlaylistTracks] = useState<Song[]>(playlistPreviewTracks);

  const [currentSong, setCurrentSong] = useState<Song>(initialMySongs[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Play a song
  const handlePlaySong = (song: Song) => {
    if (currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  // Toggle play/pause on player bar
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle like status across all song lists
  const handleToggleLike = (songId: string) => {
    const updateList = (list: Song[]) =>
      list.map((s) => (s.id === songId ? { ...s, isLiked: !s.isLiked } : s));

    setMySongs(updateList);
    setRegularSongs(updateList);
    setPlaylistTracks(updateList);

    if (currentSong.id === songId) {
      setCurrentSong((prev) => ({ ...prev, isLiked: !prev.isLiked }));
    }
  };

  // Next / Previous song logic
  const getAllCurrentSongs = () => {
    if (currentTab === 'my-songs') return mySongs;
    if (currentTab === 'regular-songs') return regularSongs;
    return playlistTracks;
  };

  const handleNext = () => {
    const list = getAllCurrentSongs();
    const currentIndex = list.findIndex((s) => s.id === currentSong.id);
    const nextIndex = currentIndex >= 0 && currentIndex < list.length - 1 ? currentIndex + 1 : 0;
    setCurrentSong(list[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const list = getAllCurrentSongs();
    const currentIndex = list.findIndex((s) => s.id === currentSong.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : list.length - 1;
    setCurrentSong(list[prevIndex]);
    setIsPlaying(true);
  };

  return (
    <>
      {/* Top Navigation */}
      <Navbar currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Main Pages */}
      {currentTab === 'my-songs' && (
        <MySongs
          songs={mySongs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlaySong={handlePlaySong}
          onToggleLike={handleToggleLike}
          onNavigate={setCurrentTab}
        />
      )}

      {currentTab === 'regular-songs' && (
        <RegularSongs
          songs={regularSongs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlaySong={handlePlaySong}
          onToggleLike={handleToggleLike}
        />
      )}

      {currentTab === 'playlists' && (
        <Playlists
          playlists={samplePlaylists}
          playlistTracks={playlistTracks}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlaySong={handlePlaySong}
          onToggleLike={handleToggleLike}
        />
      )}

      {/* Sticky Bottom Player */}
      <PlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}

export default App;
