import React, { Component } from "react";
import apiConfig from "../../apiKeys";
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
    loadingForecast: true,
    error: false,
    city: "",
    country: ""
  };

  onInput = ev => {
    ev.preventDefault();
    this.setState({ [ev.target.name]: ev.target.value });
  };

  onFormSubmit = ev => {
    const { city, country } = this.state;
    const searchedCity = city;
    localStorage.setItem("storedCity", searchedCity);
    localStorage.setItem("storedCountry", country);

    console.log(this.state.city);
    //console.log(localStorage.getItem("storedCity"));
  };

  async componentDidMount() {
    const { city, country } = this.state;
    if (localStorage.getItem("storedCity")) {
      const storedCity = localStorage.getItem("storedCity");
      const storedCountry = localStorage.getItem("storedCountry");
      console.log(city);

      const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${storedCity},${storedCountry}&units=metric&APPID=${apiConfig.owmKey}`;

      const res = await fetch(weatherURL);
      const weatherData = await res.json();
      console.log(weatherData);
      this.setState({
        searchedCity: weatherData.name,
        searchedCountry: weatherData.sys.country,
        temperature: weatherData.main.temp,
        weather: weatherData.weather[0].description,
        weather_icon: weatherData.weather[0].icon,
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
        wind: weatherData.wind.speed,
        loadingWeather: false
        // city: storedCity,
        // country: storedCountry
      });
    }
  }

  render() {
    const {
      searchedCountry,
      searchedCity,
      temperature,
      weather,
      weather_icon,
      pressure,
      humidity,
      wind
    } = this.state;
    return (
      <div>
        <Search
          handleSubmit={this.onFormSubmit}
          handleInput={this.onInput}
          city={this.state.city}
          country={this.state.country}
        />
        <TodayWeather
          searchedCity={searchedCity}
          searchedCountry={searchedCountry}
          temperature={temperature}
          weather={weather}
          weather_icon={weather_icon}
          pressure={pressure}
          humidity={humidity}
          wind={wind}
        />
      </div>
    );
  }
}
