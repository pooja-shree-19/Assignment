// Seeker.js
import React from 'react';
import styled from 'styled-components';

const Seeker = ({ max, value, onChange }) => (
  <StyledSeeker
    type="range"
    min="0"
    max={max || 0} // Ensure max is not NaN
    value={value}
    onChange={onChange}
  />
);

export default Seeker;

const StyledSeeker = styled.input`
  width: 80%;
  height: 6px;
  -webkit-appearance: none;
  background: #333; /* Default track color */
  outline: none;
  border-radius: 5px;
  position: relative;
  background-image: ${props => `linear-gradient(to right, #fff 0%, #fff ${(props.value / props.max) * 100}%, #333 ${(props.value / props.max) * 100}%, #333 100%)`}; /* Gradient fill color based on value */

  &::-webkit-slider-thumb {
    width: 0;
    height: 0;
    background: transparent;
    -webkit-appearance: none;
  }

  &::-moz-range-thumb {
    width: 0;
    height: 0;
    background: transparent;
  }
`;
