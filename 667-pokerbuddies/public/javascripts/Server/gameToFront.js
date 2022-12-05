import Game from './Games.js';
import Player from './Player.js';

//testing for full game
// let game = new Game();
// game.startNewGame();

const socket = 0;
const gameNumber = 0;
const gamelobys = new Map();
function createNewGame(socket, roomNumber){
    this.socket = socket;
    this.gameNumber = roomNumber;
    let game = new Game(socket, gameNumber);
    gamelobys.set(gameNumber, game);

};

function joinGame(socket, roomNumber){
    const player = new Player(socket);
    if(gamelobys.has(roomNumber)){
       let loby = this.gamelobys.get(roomNumber);
       if(loby.getLobySize()< 4){
        loby.addNewPlayer('ryan1',1);
       }else{
        alert("TO MANY PEOPLE");
        return;
       }
        
    }else{
        createNewGame(socket,roomNumber);
    }
}
 



let foldButton = document.getElementById('fold-button');
let callButton = document.getElementById('call-button');
let raiseButton = document.getElementById('raise-button');
let checkButton = document.getElementById('check-button');
let betButton = document.getElementById('bet-button');

foldButton.onclick = () =>{
    game.fold();
}

