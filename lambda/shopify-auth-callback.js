import Knex from "knex";
import config from "../config";
import {
  oauth2,
  isValidHostname,
  getKeyFromCookies,
  getShopFromHostname,
  createToken,
  saveShop
} from "./utils";

exports.handler = async (event, context, callback) => {
  const {
    code,
    state,
    shop: shopHostname
  } = event.queryStringParameters;
  const shop = getShopFromHostname(shopHostname);
  const storedState = getKeyFromCookies(event.headers, "state");
  const knex = Knex(config.database);

  context.callbackWaitsForEmptyEventLoop = false;

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
  try {
    const oauthRsponse = await oauth2(shop)
      .authorizationCode.getToken({
        code: code,
        redirect_uri: config.redirect_uri,
        client_id: config.clientId,
        client_secret: config.clientSecret
      })

    const tokenResponse = await oauth2(shop).accessToken.create(oauthRsponse);

    const dbResponse = await saveShop(shopHostname, tokenResponse.token.access_token, knex);

    knex.client.destroy();
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
  } catch (error) {
    console.log("Authentication Error", error.message);
    knex.client.destroy();
    return callback(null, {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message
      })
    });
  };
};
