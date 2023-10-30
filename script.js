let playlist = [
    {
      id: 0,
      name: 'Shape Of You',
      artist: 'Ed Sheeran',
      img: "./images/shape of you.jpg" ,
      genre: 'pop',
      source: './songs/shapeofyou.mp3'
    },
    {
      id: 1,
      name: 'All Of Me',
      artist: 'Adele',
      genre: 'pop',
      img: "./images/all of mer.jpg",
      source: './songs/all of me.mp3'
    },
    {
      id: 2,
      name: 'Somelike Like You',
      artist: 'Adele',
      genre: 'pop',
      img: "./images/somelike like you.jpg" ,
      source: './songs/someonelikeyou.mp3'
    },
    {
      id: 3,
        name: 'Wonderwall',
        artist: 'Oasis',
        genre: 'rock',
        img: "./images/wonderwall.jpg" ,
        source: './songs/wonderwall.mp3'
    },
    {
        id: 4,
        name: 'Sugar',
        artist: 'Maroon',
        genre: 'hip-hop',
        img: "./images/sugar.jpg" ,
        source: './songs/sugar.mp3'
    },
    {
        id: 5,
        name: 'Locked Away',
        artist: 'R. City',
        genre: 'hip-hop',
        img: "./images/locked away.jpg" ,
        source: './songs/sugar.mp3'
    },
  
];

let uniqueGenres = Array.from(new Set(playlist.map(song => song.genre)));
console.log(uniqueGenres);

const toggle = document.getElementById("toggle-btn");
toggle.addEventListener('click',()=>{
    console.log("toggle clicked");
    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        toggle.textContent = "Dark";
    } else {
        document.body.classList.add('dark');
        toggle.textContent = "Light";
    }
});

const genreDropdown = document.getElementById("dropdown");
const image = document.getElementById('image');
const songName = document.getElementById('song-name');
const artist = document.getElementById('singer-name');  
const playPauseButton = document.getElementById('playpause');
const playPauseIcon = playPauseButton.querySelector('playimg');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const songList = document.getElementById("songs");
const audioPlayer = document.getElementById('audioPlayer');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');
let currentSongIndex=0;
const playlistNameInput = document.getElementById('inputPlaylist');
const createPlaylistButton = document.getElementById('createPlaylist');
const playlistList = document.getElementById('playlistList');
const addToPlaylistButton = document.getElementById('Add');
let currentSongName = "";
const createdPlaylists = [];
const playlistSongAssociation = {
    // "PlaylistName": ["Song1", "Song2"]
};
let selectedPlaylistName = null;

playPauseButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', playNextSong);
prevButton.addEventListener('click', playPrevSong);


function CreateDropdown(uniqueGenres){
    const option = document.createElement('option');
    option.value = "All";
    option.textContent = "All";
    genreDropdown.appendChild(option);
    let i=0;
    uniqueGenres.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        genreDropdown.appendChild(option);
    });
}

function displaySongsByGenre(genre) {
    songList.innerHTML = '';
    const filteredSongs = genre === 'All' ? playlist : playlist.filter(song => song.genre === genre);
    filteredSongs.forEach(song => {
        const listItem = document.createElement('li');
        listItem.className = "songs-displayed";
        listItem.textContent = song.name;
        listItem.setAttribute('data-source', song.source); 
        console.log(song.source);
        listItem.onclick = createPlaySongFunction(song);
        songList.appendChild(listItem);
    });
}

function createPlaySongFunction(song) {
    return function() {
        currentSongIndex = song.id;
        playSongByID(song.id);
    };
}

function playNextSong() {
    const currentSong = playlist.find(s => s.id === currentSongIndex);
    const currentIndex = playlist.indexOf(currentSong);
    
    if (currentIndex < playlist.length - 1) {
        currentSongIndex = playlist[currentIndex + 1].id;
    } else {
        currentSongIndex = playlist[0].id; 
    }

    playSongByID(currentSongIndex);
}

function playPrevSong() {
    const currentSong = playlist.find(s => s.id === currentSongIndex);
    const currentIndex = playlist.indexOf(currentSong);
    
    if (currentIndex > 0) {
        currentSongIndex = playlist[currentIndex - 1].id;
    } else {
        currentSongIndex = playlist[playlist.length - 1].id;
    }
    playSongByID(currentSongIndex);
}

function playSongByID(songID) {
    const song = playlist.find(s => s.id === songID);
    console.log("playSongByID: "+song.name);
    currentSongName = song.name;
    if (song) {
        audioPlayer.src = song.source;
        audioPlayer.play();
        image.src = song.img;
        songName.textContent = song.name;
        artist.textContent = song.artist;
        //currentSongName = song.name;
        //playPauseIcon.src = "./images/pause.png";
    }
}

function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseIcon.src = './images/play.png';  
    } else {
        audioPlayer.pause();
        playPauseIcon.src = './images/pause.png';  
    }
}

audioPlayer.addEventListener('timeupdate', function() {
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = percentage;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    if (isNaN(audioPlayer.duration) === false && totalTimeDisplay.textContent === "0:00") {
        totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
    }
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

dropdown.addEventListener('change', function() {
    const selectedGenre = this.value;
    console.log(selectedGenre);
    displaySongsByGenre(selectedGenre);
});

createPlaylistButton.addEventListener('click', function() {
    const playlistName = playlistNameInput.value.trim();
    if (playlistName) {
        createdPlaylists.push(playlistName);
        playlistNameInput.value = "";
        renderPlaylists();
    } else {
        alert('Please enter a valid playlist name.');
    }
});

function renderPlaylists() {
    playlistList.innerHTML = '';
    createdPlaylists.forEach(playlistName => {
        const listItem = document.createElement('li');
        listItem.textContent = playlistName;
        listItem.addEventListener('click', () => {
            selectedPlaylistName = playlistName;
            displaySongsOfSelectedPlaylist();
        });
        playlistList.appendChild(listItem);
    });
}

function selectPlaylist(playlistName) {
    selectedPlaylistName = playlistName;
}

function addSongToSelectedPlaylist(currentSongName) {
    if (!selectedPlaylistName) {
        alert("Please select a playlist first.");
        return;
    }

    if (!playlistSongAssociation[selectedPlaylistName]) {
        playlistSongAssociation[selectedPlaylistName] = [];
    }

    if (!playlistSongAssociation[selectedPlaylistName].includes(currentSongName)) {
        playlistSongAssociation[selectedPlaylistName].push(currentSongName);
        alert(`Added ${currentSongName} to ${selectedPlaylistName}`);
    } else {
        alert(`${currentSongName} is already in ${selectedPlaylistName}`);
    }
    displaySongsOfSelectedPlaylist();
}

function displaySongsOfSelectedPlaylist() {
    const songsList = document.getElementById('songsInSelectedPlaylist'); 
    songsList.innerHTML = '';

    if (playlistSongAssociation[selectedPlaylistName] && playlistSongAssociation[selectedPlaylistName].length) {
        playlistSongAssociation[selectedPlaylistName].forEach(songName => {
            const listItem = document.createElement('li');
            listItem.textContent = songName;
            songsList.appendChild(listItem);
        });
    } else {
        songsList.innerHTML = "No songs added yet.";
    }
}

// playlistElement.addEventListener('click', function() {
//     selectPlaylist(playlistElement.textContent);  
//     displaySongsOfSelectedPlaylist(); 
// });

addToPlaylistButton.addEventListener('click', function() {
    console.log(currentSongName);
    addSongToSelectedPlaylist(currentSongName);  
});

CreateDropdown(uniqueGenres);

