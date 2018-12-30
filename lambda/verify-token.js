import config from "../config";
import {
  getKeyFromCookies,
  verifyToken
} from "./utils";

exports.handler = (event, context, callback) => {
  const token = getKeyFromCookies(event.headers, "token");

  // bail if not GET request
  if (event.httpMethod !== "GET") {
    return callback(null, {
      statusCode: 405,
      body: JSON.stringify({
        error: "Method Not Allowed"
      })
    });
  }

  try {
    const decodedToken = verifyToken(token);
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        authenticated: true,
        shop: decodedToken.shop
      })
    });
  } catch (error) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message
      })
    });
  }
};
