import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <nav className="menu">
        <NavLink activeClassName="active" to="/" exact>
          TODAY
        </NavLink>

        <NavLink activeClassName="active" to="/daily">
          5 DAYS
        </NavLink>
      </nav>
    );
  }
}
