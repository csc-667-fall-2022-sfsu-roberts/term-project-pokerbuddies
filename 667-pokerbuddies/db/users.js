const db = require('./index.js')
///used in registration and login
const createUser = (username,password) => db.one('INSERT INTO user_table (username,password) VALUES (${username}, ${password}) RETURNING userid',{username, password})
const doesUserExist= (username) => db.one('SELECT EXISTS(SELECT * FROM user_table WHERE username=${username})',{username})
const createPlayer = (userid) => db.one('INSERT INTO player_table (userid) VALUES (${userid}) RETURNING playerid',{userid})
const getUser = (username) => db.one('SELECT * FROM user_table WHERE username=${username}', {username})
const getUserID = (userid) => db.one('SELECT * FROM user_table WHERE userid=${userid}', {userid})
const getPlayer = (playerid) => db.one('SELECT * FROM player_table WHERE playerid=${playerid}',{playerid})
const deletePlayerUserId = (userid) => db.one('DELETE FROM player_table WHERE userid=${userid}',{userid});
const deletePlayerPlayerId = (playerid) => db.one('DELETE FROM player_table WHERE playerid=${playerid}',{playerid});
const insertPlayerChips = (playerid, chips) => db.one('UPDATE player_table SET chips = ${chips} WHERE playerid=${playerid}',{playerid, chips})
 

//return single values 
//testtt
const getUserSocketDb = (userid) => db.one('SELECT socket FROM user_table WHERE userid=${userid}',{userid})
const getUserIdDb = (username) => db.one('SELECT userid FROM user_table WHERE username=${username}',{username})
const  getPlayerIdDb = (userid) =>  db.one('SELECT playerid FROM player_table WHERE userid=${userid}',{userid})
 const  getPlayerChipsDb = (playerid) => db.one('SELECT chips FROM player_table WHERE playerid=${playerid}',{playerid})
const  getPlayerChipsWonDb = (playerid) => db.one('SELECT chipswon FROM player_table WHERE playerid=${playerid}',{playerid})

//updates chips
const updatePlayerChipsDb = (playerid,chips) => {
    return db.any('UPDATE player_table  SET "chips"=$1 WHERE playerid=$2',[chips,playerid])
                .catch(err => {
                     console.log("error updating player chips");
                              return Promise.resolve(err);
                            })
                          }
// deletes a player with playerid
const deletePlayerPlayerIdDb = (playerid) => {
        return db.any('DELETE FROM player_table WHERE playerid = $1',[playerid])
                .catch(err => {
                         console.log("error updating player chips");
                     return Promise.resolve(err);
                                 })
                              }  
//deletes player with userid
const deletePlayerUserIdDb = (userid) => {
                                return db.any('DELETE FROM player_table WHERE userid = $1',[userid])
                                        .catch(err => {
                                                 console.log("error updating player chips");
                                             return Promise.resolve(err);
                                                         })
                                                      }  
//updates chips won
const updatePlayerWonChipsDb = (playerid,chipswon) => {
            return db.any('UPDATE player_table  SET "chipswon"=$1 WHERE playerid=$2',[chipswon,playerid])
                    .catch(err => {
                         console.log("error updating player chips");
                             return Promise.resolve(err);
                                    })
                                   }                                        

module.exports = {
    getUserSocketDb ,
    deletePlayerUserIdDb,
    deletePlayerPlayerIdDb,
    getPlayerChipsWonDb ,
    updatePlayerWonChipsDb ,
    updatePlayerChipsDb,
    getPlayerChipsDb,
    getPlayerIdDb,
    getUserIdDb,
createUser,
doesUserExist,
createPlayer,
getUser,
getPlayer,
deletePlayerUserId,
deletePlayerPlayerId,
insertPlayerChips,
getUserID
}; 