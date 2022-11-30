const Deck = require("./Deck.js");
const Player = require("./Player.js");

const Games = function (id, name) {
  this.deck = new Deck();
  this.players = [];
  this.name = name;
  this.status = 0;
  this.maxCards = 2;
  this.inPlay = 0;
  this.winner = null;
  this.currentNumPlayers = 0;
  this.currentTurn = 0;
  this.maxCurrBet = 0;
  this.autoBid = 25;
  this.roundInProgress = true;
  this.roundNum = 0;
  this.roundInfo = {
    turn: "",
    bets: [],
    bigBlind: "",
    smallBlind: "",
  };
  this.river = [];

  this.pot = 0;

  this.disconnectedPlayers = [];

  const constructor = (function () {})(this);

  this.startGame = () => {
    this.roundInProgress = true;
    this.river = [];
    this.pot = 0;
    this.roundInfo.turn = "";
    this.roundInfo.bets = [];
    this.dealCards;
    this.autoBid();
    this.roundNum++;
    this.display();
  };

  this.dealCards = () => {
    if (this.deck.length < 13) {
      this.deck.reset();
    }

    this.deck.shuffle();
    for (let i = 0; i < this.players.length; i++) {
      this.players.cards = [];
      for (let j = 0; j < 2; j++) {
        this.players.addCard(this.deck.deal());
      }
    }
  };

  this.setMaxBet = (bet) => {
    if (bet > this.maxCurrBet) {
      this.maxCurrBet = bet;
    }
  };

  this.fold = (socket) => {
    const player = this.findPlayer(socket.id);
    player.setFold(true);
  };

  //TODO
  this.call = (socket) => {
    const player = this.findPlayer(socket.id);
    player.setBet(this.maxCurrBet);
    this.pot += this.maxCurrBet;
    //add logic if max bet is to big so it will use all left over chips
  };

  this.bet = (socket, bet) => {
    const player = this.findPlayer(socket.id);
    player.setBet(bet);
    this.setMaxBet(bet);
    if (player.getBet == -1) {
      return "Not Enough Chips";
    }
    this.pot += bet;
  };

  this.check = (socket) => {
    const player = this.findPlayer(socket.id);
    player.setIsChecked(true);
  };

  //possible change
  this.raise = (socket, bet) => {
    this.bet(socket, bet + this.maxCurrBet);
  };

  //this is used to see if they folded and the cant make new moves untill the next round
  //used also for any other state where they shouldnt move any more
  this.allowedMoves = (socket) => {
    const player = this.findPlayer(socket.id);
    const playerBet = player.getBet;
    const moveList = {
      fold: true,
      check: true,
      bet: true,
      call: true,
      raise: true,
    };
    if (player.isFolded()) {
      return 0;
    }

    if (playerBet != 0) {
      moveList.bet = false;
      moveList.check = false;
    } else {
      moveList.raise = false;
    }
    if (playerBet >= this.maxCurrBet) {
      moveList.call = false;
    }
    if (this.maxCurrBet >= playerBet) {
      moveList.raise = false;
      //add for all in
    }
    return moveList;
  };

  this.addNewPlayer = (playerName, socket) => {
    const player = new Player(playerName, socket);
    this.players.push(player);
    this.currentNumPlayers++;
    player.setTurn(this.currentNumPlayers);
    return player;
  };

  //this can be used as our database storeage function
  this.storeData = () => {};

  //auto puts in an anty
  this.assignAutoBid = () => {
    for (const p of this.players) {
      if (this.players.chipss > this.autoBid) {
        p.out = true;
      } else {
        this.pot += this.autoBid;
        p.chipss -= this.autoBid;
      }
    }
  };

  //call this function to begin a new round
  this.newRound = () => {
    for (const p of this.players) {
      p.newRound();
    }
    this.maxCurrBet = 0;
    this.pot = 0;
    this.roundInfo.bets = [];
    this.dealCards();
    this.assignAutoBid();
  };

  //this is like flop, 4th card then 5th card
  this.stages = () => {
    let roundDone = false;
    if (this.isStageComplete()) {
      //add all in logic

      //checks if only one player didnt fold
      const [isOneLeft, nonFoldPlayers] = this.getNonFoldedPlayers();
      if (isOneLeft) {
        nonFoldPlayers.setChips(this.pot);
        this.allFolded(nonFoldPlayers.getName());
        roundDone = true;
      }else{
        if(this.roundInfo.bets.length == 1){
            this.flop();
            this.updateStages();
        }
        else if(this.roundInfo.bets.length == 2){
            this.turnFlop();
            this.updateStages();
        }
        else if(this.roundInfo.bets.length == 3){
            this.riverFlop();
            this.updateStages();
        }
        else if(this.roundInfo.bets.length == 4){
            roundDone = true;
            const results = this.checkHand();
            //Add more when card check is done
        }else{
            console.log("Not valid round");
        }

      }
    }
    else{
        this.nextPlayerTurn();
    }
  };

  this.allFolded = (name) => {
    this.roundInProgress = false;
    let cardData = [];
    for (const p of this.players) {
      cardData.push({
        userName: p.getName(),
        chips: p.getChips(),
        text: p.getStatus(),
      });
    }

    for (const p of this.players) {
      p.emit("Done",{
        winner: name,
        folded: p.getName() != name ? 'Fold':'',
        name: p.getName(),
        pot: this.pot,
        chips: p.getChips(),
        cards: cardData,
        bets: this.roundInfo.bets,
      });
    }
  };

  this.getNonFoldedPlayers = () => {
    let count = 0;
    let isOne = false;
    let player;
    for (const p of this.players) {
      if (p.getStatus() != "Fold") {
        count++;
        player = p;
      }
    }
    isOne = count ==1 ? true: false;
    return [isOne, player];
  };

  this.flop = () => {
    this.river.push(this.deck.deal());
    this.river.push(this.deck.deal());
    this.river.push(this.deck.deal());
  };

  this.turnFlop = () => {
    this.river.push(this.deck.deal());
  };

  this.riverFlop = () => {
    this.river.push(this.deck.deal());
  };

  this.getCurrentStage = () => {
    if (this.roundInfo.bets.length == 1) {
      return "Start";
    } else if (this.roundInfo.bets.length == 2) {
      return "Flop";
    } else if (this.roundInfo.bets.length == 3) {
      return "Turn";
    } else if (this.roundInfo.bets.length == 4) {
      return "River";
    } else {
      return "Error";
    }
  };

  // this is flipping cards and showing player info
  this.display = () => {
    const playerData = [];
    for (const p of this.players) {
      playerData.push({
        userName: p.getName(),
        playerStatus: p.getStatus(),
        chipTotal: p.getChips(),
        isChecked: p.getIsChecked(),
      });
    }

    for (const p of this.players) {
      p.emit("display", {
        topBet: this.maxCurrBet,
        bets: this.roundInfo.bets,
        userName: p.getName(),
        round: this.roundNum,
        river: this.river,
        stage: this.getCurrentStage(),
        pot: this.getPot(),
        players: playerData,
        myBet: p.getBet(),
        myStatus: p.getStatus(),
      });
    }
  };

  this.getPot = () => {
    if (this.roundInfo.bets.length == 0) {
      return 0;
    } else {
      let total = 0;
      for (let i = 0; i < this.roundInfo.bets.length; i++) {
        total += this.roundInfo.bets[i];
      }
      return total;
    }
  };

  this.getPlayerBet = (player) => {};


  this.isPlayerChecked = (player) => {
    return p.getIsChecked();
  };

  //TODO
  this.isStageComplete = () => {
    let numReady = 0;
    const currRound = this.getCurrentRound();

    for (const p of this.players.length) {
      if (p.status != "Fold") {
        numReady++;
      }
    }
  };

  this.getCurrentRound = () => {
    return this.roundInfo.bets[this.roundInfo.bets.length - 1];
  };

  //this desides which player can go first
  this.getFirstTurnPlayer = () => {
    for (const p of this.players.length) {
      if (p.getTurn == this.currentTurn) {
        if (this.currentTurn == this.currentNumPlayers) {
          this.currentTurn = 0;
        } else {
          this.currentTurn++;
        }
        return p;
      }
    }
  };

  //this updates the stages such as flopp, 4th card and 5th card shown
  this.updateStages = () => {
    for (let i = 0; i < this.players.length; i++) {
      if (
        i == this.getFirstTurnPlayer() &&
        this.players[i].getStatus() !== "Fold"
      ) {
        this.players[i].setStatus("First");
      } else if (this.players[i].getStatus() !== "Fold") {
        this.players[i].setStatus("");
      }
    }
    this.roundInfo.bets.push([]);
  };

  this.setStatus = (stat) => {
    this.status = stat;
  };

  this.getStatus = () => {
    return this.status;
  };

  //moves on to the next player after prev goes
  this.nextPlayerTurn = () => {
    for (const p of this.players) {
      if (p.turn == this.currentTurn) {
        if (this.currentTurn === this.currentNumPlayers) {
          this.currentTurn = 0;
        } else {
          this.currentTurn++;
        }
        return p;
      }
    }
  };

  this.getWinnings = (socket) => {
    const player = this.findPlayer(socket.id);
  };

  //this is the logic for the players cards to determine which hand won
  this.checkHand = () => {};

  this.revealHands = () => {};

  this.setPlayerCards = (one_card) => {};

  this.findPlayer = (socketID) => {
    for (const element of this.players) {
      if (element.socket.id === socketID) {
        return element;
      }
    }
    return { socket: { id: 0 } };
  };
};

module.exports = Games;
