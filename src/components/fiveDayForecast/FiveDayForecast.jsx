import React from "react";
import { WiHumidity } from "react-icons/wi";
import { WiBarometer } from "react-icons/wi";
import { WiThermometer } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";

const FiveDayForecast = props => {
  const { dailyData, cityData, error, loadingForecast, errorMessage } = props;
  return (
    <section>
      {error && (
        <div className="error-container">
          <h3 className="error-message">{errorMessage}</h3>
          <h1>Please enter the city</h1>
        </div>
      )}
      {loadingForecast && <h1>Loading...</h1>}
      {cityData.name && (
        <div>
          <h1>
            Five day forecast for {cityData.name} {cityData.country}
          </h1>

          {dailyData.map((reading, index) => (
            <article key={index}>
              <h1>{reading.dt_txt.split("", 10)}</h1>
              <h2>{reading.main.temp}</h2>
              <h2>{reading.weather[0].description}</h2>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default FiveDayForecast;
