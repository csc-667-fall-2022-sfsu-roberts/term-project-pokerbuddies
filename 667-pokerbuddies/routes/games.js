var express = require('express');
const { appendFile } = require('fs');
var router = express.Router();
var path = require('path');
// const Game = require('../public/javascripts/Server/Games');
//  let game = require('../../public/javascripts/Server/Games');

let reqPath = path.join(__dirname, '../');




router.get('/', function(req, res, next) {

  let player_1_Info = {
      id: 1,
      name: 'name_1',
      total_chips: 100,
      bet: 0
  };

  let player_2_Info = {
    id: 1,
    name: 'name_2',
    total_chips: 100,
    bet: 0
  };

  let player_3_Info = {
    id: 1,
    name: 'name_3',
    total_chips: 100,
    bet: 0
  };

  let player_4_Info = {
    id: 1,
    name: 'name_4',
    total_chips: 100,
    bet: 0
  };

  res.render("protected/game",{

    pot: '0000',

    player_1_name: player_1_Info.name,
    player_1_total: player_1_Info.total_chips,
    player_1_bet: player_1_Info.bet,

    player_2_name: player_2_Info.name,
    player_2_total: player_2_Info.total_chips,
    player_2_bet: player_2_Info.bet,

    player_3_name: player_3_Info.name,
    player_3_total: player_3_Info.total_chips,
    player_3_bet: player_3_Info.bet,

    player_4_name: player_4_Info.name,
    player_4_total: player_4_Info.total_chips,
    player_4_bet: player_4_Info.bet,


  });
  // const game = new Game();

});

router.post('/', function(req,res){
  const {bet, call, fold, raise} = req.body;
  
  res.render('protected/game',{

  })
});

//routes to joinSession page
router.get('/joinSession', function(req, res) {
  res.render("public/joinSession");

});
//routes to home page
router.get('/home', function(req, res) {
  res.render("public/home");

});














let rooms = [];


// io.on('connection',(socket)=>{
//     console.log("new connection ", socket.id);
//     socket.on('Host', (data)=>{
//       if(data.username == '' || data.username.length > 12){
//         socket.emit('hostRoom', undefined);
//       }else{
//         let code;
//         do{
//           code = '' + Math.floor(Math.random() * 10) +
//           Math.floor(Math.random() * 10) +
//           Math.floor(Math.random() * 10) +
//           Math.floor(Math.random() * 10);
//         }while(rooms.length != 0 && rooms.some((r) => r.getCode() === code ));
        
//         const game = new Game(code, data.username);
//         rooms.push(game);
//         game.addPlayer(data.username, socket);
//         game.emitPlayers('hostRoom',{
//           code: code,
//           players: game.getPlayersArray(),
//         });
  
//       }
//     });
//   });
  
//   io.on('join', (data) => {
//     const game = rooms.find((r) => r.getCode() === data.code);
//     if (
//       game == undefined ||
//       game.getPlayersArray().some((p) => p == data.username) ||
//       data.username == undefined ||
//       data.username.length > 12
//     ) {
//       socket.emit('joinRoom', undefined);
//     } else {
//       game.addPlayer(data.username, socket);
//       rooms = rooms.map((r) => (r.getCode() === data.code ? game : r));
//       game.emitPlayers('joinRoom', {
//         host: game.getHostName(),
//         players: game.getPlayersArray(),
//       });
//       game.emitPlayers('hostRoom', {
//         code: data.code,
//         players: game.getPlayersArray(),
//       });
//     }
//   });
  
//   io.on('startGame', (data) => {
//     const game = rooms.find((r) => r.getCode() == data.code);
//     if (game == undefined) {
//       socket.emit('gameBegin', undefined);
//     } else {
//       game.emitPlayers('gameBegin', { code: data.code });
//       game.startGame();
//     }
//   });
  
//   io.on('evaluatePossibleMoves', () => {
//     const game = rooms.find(
//       (r) => r.findPlayer(socket.id).socket.id === socket.id
//     );
//     if (game.roundInProgress) {
//       const possibleMoves = game.getPossibleMoves(socket);
//       socket.emit('displayPossibleMoves', possibleMoves);
//     }
//   });
  
//   io.on('raiseModalData', () => {
//     const game = rooms.find(
//       (r) => r.findPlayer(socket.id).socket.id === socket.id
//     );
//     if (game != undefined) {
//       socket.emit('updateRaiseModal', {
//         topBet: game.getCurrentTopBet(),
//         usernameMoney:
//           game.getPlayerBetInStage(game.findPlayer(socket.id)) +
//           game.findPlayer(socket.id).getMoney(),
//       });
//     }
//   });
  
//   io.on('startNextRound', () => {
//     const game = rooms.find(
//       (r) => r.findPlayer(socket.id).socket.id === socket.id
//     );
//     if (game != undefined) {
//       if (game.roundInProgress === false) {
//         game.startNewRound();
//       }
//     }
//   });

module.exports = router;
/**DONE */