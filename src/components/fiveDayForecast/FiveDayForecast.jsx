import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

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
      {loadingForecast && (
        <div className="loader-container">
          <Loader type="Puff" color="#1d4e89" height={100} width={100} />
        </div>
      )}
      {cityData.name && (
        <div>
          <h1>
            Five day forecast for{" "}
            <span>
              {cityData.name} {cityData.country}
            </span>
          </h1>
          <div className="article-container">
            {dailyData.map((reading, index) => (
              <article key={index}>
                <h1>{reading.dt_txt.split("", 10)}</h1>
                <div className="icon-container">
                  <img
                    src={`http://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`}
                    alt=""
                  />
                  <h2>{Math.round(reading.main.temp)} &deg;C</h2>
                </div>

                <h2 className="weather">{reading.weather[0].description}</h2>
                <table className="measurement-container">
                  <tbody>
                    <tr>
                      <td>Feels like</td>
                      <td>{Math.round(reading.main.feels_like)} &deg;C</td>
                    </tr>
                    <tr>
                      <td>Min temp.</td>
                      <td>{Math.round(reading.main.temp_min)} &deg;C</td>
                    </tr>
                    <tr>
                      <td>Max temp.</td>
                      <td>{Math.round(reading.main.temp_max)} &deg;C</td>
                    </tr>
                    <tr>
                      <td>Pressure</td>
                      <td>{reading.main.pressure} hPa</td>
                    </tr>
                    <tr>
                      <td>Humidity</td>
                      <td>{reading.main.humidity} %</td>
                    </tr>
                    <tr>
                      <td>Wind gusts</td>
                      <td>
                        {Math.round(reading.wind.speed, 1).toFixed(1)} m/s
                      </td>
                    </tr>
                  </tbody>
                </table>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default FiveDayForecast;
