"use strict";
module.exports = {
  up: async(queryInterface) => {
    return queryInterface.bulkInsert('gamelobby_table', [{
     deckid: 1,
      riverid: 1,
  }, 
  {
    deckid: 2,
     riverid: 2,
 },
 {
  deckid: 3,
   riverid: 3,
},
{
  deckid: 4,
   riverid: 4,
},
{
  deckid: 5,
   riverid: 5,
},
{
  deckid: 6,
   riverid: 6,
}, 
    ]);
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('gamelobby_table', null, {});
  }
};