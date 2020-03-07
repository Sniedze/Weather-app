import React, { Component } from "react";

export default class Search extends Component {
  state = {
    city: "",
    country: ""
  };

  onInput = ev => {
    ev.preventDefault();
    this.setState({ [ev.target.name]: ev.target.value });
  };

  onFormSubmit = () => {
    const { city, country } = this.state;
    this.props.handleInputChange(city, country);
  };

  render() {
    const { city, country } = this.state;
    return (
      <div className="search_container">
        <form method="get" className="search_container">
          <input
            onChange={this.onInput}
            type="text"
            id="city"
            name="city"
            defaultValue={city}
            placeholder="City..."
          />
          <input
            onChange={this.handleInput}
            type="text"
            name="country"
            defaultValue={country}
            placeholder="Country..."
          />

          <button onClick={this.onFormSubmit}>Get Weather</button>
        </form>
      </div>
    );
  }
}
