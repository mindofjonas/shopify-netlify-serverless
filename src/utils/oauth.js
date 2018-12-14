import simpleOauth from "simple-oauth2";

const shopifyApiUrl = "https://app.intercom.io";
const baseUrl = process.env.BASE_URL;

export const config = {
  clientId: process.env.SHOPIFY_API_KEY,
  clientSecret: process.env.SHOPIFY_API_SECRET,
  /* Intercom oauth API endpoints */
  tokenHost: shopifyApiUrl,
  authorizePath: `${shopifyApiUrl}/oauth`,
  tokenPath: `${shopifyApiUrl}/auth/eagle/token`,
  profilePath: `${shopifyApiUrl}/me/`,
  /* redirect_uri is the callback url after successful signin */
  redirect_uri: `${baseUrl}/.netlify/functions/shopify-auth-callback`
};

function authInstance(credentials) {
  if (!credentials.client.id) {
    throw new Error("MISSING REQUIRED ENV VARS. Please set SHOPIFY_API_KEY");
  }
  if (!credentials.client.secret) {
    throw new Error("MISSING REQUIRED ENV VARS. Please set SHOPIFY_API_SECRET");
  }
  // return oauth instance
  return simpleOauth.create(credentials);
}

/* Create oauth2 instance to use in our two functions */
export default authInstance({
  client: {
    id: config.clientId,
    secret: config.clientSecret
  },
  auth: {
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizePath
  }
});
