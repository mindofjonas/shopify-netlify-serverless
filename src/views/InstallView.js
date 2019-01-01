import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const InstallView = ({ authenticated }) => {
  return authenticated ? <Redirect to="/" /> : <section>Install View</section>;
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(InstallView);
