import React from "react";

const Search = props => {
  const { handleInput, handleSubmit, city, country } = props;
  return (
    <div className="search_container">
      <form method="get" className="search_container">
        <input
          onChange={handleInput}
          type="text"
          id="city"
          name="city"
          defaultValue={city}
          placeholder="City..."
        />
        <input
          onChange={handleInput}
          type="text"
          name="country"
          defaultValue={country}
          placeholder="Country..."
        />

        <button onClick={handleSubmit}>Get Weather</button>
      </form>
    </div>
  );
};

export default Search;
