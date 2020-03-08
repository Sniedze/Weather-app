import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <nav>
        <ul className="menu">
          <div className="home-link-container link-container">
            <Link className="home-link" to="/">
              TODAY
            </Link>
          </div>

          <div className="forecast-link-container link-container">
            <Link className="forecast-link" to="/daily">
              5 DAYS
            </Link>
          </div>
        </ul>
      </nav>
    );
  }
}
