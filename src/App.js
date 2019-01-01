import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import AuthRoute from "./components/Auth/AuthRoute";
import DashboardView from "./views/DashboardView";
import SettingsView from "./views/SettingsView";
import InstallView from "./views/InstallView";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <div className="app-header">
            Header
            <Link to="/install">Install</Link>
            <Link to="/">Dashboad</Link>
            <Link to="/settings">Settings</Link>
          </div>
          <div className="app-content">
            <Switch>
              <AuthRoute exact path="/" component={DashboardView} />
              <AuthRoute exact path="/install" component={InstallView} />
              <AuthRoute exact path="/settings" component={SettingsView} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
