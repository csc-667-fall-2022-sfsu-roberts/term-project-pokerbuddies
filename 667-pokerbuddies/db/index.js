
console.log({
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV
});
const pgp = require('pg-promise')();
const connection = pgp('postgres://stats_99ty_user:RFbyIf3x5WANM3iae1kSWuL0dLIHvAvA@dpg-cdel6r4gqg4d3ggr0fr0-a.oregon-postgres.render.com/stats_99ty?ssl=true');
module.exports = connection;