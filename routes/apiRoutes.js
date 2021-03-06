//goes to models folder
var db = require("../models");
//authentication
var passport = require("../config/passport");

module.exports = function (app) {
    //get the journal entries
    app.get("/api/journals", function (req, res) {
        db.Journals.findAll({}).then(function (dbJournal) {
            res.json(dbJournal);
        });

    });
    //create new entries
    app.post("/api/journals", function (req, res) {
        console.log(req.body);
        db.Journals.create({
            body: req.body.body,
            UserId: req.user.id
        }).then(function (dbJournal) {
            res.json(dbJournal);
        });
        res.status(200);

    });
    //delete journal entries
    app.delete("/api/journals/:id", function (req, res) {
        db.Journals.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbJournal) {
                res.json(dbJournal);
            })
    });

    //journal entries update
    app.put("/api/journals", function (req, res) {
        db.Journals.update({
                body: req.body.body
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbJournal) {
                res.json(dbJournal);
            })
    });

    //--------------------------------------
    //--------------------------------------
    //Todo will get things here
    app.get("/api/todos", function (req, res) {
        db.Todos.findAll({}).then(function (dbTodos) {
            res.json(dbTodos);
        });

    });
    //Creates new todo item
    app.post("/api/todos", function (req, res) {

        db.Todos.create({
            todo: req.body.todo,
            UserId: req.user.id
        }).then(function (dbTodos) {
            res.json(dbTodos);
        });
        res.status(200);

    });
    //Deletes todo items
    app.delete("/api/todos/:id", function (req, res) {
        db.Todos.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbTodos) {
            res.json(dbTodos);
        });
    })
    //updates todo items
    app.put("/api/todos/:id", function (req, res) {
        var completed = req.body.completed === "true"; // true or false
        db.Todos.update({
            completed: completed
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (dbTodos) {
            res.json(dbTodos);
        });
    });

    //--------------------------------------
    //--------------------------------------
    //Tracker will get things here
    app.get("/api/tracker", function (req, res) {
        db.Trackers.findAll({}).then(function (dbTracker) {
            res.json(dbTracker);
        })
    });
    //create new tracker rows
    app.post("/api/tracker", function (req, res) {

        db.Trackers.create({
            itemTitle: req.body.itemTitle,
            UserId: req.user.id
        }).then(function (dbTracker) {
            res.json(dbTracker)
        })
        res.status(200);
    });
    //delete tracker items
    app.delete("/api/tracker/:id", function (req, res) {
        db.Trackers.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbTracker) {
            res.json(dbTracker)
        })
    });
    app.put("/api/tracker/:id", function (req, res) {
        var id = req.params.id.split("_");
        db.Trackers.update({
            [id[1]]: true //FIGURE OUT SYNTAX
        }, {
            where: {
                id: id[0]
            }
        }).then(function (dbTracker) {
            res.json(dbTracker);
        })
    })

    //--------------------------------------
    //--------------------------------------
    //Authentication and User information
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.redirect("/members")
    });
    //signing up a user
    app.post("/api/signup", (req, res) => {
        let {
            fName,
            lName,
            email,
            password,
            password2
        } = req.body;
        let errors = [];
        if (!fName || !lName || !email || !password || !password2) {
            errors.push({
                message: "Please fill in all fields to continue"
            })
        }
        if (password !== password2) {
            errors.push({
                message: "Passwords do not match"
            })
        }
        if (password.length < 6) {
            errors.push({
                message: "Password must be at least 6 characters"
            })
        }
        if (errors.length > 0) {
            console.log(errors);
            res.render("signup", {
                errors,
                fName,
                lName,
                email,
                password,
                password2
            });
        } else {
            db.User.create({
                email: req.body.email,
                password: req.body.password,
                fName: req.body.fName,
                lName: req.body.lName
            }).then(function (dbUser) {
                // redirect
                req.flash("success_message", "You are now signed up and can log in");
                res.redirect("/login");
            }).catch(function (err) {
                console.log(err);
                res.render("signup");
            });
        }
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Other wise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });



}