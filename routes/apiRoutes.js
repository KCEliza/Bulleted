var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
    //journal getting things
    app.get("/api/journals", function (req, res) {
        db.Journals.findAll({}).then(function (dbJournal) {
           
            res.json(dbJournal);
        });

    });
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
    app.delete("/api/journals/:id", function (req, res) {
        db.Journals.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (dbJournal) {
                res.json(dbJournal);
            });
    })

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
            });
    });

    //todo Today list
    app.get("/api/todays", function (req, res) {
        db.Todays.findAll({}).then(function (dbTodays) {
            res.json(dbTodays);
        });

    });
    app.post("/api/todays", function (req, res) {
        console.log(req.body);
        db.Todays.create({
            todo: req.body.todo,
            UserId: req.user.id
        }).then(function (dbTodays) {
            res.json(dbTodays);
        });
        res.status(200);

    });
    app.delete("/api/todays/:id", function (req, res) {
        db.Todays.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (dbTodays) {
                res.json(dbTodays);
            });
    })

    app.put("/api/todays/:id", function (req, res) {
        var completed = req.body.completed === "true"; // true or false
        db.Todays.update({
            completed: completed
        }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbTodays) {
                res.json(dbTodays);
            });
    });

    //todo Weeks List
    app.get("/api/weeks", function (req, res) {
        db.Weeks.findAll({}).then(function (dbWeeks) {
            res.json(dbWeeks);
        });

    });
    app.post("/api/weeks", function (req, res) {
        console.log(req.body);
        db.Weeks.create({
            todo: req.body.todo,
            UserId: req.user.id
        }).then(function (dbWeeks) {
            res.json(dbWeeks);
        });
        res.status(200);

    });
    app.delete("/api/weeks/:id", function (req, res) {
        db.Weeks.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (dbWeeks) {
                res.json(dbWeeks);
            });
    })

    app.put("/api/weeks/:id", function (req, res) {
        console.log("weeks PUT route hit");

        var completed = req.body.completed === "true"; // true or false

        db.Weeks.update({
            completed: completed
        }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbWeeks) {
                res.json(dbWeeks);
            });
    });

    //todo Months List
    app.get("/api/months", function (req, res) {
        db.Months.findAll({}).then(function (dbMonths) {
            res.json(dbMonths);
        });

    });
    app.post("/api/months", function (req, res) {
        console.log(req.body);
        db.Months.create({
            todo: req.body.todo,
            UserId: req.user.id
        }).then(function (dbMonths) {
            res.json(dbMonths);
        });
        res.status(200);

    });
    app.delete("/api/months/:id", function (req, res) {
        db.Months.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (dbMonths) {
                res.json(dbMonths);
            });
    })

    app.put("/api/months/:id", function (req, res) {
console.log("months PUT route hit");

        var completed = req.body.completed === "true"; // true or false

        db.Months.update({
            completed: completed
        }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbMonths) {
                res.json(dbMonths);
            });
    });




    // Using the passport.authenticate middleware with our local strategy.  If the user has valid login credentials, send them to the members page, otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request, so we're sending the user back the routhe to the members page because the redirect will happen on the front end. They won't get this or even be able to access this page if they aren't authed
        res.redirect("/members");
    });

    // Route for siging up a user. The user's password is automatically hashed and stored securely thanks to how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in, otherwise send back an error
    app.post("/api/signup", (req, res) => {
        let {
            fName,
            lname,
            email,
            password,
            password2
        } = req.body;
        console.log(req.body.fName);
        console.log(req.body.lname);
        console.log(req.body.email);
        console.log(req.body.password);
        console.log(req.body.password2);
        let errors = [];
        if (!fName || !lname || !email || !password || !password2) {
            errors.push({
                message: "Please fill in all fields"
            });
        }
        if (password !== password2) {
            errors.push({
                message: "Passwords do not match"
            });
        }
        if (password.length < 6) {
            errors.push({
                message: "Password needs to be at least 6 characters long"
            });
        }
        if (errors.length > 0) {
            console.log(errors);
            res.render("signup", {
                errors,
                fName,
                lname,
                email,
                password,
                password2
            });
        } else {
            db.User.create({
                email: req.body.email,
                password: req.body.password,
                fName: req.body.fName,
                lname: req.body.lname
            }).then(function (dbUser) {
                console.log(dbUser);
                // redirect
                req.flash("success_message", "You are now signed up and can log in");
                res.redirect("/login");
            }).catch(function (err) {
                console.log(err);
                res.render("signup");
            });
        }
    });
    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
        // window.location = "/";
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
};
