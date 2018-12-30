import cookie from "cookie";
import simpleOauth from "simple-oauth2";
import jwt from "jsonwebtoken";
import config from "../../config";

export function isValidHostname(shopHostName) {
  return (
    shopHostName &&
    typeof shopHostName === "string" &&
    shopHostName.includes("myshopify.com") &&
    /^[a-zA-Z0-9-\s\.]*$/.test(shopHostName)
  );
}
export function getKeyFromCookies(headers, key) {
  const cookieStr = headers ? headers.cookie || "" : "";
  const cookies = cookie.parse(cookieStr);
  return cookies[key] ? cookies[key] : null;
}

export function createCookie(name, content, options = null) {
  return cookie.serialize(name, content, options);
}

export function getShopFromHostname(shopHostName) {
  return shopHostName && typeof shopHostName === "string" ?
    shopHostName
    .trim()
    .replace(/\/$/, "")
    .replace(".myshopify.com", "") :
    null;
}

export function oauth2(shop) {
  const credentials = {
    client: {
      id: config.clientId,
      secret: config.clientSecret
    },
    auth: {
      tokenHost: `https://${shop}.${config.tokenHost}`,
      tokenPath: `https://${shop}.${config.tokenPath}`,
      authorizePath: `https://${shop}.${config.authorizePath}`
    }
  };

  if (!credentials.client.id) {
    throw new Error("MISSING REQUIRED ENV VARS. Please set SHOPIFY_API_KEY");
  }
  if (!credentials.client.secret) {
    throw new Error("MISSING REQUIRED ENV VARS. Please set SHOPIFY_API_SECRET");
  }
  return simpleOauth.create(credentials);
}

export function createToken(data) {
  return jwt.sign(data, config.appSecret);
}

export function verifyToken(token) {
  if (!token) {
    throw new Error("Authorization Required");
  }
  try {
    return jwt.verify(token, config.appSecret);
  } catch (error) {
    throw new Error("Authentication Failed");
  }
}
