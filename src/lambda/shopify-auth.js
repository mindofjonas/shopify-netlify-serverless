import oauth2, { config } from "../utils/oauth";

/* Do initial auth redirect */
exports.handler = (event, context, callback) => {
  /* Generate authorizationURI */
  const authorizationURI = oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
    /* Specify how your app needs to access the user’s account. http://bit.ly/intercom-scopes */
    scope: "",
    /* State helps mitigate CSRF attacks & Restore the previous state of your app */
    state: ""
  });

  /* Redirect user to authorizationURI */
  const response = {
    statusCode: 302,
    headers: {
      Location: authorizationURI,
      "Cache-Control": "no-cache" // Disable caching of this response
    },
    body: "" // return body for local dev
  };

  return callback(null, response);
};
/* const dotenv = require("dotenv").config();
const nonce = require("nonce")();

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = "read_products";
const forwardingAddress = process.env.BASE_URL;

exports.handler = (event, context, callback) => {
  let response;

  if (
    typeof event.queryStringParameters != "null" &&
    typeof event.queryStringParameters.shop != "null"
  ) {
    const shop = event.queryStringParameters.shop;
    const state = nonce();
    const redirectUri =
      forwardingAddress + "/.netlify/functions/shopify-auth-callback";
    const installUrl =
      "https://" +
      shop +
      "/admin/oauth/authorize?client_id=" +
      apiKey +
      "&scope=" +
      scopes +
      "&state=" +
      state +
      "&redirect_uri=" +
      redirectUri;

    response = {
      statusCode: 301,
      headers: {
        "Set-Cookie": "state=" + state + ";",
        Cookie: "state=" + state + ";",
        Location: installUrl
      },
      body: null
    };
  } else {
    response = {
      statusCode: 400,
      body: JSON.stringify({
        message:
          "Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request"
      })
    };
  }

  callback(null, response);
};
 */
