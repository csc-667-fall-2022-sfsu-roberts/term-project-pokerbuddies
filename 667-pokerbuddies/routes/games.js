var express = require('express');
const { appendFile } = require('fs');
var router = express.Router();
var path = require('path');
const Games = require('../db/games');
const GameLogic = require('../public/javascripts/Server/gameLogic/index');
const Player = require("../public/javascripts/Server/Player");
const GameInst = require('../public/javascripts/Server/Games');
//  let game = require('../../public/javascripts/Server/Games');
const io =require('socket.io');
const { error } = require('console');

let reqPath = path.join(__dirname, '../');
const gameCount = 1;
let playerList = [];
let rooms = new Map();
const player = new Player('bob',1,1);

const player1 = new Player('carl',2,2);
const player2 = new Player('dog',3,3);
const player3 = new Player('me',4,4);
playerList.push(player,player1,player2,player3);


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
    gameNumber: gameCount,


  });
  gameCount++;

  req.app.io.emit(`join`, {

  });
  

});









// debugger;
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

router.get('/games/:id'), (req,res) =>{
  debugger;
  if(rooms.has(req.params)){
    res.render(`protected/game/${req.params}`);
  }else{
    const game = new GameInst();
    rooms.set(req.params, game);
  }
  
}

router.post("/:id",(req,res) =>{
  const{id:game_id} = req.params;
  const{userId} = req.session;
  res.json({game_id, userId:userId});
});

router.post("/:id/status", (request, response) => {
  const { id: game_id } = request.params;

  GameLogic.status(game_id, request.app.io);

  response.status(200).send();
});



router.post("/fold/:id",(req, res)=>{
  console.log(req.params);
  const id = req.params;
  console.log(req.body);
  const{userId} = req.session;
  console.log(userId);
  // const num = Games.getPlayerTurn;
  const player = findPlayer(req.body.id);
  req.app.io.emit(`fold:${id}`, {
    bet: req.body.value,
    total_chips: player.getChips(),
    spot: player.getPlayerNumber(),
    status: 'fold',
    name: player.getName(),
  });
  res.sendStatus(200);
});


router.post("/call/:id",(req, res)=>{
  console.log('hu')
  const id = req.params;
  // debugger;
  const player = findPlayer(req.body.id);
  console.log(player.getName())
  player.setBet(req.body.value)
  req.app.io.emit(`call:${id}`, {
    bet: req.body.value,
    total_chips: player.getChips(),
    spot: player.getPlayerNumber(),
    status: 'Called: '+req.body.value,
    name: player.getName(),
});
  res.sendStatus(200);
});


router.post("/raise/:id",(req, res)=>{
  console.log(req.params);
  console.log(req.params);
  console.log(req.body.value);
  const id = req.params;
  const player = findPlayer(req.body.id);
  player.setBet(req.body.value)
  req.app.io.emit(`raise:${id}`, {
    bet: req.body.value,
    total_chips: player.getChips(),
    spot: player.getPlayerNumber(),
    status: 'Raised: '+req.body.value,
    name: player.getName(),
});
  res.sendStatus(200);
});


router.post("/bet/:id",(req, res)=>{
  console.log(req.params);
  console.log(req.body.value);
  const id = req.params;
  const player = findPlayer(req.body.id);
  player.setBet(req.body.value)
  req.app.io.emit(`bet:${id}`, {
    bet: req.body.value,
    total_chips: player.getChips(),
    spot: player.getPlayerNumber(),
    status: 'bet: '+ req.body.value,
    name: player.getName(),
});
  //setnext player

  res.sendStatus(200);
});


router.post("/check/:id",(req, res)=>{
  debugger;
  console.log(req.params);
  const id = req.params;
  console.log(req.params);
  console.log(req.body.value);
  const player =  findPlayer(req.body.id);
  req.app.io.emit(`check:${id}`, {
    bet: req.body.value,
    total_chips: player.getChips(),
    spot: player.getPlayerNumber(),
    status: 'Checked',
    name: player.getName(),
});
  res.sendStatus(200);
});

router.post("/deal/:id", (req,res)=>{
  const id = req.params;
  
});



router.get("/:id", (request, response) => {
  const { id } = request.params;
  console.log(request.params);
  debugger;
  if(rooms.has(req.params)){
    response.render(`protected/game/${request.params}`);
  }else{
    const game = new GameInst();
    rooms.set(request.params, game);
    response.render(`protected/game/${request.params}`);
  }
  // Promise.all([Games.userCount(id), Games.info(id)])
  //   .then(([{ count }, { title }]) => {
      
  //     response.render("protected/game", {
  //       id,
  //       title,
  //       count,
  //       required_count: 2,
  //       ready: parseInt(count) === 2,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     response.status(500).send();
  //   });
});

router.get("/join/:id",(req,res)=>{
  console.log("HERE");
  res.render ('/protect/games')
});

router.post("/join/:id", (request, response) => {
  debugger;
  console.log("HERE");
  const { userId } = request.session;
  const { id } = request.params;
  const player = new Player(username,req.app.io,userId);
  playerList.push(player);
  Games.addUser(Player, id)
    .then(() => Games.userCount(id))
    .then(({ count }) => {
      player.setPlayerNumber(count);
      request.app.io.emit(`game:${id}:player-joined`, {
        count: parseInt(count),
        required_count: 2,
        player: player
      });

      if (parseInt(count) === 2) {
        GameLogic.init(id).then(() =>
          GameLogic.status(id, request.app.io)
        );
      }

      
    })
    .catch((error) => {
      console.log({ error });
    });
    response.redirect(`/games`);
});




router.post("/:id/play",(req,res)=>{
  const{userId} = req.session;
  const {id:game_id} = req.params;
  const {card_id} = req.body;

  Games.isInGame(game_id,userId)
  .then((isInGame)=>{
    if(isInGame){
      return Promise.resolve();
    }else{
      return Promise.reject('${userId} not in game');
    }
  })
  .then(()=> Games.isUserTurn(game_id,userId))
  .then((isUserTurn)=>{
    if(isUserTurn){
      return Promise.resolve();
    }else{
      return Promise.reject('Not ${userId} turn');
    }
  })//something for checing user input
  .then(()=>Games.isChecked(game_id,userId))
  .then((isChecked)=>{
    if(isChecked){
      return Promise.resolve()
    }else{
      return Promise.reject();
    }
  })
  //do for call, fold, raise and bett


  //if all  is good then move to next player, update pot and take bet
  .then(() => Games.setNextPlayer(game_id,userId))
  .then(()=> GameLogic.status(game_id,req.app.io))
  .catch((error)=>{
    console.error({error});
    res.status(200).send();
  })

});

const findPlayer = (socketID)=> {
  for (const element of playerList) {
    if (element.getSocket() === socketID) {
      return element;
    }
  }
  return { socket: { id: 0 } };
}

const findPlayerByName = (name)=> {
  for (const element of playerList) {
    if (element.getName() === name) {
      return element;
    }
  }
  return { socket: { id: 0 } };
}





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
  
  // io.on('join', (data) => {
  //   const game = rooms.find((r) => r.getCode() === data.code);
  //   if (
  //     game == undefined ||
  //     game.getPlayersArray().some((p) => p == data.username) ||
  //     data.username == undefined ||
  //     data.username.length > 12
  //   ) {
  //     socket.emit('joinRoom', undefined);
  //   } else {
  //     game.addPlayer(data.username, socket);
  //     rooms = rooms.map((r) => (r.getCode() === data.code ? game : r));
  //     game.emitPlayers('joinRoom', {
  //       host: game.getHostName(),
  //       players: game.getPlayersArray(),
  //     });
  //     game.emitPlayers('hostRoom', {
  //       code: data.code,
  //       players: game.getPlayersArray(),
  //     });
  //   }
  // });
  
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