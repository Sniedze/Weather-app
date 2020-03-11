import React, { Component } from "react";
import apiConfig from "../../apiKey";
import TodayWeather from "../../components/todayWeather/TodayWeather";
import Search from "../../components/search/Search";

export default class Home extends Component {
  state = {
    humidity: "",
    searchedCity: "",
    searchedCountry: "",
    weather: "",
    weather_icon: "",
    temperature: "",
    pressure: "",
    wind: "",
    loadingWeather: true,
    error: false,
    errorMessage: "",
    city: "",
    country: ""
  };

  async componentDidMount() {
    const storedCity = localStorage.getItem("storedCity");
    const storedCountry = localStorage.getItem("storedCountry");

    if (storedCity.length === 0) {
      this.setState({ error: true, loadingWeather: false });
    }
    if (storedCity) {
      const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${storedCity},${storedCountry}&units=metric&APPID=${apiConfig.owmKey}`;

      fetch(weatherURL)
        .then(async response => {
          const weatherData = await response.json();
          if (!response.ok) {
            const err =
              (weatherData && weatherData.message) || response.statusText;
            return Promise.reject(err);
          }
          this.setState({
            searchedCity: weatherData.name,
            searchedCountry: weatherData.sys.country,
            temperature: Math.round(weatherData.main.temp),
            weather: weatherData.weather[0].description,
            weather_icon: weatherData.weather[0].icon,
            pressure: weatherData.main.pressure,
            humidity: weatherData.main.humidity,
            wind: Math.round(weatherData.wind.speed, 1).toFixed(1),
            loadingWeather: false,
            error: false
          });
        })
        .catch(err => {
          this.setState({
            error: true,
            loadingWeather: false,
            errorMessage: err
          });
          console.log(err.message);
        });
    }
  }
  onNewInput = (city, country) => {
    localStorage.setItem("storedCity", city);
    localStorage.setItem("storedCountry", country);
    this.setState({ city, country });
  };

  render() {
    const {
      searchedCountry,
      searchedCity,
      temperature,
      weather,
      weather_icon,
      pressure,
      humidity,
      wind,
      loadingWeather,
      error,
      errorMessage
    } = this.state;
    return (
      <div className="today-weather-page">
        <Search handleInputChange={this.onNewInput} />
        <TodayWeather
          searchedCity={searchedCity}
          searchedCountry={searchedCountry}
          temperature={temperature}
          weather={weather}
          weather_icon={weather_icon}
          pressure={pressure}
          humidity={humidity}
          wind={wind}
          loadingWeather={loadingWeather}
          error={error}
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}
