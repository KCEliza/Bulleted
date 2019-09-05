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
    dayEight: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayNine: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayTen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayEleven: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayTwelve: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayThirteen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayFourteen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayFifteen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    daySixteen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    daySeventeen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayEighteen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayNineteen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayTwenty: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayTwentyOne: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayTwentyTwo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayTwentyThree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayTwentyFour: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayTwentyFive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayTwentySix: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayTwentySeven: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayTwentyEight: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayTwentyNine: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayThirty: {
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