import Deck from "./Deck.js";
// const Deck = require('./Deck');
import Player from "./Player.js";
// const Player = require('./Player');


 class Games {
  constructor(id, name) {
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
  }

  startNewGame(){
    this.addNewPlayer('ryan1',1);
    this.addNewPlayer('ryan2',2);
    this.addNewPlayer('ryan3',3);
    this.addNewPlayer('ryan4',4);
    this.startGame();

  }

  startGame() {
    this.roundInProgress = true;
    this.river = [];
    this.pot = 0;
    this.roundInfo.turn = "";
    this.roundInfo.bets = [];
    this.dealCards();
    this.assignAutoBid();
    this.roundNum++;
    this.flop();
    
    this.turnFlop();
    this.riverFlop();
    // this.display();
    
  }

  getNumPlayers() {
    return this.currentNumPlayers;
  }
  
//player 1 [1,2] player 2 [3,4] player 3 [5,6] player4 [7,8]
  changePlayerCard(id, val) {
    let count = 0;
    for(const card of val){
      let v = id <2 ? 1+count : (id*2 -1)+ count;
      let num = "card-"+v;
      let topCard1 = document.getElementById(num);
      topCard1.src = "/images/Cards/" + card + ".png";
      this.flipCard(topCard1);
      count++;
    }
    
  }

   changeRiverCard(id,val){
    let riverCard = document.getElementById("card-"+id);
    riverCard.src = '/images/Cards/'+val+".png";
    
      this.flipCard(riverCard)
    
    

  }

  flipCard(card){
    let c = card.parentElement.parentElement;
    c.classList.add('flip-it');
  }

  dealCards() {
    if (this.deck.length < 13) {
      this.deck.reset();
    }

    this.deck.shuffle();
    
    let count = 1;
    for (const p of this.players) {
      this.players.cards = [];
      let cards = [];
      for (let j = 0; j < 2; j++) {
        let c = this.deck.deal();
        p.addCard(c);
        cards.push(c);
        
      }
      this.changePlayerCard(count,cards);
      count++;
    }
  
  }

  setMaxBet(bet) {
    if (bet > this.maxCurrBet) {
      this.maxCurrBet = bet;
    }
  }

  fold(socket) {
    const player = this.findPlayer(socket.id);
    player.setFold(true);
  }

  //TODO
  call(socket) {
    const player = this.findPlayer(socket.id);
    player.setBet(this.maxCurrBet);
    this.pot += this.maxCurrBet;
    //add logic if max bet is to big so it will use all left over chips
  }

  bet(player, bet) {
    // const player = this.findPlayer(socket.id);
    player.setBet(bet);
    this.setMaxBet(bet);
    if (player.getBet() == -1) {
      return "Not Enough Chips";
    }
    this.updatePlayerOnBoard(player);
    this.pot += bet;
    this.updatePot(this.pot);
  }

  check(socket) {
    const player = this.findPlayer(socket.id);
    player.setIsChecked(true);
  }

  //possible change
  raise(socket, bet) {
    this.bet(socket, bet + this.maxCurrBet);
  }

  //this is used to see if they folded and the cant make new moves untill the next round
  //used also for any other state where they shouldnt move any more
  allowedMoves(socket) {
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
  }

  getLobySize(){
    return this.players.length;
  }

  addNewPlayer(playerName, socket) {
    const player = new Player(playerName, socket);
    this.players.push(player);
    this.currentNumPlayers++;
    player.setTurn(this.currentNumPlayers);
    player.setPlayerNumber(this.currentNumPlayers);
    this.updatePlayerOnBoard(player);
    return player;
  }

  updatePlayerOnBoard(player){
    let number = player.getPlayerNumber();
    let playerNameDiv = document.getElementById("player-" + number +"-name");
    playerNameDiv.textContent = player.getName();
    let playerChipsDiv = document.getElementById("player-" + number +"-chips")
    playerChipsDiv.textContent = "total: " + player.getChips();
    let playerBetDiv= document.getElementById("player-" + number +"-bets");
    playerBetDiv.textContent ="bet: "+ player.getBet();
  }

  updatePot(val){
    let potDiv = document.getElementById("pot");
    potDiv.textContent = "Pot: " + this.getPot();
  }

  //this can be used as our database storeage function
  storeData() {}

  //auto puts in an anty
  assignAutoBid() {
    for (const p of this.players) {
      if (this.players.chipss > this.autoBid) {
        p.out = true;
      } else {
        // p.chips -= this.autoBid;
        this.bet(p,this.autoBid);
      }
    }
  }

  //call this function to begin a new round
  newRound() {
    for (const p of this.players) {
      p.newRound();
    }
    this.maxCurrBet = 0;
    this.pot = 0;
    this.roundInfo.bets = [];
    this.dealCards();
    this.assignAutoBid();
  }

  //this is like flop, 4th card then 5th card
  stages() {
    let roundDone = false;
    if (this.isStageComplete()) {
      //add all in logic

      //checks if only one player didnt fold
      const [isOneLeft, nonFoldPlayers] = this.getNonFoldedPlayers();
      if (isOneLeft) {
        nonFoldPlayers.setChips(this.pot);
        this.allFolded(nonFoldPlayers.getName());
        roundDone = true;
      } else {
        if (this.roundInfo.bets.length == 1) {
          this.flop();
          this.updateStages();
        } else if (this.roundInfo.bets.length == 2) {
          this.turnFlop();
          this.updateStages();
        } else if (this.roundInfo.bets.length == 3) {
          this.riverFlop();
          this.updateStages();
        } else if (this.roundInfo.bets.length == 4) {
          roundDone = true;
          const results = this.checkHand();
          //Add more when card check is done
        } else {
          console.log("Not valid round");
        }
      }
    } else {
      this.nextPlayerTurn();
    }
  }

  allFolded(name) {
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
      p.emit("Done", {
        winner: name,
        folded: p.getName() != name ? "Fold" : "",
        name: p.getName(),
        pot: this.pot,
        chips: p.getChips(),
        cards: cardData,
        bets: this.roundInfo.bets,
      });
    }
  }

  getNonFoldedPlayers() {
    let count = 0;
    let isOne = false;
    let player;
    for (const p of this.players) {
      if (p.getStatus() != "Fold") {
        count++;
        player = p;
      }
    }
    isOne = count == 1 ? true : false;
    return [isOne, player];
  }

  //river cards 9,10,11,12,13
  flop() {
    const first = this.deck.deal();
    this.river.push(first);
    const second = this.deck.deal();
    this.river.push(second);
    const third = this.deck.deal();
    this.river.push(third);
    
    setTimeout(() =>{
      this.changeRiverCard(9,first);
    },1000);
    
    
    
    setTimeout(() =>{
      this.changeRiverCard(10,second);
    },2000);
  
    setTimeout(() =>{
      this.changeRiverCard(11,third);
    },3000);
   

  }


  turnFlop() {
    const turn = this.deck.deal();
    this.river.push(turn);
    setTimeout(() =>{
      this.changeRiverCard(12,turn);
    },1000);
    
  }

  riverFlop() {
    const turn = this.deck.deal();
    this.river.push(turn);
    setTimeout(() =>{
      this.changeRiverCard(13,turn);
    },3000);
    
  }

  getCurrentStage() {
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
  }

  // this is flipping cards and showing player info
  display() {
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
  }

  getPot() {
    return this.pot;
  }

  getPlayerBet(player) {}

  isPlayerChecked(player) {
    return p.getIsChecked();
  }

  //TODO
  isStageComplete() {
    let numReady = 0;
    const currRound = this.getCurrentRound();

    for (const p of this.players.length) {
      if (p.status != "Fold") {
        numReady++;
      }
    }
  }

  getCurrentRound() {
    return this.roundInfo.bets[this.roundInfo.bets.length - 1];
  }

  //this desides which player can go first
  getFirstTurnPlayer() {
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
  }

  //this updates the stages such as flopp, 4th card and 5th card shown
  updateStages() {
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
  }

  setStatus(stat) {
    this.status = stat;
  }

  getStatus() {
    return this.status;
  }

  //moves on to the next player after prev goes
  nextPlayerTurn() {
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
  }

  //TODO
  getWinnings(socket) {
    const player = this.findPlayer(socket.id);
  }

  //this is the logic for the players cards to determine which hand won
  checkHand(river, cards) {}

  //TODO
  revealHands() {}


  findPlayer(socketID) {
    for (const element of this.players) {
      if (element.socket.id === socketID) {
        return element;
      }
    }
    return { socket: { id: 0 } };
  }
}

export default Games;
// module.exports = Games;