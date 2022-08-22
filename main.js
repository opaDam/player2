let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    id: 0,
    name: "Take on Me",
    artist: "A-ha",
    image: "https://opadam.github.io/map/img/Take_on_Me.jpg",
    path: "https://opadam.github.io/map/map/a1"
  },
  {
    id: 1,
    name: "You (DU)",
    artist: "Bouke",
    image: "https://opadam.github.io/map/img/You_DU.jpg",
    path: "https://opadam.github.io/map/map/a2"
  },
  {
    id: 2,
    name: "Country Boy",
    artist: "Alan Jackson",
    image: "https://opadam.github.io/map/img/Country_Boy.jpg",
    path: "https://opadam.github.io/map/map/a3"
  },
  {
    id: 3,
    name: "For the Good Times",
    artist: "Albert West",
    image: "https://opadam.github.io/map/img/For_the_Good_Times.jpg",
    path: "https://opadam.github.io/map/map/a4"
  },
  {
    id: 4,
    name: "Rain And Tears",
    artist: "Aphrodites Child",
    image: "https://opadam.github.io/map/img/Rain_And_Tears.jpg",
    path: "https://opadam.github.io/map/map/a5"
  },
  {
    id: 5,
    name: "You Drive Me Crazy",
    artist: "Shakin Stevens",
    image: "https://opadam.github.io/map/img/Shakin_Stevens.jpg",
    path: "https://opadam.github.io/map/map/a6"
  },
  {
    id: 6,
    name: "Dance For Ever More",
    artist: "Si Cranstoun",
    image: "https://opadam.github.io/map/img/Si_Cranstoun.jpg",
    path: "https://opadam.github.io/map/map/a7"
  },
  {
    id: 7,
    name: "Feel Free",
    artist: "Bellamy Brothers",
    image: "https://opadam.github.io/map/img/Feel_Free.jpg",
    path: "https://opadam.github.io/map/map/a8"
  },
  {
    id: 8,
    name: "Come A Little Bit Closer",
    artist: "Jay & the Americans",
    image: "https://opadam.github.io/map/img/Come_a_Little_Bit_Closer_Single.jpg",
    path: "https://opadam.github.io/map/map/a9"
  },
  {
    id: 9,
    name: "Candida",
    artist: "Tony Orlando",
    image: "https://opadam.github.io/map/img/Candida.jpg",
    path: "https://opadam.github.io/map/map/a10"
  },
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  // playTrack();
  // playpauseTrack();
  pauseTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  // playTrack();
  pauseTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


