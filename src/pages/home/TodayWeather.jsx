import React from "react";

const TodayWeather = props => {
  const {
    humidity,
    city,
    country,
    temperature,
    weather,
    weather_icon,
    pressure,
    wind
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
        {city} {country}
      </h2>
      <h1>{temperature} &deg;C </h1>
      <h2>{weather}</h2>
      <img src={iconUrl} alt="weather icon" />
      <h3>Pressure: {pressure}</h3>
      <h3>Humidity: {humidity} %</h3>
      <h3>Wind speed: {wind}</h3>
    </div>
  );
};

export default TodayWeather;
