module.exports = (sequelize, DataTypes) => {
  const Trackers = sequelize.define("Trackers", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    itemTitle: {
      type: DataTypes.STRING,
    },
    dayOne: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayTwo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayThree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayFour: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayFive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    daySix: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    daySeven: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    }
  }, {});
  Trackers.associate = function (models) {
    Trackers.belongsTo(models.User, {
      foreignKey: "UserId",
      as: "user"
    });
  };
  return Trackers;
};