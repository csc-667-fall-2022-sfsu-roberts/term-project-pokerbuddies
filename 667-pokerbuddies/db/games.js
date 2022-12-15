const db = require('./index.js')


//return single values
 const getPlayerCountDb = (lobbyid) => db.one('SELECT playercount FROM gamelobby_table WHERE lobbyid=${lobbyid}',{lobbyid})
 const getTurnOrderDb = (lobbyid) => db.one('SELECT turnorder FROM gamelobby_table WHERE lobbyid=${lobbyid}',{lobbyid})
 const getPotDb = (lobbyid) => db.one('SELECT pot FROM gamelobby_table WHERE lobbyid=${lobbyid}',{lobbyid})
const getCustomBetDb= (playerid) => db.one('SELECT custombet FROM playerhand_table WHERE playerid=${playerid}',{playerid})
const getCardIdDb = (playerid) => db.one('SELECT cardid FROM playerhand_table WHERE playerid=${playerid}',{playerid})


//update player count
 const updatePlayerCountDb = (lobbyid,playercount) => {
    return db.any('UPDATE gamelobby_table SET "playercount"=$1 WHERE lobbyid=$2',[playercount,lobbyid])
                .catch(err => {
                              return Promise.resolve(err);
                            })
                          }
//update turn order
  const setTurnOrderDb= (lobbyid,turnorder) => {
           return db.any('UPDATE gamelobby_table SET "turnorder"=$1 WHERE lobbyid=$2',[turnorder,lobbyid])
                 .catch(err => {
                   return Promise.resolve(err);
                            })
                              }
//update pot
  const setPotDb = (lobbyid,pot) => {
             return db.any('UPDATE gamelobby_table SET "pot"=$1 WHERE lobbyid=$2',[pot,lobbyid])
                .catch(err => {
                      return Promise.resolve(err);
                         })
                     }   
  //insert playerhand                    
 const insertPlayerHandDb = (lobbyid,playerid) => {
                        return db.any('INSERT INTO playerhand_table (lobbyid,playerid) VALUES ($1, $2)',[lobbyid,playerid])
                           .catch(err => {
                                 return Promise.resolve(err);
                                    })
                                } 
//delete player
 const deletePlayerHandDb= (playerid) => {
                                    return db.any('DELETE FROM playerhand_table WHERE playerid = $1',[playerid])
                                            .catch(err => {
                                                 return Promise.resolve(err);
                                                             })
                                                          } 
//update custom bet
  const updateCustomBetDb = (playerid,custombet) => {
           return db.any('UPDATE playerhand_table SET "custombet"=$1 WHERE playerid=$2',[custombet,playerid])
                      .catch(err => {
                         return Promise.resolve(err);
                                })
          } 
const setPlayerHandCardDb = (playerid,cardid) => {
            return db.any('UPDATE playerhand_table SET "cardid"=$1 WHERE playerid=$2',[playerid,cardid])
               .catch(err => {
                     return Promise.resolve(err);
                        })
                    }  
          
module.exports = {
    getCardIdDb,
    setPlayerHandCardDb ,
    getCustomBetDb ,
    updateCustomBetDb ,
    deletePlayerHandDb,
    insertPlayerHandDb ,
    getPotDb,
    getTurnOrderDb,
    updatePlayerCountDb,
    setTurnOrderDb,
    setPotDb,
    getPlayerCountDb  
    
    }; 
    