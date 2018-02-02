const db = require('../models');
const passport = require("../config/passport");
const user_controller = require('../controller/user_controller');
const isAuthenticated = require("../config/middleware/isAuthenticated");

//this is the users_controller.js file
exports.registrationPage = function(req,res) {
  res.render('/', {
    layout: 'main-registration'
  });
};

exports.logOutUser = function(req,res) {
  req.logout();
  res.redirect("/");
};

// login
exports.loginUser = function(req, res) {
  console.log("user_controller*********");
  passport.authenticate("local"),
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
  res.redirect("/home/dashboard");
};

exports.dashboard = function(req, res, next) {
  console.log("dashboard****");
  res.render('dashboard.ejs');

};

// register a user
exports.signUp = function(req,res) {
  console.log(req.body.user_name)
  db.User.findAll({
    where: {username: req.body.user_name}
  }).then(function(users) {
    console.log("then")
    if (users.length > 0) {
      res.json({
        duplicateUser: true
      });
    //At some point, make sure that only one user can be associated with an email.
    } else {
      db.User.create({
        user_name: req.body.user_name,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mob_no: req.body.mob_no,
        position: req.body.position

      }).then(function() {
        res.send({redirect: '/'});
      }).catch(function(err) {
        console.log(err)

        res.json(err);
      });
    }
  })
};

exports.stockControl = function(res, req) {
    console.log('res SC', res.body)
    const name = res.body.name
    // const name2 = res.body.name2
    const locationFrom = res.body.locationFrom
    const locationTo = res.body.locationTo
    const amount = parseInt(res.body.amount)
    // const amount2 = parseInt(res.body.amount2)

    db.Inventory
        .findOne({
            where: {
                product_code: name
            },
        })
        .then(function(data) {
            // console.log(data)
            const product = data.dataValues
            console.log(typeof product[locationFrom], typeof product[locationTo], typeof amount)

            db.Inventory
                .update({
                    [locationFrom]: product[locationFrom] - amount,
                    [locationTo]: product[locationTo] + amount


                }, { where: { product_code: name } })
                .then(function(update) {
                    console.log('update', update)
                })
                .catch(function(err) {
                    console.log('error', err)
                })
        })
      };