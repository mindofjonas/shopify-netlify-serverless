import React, { Component } from "react";
import axios from "axios";
import Auth from "../utils/Auth";

class DashboardView extends Component {
  state = { products: [] };
  componentDidMount() {
    this.getProducts();
  }
  async getProducts() {
    try {
      const response = await axios("/.netlify/functions/get-products", {
        headers: {
          Authorization: Auth.getToken()
        },
        withCredentials: true
      });

      this.setState({ products: response.data.products });
    } catch (error) {
      console.log("Error retrieving products");
    }
  }
  render() {
    const { products } = this.state;
    return (
      <section>
        <h1>Logged In View</h1>
        Products:
        <ul className="products-list">
          {products &&
            products.map(product => <li key={product.id}>{product.title}</li>)}
        </ul>
      </section>
    );
  }
}

export default DashboardView;
