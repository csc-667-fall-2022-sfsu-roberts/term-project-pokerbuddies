//holds list of displayed players
const players = [];

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
// const pCount = document.querySelectorAll('.playerCount');
// pCount.forEach((numPlayers) => {
//     pCount.children[0].innerText = `${playerCount}/4`;
// });
//adds account player's username to session
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
    for(let i = 0; i < 4; i++){
        players[i] = playerList[i];
    }
    addPlayer();
}
//gives each button an individual id and updates list of players when clicked
const buttons = document.querySelectorAll('.join');
buttons.forEach((button, index) => {
    button.children[0].id = `join${index + 1}`;

    button.addEventListener('click', updatePlayerList);
});















