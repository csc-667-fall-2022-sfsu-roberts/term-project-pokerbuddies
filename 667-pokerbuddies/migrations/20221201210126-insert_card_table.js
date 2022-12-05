"use strict";
module.exports = {
  up: async(queryInterface) => {
    return queryInterface.bulkInsert('card_table', [{
     cardid: 1,
      suit: "Ace Clubs",
  }, 
  {
    cardid: 2,
    suit: "Ace Diamonds",
},  {
  cardid: 3,
  suit: "Ace Hearts",
},  {
  cardid: 4,
  suit: "Ace Spades",
},   
{
  cardid: 5,
  suit: "Two Clubs",
  number:2,
}, 
{
  cardid: 6,
  suit: "Two Diamonds",
  number:2,
}, 
{
  cardid: 7,
  suit: "Two Hearts",
  number:2,
}, 
{
  cardid: 8,
  suit: "Two Spades",
  number:2,
}, 
{
  cardid: 9,
  suit: "Three Clubs",
  number:3,
}, 
{
  cardid: 10,
  suit: "Three Diamonds",
  number:3,
}, 
{
  cardid: 11,
  suit: "Three Hearts",
  number:3,
}, 
{
  cardid: 12,
  suit: "Three Spades",
  number:3,
}, 
{
  cardid: 13,
  suit: "Four Clubs",
  number:4,
}, 
{
  cardid: 14,
  suit: "Four Diamonds",
  number:4,
}, 
{
  cardid: 15,
  suit: "Four Hearts",
  number:4,
}, 
{
  cardid: 16,
  suit: "Four Spades",
  number:4,
}, 
{
  cardid: 17,
  suit: "Five Clubs",
  number:5,
}, 
{
  cardid: 18,
  suit: "Five Diamonds",
  number:5,
}, 
{
  cardid: 19,
  suit: "Five Hearts",
  number:5,
},
{
  cardid: 20,
  suit: "Five Spades",
  number:5,
},
{
  cardid: 21,
  suit: "Six Clubs",
  number:6,
},
{
  cardid: 22,
  suit: "Six Diamonds",
  number:6,
},
{
  cardid: 23,
  suit: "Six Hearts",
  number:6,
},
{
  cardid: 24,
  suit: "Six Spades",
  number:6,
},
{
  cardid: 25,
  suit: "Seven Clubs",
  number:7,
},
{
  cardid: 26,
  suit: "Seven Diamonds",
  number:7,
},
{
  cardid: 27,
  suit: "Seven Hearts",
  number:7,
},
{
  cardid: 28,
  suit: "Seven Spades",
  number:7,
},
{
  cardid: 29,
  suit: "Eight Clubs",
  number:8,
},
{
  cardid: 30,
  suit: "Eight Diamonds",
  number:8,
},
{
  cardid: 31,
  suit: "Eight Hearts",
  number:8,
},
{
  cardid: 32,
  suit: "Eight Spades",
  number:8,
},
{
  cardid: 33,
  suit: "Nine Clubs",
  number:9,
},
{
  cardid: 34,
  suit: "Nine Diamonds",
  number:9,
},
{
  cardid: 35,
  suit: "Nine Hearts",
  number:9,
},
{
  cardid: 36,
  suit: "Nine Spades",
  number:9,
},
{
  cardid: 37,
  suit: "Ten Clubs",
  number:10,
},
{
  cardid: 38,
  suit: "Ten Diamonds",
  number:10,
},
{
  cardid: 39,
  suit: "Ten Hearts",
  number:10,
},
{
  cardid: 40,
  suit: "Ten Spades",
  number:10,
},
{
  cardid: 41,
  suit: "Jack Clubs",
  
},
{
  cardid: 42,
  suit: "Jack Diamonds",
},
{
  cardid: 43,
  suit: "Jack Hearts",
},
{
  cardid: 44,
  suit: "Jack Spades",
},
{
  cardid: 45,
  suit: "Queen Clubs",
},
{
  cardid: 46,
  suit: "Queen Diamonds",
},
{
  cardid: 47,
  suit: "Queen Hearts",
},
{
  cardid: 48,
  suit: "Queen Spades",
},
{
  cardid: 49,
  suit: "King Clubs",
},
{
  cardid: 50,
  suit: "King Diamonds",
},
{
  cardid: 51,
  suit: "King Hearts",
},
{
  cardid: 52,
  suit: "King Spades",
},
    ]);
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('card_table', null, {});
  }
};