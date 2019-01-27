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
      is: ["^[a-z]+$", 'i'],
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
      not: ["[a-z]", 'i'],
    },
    completionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      isDate: true,
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