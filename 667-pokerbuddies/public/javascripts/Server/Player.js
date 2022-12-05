const Player = function (name = "name", socket) {
  this.userName = name;
  this.cards = [];
  this.socket = socket;
  this.chips = 100;
  this.buyIn = 0;
  this.status = "";
  this.allIn = false;
  this.against = false;
  this.out = false;
  this.turn = 0;
  this.checked = false;
  this.bet = 0;
  this.fold = false;
  this.playerNumber = 0;

  this.emit = (name, stuff) => {
    this.socket.emit(name, stuff);
  };

  this.newRound = () => {
    this.bet = 0;
    this.checked = false;
    this.status = "";
    this.currentCard = "";
    this.cards = [];
    this.fold = false;
  };

  this.setPlayerNumber =(val) =>{
    this.playerNumber = val;

  }

  this.getPlayerNumber = () =>{
    return this.playerNumber;
  }

  this.setFold = (val) => {
    this.fold = val;
  };

  this.isFolded = () => {
    return this.fold;
  };

  this.setBet = (val) => {
    if (this.chips > val) {
      this.chips -= val;
      this.bet = val;
    } else {
      return -1;
    }
  };

  this.getChips = () => {
    return this.chips;
  };

  this.setChips = (val) => {
    this.chips += val;
  };

  this.getBet = () => {
    return this.bet;
  };

  this.getSocket = () => {
    return socket;
  };

  this.setTurn = (num) => {
    this.turn = num;
  };

  this.getTurn = () => {
    return this.turn;
  };

  this.addCard = (card) => {
    this.cards.push(card);
  };

  this.getCards = () =>{
    return this.cards;
  }

  this.setStatus = (data) => {
    this.status = data;
  };

  this.getName = () => {
    return this.userName;
  };

  this.getStatus = () => {
    return this.status;
  };

  this.emit = (event, pay) => {
    this.socket.emit(event, pay);
  };

  this.setIsChecked = (val) => {
    this.checked = val;
  };

  this.getIsChecked = () => {
    return this.checked;
  };
};

export default Player;
// module.exports = Player;
