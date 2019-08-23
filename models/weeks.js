
module.exports = (sequelize, DataTypes) => {
  const Weeks = sequelize.define("Weeks", {
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
  Weeks.associate = function(models) {
    Weeks.belongsTo(models.User, {foreignKey: "UserId", as: "user"});
 };
  return Weeks;
};