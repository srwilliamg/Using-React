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
      allowNull: false
    },
    name2: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName2: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
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
    User.hasMany(models.Tasks);
  };
  return User;
};