const order = "23456789TJQKA"

function getDetails(hand, river){
    const cards = (hand+river).split(" ") //Assuming everything i a string this will parse and split the string

    //Assuming everything is going to be a pair of strings. ie. "A-H T-S" or "Ace-Hearts Ten-Spades"
    //I will split it twice. Once to get the individual cards, and one more time to get individual suits and
    //their respectives faces. I want to seperate them to check things like straights or flushes
    //String will contain two conjoining strings with no space, a suit and a face.
    
    
}

const Logic = function (h1,h2,h3,h4){
    //Call this function to see who has the better hand along with the river at
    //the time of calling this fuunction.
    let p1 = getDetails(h1);
    let p2 = getDetails(h2);
    let p3 = getDetails(h3);
    let p4 = getDetails(h4);

    //Compare the return values of p1,p2,p3, and p4 to see who wins at the time
}