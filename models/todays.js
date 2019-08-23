
module.exports = (sequelize, DataTypes) => {
  const Todays = sequelize.define("Todays", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    todo: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Todays.associate = function(models) {
    Todays.belongsTo(models.User, {foreignKey: "UserId", as: "user"});
  };
  return Todays;
};
