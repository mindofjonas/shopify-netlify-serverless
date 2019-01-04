# Shopify Netlify Serverless App

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mindofjonas/shopify-netlify-serverless)

Simple proof of concept on hosting a Shopify Saas app on Netlify using Netlify Functions for OAuth and the app's API. This is a work in progress. Feel free to fork/improve.

Functionality:

- `simple-oauth2` for handling Oauth flow
- JWT stored in HTTP only cookie to store shop name and access token between API calls since there's no db used to store sessions
- Netlify Functions for hosting
- React/Redux frontend app hosted on Netlify with protected and public routes

Required Environment Variables:

```
SHOPIFY_API_KEY = "Shopify API Key"
SHOPIFY_API_SECRET = "Shopify API Secret"
APP_URL = "Public (https) Netlify URL of the app. Must match url in Shopify app settings"
APP_SECRET = "Secret for signing JWT"
```

**Important:** Add `APP_URL/.netlify/functions/shopify-auth-callback` to the list of whitelisted redirection URL(s) for the Shopify app.

**Note:** This is a proof of concept - so it obviously shouldn't be used as is in production without hardening security/stateless session management.

Next Steps:

- Revisit how JWT is used to store shop data
- Save shop in database after successful Oauth and check on subsequent API calls
- Use [Shopify Polaris](https://polaris.shopify.com) for frontend app UI
- Look into using [Shopify App Bridge](https://help.shopify.com/en/api/embedded-apps/app-bridge) to embedded app in Shopify admin
- Add Netlify Functions endpoints for handling Shopify webhooks

Thanks to @DavidWells for providing the original inspiration for this project with his [Netlify + Intercom Oauth ](https://github.com/DavidWells/intercom-netlify-oauth) project.
