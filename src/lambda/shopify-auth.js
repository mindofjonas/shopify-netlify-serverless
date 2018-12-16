import * as crypto from "crypto";
import oauth2, { config } from "../utils/oauth";

exports.handler = (event, context, callback) => {
  const { shop } = event.queryStringParameters;
  const state = crypto.randomBytes(20).toString("hex");

  if (event.httpMethod !== "GET") {
    return callback(null, { statusCode: 405, body: "Method Not Allowed" });
  }

  if (!shop) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing shop parameter"
      })
    });
  }

  // create oauth flow
  const authorizationURI = oauth2(shop).authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
    scope: "write_orders",
    state: state
  });

  return callback(null, {
    statusCode: 302,
    headers: {
      Location: authorizationURI,
      "Set-Cookie": `state=${state}`,
      "Access-Control-Allow-Credentials": true,
      "Cache-Control": "no-cache"
    },
    body: ""
  });
};
