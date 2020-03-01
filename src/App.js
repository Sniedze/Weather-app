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
//import { FaBeer } from "react-icons/fa";
//import { WiAlien } from "react-icons/wi";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Switch>
            <Route exact path="/" component={props => <Home {...props} />} />
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
