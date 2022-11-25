'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'gamelobby_table',
      {
        lobbyid: { //pk
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
       playercount: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
       turnorder: {
          type:Sequelize.INTEGER
        },
        pot: {
          type:Sequelize.INTEGER
        },
        deckid: { //fk
          type:Sequelize.INTEGER,
          allowNull: false
        },
        riverid: {
          type:Sequelize.INTEGER,
          allowNull:false
        },
        custombet: {
          type:Sequelize.INTEGER,
          defaultValue: 0
        },
        playerhandid: {
          type:Sequelize.INTEGER
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('gamelobby_table');
  }
};



