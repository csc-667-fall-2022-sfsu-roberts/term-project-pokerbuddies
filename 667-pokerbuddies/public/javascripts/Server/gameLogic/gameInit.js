const Gamedb = require("../../../../db/games");

const setPlayers = (game_id) => (players) =>{
    Promise.add(players.map((player, index)=>
    Gamedb.setPlayerSeat(game_id,player.id,index)))
    .then(()=> players);
}

const deal = (game_id) => (players)

const init = (game_id) => {
    return Gamedb.insertCardIntoDeckTable(game_id)
    .then(()=>Gamedb.getPlayers(game_id))
    .then(setPlayers(game_id))
    .then(deal(game_id))
    .then(dealRiver(game_id));
}

module.exports= init;