'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'playerhand_table',
      {
        custombet: {
          type:Sequelize.INTEGER,
          defaultValue: 0
        },
        lobbyid: { //pk
          type: Sequelize.INTEGER,
        },
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


