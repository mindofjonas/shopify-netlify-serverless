import config from "../config";
import {
  oauth2,
  createToken
} from "./utils";

exports.handler = (event, context, callback) => {
  const {
    shop
  } = event.queryStringParameters;
  const state = createToken({
    shop,
  }, {
    expiresIn: 120
  });

  // bail if not GET request
  if (event.httpMethod !== "GET") {
    return callback(null, {
      statusCode: 405,
      body: JSON.stringify({
        error: "Method Not Allowed"
      })
    });
  }

  // bail if shop missing
  if (!shop) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing Shop Parameter"
      })
    });
  }

  // oauth flow
  const authorizationURI = oauth2(shop).authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
    scope: "read_products",
    state: state
  });

  console.log(authorizationURI)
  // redirect to authorization url
  return callback(null, {
    statusCode: 302,
    headers: {
      Location: authorizationURI
    }
  });
};
