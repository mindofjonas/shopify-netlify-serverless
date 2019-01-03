import React, { Component } from "react";

class InstallView extends Component {
  state = { shopName: "" };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.shopName) {
      alert("Please enter your Shopify store name");
    } else {
      window.location = `/.netlify/functions/shopify-auth?shop=${
        this.state.shopName
      }.myshopify.com`;
    }
  };
  render() {
    return (
      <section>
        <h1>Shopify Netlify Serverless</h1>
        <p>
          Simple proof of concept on hosting a Shopify app on Netlify using
          Netlify Lambda functions for OAuth.
        </p>
        <form className="install-form" onSubmit={this.handleSubmit}>
          <div className="shop-name">
            <input
              name="shopName"
              type="text"
              placeholder="your-shopify-store"
              value={this.state.shopName}
              onChange={this.handleChange}
            />
            <span>.myshopify.com</span>
          </div>
          <button>Install</button>
        </form>
      </section>
    );
  }
}

export default InstallView;
