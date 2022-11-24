const Player = function (name, socket){
    this.userName = name;
    this.cards = [];
    this.socket = socket;
    this.currentCard = null;
    this.chips = 100;
    this.buyIn = 0;
    this.status = '';
    this.blind = '';
    this.allIn = false;
    this.against = false;


    this.addCard = (card) =>{
        this.cards.push(card);
    };

    this.setStatus = (data) =>{
        this.status = data;
    }

    this.setBlind = (data) =>{
        this.blind = data;
    }

    this.getName = () =>{
        return this.name;
    }

    this.getStatus = () =>{
        return this.status;
    };

    this.getBlind = () =>{
        return this.blind;
    }

    this.emit = (event, pay) => {
        this.socket.emit(event,pay);
    }

};

module.exports = Player;