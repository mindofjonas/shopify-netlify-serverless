/*  const dotenv = require("dotenv").config();
const crypto = require("crypto");
const cookie = require("cookie");
const querystring = require("querystring");
const request = require("request-promise");

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET; */

exports.handler = (event, context, callback) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: "Success"
      })
    });
};
