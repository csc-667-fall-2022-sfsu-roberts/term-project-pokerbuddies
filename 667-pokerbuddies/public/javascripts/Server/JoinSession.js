const socket = io();


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


//Displays each individual session
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.children[0].innerText = `Session ${index + 1}`;
    
});

//gives each button an individual id and updates list of players when clicked
const buttons = document.querySelectorAll('.join');
buttons.forEach((button, index) => {
    let roomId = `join${index + 1}`;
    button.children[0].id = roomId;

    button.addEventListener('click', (event) => {

        // fetch(`/session/${roomId}`, {
        //     method: "post",
        //     headers: { "Content-Type": "application/json" },
        //     body: gameFile
        // }).catch(error => console.log(error));

        socket.emit('join', roomId);
       
        updatePlayerList();
    });
});






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


function openCloseFunction() {
    var x = document.getElementById("sidebar");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


//Brendan's code for testing.













