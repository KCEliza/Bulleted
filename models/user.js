// Requiring bcrypt for password hashing.  Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcrypt");

// Creating our User model
// Set it as export because we will need it required on the server
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // The email cannot be null, and must be a proper email before creation
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Creating a custom method for our User model
    // This will check if an unhashed password entered by the user can be compared to the hased password stored in our database
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.beforeCreate(user => {
        user.password = bcrypt.hashSync(
            user.password, bcrypt.genSaltSync(10), null
        );
    });
    User.associate = function (models) {
        User.hasMany(models.Journals, {
                as: "journals"
            }),
            User.hasMany(models.Todos, {
                as: "todos"
            }),
            User.hasMany(models.Trackers, {
                as: "trackers"
            })
    };
    return User;
};