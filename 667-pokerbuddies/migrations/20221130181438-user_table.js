'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'user_table',
      {
        userid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }
       ,username: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        password: {
          type:Sequelize.STRING(100), //STRING(100) IN SEQUELIZE IS THE SAME AS VARCHAR(100) IN POSTGRESQL
          allowNull: false
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_table');
  }
};

