import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardView from "./views/DashboardView";
import SettingsView from "./views/SettingsView";
import InstallView from "./views/InstallView";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <div className="app-header">Header</div>
          <div className="app-content">
            <Switch>
              <Route exact path="/" component={DashboardView} />
              <Route exact path="/install" component={InstallView} />
              <Route path="/settings" component={SettingsView} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
