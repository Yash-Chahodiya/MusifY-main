/* ==========================================================
   MusifY - Basic Interactive Player Helper
   Simple, clean script to simulate playing songs
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const playerTitle = document.getElementById('player-song-title');
  const playerArtist = document.getElementById('player-song-artist');
  const playerThumb = document.getElementById('player-thumb');
  const mainPlayBtn = document.getElementById('main-play-btn');
  let isPlaying = false;

  // Handle Song Play Click
  const playButtons = document.querySelectorAll('.btn-play, .song-item');
  playButtons.forEach(element => {
    element.addEventListener('click', (e) => {
      // Find the song container
      const songItem = element.closest('.song-item') || element;
      const title = songItem.getAttribute('data-title');
      const artist = songItem.getAttribute('data-artist');
      const icon = songItem.getAttribute('data-icon') || '🎵';

      if (title && artist) {
        if (playerTitle) playerTitle.textContent = title;
        if (playerArtist) playerArtist.textContent = artist;
        if (playerThumb) playerThumb.textContent = icon;
        
        isPlaying = true;
        if (mainPlayBtn) mainPlayBtn.textContent = '⏸';
      }
    });
  });

  // Main Play/Pause Toggle
  if (mainPlayBtn) {
    mainPlayBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      mainPlayBtn.textContent = isPlaying ? '⏸' : '▶';
    });
  }

  // Like Heart Toggle
  const likeButtons = document.querySelectorAll('.btn-like');
  likeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('liked');
      btn.textContent = btn.classList.contains('liked') ? '❤️' : '🤍';
    });
  });

  // Search filter
  const searchInput = document.getElementById('song-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const songs = document.querySelectorAll('.song-item');
      songs.forEach(song => {
        const text = song.textContent.toLowerCase();
        song.style.display = text.includes(term) ? 'flex' : 'none';
      });
    });
  }
});
