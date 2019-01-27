'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Tasks', // name of Target model
      'idUser', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Users', // name of Source model
          key: 'idUser',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Tasks', // name of the Target model
      'idUser' // key we want to remove
    );
  }
};