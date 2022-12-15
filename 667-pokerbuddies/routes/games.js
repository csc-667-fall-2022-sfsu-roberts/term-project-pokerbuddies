var express = require("express");
const { appendFile } = require("fs");
var router = express.Router();
var path = require("path");
const Games = require("../db/games");
const GameLogic = require("../public/javascripts/Server/gameLogic/index");
const Player = require("../public/javascripts/Server/Player");
const GameInst = require("../public/javascripts/Server/Games");
const io = require("socket.io");
const { error } = require("console");

let reqPath = path.join(__dirname, "../");
const gameCount = 1;
let playerList = [];
let rooms = new Map();

const curPlayer = "";

router.get("/", function (req, res, next) {

  let player_1_Info = {
    id: 1,
    name: "name_1",
    total_chips: 100,
    bet: 0,
  };

  let player_2_Info = {
    id: 1,
    name: "name_2",
    total_chips: 100,
    bet: 0,
  };

  let player_3_Info = {
    id: 1,
    name: "name_3",
    total_chips: 100,
    bet: 0,
  };

  let player_4_Info = {
    id: 1,
    name: "name_4",
    total_chips: 100,
    bet: 0,
  };

  res.render("protected/game", {
    pot: "0000",

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
  // gameCount++;

  req.app.io.emit(`join`, {});
});

const setPlayer = (player) => {
  this.curPlayer = player;
};

// debugger;
router.post("/", function (req, res) {
  const { bet, call, fold, raise } = req.body;

  res.render("protected/game", {});
});

//routes to joinSession page
router.get("/joinSession", function (req, res) {
  res.render("public/joinSession");
});

router.post("/:id", (req, res) => {
  debugger;
  const { id: game_id } = req.params;
  const { userId } = req.session;

  res.json({ game_id, userId: userId });
});

router.post("/:id/status", (request, response) => {
  const { id: game_id } = request.params;

  GameLogic.status(game_id, request.app.io);

  response.status(200).send();
});

router.post("/fold/:id", (req, res) => {
  console.log(req.params);
  const id = req.params;
  console.log(req.body);
  const { userId } = req.session;
  console.log(userId);
  // const num = Games.getPlayerTurn;
  const player = findPlayer(req.body.id);
  req.app.io.emit(`fold:${id}`, {
    bet: req.body.value,
    total_chips: player.getChips(),
    spot: player.getPlayerNumber(),
    status: "fold",
    name: player.getName(),
  });
  res.sendStatus(200);
});

router.post("/call/:id", (req, res) => {
  console.log("hu");
  const id = req.params;
  // debugger;
  const player = findPlayer(req.body.id);
  console.log(player.getName());
  player.setBet(req.body.value);
  req.app.io.emit(`call:${id}`, {
    bet: req.body.value,
    total_chips: player.getChips(),
    spot: player.getPlayerNumber(),
    status: "Called: " + req.body.value,
    name: player.getName(),
  });
  res.sendStatus(200);
});

router.post("/raise/:id", (req, res) => {
  console.log(req.params);
  console.log(req.params);
  console.log(req.body.value);
  const id = req.params;
  const player = findPlayer(req.body.id);
  player.setBet(req.body.value);
  req.app.io.emit(`raise:${id}`, {
    bet: req.body.value,
    total_chips: player.getChips(),
    spot: player.getPlayerNumber(),
    status: "Raised: " + req.body.value,
    name: player.getName(),
  });
  res.sendStatus(200);
});

router.post("/bet/:id", (req, res) => {
  console.log(req.params);
  console.log(req.body.value);
  const id = req.params;
  const player = findPlayer(req.body.id);
  player.setBet(req.body.value);
  req.app.io.emit(`bet:${id}`, {
    bet: req.body.value,
    total_chips: player.getChips(),
    spot: player.getPlayerNumber(),
    status: "bet: " + req.body.value,
    name: player.getName(),
  });
  //setnext player

  res.sendStatus(200);
});

router.post("/check/:id", (req, res) => {
  // debugger;
  console.log(req.params);
  const id = req.params;
  console.log(req.params);
  console.log(req.body.value);
  const player = findPlayer(req.body.id);
  req.app.io.emit(`check:${id}`, {
    bet: req.body.value,
    total_chips: player.getChips(),
    spot: player.getPlayerNumber(),
    status: "Checked",
    name: player.getName(),
  });
  res.sendStatus(200);
});

router.post("/deal/:id", (req, res) => {
  const id = req.params;
});

router.get("/:id", (request, response) => {
  const { id } = request.params;
  const pInfo = request.body.player;
  console.log(pInfo);
  console.log(request.params);
  debugger;
  const pName = this.curPlayer.getName();

  const spot = this.curPlayer.getPlayerNumber();
  const chips = this.curPlayer.getChips();
  if (spot == 1) {
    try {
      response.render(`/protected/game/${id}`, {
        player_1_name: pName,
        player_1_total: chips,
        player_1_bet: 0,
      });
    } catch (e) {
      console.log(e);
    }
  } else if (spot == 2) {
    response.render(`/game`, {
      player_2_name: this.curPlayer.getName(),
      player_2_total: this.curPlayer.getChips(),
      player_2_bet: 0,
    });
  } else if (spot == 3) {
    response.render(`/game`, {
      player_3_name: this.curPlayer.getName(),
      player_3_total: this.curPlayer.getChips(),
      player_3_bet: 0,
    });
  } else {
    response.render(`/game`, {
      player_4_name: this.curPlayer.getName(),
      player_4_total: this.curPlayer,
      player_4_bet: 0,
    });
  }
});

router.post("/join/:id", (request, response) => {
  console.log("HERE");
  const userId = request.session.id;
  const id = request.params;
  const username = request.body.name;
  if (!rooms.has(id)) {
    rooms.set(id, { game: new GameInst(), count: 1 });
  } else {
    let count = rooms.get(id).count + 1;
    let game = rooms.get(id).game;
    rooms.set(id, { game: game, count: count });
  }
  // debugger;
  let count = rooms.get(id).count;
  const sock = request.app.io;
  const player = new Player(username, sock, userId);
  player.setPlayerNumber(count);

  setPlayer(player);
  playerList.push(player);

  debugger;
  const pName = this.curPlayer.getName();

  const spot = this.curPlayer.getPlayerNumber();
  const chips = this.curPlayer.getChips();
  if (spot == 1) {
    try {
      response.render(`game/${id}`, {
        player_1_name: pName,
        player_1_total: chips,
        player_1_bet: 0,
      });
    } catch (e) {
      console.log(e);
    }
  } else if (spot == 2) {
    response.render(`/game/${id}`, {
      player_2_name: this.curPlayer.getName(),
      player_2_total: this.curPlayer.getChips(),
      player_2_bet: 0,
    });
  } else if (spot == 3) {
    response.render(`/game/${id}`, {
      player_3_name: this.curPlayer.getName(),
      player_3_total: this.curPlayer.getChips(),
      player_3_bet: 0,
    });
  } else {
    response.render(`/game/${id}`, {
      player_4_name: this.curPlayer.getName(),
      player_4_total: this.curPlayer,
      player_4_bet: 0,
    });
  }
});

router.post("/:id/play", (req, res) => {
  const { userId } = req.session;
  const { id: game_id } = req.params;
  const { card_id } = req.body;

  Games.isInGame(game_id, userId)
    .then((isInGame) => {
      if (isInGame) {
        return Promise.resolve();
      } else {
        return Promise.reject("${userId} not in game");
      }
    })
    .then(() => Games.isUserTurn(game_id, userId))
    .then((isUserTurn) => {
      if (isUserTurn) {
        return Promise.resolve();
      } else {
        return Promise.reject("Not ${userId} turn");
      }
    }) //something for checing user input
    .then(() => Games.isChecked(game_id, userId))
    .then((isChecked) => {
      if (isChecked) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    })
    //do for call, fold, raise and bett

    //if all  is good then move to next player, update pot and take bet
    .then(() => Games.setNextPlayer(game_id, userId))
    .then(() => GameLogic.status(game_id, req.app.io))
    .catch((error) => {
      console.error({ error });
      res.status(200).send();
    });
});

const findPlayer = (socketID) => {
  for (const element of playerList) {
    if (element.getSocket() === socketID) {
      return element;
    }
  }
  return { socket: { id: 0 } };
};

const findPlayerByName = (name) => {
  for (const element of playerList) {
    if (element.getName() === name) {
      return element;
    }
  }
  return { socket: { id: 0 } };
};

module.exports = router;
/**DONE */
