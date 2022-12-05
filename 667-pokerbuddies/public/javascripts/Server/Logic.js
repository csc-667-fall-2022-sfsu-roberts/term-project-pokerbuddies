//NOTE: SPADES > HEARTS > CLOVER > DIAMONDS
//NOTE: K > Q > J > T > 9 > 8 > 7 > 6 > 5 > 4 > 3 > 2 > 1

//Will probably return this object instead of just the integers in case we need
//to check face or suit later on.
class combinationObject {
    constructor(ranking, suits, faces) {
        this.ranking = ranking; //The number pertaining to each combination
        this.suits = suits;
        this.faces = faces;
    }
}

//All of the check functions below will either return a 0 or 1, false or
//true respectively. This will indicate whether the combination exists or
//not. The suits, and faces can be checked later on via the combination
//object if there is a case that two or more players have the same
//combination.

//from hand
function checkHighestCard(cards){

} //0
//find highest value card in hand
function checkSecondHighestCard() //1
//select 2nd card

function checkPair() //2
//check all cards for first instance of 2 cards of same value
function checkTwoPair() //3
//call checkPair twice
function checkTriple() //4
//check all cards for 3 cards of same value
function checkStraight() //5
//check all cards for values
function checkFlush() //6
//check all cards for 5 cards of same suit
function checkFullHouse() //7
//check if triple is present and a pair (not incl triple)
function checkFourOfAKind() //8
//check all cards for 4 cards of the same value
function checkStraightFlush() //9
//call checkStraight and then checkFlush
function checkRoyalFlush() //10
//check all cards for a value of 10,11,12,13,14 and the same suit

function getDetails(hand, river) {
    const cards= (hand + river).split(" ").split("-") //Assuming everything i a string this will parse and split the string
    const river_length = river.length;
    const face = []; //An array to hold faces of the hand and/or river
    const suit = []; //An array to hold suits of the hand and/or river

    //Assuming everything is going to be a pair of strings. ie. "A-H T-S" or "Ace-Hearts Ten-Spades"
    //I will split it twice. Once to get the individual cards, and one more time to get individual suits and
    //their respectives faces. I want to seperate them to check things like straights or flushes
    //String will contain two conjoining strings with no space, a suit and a face.
    for(let i=0; i< cards.length/2; i+2){
        //Stored the faces and suits for later use. Will need to check which suit or face is greater
        //If two players get the same combination.
        face.push(cards[i]);
        suit.push(cards[i+1]);
    }

    //If river is only of length 1 then only check for these conditions
    if (river_length == 1) {
        //pass in player hand
        //compare options:
        //triple
        //1 pair 
        //Highest card
        //Second Highest Card
        if (checkTriple()) {
            return null;
        }
        if(checkTwoPair()){
            return null;
        }
        if (checkPair()) {
            return null;
        }
        if (checkHighestCard() == 1) {
            //1 is a place holder boolean check. Look in else condition for more details
            return null;
        } else {
            //This is if we have checked that two players have the same highest card.
            //We will now default to looking at their second card in their hand to
            //determing the winner. Basically the last/worse case scenario
            checkSecondHighestCard();
        }
    }

    //If river is only of length 2 then only check for these conditions
    if (river_length == 2) {
        //if River == 2 cards, max is 
        //pass in player hand
        //compare options:
        //4 of a kind
        //triple
        //2 pair
        //1 pair 
        //Highest card
        //Second Highest Card
        if(checkFourOfAKind()){
            return null;
        }
        if (checkTriple()) {
            return null;
        }
        if(checkTwoPair()){
            return null;
        }
        if (checkPair()) {
            return null;
        }
        if (checkHighestCard() == 1) {
            //1 is a place holder boolean check. Look in else condition for more details
            return null;
        } else {
            //This is if we have checked that two players have the same highest card.
            //We will now default to looking at their second card in their hand to
            //determing the winner. Basically the last/worse case scenario
            checkSecondHighestCard();
        }
    }

    //If river is greater than length 2 then check for all conditions ie. worst case scenario
    if (river_length == 2) {
        //check all possible conditions
        if(checkRoyalFlush()){
            return 10;
        }
        if(checkStraightFlush()){
            return 9;
        }
        if(checkFourOfAKind()){
            return 8;
        }
        if(checkFullHouse()){
            return 7;
        }
        if(checkFlush()){
            return 6;
        }
        if(checkStraight()){
            return 5;
        }
        if (checkTriple()) {
            return 4;
        }
        if (checkTwoPair()) {
            return 3;
        }
        if (checkPair()) {
            return 2;
        }
        if (checkHighestCard() == 1) {
            //1 is a place holder boolean check. Look in else condition for more details
            return 1;
        } else {
            //This is if we have checked that two players have the same highest card.
            //We will now default to looking at their second card in their hand to
            //determing the winner. Basically the last/worse case scenario
            return 0;
        }
    }

}

const Logic = function (h1, h2, h3, h4) {
    //Call this function to see who has the better hand along with the river at
    //the time of calling this fuunction.
    let p1 = getDetails(h1);
    let p2 = getDetails(h2);
    let p3 = getDetails(h3);
    let p4 = getDetails(h4);

    //Compare the return values of p1,p2,p3, and p4 to see who wins at the time
    //If we have two equating integers we will then use suits or faces to
    //determine the winner

}