const Sequelize = require('sequelize');
const db = require('../config/database');

const Users = db.define('users', {
  idUser: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  name: {
    type: Sequelize.STRING
  },
  name2: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  lastName2: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
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

module.exports = Users;