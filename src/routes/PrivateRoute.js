import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ authenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
            push
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
