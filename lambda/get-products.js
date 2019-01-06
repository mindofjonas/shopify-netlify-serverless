import Knex from "knex";
import config from "../config";
import {
  verifyToken,
  shopifyAPI,
  getShop
} from "./utils";

exports.handler = async (event, context, callback) => {
  const token = event.headers.authorization;
  context.callbackWaitsForEmptyEventLoop = false;

  if (!token) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Unauthorized'
      })
    });
  }

  // bail if not GET request
  if (event.httpMethod !== "GET") {
    return callback(null, {
      statusCode: 405,
      body: JSON.stringify({
        error: "Method Not Allowed"
      })
    });
  }

  const knex = Knex(config.database);

  try {
    const decodedToken = await verifyToken(token);

    if (decodedToken.shop) {
      const dbResponse = await getShop(decodedToken.shop, knex);

      if (dbResponse[0]) {
        const shopResponse = await shopifyAPI(dbResponse[0].shopify_domain, dbResponse[0].access_token, '/admin/products.json');

        knex.client.destroy();

        return callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            products: shopResponse.data.products || []
          })
        });

      } else {
        throw new Error("Shop Not Found");
      }
    } else {
      throw new Error("Authentication Error");
    }

  } catch (error) {
    console.log(error)
    knex.client.destroy();
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message
      })
    });
  }
};
