import React from "react";

function SearchBar({ onSearch }) {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar produto"
      onChange={handleInputChange}
    />
  );
}

export default SearchBar;
