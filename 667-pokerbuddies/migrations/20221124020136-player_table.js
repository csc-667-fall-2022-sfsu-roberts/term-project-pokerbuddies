'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'player_table',
      {
        userid: { 
          type: Sequelize.INTEGER
        },
       chips: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        chipswon: {
          type:Sequelize.INTEGER, 
          defaultValue: 0
        },
        playerid: {
          type:Sequelize.INTEGER,
           autoIncrement: true ,
           primaryKey: true,
          allowNull: false
        },
      lobbyid: {
          type:Sequelize.INTEGER, 
          
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('player_table');
  }
};