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

    

}
