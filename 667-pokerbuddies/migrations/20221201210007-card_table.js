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
          type: Sequelize.STRING(100),
          allowNull: false
        },
        number: {
          type:Sequelize.INTEGER
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('card_table');
  }
};