import React from "react";

const Search = props => {
  const { handleInput, handleButtonClick, inputCity, inputCountry } = props;
  return (
    <div className="search_container">
      <form className="search_container">
        <input
          onChange={handleInput}
          type="text"
          id="inputCity"
          value={inputCity}
          placeholder="City..."
        />
        <input
          onChange={handleInput}
          type="text"
          id="inputCountry"
          value={inputCountry}
          placeholder="Country..."
        />
        <button onClick={handleButtonClick}>Get Weather</button>
      </form>
    </div>
  );
};

export default Search;
