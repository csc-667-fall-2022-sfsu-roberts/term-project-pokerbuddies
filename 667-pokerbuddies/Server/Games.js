const Deck = require('./Deck.js');
const Player = require('./Player.js');

const Games = function (id, name){
    this.deck = new Deck();
    this.players = [];
    this.name = name;
    this.status = 0;
    this.maxCards = 2;
    this.inPlay = 0;
    this.winner = null;
    
    this.roundNum = 0;
    this.roundInfo = {
        turn: '',
        bets:[],
        bigBlind: '',
        smallBlind: '',
        
    };
    
    this.pot = 0;
    
    this.disconnectedPlayers = [];

    const constructor = (function () {})(this);

    this.startGame = () =>{
        this.deck.shuffle();

    };

    this.dealCards = () =>{
        this.deck.shuffle();
        for(let i =0; i < this.players.length; i++){
            this.players.cards =[];
            for(let j = 0; j<2; j++){
                this.players.addCard(this.deck.deal());
            }
        }

    };

    this.fold = (socket) =>{

    };

    this.call = (socket) =>{

    };

    this.bet = (socket, bet) =>{

    };

    this.check = (socket) =>{

    };

    this.raise = (socket, bet) =>{

    };

    //this is used to see if they folded and the cant make new moves untill the next round
    //used also for any other state where they shouldnt move any more
    this.allowedMoves = (socket) =>{

    };

    this.addNewPlayer = (playerName, socket) =>{
        const player = new Player(playerName, socket);
        this.players.push(player);
        return player;
    };

    //this can be used as our database storeage function
    this.storeData = () =>{

    };

    //assignes big blind and little blind to players
    this.assignBlinds = () =>{

    };

    //call this function to begin a new round
    this.newRound = () =>{

    };

    //this is like flop, 4th card then 5th card
    this.stages = () =>{

    };

    // this is flipping cards
    this.display = () =>{

    };

    this.getPot = () =>{
        if(this.roundInfo.bets.length == 0){
            return 0;
        }
        else{
            let total = 0;
            for(let i =0; i < this.roundInfo.bets.length; i++){
                total+= this.roundInfo.bets[i];
            }
            return total;
        }


    };

    this.getPlayerBet = (player) =>{
        
    };

    this.getMaxBet = () =>{

    };

    this.isPlayerChecked = () =>{

    };

    //this desides which player can go first
    this.getFirstTurn = () => {

    };

    //this updates the stages such as flopp, 4th card and 5th card shown
    this.updateStages = () =>{

    };

    //moves on to the next player after prev goes
    this.nextPlayerTurn = () =>{

    };

    this.getWinnings = () =>{

    };

    //this is the logic for the players cards to determine which hand won
    this.checkHand = () =>{

    };

    this.revealHands = () =>{

    };

    this.setPlayerCards = (one_card) =>{

    };

    this.findPlayer = (socketID) =>{
        for (const element of this.players) {
            if (element.socket.id === socketID) {
              return element;
            }
          }
          return { socket: { id: 0 } };
    }




}

module.exports = Games;
