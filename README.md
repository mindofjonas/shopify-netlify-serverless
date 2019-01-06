# Shopify Netlify Serverless App

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mindofjonas/shopify-netlify-serverless)

Simple proof of concept on hosting a Shopify Saas app on Netlify using Netlify Functions for OAuth and the app's API. Feel free to fork/improve.

Functionality:

- `simple-oauth2` for handling Oauth flow
- JWT stored in token to store shop name for API calls
- Netlify Functions for hosting
- React/Redux frontend app hosted on Netlify with protected and public routes
- PostgreSQL for database. (See `./migrations` for knex schema)

Required Environment Variables:

```
SHOPIFY_API_KEY = "Shopify API Key"
SHOPIFY_API_SECRET = "Shopify API Secret"
APP_URL = "Public (https) Netlify URL of the app. Must match url in Shopify app settings"
APP_SECRET = "Secret for signing JWT"
DATABASE_URL = "Postgres database URL"
```

**Important:** Add `APP_URL/.netlify/functions/shopify-auth-callback` to the list of whitelisted redirection URL(s) for the Shopify app.

Next Steps:

- Use [Shopify Polaris](https://polaris.shopify.com) for frontend app UI
- Look into using [Shopify App Bridge](https://help.shopify.com/en/api/embedded-apps/app-bridge) to embedded app in Shopify admin
- Add Netlify Functions endpoints for handling Shopify webhooks

Thanks to @DavidWells for providing the original inspiration for this project with his [Netlify + Intercom Oauth ](https://github.com/DavidWells/intercom-netlify-oauth) project.
