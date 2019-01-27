'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      is: ["^[a-z]+$",'i'],
    },
    name2: {
      type: DataTypes.STRING,
      is: ["^[a-z]+$",'i'],
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      is: ["^[a-z]+$",'i'],
    },
    lastName2: {
      type: DataTypes.STRING,
      is: ["^[a-z]+$",'i'],
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      isDate: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      isDate: true,
    },
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: (user, options) => {
        {
          user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
        }
      }
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Tasks, {
      foreignKey: 'idUser',
      as: 'Tasks'
    });
  };
  return User;
};