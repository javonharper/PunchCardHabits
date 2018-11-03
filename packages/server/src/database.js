const PG_CONNECTION_STRING = process.env.PG_CONNECTION_STRING

const config = {
  client: 'pg',
  connection: PG_CONNECTION_STRING,
}

const knex = require('knex')(config)

module.exports = knex
