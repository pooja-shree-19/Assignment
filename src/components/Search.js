import React, { useState } from 'react';
import './Search.css'; // Import CSS for styling

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); // Trigger the search callback with the query
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Song,Artist"
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
};

export default Search;
