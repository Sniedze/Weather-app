import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { WiHumidity } from "react-icons/wi";
import { WiBarometer } from "react-icons/wi";
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

  const iconUrl = `http://openweathermap.org/img/wn/${weather_icon}@2x.png`;

  const today = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  };

  return (
    <div className="today-weather-container">
      <h3 className="date">{today()}</h3>

      {error && (
        <div className="error-container">
          <h2 className="error-message">{errorMessage}</h2>
          <h2>Please enter the city</h2>
        </div>
      )}
      {loadingWeather && (
        <div className="loader-container">
          <Loader type="Puff" color="#1d4e89" height={100} width={100} />
        </div>
      )}
      {searchedCity && (
        <div className="weather-container">
          <h2 className="city">
            {searchedCity} {searchedCountry}
          </h2>
          <h3 className="weather">{weather}</h3>
          <div className="icon-temperature">
            <img className="weather-icon" src={iconUrl} alt="weather icon" />
            <h1 className="temperature-container">
              {temperature}
              &deg;C
            </h1>
          </div>

          <div className="measurement-container">
            <div className="icon-container">
              <WiBarometer />

              <h2>{pressure}</h2>
            </div>
            <div className="icon-container">
              <WiHumidity />

              <h2>{humidity}</h2>
            </div>
            <div className="icon-container">
              <WiStrongWind />

              <h2>{wind}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayWeather;
