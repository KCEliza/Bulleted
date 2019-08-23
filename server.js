
// Requiring necessary npm middleware packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var flash = require("connect-flash");

// Requiring passport as we've configured it
var passport = require("passport");
// require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8000;
// Import the models folder
var db = require("./models");

// Creating express app and configuring middleware need to read though our public folder
var app = express();
app.use(bodyParser.urlencoded({ extended: false })); // For body parser
app.use(bodyParser.json());
app.use(express.static("public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// We need to use sessions to keep trach of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.successMessage = req.flash("successMessage");
  res.locals.errorMessage = req.flash("errorMessage");
  res.locals.error = req.flash("error");
  next();
});


// Requiring our routes
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);


// this will listen to and show all activites on our terminal to let us know what is happening in our app
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});