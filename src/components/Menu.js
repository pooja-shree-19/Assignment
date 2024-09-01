import React from 'react';
import './Menu.css'; // Import the CSS file for styling

const Menu = ({ isVisible, onClose, selectedMenu, onSelectMenu }) => (
  isVisible ? (
    <div className="menu">
      <div className="menu-content">
        <button 
          className={`menu-item ${selectedMenu === 'forYou' ? 'selected' : ''}`}
          onClick={() => onSelectMenu('forYou')}
        >
          For You
        </button>
        <button 
          className={`menu-item ${selectedMenu === 'topTracks' ? 'selected' : ''}`}
          onClick={() => onSelectMenu('topTracks')}
        >
          Top Tracks
        </button>
      </div>
      
    </div>
  ) : null
);

export default Menu;
