const webpack = require('webpack')
/* const path = require('path')
const slsw = require('serverless-webpack') */

module.exports = {
  plugins: [
    new webpack.IgnorePlugin(/mariasql/, /\/knex\//),
    new webpack.IgnorePlugin(/mssql/, /\/knex\//),
    new webpack.IgnorePlugin(/mysql/, /\/knex\//),
    new webpack.IgnorePlugin(/mysql2/, /\/knex\//),
    new webpack.IgnorePlugin(/oracle/, /\/knex\//),
    new webpack.IgnorePlugin(/oracledb/, /\/knex\//),
    new webpack.IgnorePlugin(/pg-query-stream/, /\/knex\//),
    new webpack.IgnorePlugin(/sqlite3/, /\/knex\//),
    new webpack.IgnorePlugin(/strong-oracle/, /\/knex\//),
    new webpack.IgnorePlugin(/pg-native/, /\/pg\//),
  ],
  externals: ['pg-native'],
}
