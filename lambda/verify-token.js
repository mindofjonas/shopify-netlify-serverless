import {
  getKeyFromCookies,
  verifyToken,
  createCookie
} from "./utils";

exports.handler = (event, context, callback) => {
  const token = getKeyFromCookies(event.headers, "token");
  console.log(token);

  // bail if not GET request
  if (event.httpMethod !== "GET") {
    return callback(null, {
      statusCode: 405,
      body: JSON.stringify({
        error: "Method Not Allowed"
      })
    });
  }

  try {
    const decodedToken = verifyToken(token);

    // Add check if shop exists in database here

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        authenticated: decodedToken ? true : false,
        shop: decodedToken ? decodedToken.shop : null
      })
    });
  } catch (error) {
    return callback(null, {
      statusCode: 400,
      headers: {
        "Set-Cookie": createCookie("token", 'unauthenticated', {
          secure: true,
          httpOnly: true,
          path: '/'
        })
      },
      body: JSON.stringify({
        error: error.message
      })
    });
  }
};
