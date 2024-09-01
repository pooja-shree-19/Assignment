import React from 'react';
import PropTypes from 'prop-types';
import './SongsList.css'; // Make sure to include this CSS file

const SongsList = ({ songs, onSelectSong }) => (
  <div className="songs-list">
    {songs.map((song, index) => (
      <div key={index} className="song-item" onClick={() => onSelectSong(index)}>
        <img className="song-cover" src={song.coverUrl} alt={`Cover of ${song.name}`} />
        <div className="song-info">
          <h3 className="song-name">{song.name}</h3>
          <p className="artist-name">{song.artist}</p>
        </div>
      </div>
    ))}
  </div>
);

SongsList.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      coverUrl: PropTypes.string.isRequired
    })
  ).isRequired,
  onSelectSong: PropTypes.func.isRequired
};

export default SongsList;
