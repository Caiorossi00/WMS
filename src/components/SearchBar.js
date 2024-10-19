import React from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar produto"
        onChange={handleInputChange}
      />
      <i className="search-icon fas fa-search"></i>{" "}
    </div>
  );
}

export default SearchBar;
