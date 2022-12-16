'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'deck_table',
      {
        cardid: { ///fk
          type: Sequelize.INTEGER
        },
        deckid: {
          type: Sequelize.INTEGER

        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('deck_table');
  }
};
