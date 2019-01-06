import config from "../config";
import {
  oauth2,
  isValidHostname,
  getKeyFromCookies,
  getShopFromHostname,
  createToken,
  saveShop
} from "./utils";

const knexDialect = require('knex/lib/dialects/postgres');
const knex = require("knex")({ ...config.database,
  client: knexDialect
});

exports.handler = (event, context, callback) => {
  const {
    code,
    state,
    shop: shopHostname
  } = event.queryStringParameters;
  const shop = getShopFromHostname(shopHostname);
  const storedState = getKeyFromCookies(event.headers, "state");

  // bail if state is invalid or shop is incorrect format
  if (
    typeof state !== "string" ||
    state !== storedState ||
    !shop ||
    !isValidHostname(shopHostname)
  ) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: "Error validating authentication request"
      })
    });
  }

  // oauth flow
  oauth2(shop)
    .authorizationCode.getToken({
      code: code,
      redirect_uri: config.redirect_uri,
      client_id: config.clientId,
      client_secret: config.clientSecret
    })
    .then(response => {
      const accessToken = oauth2(shop).accessToken.create(response);
      return accessToken;
    })
    .then(response => {
      // do stuff with shop data & token (save to database, make API calls, etc) here
      saveShop(shopHostname, response.token.access_token, knex).then(shop => {
        console.log(shop);
        // create jwt
        const token = createToken({
          shop: shopHostname
        });

        // return results to browser with token in cookie
        return callback(null, {
          statusCode: 302,
          headers: {
            Location: `${config.appUrl}?token=${encodeURIComponent(token)}`,
          },
          body: ""
        });
      }).catch(error => error)
    })
    .catch(error => {
      console.log("Authentication Error", error.message);
      return callback(null, {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          error: error.message
        })
      });
    });
};
