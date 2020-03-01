import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/daily">5 day forecast</Link>
        </li>
        <li>
          <Link to="/today">Today</Link>
        </li>
        <li>
          <Link to="/hourly">Hourly</Link>
        </li>
        <li>
          <Link to="/monthly">Monthly</Link>
        </li>
      </ul>
    );
  }
}
