import React from "react";

const Search = props => {
  const { handleInput, handleSubmit, city, country, inputUnit } = props;
  return (
    <div className="search_container">
      <form onSubmit={handleSubmit} method="get" className="search_container">
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
        <input
          type="radio"
          name="units"
          checked={inputUnit === "imperial"}
          value="imperial"
          onChange={handleInput}
        />
        Fahrenheit
        <input
          type="radio"
          name="units"
          checked={inputUnit === "metric"}
          value="metric"
          onChange={handleInput}
        />
        Celcius
        <button>Get Weather</button>
      </form>
    </div>
  );
};

export default Search;
