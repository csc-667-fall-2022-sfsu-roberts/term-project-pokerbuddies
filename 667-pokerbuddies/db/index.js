
/*const pgp = require('pg-promise')();
const db = pgp('postgres://students:student@localhost:5432/playerstats')

db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })
//const connection = pgp(db);//DATABASE_URL);
const connection = pgp(process.env.db);
module.exports = connection;*/
console.log({
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV
});
const pgp = require('pg-promise')();
const connection = pgp('postgres://stats_99ty_user:RFbyIf3x5WANM3iae1kSWuL0dLIHvAvA@dpg-cdel6r4gqg4d3ggr0fr0-a.oregon-postgres.render.com/stats_99ty?ssl=true');
module.exports = connection;