import React, { Component } from "react";
import apiConfig from "../../apiKeys";

export default class Today extends Component {
  state = {
    fullData: [],
    todayData: []
  };
  componentDidMount = () => {
    //const city = this.props.city;

    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=riga&units=imperial&APPID=${apiConfig.owmKey}`;

    fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        this.setState(
          {
            fullData: data
          },
          () => console.log(this.state.fullData)
        );
      });
  };
  render() {
    const { fullData } = this.state;
    return (
      <section>
        <h1>This is today</h1>
        <article>
          <li key={fullData.id}>{fullData.base}</li>
        </article>
      </section>
    );
  }
}
