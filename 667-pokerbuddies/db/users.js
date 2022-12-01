const db = require('./index.js')
const createUser = (username,password) => db.one('INSERT INTO user_table (username,password) VALUES (${username}, ${password}) RETURNING userid',{username, password})
const doesUserExist= (username) => db.one('SELECT EXISTS(SELECT * FROM user_table WHERE username=${username})',{username})
const createPlayer = (userid) => db.one('INSERT INTO player_table (userid) VALUES (${userid}) RETURNING playerid',{userid})

module.exports = {
    createUser,
    doesUserExist,
/*,
findUser*/
createPlayer


}; 