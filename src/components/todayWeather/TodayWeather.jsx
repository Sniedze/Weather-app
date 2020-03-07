import React from "react";
import { WiHumidity } from "react-icons/wi";
import { WiBarometer } from "react-icons/wi";
import { WiThermometer } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";

const TodayWeather = props => {
  const {
    humidity,
    searchedCity,
    searchedCountry,
    temperature,
    weather,
    weather_icon,
    pressure,
    wind,
    loadingWeather,
    error,
    errorMessage
  } = props;

  const iconUrl = `http://openweathermap.org/img/w/${weather_icon}.png`;

  const today = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  };

  return (
    <div className="daily_data_container">
      <h2>{today()}</h2>
      <h2>
        {searchedCity} {searchedCountry}
      </h2>
      {error && (
        <div>
          <h2>{errorMessage}</h2>
          <h2>Please enter the city</h2>
        </div>
      )}
      {loadingWeather && <h1>Loading...</h1>}
      {searchedCity && (
        <div>
          <h1>
            <span>
              <WiThermometer />
            </span>
            {temperature}
            &deg;C
          </h1>
          <h2>{weather}</h2>
          <img src={iconUrl} alt="weather icon" />
          <h3>
            <span>
              <WiBarometer />
            </span>
            {pressure}
          </h3>
          <h3>
            <span>
              <WiHumidity />
            </span>
            {humidity}
          </h3>
          <h3>
            <span>
              <WiStrongWind />
            </span>
            {wind}
          </h3>
        </div>
      )}
    </div>
  );
};

export default TodayWeather;
