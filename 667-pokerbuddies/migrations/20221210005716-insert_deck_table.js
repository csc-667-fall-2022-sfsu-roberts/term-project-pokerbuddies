"use strict";
module.exports = {
  up: async(queryInterface) => {
    return queryInterface.bulkInsert('deck_table', [{
      
      cardid: 1,
  }, 
  {
   
    cardid: 1,
 },
 {

  cardid: 1,
},
{

  cardid: 1,
},
{

  cardid: 1,
},
{

   cardid: 6,
}, 
    ]);
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('deck_table', null, {});
  }
};