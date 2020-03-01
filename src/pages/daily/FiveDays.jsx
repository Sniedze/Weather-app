import React, { Component } from "react";
import apiConfig from "../../apiKeys";

export default class Today extends Component {
  state = {
    fullData: [],
    todayData: []
  };

  componentDidMount = () => {
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},lv&units=metric&APPID=${apiConfig.owmKey}`;
    if (this.state.city) {
      fetch(weatherURL)
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
            () => console.log(this.state.dailyData)
          );
        });
    }
  };

  render() {
    const { fullData } = this.state;
    return (
      <section>
        <h1>This is 5 days</h1>;
        <article>
          {fullData.map((reading, index) => (
            <li key={index}>
              {reading.main.temp}
              {reading.weather[0].description}
            </li>
          ))}
        </article>
        }}
      </section>
    );
  }
}
