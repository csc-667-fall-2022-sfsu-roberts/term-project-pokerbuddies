'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'card_table',
      {
        cardid: { 
          type: Sequelize.INTEGER,
          primaryKey: true
        },
       suit: {
          type: Sequelize.CHAR,
          allowNull: false
        },
        number: {
          type:Sequelize.INTEGER, 
          allowNull: false
        },
        beenshown: {
          type:Sequelize.BOOLEAN, 
          defaultValue: false
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('card_table');
  }
};
