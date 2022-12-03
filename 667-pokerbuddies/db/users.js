const db = require('./index.js')
const createUser = (username,password) => db.one('INSERT INTO user_table (username,password) VALUES (${username}, ${password}) RETURNING userid',{username, password})
const doesUserExist= (username) => db.one('SELECT EXISTS(SELECT * FROM user_table WHERE username=${username})',{username})
const createPlayer = (userid) => db.one('INSERT INTO player_table (userid) VALUES (${userid}) RETURNING playerid',{userid})
const getUser = (username) => db.one('SELECT * FROM user_table WHERE username=${username}', {username})
const createNonUserPlayer = () => db.one('INSERT INTO player_table DEFAULT VALUES')
const deletePlayerUserId = (userid) => db.one('DELETE FROM player_table WHERE userid=${userid}',{userid});
const deletePlayerPlayerId = (playerid) => db.one('DELETE FROM player_table WHERE playerid=${playerid}',{playerid});


module.exports = {
createUser,
doesUserExist,
createPlayer,
getUser,
createNonUserPlayer,
deletePlayerUserId,
deletePlayerPlayerId 
}; 