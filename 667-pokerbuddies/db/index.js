console.log({
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV
  });
const pgp = require('pg-promise')();
const connection = pgp('postgres://postgres:student@localhost:5432/PlayerStats');
module.exports = connection;