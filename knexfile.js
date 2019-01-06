require('dotenv').config();

module.exports = {
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
