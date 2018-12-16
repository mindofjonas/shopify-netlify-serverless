import dotenv from "dotenv";
import cookie from "cookie";
import simpleOauth from "simple-oauth2";
dotenv.config();

const shopifyApiBaseUrl = "myshopify.com";
const baseUrl = process.env.BASE_URL;

export const config = {
  clientId: process.env.SHOPIFY_API_KEY,
  clientSecret: process.env.SHOPIFY_API_SECRET,
  tokenHost: shopifyApiBaseUrl,
  authorizePath: `${shopifyApiBaseUrl}/admin/oauth/authorize`,
  tokenPath: `${shopifyApiBaseUrl}/admin/oauth/access_token`,
  redirect_uri: `${baseUrl}/.netlify/functions/shopify-auth-callback`
};

export function isValidHostname(shopHostName) {
  return (
    shopHostName &&
    typeof shopHostName === "string" &&
    shopHostName.includes("myshopify.com") &&
    /^[a-zA-Z0-9-\s\.]*$/.test(shopHostName)
  );
}
export function getStateFromCookies(headers) {
  const cookieStr = headers ? headers.cookie || "" : "";
  const cookies = cookie.parse(cookieStr);
  return cookies.state ? cookies.state : null;
}

export function getShopFromHostname(shopHostName) {
  return shopHostName && typeof shopHostName === "string"
    ? shopHostName
        .trim()
        .replace(/\/$/, "")
        .replace(".myshopify.com", "")
    : null;
}

export default function oauth2Instance(shop) {
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
