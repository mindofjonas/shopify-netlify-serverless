import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authenticateShop } from "./AuthActions";

class AuthRoute extends React.Component {
  state = {};
  componentDidMount() {
    //this.props.authenticateShop();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname &&
      !this.props.loading
    ) {
      this.props.authenticateShop();
    }
  }

  render() {
    const {
      component: Component,
      authenticated,
      loading,
      ...rest
    } = this.props;
    return (
      <Route
        {...rest}
        render={routeProps => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (authenticated) {
            if (routeProps.location.pathname === "/install") {
              return <Redirect to="/" />;
            } else {
              return <Component {...routeProps} />;
            }
          } else {
            if (routeProps.location.pathname === "/install") {
              return <Component {...routeProps} />;
            } else {
              return <Redirect to="/install" />;
            }
          }
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    loading: state.auth.loading
  };
}
export default connect(
  mapStateToProps,
  { authenticateShop }
)(AuthRoute);
