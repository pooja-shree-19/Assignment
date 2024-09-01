// // VolumeControl.js
// import React from 'react';
// import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
// import styled from 'styled-components';

// const VolumeControl = ({ volume, isVolumeVisible, onVolumeChange, onToggleVolumeSlider }) => (
//   <VolumeControlWrapper>
//     <VolumeIcon onClick={onToggleVolumeSlider}>
//       {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
//     </VolumeIcon>
//     {isVolumeVisible && (
//       <VolumeSlider
//         type="range"
//         min="0"
//         max="1"
//         step="0.01"
//         value={volume}
//         onChange={onVolumeChange}
//       />
//     )}
//   </VolumeControlWrapper>
// );

// export default VolumeControl;

// const VolumeControlWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   position: relative;
// `;

// const VolumeIcon = styled.div`
//   font-size: 30px;
//   cursor: pointer;
//   margin-left: 20px;
// `;

// const VolumeSlider = styled.input`
//   width: 200px;
//   height: 6px;
//   -webkit-appearance: none;
//   background: ${props => `linear-gradient(to right, #fff 0%, #fff ${props.value * 100}%, #333 ${props.value * 100}%, #333 100%)`};
//   outline: none;
//   border-radius: 5px;

//   &::-webkit-slider-thumb {
//     width: 0;
//     height: 0;
//     background: transparent;
//     -webkit-appearance: none;
//   }

//   &::-moz-range-thumb {
//     width: 0;
//     height: 0;
//     background: transparent;
//   }
// `;


// VolumeController.js
import React from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import './VolumeController.css'; // Make sure the CSS file exists and is properly imported

const VolumeController = ({ volume, isVolumeVisible, onVolumeChange, onToggleVolumeSlider }) => (
  <div className="volume-controller">
    <button className="volume-icon" onClick={onToggleVolumeSlider}>
      {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
    </button>
    {isVolumeVisible && (
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
        className="volume-slider"
      />
    )}
  </div>
);

export default VolumeController;
