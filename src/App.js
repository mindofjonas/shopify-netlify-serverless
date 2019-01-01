import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import AuthRoute from "./components/Auth/AuthRoute";
import DashboardView from "./views/DashboardView";
import SettingsView from "./views/SettingsView";
import InstallView from "./views/InstallView";
import { authenticateShop } from "./components/Auth/AuthActions";
import "./App.css";

class App extends Component {
  async componentDidMount() {
    await this.props.authenticateShop();
  }
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
              <Route exact path="/install" component={InstallView} />
              <AuthRoute exact path="/settings" component={SettingsView} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default connect(
  null,
  { authenticateShop }
)(App);
