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

    this.allowedMoves = (socket) =>{

    };

    this.addNewPlayer = (playerName, socket) =>{
        const player = new Player(playerName, socket);
        this.players.push(player);
        return player;
    };

    this.storeData = () =>{

    };

    this.assignBlinds = () =>{

    };

    this.newRound = () =>{

    };

    this.stages = () =>{

    };

    this.display = () =>{

    };

    this.getPot = () =>{

    };

    this.getPlayerBet = () =>{

    };

    this.getMaxBet = () =>{

    };

    this.isPlayerChecked = () =>{

    };

    this.getFirstTurn = () => {

    };

    this.updateStages = () =>{

    };

    this.nextPlayerTurn = () =>{

    };

    this.getWinnings = () =>{

    };

    this.checkHand = () =>{

    };

    this.revealHands = () =>{

    };

    this.setPlayerCards = (one_card) =>{

    };




}

module.exports = Games;
