import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ authenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return !authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: props.location }
            }}
            push
          />
        );
      }}
    />
  );
};

export default PublicRoute;
