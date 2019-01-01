import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authenticateShop } from "./AuthActions";

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    loading: state.auth.loading
  };
}

export default function withAuth(WrappedComponent) {
  return connect(
    mapStateToProps,
    { authenticateShop }
  )(
    class extends Component {
      componentDidMount() {
        this.props.authenticateShop();
      }

      render() {
        const { authenticated, loading } = this.props;
        if (loading) {
          return <div>Loading...</div>;
        }
        if (authenticated) {
          return <WrappedComponent {...this.props} />;
        } else {
          return <Redirect to="/install" />;
        }
      }
    }
  );
}
