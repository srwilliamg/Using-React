const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const Users = db.define('users', {
  idUser: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name2: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName2: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  hooks: {
    beforeCreate: (user, options) => {
      {
        user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
      }
    }
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