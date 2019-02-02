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
      validate: {
        is: ["^[a-z]+$",'i'],
        notEmpty: true,
      }
    },
    name2: {
      type: DataTypes.STRING,
      validate: {
        is: ["^[a-z]+$",'i'],
        notEmpty: true,
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$",'i'],
        notEmpty: true,
      }
    },
    lastName2: {
      type: DataTypes.STRING,
      validate: {
        is: ["^[a-z]+$",'i'],
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg:"Please enter a correct email."
        },
        notEmpty: {
          msg: "Email cannot be empty."
        },
        isUnique : function (value, next) {
            const field = 'email';
            var query = {};
            query[field] = value;
            User.find({
              where: query,
              attributes: ['email']
            }).then(function (obj) {
              if (obj) {
                next(field + ' "' + value + '" is already in use');
              } else {
                next();
              }
            });
          }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      isDate: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      validate: {
      isDate: true,
      }
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