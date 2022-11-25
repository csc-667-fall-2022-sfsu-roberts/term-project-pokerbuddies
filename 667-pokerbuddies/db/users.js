const db = require('./index.js')
const createUser = (username,password) => db.one('INSERT INTO user_table (username,password) VALUES (${username}, ${password}) RETURNING userid',{username, password})
const findUser = (username) => db.one('SELECT * FROM user_table WHERE username=${username}',{username})
const createPlayer = (userid) => db.one('INSERT INTO player_table (userid) VALUES (${userid})',{userid})

module.exports = {
createUser,
findUser,
createPlayer


}; 