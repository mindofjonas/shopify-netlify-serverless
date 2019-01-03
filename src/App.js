import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import AuthRoute from "./components/Auth/AuthRoute";
import DashboardView from "./views/DashboardView";
import InstallView from "./views/InstallView";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <section className="app-header">
            Routes:
            <ul>
              <li>
                <Link to="/">Install</Link>
              </li>
              <li>
                <Link to="/install">Dashboard (Protected)</Link>
              </li>
            </ul>
          </section>
          <div className="app-content">
            <Switch>
              <AuthRoute exact path="/" component={DashboardView} />
              <AuthRoute exact path="/install" component={InstallView} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
