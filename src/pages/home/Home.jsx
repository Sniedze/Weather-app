import React, { Component } from "react";
import Search from "./Search";
import TodayWeather from "./TodayWeather";
import FiveDayForecast from "./FiveDayForecast";
import apiConfig from "../../apiKeys";

export default class Home extends Component {
  state = {
    inputCity: "",
    inputCountry: "",
    fullData: [],
    dailyData: [],
    humidity: "",
    city: "",
    country: "",
    weather: "",
    weather_icon: "",
    temperature: "",
    pressure: "",
    wind: ""
  };

  onInputChange = ev => {
    this.setState({ [ev.target.id]: ev.target.value });
  };
  onButtonClick = () => {
    console.log(this.state.inputCity);
    const inputCity = this.state.inputCity;
    localStorage.setItem("inputCity", inputCity);
    const inputCountry = this.state.inputCountry;
    localStorage.setItem("inputCountry", inputCountry);
  };

  componentDidMount() {
    const inputCity = localStorage.getItem("inputCity");
    const inputCountry = localStorage.getItem("inputCountry");
    if (inputCity) {
      const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${inputCity},${inputCountry}&units=metric&APPID=${apiConfig.owmKey}`;
      const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${inputCity},${inputCountry}&units=metric&APPID=${apiConfig.owmKey}`;

      fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
          this.setState(
            {
              city: data.name,
              country: data.sys.country,
              temperature: data.main.temp,
              weather: data.weather[0].description,
              weather_icon: data.weather[0].icon,
              pressure: data.main.pressure,
              humidity: data.main.humidity,
              wind: data.wind.speed
            },
            () => console.log(data)
          );
        });
      fetch(forecastURL)
        .then(res => res.json())
        .then(data => {
          const dailyData = data.list.filter(reading =>
            reading.dt_txt.includes("18:00:00")
          );
          this.setState(
            {
              fullData: data.list,
              dailyData: dailyData
            },
            () => console.log(this.state)
          );
        });
    }
  }

  render() {
    const inputCity = localStorage.getItem("inputCity");
    if (inputCity) {
      return (
        <div>
          <Search
            handleButtonClick={this.onButtonClick}
            handleInput={this.onInputChange}
            inputCity={this.state.inputCity}
            inputCountry={this.state.inputCountry}
          />
          <TodayWeather
            city={this.state.city}
            country={this.state.country}
            temperature={this.state.temperature}
            weather={this.state.weather}
            weather_icon={this.state.weather_icon}
            pressure={this.state.pressure}
            humidity={this.state.humidity}
            wind={this.state.wind}
          />
          <FiveDayForecast dailyData={this.state.dailyData} />
        </div>
      );
    } else {
      return (
        <Search
          handleButtonClick={this.onButtonClick}
          handleInput={this.onInputChange}
          inputCity={this.state.inputCity}
          inputCountry={this.state.inputCountry}
        />
      );
    }
  }
}
