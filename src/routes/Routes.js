import React from "react";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import DashboardView from "../views/DashboardView";
import InstallView from "../views/InstallView";
import Auth from "../utils/Auth";

const Routes = () => {
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
              <Link to="/dashboard">Dashboard (Protected)</Link>
            </li>
          </ul>
        </section>
        <div className="app-content">
          <Switch>
            <PublicRoute
              exact
              path="/"
              component={InstallView}
              authenticated={Auth.isShopAuthenticated()}
            />
            <PrivateRoute
              exact
              path="/dashboard"
              component={DashboardView}
              authenticated={Auth.isShopAuthenticated()}
            />
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  );
};

export default Routes;
