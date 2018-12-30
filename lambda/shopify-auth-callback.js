import config from "../config";
import {
  oauth2,
  isValidHostname,
  getKeyFromCookies,
  createCookie,
  getShopFromHostname,
  createToken
} from "./utils";

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

      // create jwt
      const token = createToken({
        shop: shopHostname,
        access_token: response.token.access_token
      });

      // return results to browser with token in cookie
      return callback(null, {
        statusCode: 302,
        headers: {
          Location: `${config.appUrl}`,
          "Set-Cookie": createCookie("token", token, {
            secure: true,
            httpOnly: true
          }),
          "Access-Control-Allow-Credentials": true,
          "Cache-Control": "no-cache"
        },
        body: ""
      });
    })
    .catch(error => {
      console.log("Access Token Error", error.message);
      return callback(null, {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          error: error.message
        })
      });
    });
};
