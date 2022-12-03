
//An array to hold the order of card based on faces, and will be
//used for checking for a straight.
const order = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

}
class HandStrength {
    //obj with 3 int values to determine player's hand strength
    constructor(comboPrio, comboValue) {
        this.comboPrio = comboPrio;
        this.comboValue = comboValue;
    }


    //player 1 has a pair (pair's priority value = 1)
    //player 2 has two pair (two pair's priority value = 2)
    //return the player with the higher priority value

    //if priority values are the same, add total value together
    //player 1 has a pair of 5s (prio = 1) (comboValue = 10); handStrength = 11
    //player 2 has a pair of 4s (prio = 1) (comboValue = 8); handStrength = 9
    //return player with the higher handStrength

    //if 2+ players have the same prio value
    //check comboValue of each handStrength object
    //return the object with the highest comboValue

}
function checkWinner(players) {
    const maxPrio = 0;
    for (let i = 0; i < players.length; i++) {
        if (players[i].comboPrio > maxPrio){
            maxPrio = players[i].comboPrio;
        }
}

}

//find 2nd highest value card in hand and returns a player
function checkSecondHighestCard(hand) {
    //need to change Jack, Queen, King to numeric values in Deck.js
    const value = hand[0] > hand[1] ? hand[0] : hand[1];
    return new HandStrength(1, value);
}

//finds highest value card in hand and returns a player
function checkHighestCard(hand) {
    //need to change Jack, Queen, King to numeric values in Deck.js
    const value = hand[0] > hand[1] ? hand[0] : hand[1];
    return new HandStrength(2, value);

}

function checkPair(river, hand) {
    const matchPair = hand.filter(element => river.includes(element));
    if (hand[0] == hand[1]) {
        const handPair = hand[0];
    }
    if (matchHandPair.length == 0) {
        return -1
    }
    else {
        const maxPair = Math.max(matchPair);
        return new HandStrength(3, maxPair);
    }
}

//finds 2 highest value pairs that can be formed from player's hand
function checkTwoPair(river, hand) {
    //stores value of pairs found between hand/river and only in the river
    const matchHandPair = hand.filter((element, currentIndex) => hand.indexOf(element) !== currentIndex);
    const matchRiverPair = river.filter((element, currentIndex) => river.indexOf(element) !== currentIndex);

    //check for pair in hand
    if (hand[0] == hand[1]) {
        const handPair = hand[0];
        matchRiverPair.sort(function (a, b) { return a - b });
        const value = handPair + matchRiverPair[matchRiverPair.length - 1];
        return new HandStrength(4, value);
    }
    //throws error matched pair
    else if (matchHandPair.length == 0) {
        return -1;
    }

    else {
        matchHandPair.sort(function (a, b) { return a - b });
        matchRiverPair.sort(function (a, b) { return a - b });
        const value = matchHandPair[matchHandPair.length - 1] + matchRiverPair[matchRiverPair.length - 1];
        return new HandStrength(4, value);
    }





}
//call checkPair twice
function checkTriple(river, hand) {
    const matchPair = hand.filter(element => river.includes(element));

    if (matchPair.length == 0) {
        return -1
    }
    if (hand[0] == hand[1]) {
        //We have a pair in our hands
        //Now we just have to find at least one matching element from the river,
        const handPair = hand.filter(element => river.includes(element));
        const value = handPair[0];
        return new HandStrength(5, value);
    }
    //checks river for a pair that matches either card in hand
    const matchRiverPair = river.filter((element, currentIndex) => river.indexOf(element) !== currentIndex);
    const triple = hand.filter(element => matchRiverPair.includes(element));
    if (triple.length == 0) {
        return -1;
    }

    triple.sort(function (a, b) { return a - b });
    if (matchRiverPair.length == 0) {
        return -1;
    } else {
        const value = triple[triple.length - 1];
        return new HandStrength(5, value);
    }

}

//check all cards for 3 cards of same value
function checkStraight(river, hand) {
    let temp = hand.concat(river)
    let counter = 0;
    const condition1 = temp.filter(element => element == '5' || element == '10');
    if (condition1.length == 0) {
        return -1;
    }

    temp.sort(function (a, b) { return a - b });
    for (let i = 0; i < temp.length - 5; i++) {

        if (temp[i] + 1 == temp[i + 1] && temp[i] + 2 == temp[i + 2] && temp[i] + 3 == temp[i + 3] && temp[i] + 4 == temp[i + 4]) {
            if (temp[i] + 5 == temp[i + 5]) {
                continue;
            } else {
                break;
            }
        }
    }
    const value = temp[i]; //supposed to return highest value in straight, Not Done!
    return new HandStrength(6, value);
}
//check all cards for values
function checkFlush(river, hand) {

}
//check all cards for 5 cards of same suit
function checkFullHouse(river, hand) {
    const triple = checkTriple(river, hand);
    if (triple == -1){
        return -1
    }
    let tripleValue = triple.comboValue; // 7
    //searches for a pair that is not triple
    const handPair = hand.filter(element => river.includes(element) && element !== tripleValue);
    //finds greater value pair formed from hand
    const pairValue = Math.max(handPair);
    //adds fullHouse value together
    const value = pairValue + tripleValue;
    return new HandStrength(8, value);

}

function checkFourOfAKind(river, hand) {
    const value = 0;
    //checks if multiple values exist from hand in river
    const filter = river.filter(element => element == hand[0]).length;
    const filter2 = river.filter(element => element == hand[1]).length;
    //checks for exactly 3 copies of card in hand
    if (filter != 3 && filter2 != 3) {
        return -1;
    } else if (filter == 3) {
        value = hand[0];
    } else if (filter2 == 3){
        value = hand[1];
    }

    return new HandStrength(9, value);
}




//check all cards for 4 cards of the same value
function checkStraightFlush(river, hand) {

}
//call checkStraight and then checkFlush
function checkRoyalFlush(river, hand) {

}
//check all cards for a value of 10,11,12,13,14 and the same suit

//create a checkRiver to check how many total cards are in play
//pass in player hand
//compare all combination options


function getDetails(river, hand) {

    //check all possible conditions
    let x = checkRoyalFlush()
    if (x !== -1) {
        return 10;
    }

    x = checkStraightFlush()
    if (x !== -1) {
        return 9;
    }

    x = checkFourOfAKind()
    if (x !== -1) {
        return 8;
    }

    x = checkFullHouse()
    if (x !== -1) {
        return 7;
    }

    x = checkFlush()
    if (x !== -1) {
        return 6;
    }

    x = checkStraight()
    if (x !== -1) {
        return 5;
    }

    x = checkTriple()
    if (x !== -1) {
        return 4;
    }

    x = checkTwoPair()
    if (x !== -1) {
        return 3;
    }

    x = checkPair()
    if (x !== -1) {
        return 2;
    }

    x = checkHighestCard()
    if (x !== -1) {
        //1 is a place holder boolean check. Look in else condition for more details
        return 1;
    } else {
        checkSecondHighestCard()
        return 0;
    }
}

