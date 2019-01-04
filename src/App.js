import React, { Component } from "react";
import "./App.css";
import Routes from "./routes/Routes";
import Auth from "./utils/Auth";

class App extends Component {
  componentWillMount() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("token")) {
      Auth.authenticateShop(params.get("token"));
    }
  }
  render() {
    return <Routes />;
  }
}

export default App;
