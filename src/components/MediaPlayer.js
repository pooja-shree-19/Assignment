import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import VolumeController from './VolumeController';
import Seeker from './Seeker';
import SongsList from './SongsList'; // Import the SongsList component
import Menu from './Menu'; // Import the updated Menu component
import './MediaPlayer.css'; // Import the CSS file

const MediaPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [volume, setVolume] = useState(1); // Volume range is from 0.0 to 1.0
  const [isVolumeVisible, setIsVolumeVisible] = useState(false); // Toggle for volume slider visibility
  const [seekerMax, setSeekerMax] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Toggle for menu visibility
  const [selectedMenu, setSelectedMenu] = useState('forYou'); // Default menu item
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  const audioRef = useRef(null);

  const changeSong = useCallback((index) => {
    if (audio) {
      audio.pause();
      audio.src = ""; // Clear the previous song source
    }
    const newAudio = new Audio(songs[index].url);
    audioRef.current = newAudio;
    setAudio(newAudio);
    setCurrentSongIndex(index);
    setIsPlaying(true);
    newAudio.play().catch(error => console.error('Error playing new audio:', error));
    setSeekerMax(newAudio.duration || 0); // Update seeker max when song changes
  }, [audio, songs]);

  const handleNextSong = useCallback(() => {
    let newIndex = currentSongIndex + 1;
    if (newIndex >= songs.length) newIndex = 0;
    changeSong(newIndex);
  }, [currentSongIndex, songs, changeSong]);

  const handleSeekerUpdate = useCallback(() => {
    if (audio) {
      const seekerElement = document.getElementById('seeker');
      if (seekerElement) {
        seekerElement.value = audio.currentTime;
      }
    }
  }, [audio]);

  useEffect(() => {
    axios.get('https://cms.samespace.com/items/songs')
      .then(response => {
        const fetchedSongs = response.data.data.map(song => ({
          ...song,
          coverUrl: `https://cms.samespace.com/assets/${song.cover}`
        }));
        setSongs(fetchedSongs);
        if (fetchedSongs.length > 0) {
          const newAudio = new Audio(fetchedSongs[0].url);
          audioRef.current = newAudio;
          setAudio(newAudio);
          setSeekerMax(newAudio.duration || 0); // Set initial seeker max value
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (audio) {
      audio.addEventListener('ended', handleNextSong);
      audio.volume = volume; // Set initial volume
      setSeekerMax(audio.duration || 0); // Update seeker max value

      return () => {
        audio.removeEventListener('ended', handleNextSong);
        audio.pause();
        audio.src = "";
        setAudio(null);
      };
    }
  }, [audio, volume, handleNextSong]);

  useEffect(() => {
    if (audio) {
      const interval = setInterval(handleSeekerUpdate, 1000);
      return () => clearInterval(interval);
    }
  }, [audio, handleSeekerUpdate]);

  const handlePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
        console.log('Paused');
      } else {
        audio.play().catch(error => console.error('Error playing audio:', error));
        console.log('Playing');
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePreviousSong = () => {
    let newIndex = currentSongIndex - 1;
    if (newIndex < 0) newIndex = songs.length - 1;
    changeSong(newIndex);
  };

  const handleSeekerChange = (event) => {
    if (audio) {
      audio.currentTime = event.target.value;
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audio) {
      audio.volume = newVolume;
    }
  };

  const toggleVolumeSlider = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setIsMenuVisible(false); // Close the menu when a selection is made
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSongs = songs.filter(song => song.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const currentSong = songs[currentSongIndex];
  const gradientBackground = currentSong ? `linear-gradient(to bottom, ${currentSong.accent}, #000)` : '#000';

  return (
    <div className="player-container" style={{ background: gradientBackground }}>
      <div className={`media-content ${isMenuVisible ? 'with-menu' : ''}`}>
        {currentSong && (
          <div className="song-details">
            <h1 className="song-name">{currentSong.name}</h1>
            <h2 className="artist-name">{currentSong.artist}</h2>
            <img 
              className="cover-image" 
              src={currentSong.coverUrl} 
              alt={currentSong.name}
              key={currentSong.coverUrl} // Add key to force re-render on image change
            />
            <div className="music-controls">
              <button className="button" onClick={toggleMenu}>...</button> {/* Toggle menu button */}
              <button className="button" onClick={handlePreviousSong}>⏮️</button>
              <button className="button" onClick={handlePlayPause}>{isPlaying ? '⏸️' : '▶️'}</button>
              <button className="button" onClick={handleNextSong}>⏭️</button>
              <VolumeController
                volume={volume}
                isVolumeVisible={isVolumeVisible}
                onVolumeChange={handleVolumeChange}
                onToggleVolumeSlider={toggleVolumeSlider}
                className="volume-controller" // Ensure class is applied
              />
            </div>
            <Seeker
              id="seeker"
              value={audio ? audio.currentTime : 0}
              max={seekerMax}
              onChange={handleSeekerChange}
            />
          </div>
        )}

        {isMenuVisible && (
          <div className="menu-container">
            <Menu 
              isVisible={isMenuVisible} 
              onClose={toggleMenu} 
              selectedMenu={selectedMenu} 
              onSelectMenu={handleSelectMenu}
            />
            {selectedMenu === 'forYou' && (
              <div className="songs-list-container">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchTerm} 
                  onChange={handleSearchChange} 
                  className="search-bar"
                />
                <SongsList 
                  songs={filteredSongs} 
                  onSelectSong={changeSong} 
                />
              </div>
            )}
            {selectedMenu === 'topTracks' && (
              <div className="top-tracks-container">
                {/* Replace this with your top tracks component or data */}
                <h2>Top Tracks</h2>
                {/* Add top tracks display logic here */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;
