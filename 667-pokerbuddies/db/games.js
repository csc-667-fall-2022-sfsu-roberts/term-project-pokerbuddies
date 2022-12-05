const db = require('./index.js')
// const createPlayerHand = ()=> db.one('',{})
const createGameLobby = (deckid)=> db.one('INSERT INTO gamelobby_table (deckid) VALUES(${deckid}) RETURNING lobbyid',{deckid})
const insertPlayerHandIntoGameLobby = (playerid,lobbyid) => db.one('INSERT INTO gamelobby_table (playerid) VALUES(${playerid}) WHERE lobbyid=${lobbyid}',{playerid,lobbyid})
const createDeck = (cardid)=> db.one('INSERT INTO deck_table (cardid) VALUES(${cardid})',{cardid})
const insertCardIntoDeckTable = (cardid,deckid) => db.one('INSERT INTO deck_table (cardid) VALUES(${cardid}) WHERE deckid=${deckid}',{cardid,deckid})
const createPlayerHand = (playerid)=> db.one('INSERT INTO playerhand_table (playerid) VALUES(${playerid})',{playerid})
const insertCardIntoPlayerHand  = (playerid,cardid)=> db.one('INSERT INTO playerhand_table (cardid) VALUES(${cardid}) WHERE playerid=${playerid}',{playerid,cardid})
const createRiver  = (cardid,gamelobbyid)=> db.one('INSERT INTO river_table  (cardid,gamelobbyid) VALUES(${cardid},${gamelobbyid})',{cardid,gamelobbyid})
const insertCardIntoRiverTable =  (cardid,gamelobbyid)=> db.one('INSERT INTO river_table  (cardid) VALUES(${cardid}) WHERE gamelobbyid=${gamelobbyid}',{cardid,gamelobbyid})
const getCard =  (suit)=> db.one('SELECT * FROM card_table WHERE suit=${suit}',{suit})
///insert lobby id into player

module.exports = {
    insertPlayerHandIntoGameLobby,
   createGameLobby,
    createDeck,
    insertCardIntoDeckTable,
    createPlayerHand,
    insertCardIntoPlayerHand ,
    createRiver,
    insertCardIntoRiverTable,
    getCard
    
    }; 
    