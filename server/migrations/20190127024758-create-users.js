'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      idUser: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
      },
      name2: {
        type: Sequelize.STRING,
        notEmpty: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
      },
      lastName2: {
        type: Sequelize.STRING,
        notEmpty: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};