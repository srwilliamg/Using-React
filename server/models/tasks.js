module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    idTask: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        not: ["[a-z]", 'i'],
        notEmpty: true,
        min: 0
      }
    },
    completionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        notEmpty: true,
      }
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
  });

  Tasks.associate = function (models) {
    Tasks.belongsTo(models.Users, {
      foreignKey: 'idUser',
      as: 'Tasks'
    });
  };
  return Tasks;
};