import cookie from "cookie";
import simpleOauth from "simple-oauth2";
import jwt from "jsonwebtoken";
import axios from "axios";
import util from 'util';
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
    throw new Error("Token Required");
  }
  try {
    return jwt.verify(token, config.appSecret);
  } catch (error) {
    throw new Error("Authentication Failed");
  }
}

export function shopifyAPI(shopHostName, accessToken, endpoint, options) {
  return axios(`https://${shopHostName+endpoint}`, { ...options,
    headers: {
      "X-Shopify-Access-Token": accessToken
    },
    withCredentials: true
  })
}

export function saveShop(shopHostName, accessToken, knex) {
  const insert = knex('shops').insert({
    shopify_domain: shopHostName,
    access_token: accessToken
  }).toString();

  const update = knex('shops')
    .update({
      access_token: accessToken
    })
    .whereRaw(`shops.shopify_domain = '${shopHostName}'`);
  const query = util.format(
    '%s ON CONFLICT (shopify_domain) DO UPDATE SET %s',
    insert.toString(),
    update.toString().replace(/^update\s.*\sset\s/i, '')
  );

  return knex.raw(query);
}

export function getShop(shopHostName, knex) {
  return knex('shops').where({
    shopify_domain: shopHostName
  }).select(['shopify_domain', 'access_token']);
}
