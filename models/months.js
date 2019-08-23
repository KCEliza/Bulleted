
module.exports = (sequelize, DataTypes) => {
  const Months = sequelize.define("Months", {
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
  Months.associate = function(models) {
    Months.belongsTo(models.User, {foreignKey: "UserId", as: "user"});
  };
  return Months;
};