class card {
    constructor(suit, value, deckId, cardImage) {
        this.suit = suit;
        this.value = value;
        this.deckId = deckId;
        this.cardImage = cardImage;
    }
}

var deck = [];
//from hand
function checkHighestCard()
    //find highest value card in hand
function checkSecondHighestCard()
    //select 2nd card


function checkPair()
    //check all cards for first instance of 2 cards of same value
function checkTwoPair()
    //call checkPair twice
function checkTriple()
    //check all cards for 3 cards of same value
function checkStraight()
    //check all cards for values
function checkFlush()
    //check all cards for 5 cards of same suit
function checkFullHouse()
    //check if triple is present and a pair (not incl triple)
function checkFourOfAKind()
    //check all cards for 4 cards of the same value
function checkStraightFlush()
    //call checkStraight and then checkFlush
function checkRoyalFlush()
    //check all cards for a value of 10,11,12,13,14 and the same suit

//create a checkRiver to check how many total cards are in play
    //if River == 1 card
        //pass in player hand
        //compare options:
                //triple
                //1 pair 
                //Highest card
                //Second Highest Card
                
                
    //if River == 2 cards, max is 
        //pass in player hand
        //compare options:
                //4 of a kind
                //triple
                //2 pair
                //1 pair 
                //Highest card
                //Second Highest Card
                
    //if River > 2
    //pass in player hand
        //compare all combination options
    
