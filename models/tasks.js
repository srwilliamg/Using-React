const Sequelize = require('sequelize');
const db = require('../config/db');

const Tasks = db.define('tasks', {
  idTask: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  idUser: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'idUser',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  name: {
    type: Sequelize.STRING
  },
  priority: {
    type: Sequelize.STRING
  },
  completionDate: {
    type: Sequelize.DATE
  },
});

// force: true will drop the table if it already exists
// User.sync({
//   force: true
// }).then(() => {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });

module.exports = Tasks;