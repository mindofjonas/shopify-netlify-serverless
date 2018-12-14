/* const dotenv = require("dotenv").config();
const crypto = require("crypto");
const cookie = require("cookie");
const querystring = require("querystring");
const request = require("request-promise");

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyLoop = false;
  let response;

  if (event.queryStringParameters) {
    const { shop, hmac, code, state } = event.queryStringParameters;
    const stateCookie = cookie.parse(event.headers.Cookie).state;
    if (state !== stateCookie) {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "Request origin cannot be verified"
        })
      };
      callback(null, response);
    }

    if (shop && hmac && code) {
      const map = Object.assign({}, event.queryStringParameters);
      delete map["signature"];
      delete map["hmac"];
      const message = querystring.stringify(map);
      const generatedHash = crypto
        .createHmac("sha256", apiSecret)
        .update(message)
        .digest("hex");

      if (generatedHash !== hmac) {
        response = {
          statusCode: 400,
          body: JSON.stringify({
            message: "HMAC validation failed"
          })
        };
        callback(null, response);
      }

      const accessTokenRequestUrl =
        "https://" + shop + "/admin/oauth/access_token";
      const accessTokenPayload = {
        client_id: apiKey,
        client_secret: apiSecret,
        code
      };

      // save the token to the database

      request
        .post(accessTokenRequestUrl, { json: accessTokenPayload })
        .then(accessTokenResponse => {
          const accessToken = accessTokenResponse.access_token;

          const shopRequestUrl = "https://" + shop + "/admin/shop.json";
          const shopRequestHeaders = {
            "X-Shopify-Access-Token": accessToken
          };

          request
            .get(shopRequestUrl, { headers: shopRequestHeaders })
            .then(shopResponse => {
              console.log("Things worked!");
              console.log(shopResponse);
              response = {
                statusCode: 200,
                body: JSON.stringify({
                  message: "Got an access token, let's do something with it"
                })
              };
              callback(null, response);
            })
            .catch(error => {
              response = {
                statusCode: error.statusCode,
                body: JSON.stringify({
                  message: error.error.error_description
                })
              };
              callback(null, response);
            });
        })
        .catch(error => {
          response = {
            statusCode: error.statusCode,
            body: JSON.stringify({
              message: error.error.error_description
            })
          };
          callback(null, response);
        });
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "Required parameters missing"
        })
      };
      callback(null, response);
    }
  } else {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something else went wrong"
      })
    };
    callback(null, response);
  }
}; */
