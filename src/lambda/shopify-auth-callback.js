import config from "../../config";
import oauth2, {
  isValidHostname,
  getStateFromCookies,
  getShopFromHostname
} from "../utils/oauth";

exports.handler = (event, context, callback) => {
  const { code, state, shop: shopHostname } = event.queryStringParameters;
  const shop = getShopFromHostname(shopHostname);
  const storedState = getStateFromCookies(event.headers);

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
    .then(result => {
      const token = oauth2(shop).accessToken.create(result);
      console.log("accessToken", token);
      return token;
    })
    // Get more info about shop
    //.then(getStoreData)
    // Do stuff with shop data & token
    .then(result => {
      console.log("result", result);
      // return results to browser
      /* return callback(null, {
        statusCode: 200,
        body: JSON.stringify(result)
      }); */
      return callback(null, {
        statusCode: 302,
        headers: {
          Location: config.appUrl
          /* "Set-Cookie": `state=${state}`,
          "Access-Control-Allow-Credentials": true,
          "Cache-Control": "no-cache" */
        },
        body: ""
      });
    })
    .catch(error => {
      console.log("Access Token Error", error.message);
      console.log(error);
      return callback(null, {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          error: error.message
        })
      });
    });
};
