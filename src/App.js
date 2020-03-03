import React, { Component } from "react";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Today from "./pages/today/Today";
import Hourly from "./pages/hourly/Hourly";
import Monthly from "./pages/monthly/Monthly";
import FiveDays from "./pages/daily/FiveDays";
import Lost from "./pages/lost/Lost";
import Search from "./components/search/Search";
import apiConfig from "./apiKeys";

//import { FaBeer } from "react-icons/fa";
//import { WiAlien } from "react-icons/wi";

export default class App extends Component {
  state = {
    fullData: [],
    dailyData: [],
    city: "",
    country: "",
    inputUnit: "",
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
    error: false
  };

  onInput = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
    console.log(this.state.city);
  };

  getWeather = async ev => {
    const { city, country, inputUnit } = this.state;
    ev.preventDefault();
    localStorage.setItem("storedCity", city);
    localStorage.setItem("storedCountry", country);
    localStorage.setItem("storedUnit", inputUnit);
    const storedCity = localStorage.getItem("storedCity");
    const storedCountry = localStorage.getItem("storedCountry");
    const storedUnit = localStorage.getItem("storedUnit");
    console.log(storedCity);

    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${storedCity},${storedCountry}&units=metric&APPID=${apiConfig.owmKey}`;
    const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${storedCity},${storedCountry}&units=metric&APPID=${apiConfig.owmKey}`;

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
      loadingWeather: false,
      city: storedCity,
      country: storedCountry,
      inputUnit: storedUnit
    });

    const result = await fetch(forecastURL);
    const forecastData = await result.json();
    const dailyData = await forecastData.list.filter(reading =>
      reading.dt_txt.includes("18:00:00")
    );
    this.setState({
      fullData: forecastData.list,
      dailyData: dailyData,
      loadingForecast: false
    });
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
      wind
    } = this.state;
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Search
            handleSubmit={this.getWeather}
            handleInput={this.onInput}
            city={this.state.city}
            country={this.state.country}
            inputUnit={this.state.inputUnit}
          />
          <Switch>
            <Route
              exact
              path="/"
              component={props => (
                <Home
                  {...props}
                  searchedCity={searchedCity}
                  searchedCountry={searchedCountry}
                  temperature={temperature}
                  weather={weather}
                  weather_icon={weather_icon}
                  pressure={pressure}
                  humidity={humidity}
                  wind={wind}
                />
              )}
            />
            <Route
              path="/monthly"
              component={props => <Monthly {...props} />}
            />
            <Route path="/hourly" component={Hourly} />
            <Route path="/today" component={props => <Today {...props} />} />
            <Route path="/daily" component={props => <FiveDays {...props} />} />
            <Route component={Lost} />
          </Switch>
        </div>
      </Router>
    );
  }
}
