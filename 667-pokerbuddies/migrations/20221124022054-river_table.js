'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'river_table',
      {
        cardid: { 
          type: Sequelize.INTEGER,
          allowNull: false
        },
        gamelobbyid: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('river_table');
  }
};

