'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'playerhand_table',
      {
        playerid: { 
          type: Sequelize.INTEGER,
          allowNull: false
        },
       cardid: {
          type: Sequelize.INTEGER
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('playerhand_table');
  }
};


