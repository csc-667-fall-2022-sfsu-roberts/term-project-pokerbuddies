'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'gamelobby_table',
      {
        lobbyid: { //pk
          type: Sequelize.INTEGER,
        },
       playercount: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
       turnorder: {
          type:Sequelize.INTEGER,
          defaultValue: 0
        },
        pot: {
          type:Sequelize.INTEGER,
          defaultValue: 0
        },
        deckid: { //fk
          type:Sequelize.INTEGER,
          allowNull: false
        },
        riverid: {
          type:Sequelize.INTEGER,
          allowNull:false
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('gamelobby_table');
  }
};



