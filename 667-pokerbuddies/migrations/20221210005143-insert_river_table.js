"use strict";
module.exports = {
  up: async(queryInterface) => {
    return queryInterface.bulkInsert('river_table', [{
      gamelobbyid: 1,
      cardid: 1,
  }, 
  {
    gamelobbyid: 2,
    cardid: 1,
 },
 {
  gamelobbyid: 3,
  cardid: 1,
},
{
  gamelobbyid: 4,
  cardid: 1,
},
{
  gamelobbyid: 5,
  cardid: 1,
},
{
  gamelobbyid: 6,
   cardid: 6,
}, 
    ]);
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('river_table', null, {});
  }
};