import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <nav>
        <ul className="menu">
          <div className="link-container">
            <Link to="/">TODAY</Link>
          </div>
          <div className="link-container">
            <Link to="/daily">5 DAYS</Link>
          </div>
        </ul>
      </nav>
    );
  }
}
