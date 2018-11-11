exports.dbPool = function () {
  const {
    Pool
  } = require('pg')
  console.log('connecting to db pool')
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

    ssl: true
  })

  return pool
}

exports.pgQuery = function () {
  const pgQuery = require('pg-query')
  console.log('connecting with PGQuery...')
  const pgQ = pgQuery.connectionParameters = process.env.HEROKU_POSTGRESQL_NAVY_URL
  // pgQ.connectionParameters = process.env.HEROKU_POSTGRESQL_NAVY_URL || process.env.DEFAULT_URL;
  return pgQ
}

exports.usePGPromise = function () {


}
