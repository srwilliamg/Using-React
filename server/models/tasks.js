module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    idTask: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    priority: {
      type: DataTypes.STRING
    },
    completionDate: {
      type: DataTypes.DATE
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
  });

  Tasks.associate = function (models) {};
  return Tasks;
};