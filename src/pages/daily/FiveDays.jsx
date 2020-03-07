import React, { Component } from "react";
import apiConfig from "../../apiKeys";
import Navigation from "../../components/navigation/Navigation";
import Search from "../../components/search/Search";
import FiveDayForecast from "../../components/fiveDayForecast/FiveDayForecast";

export default class Today extends Component {
  state = {
    cityData: [],
    dailyData: [],
    city: "",
    country: "",
    loadingForecast: true,
    error: false,
    errorMessage: ""
  };

  onInputChange = (city, country) => {
    this.setState({ city, country });
    localStorage.setItem("storedCity", city);
    localStorage.setItem("storedCountry", country);
  };

  async componentDidMount() {
    const storedCity = localStorage.getItem("storedCity");
    const storedCountry = localStorage.getItem("storedCountry");
    if (storedCity.length === 0) {
      this.setState({ error: true, loadingForecast: false });
    }
    const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${storedCity},${storedCountry}&units=metric&APPID=${apiConfig.owmKey}`;
    if (storedCity) {
      fetch(forecastURL)
        .then(async response => {
          const data = await response.json();

          if (!response.ok) {
            const err = (data && data.message) || response.statusText;
            return Promise.reject(err);
          }
          const dailyData = await data.list.filter(reading =>
            reading.dt_txt.includes("18:00:00")
          );
          this.setState(
            {
              cityData: data.city,
              dailyData,
              loadingForecast: false,
              error: false
            },
            () => console.log(this.state.dailyData)
          );
        })
        .catch(err => {
          this.setState({
            error: true,
            loadingForecast: false,
            errorMessage: err
          });
          console.log(err.message);
        });
    }
  }

  render() {
    const {
      dailyData,
      cityData,
      error,
      loadingForecast,
      errorMessage
    } = this.state;
    return (
      <div className="five-days-forecast">
        <Search handleInputChange={this.onInputChange} />
        <Navigation />
        <FiveDayForecast
          dailyData={dailyData}
          cityData={cityData}
          error={error}
          loadingForecast={loadingForecast}
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}
