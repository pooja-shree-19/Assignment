import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SongListWithImages = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fetching data from the API using Axios
    axios.get('https://cms.samespace.com/items/songs')
      .then(response => {
        const songsData = response.data.data.map(song => ({
          ...song,
          coverUrl: `https://cms.samespace.com/assets/${song.cover}` // Constructing the cover image URL
        }));
        setSongs(songsData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Song List with Images</h1>
      <ul>
        {songs.map(song => (
          <li key={song.id} style={{ marginBottom: '20px' }}>
            <h2>{song.name}</h2>
            <p>Artist: {song.artist}</p>
            <p>Accent: <span style={{ color: song.accent }}>{song.accent}</span></p>
            <img src={song.coverUrl} alt={song.name} style={{ width: '200px', height: '200px' }} />
            <audio controls style={{ display: 'block', marginTop: '10px' }}>
              <source src={song.url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongListWithImages;