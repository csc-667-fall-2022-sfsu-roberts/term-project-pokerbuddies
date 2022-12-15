const socket = io();
import { writeFile } from 'fs';
import { compileFile } from 'pug';



//holds list of displayed players
var players = [];

//creates 6 cards and gives them individual ids
for (let i = 1; i < 6; i++) {
    let cardid = 'card' + i;
    var card = document.getElementById(cardid);
    var cardCopy = card.cloneNode(true);
    cardCopy.id = cardid.replace(i, i + 1);
    card.after(cardCopy);
}


//Displays each individual session and game pages for each session
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.children[0].innerText = `Session ${index + 1}`;
    createGameLobbies(index + 1);
});

//gives each button an individual id and updates list of players when clicked
const buttons = document.querySelectorAll('.join');
buttons.forEach((button, index) => {
    let roomId = index + 1;
    button.children[0].id = roomId;
    console.log(roomId);
    button.addEventListener('click', (event) => {
        fetch(`/games${roomId}`, {
            method: "get",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({ id: socket.id})
        })
        // socket.emit('join', roomId);
        updatePlayerList(event);
    });
}
);






function addPlayer() {
    let playerNames = players.map((player) => player.innerText);
    let index = playerNames.findIndex((p) => p == '-');
    //returns index of first element that is '-'
    if (index == -1) {
        console.log("Cannot join lobby");
    }
    else {
        players[index].innerText = "test";
        //account name
    }
}
//targets parent card of button 
const updatePlayerList = (e) => {
    var parentCard = e.target.parentNode.parentNode.parentNode;
    var playerList = parentCard.children[1].children[1].children;
    for (let i = 0; i < 4; i++) {
        players[i] = playerList[i];
    }

    addPlayer();
}

function createGameLobbies(lobbyNum) {
    if (lobbyNum < 1) {
        return -1;
    }
    for (let i = 0; i < lobbyNum; i++) {
        const newFileName = `games${lobbyNum}.pug`;
        compileFile('games.pug', (err, originalHTML) => {
            if (err) {
                console.error(err);
                return;
            }
            writeFile(newFileName, originalHTML, (err) => {
                if (err) {
                    // Handle the error if there is one
                    console.error(err);
                    return;
                }
            });
        });
    }

    function openCloseFunction() {
        var x = document.getElementById("sidebar");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }














