
/* song array */
const playlist = [
    { title: "Grace", artist: "Kenny Rogers", src: "assets/music-1.m4a", image: "assets/kenny.jpg" },
    { title: "Don_t Cry", artist: "Lucky Dube", src: "assets/music-2.m4a", image: "assets/lucky.jpg" },
    { title: "Ke Lorile", artist: "Pleasure", src: "assets/Ke Lorile.m4a", image: "assets/pleasure.jpg" },
    { title: "You're my best friend", artist: "Don Williams", src: "assets/music-3.m4a", image: "assets/don.jpg" }
  ];
  
  let currentSongIndex = 0;
  const audioPlayer = document.getElementById("audioPlayer");
  const playlistElement = document.getElementById("playlist");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const volumeControl = document.getElementById("volumeControl");
  const currentSongInfo = document.getElementById("currentSongInfo");
  const backgroundDiv = document.querySelector(".background");  // reference to the background div
  
  // Load playlist into the UI
  function loadPlaylist() {
    playlist.forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = `${song.title} - ${song.artist}`;
      li.onclick = () => loadSong(index);
      playlistElement.appendChild(li);
    });
  }
  
  // Load and play the selected song
  function loadSong(index) {
    currentSongIndex = index;
    const song = playlist[index];
    audioPlayer.src = song.src;
    currentSongInfo.textContent = `${song.title} - ${song.artist}`;
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
    
    // Change background image for the song
    backgroundDiv.style.backgroundImage = `url(${song.image})`;
    backgroundDiv.style.backgroundSize = "cover";  // Ensure the image covers the entire background
    backgroundDiv.style.backgroundPosition = "center";  // Center the image
  }
  
  // Play or pause the song
  function togglePlayPause() {
    if (!audioPlayer.src) {
      loadSong(currentSongIndex); // Load the first song if no song is loaded
    } else if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseBtn.textContent = "Pause";
    } else {
      audioPlayer.pause();
      playPauseBtn.textContent = "Play";
    }
  }
  
  // Go to the previous song
  function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
  }
  
  // Go to the next song
  function playNext() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
  }
  
  // Adjust volume
  volumeControl.oninput = () => {
    audioPlayer.volume = volumeControl.value;
  };
  
  // Event listeners for buttons
  playPauseBtn.onclick = togglePlayPause;
  prevBtn.onclick = playPrevious;
  nextBtn.onclick = playNext;
  
  // Initial load
  loadPlaylist();
  