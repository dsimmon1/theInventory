/**
 * Module dependencies.
 */
const express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    api = require('./routes/api-routes');
//var methodOverride = require('method-override');
const session = require('express-session'); //needed for Passport authentication
// var passport = require("./config/passport"); //needed for Passport authentication
const app = express();
const db = require("./models");
const Sequelize = require('sequelize');
const mysql = require('mysql');
let connection;
const bodyParser = require("body-parser");

//PASSPORT
const passport = require("./config/passport");
const isAuth = require("./config/middleware/isAuthenticated");
const authCheck = require("./config/middleware/attachAuthenticationStatus");
const user_controller = require("./controller/user_controller");
const isAuthenticated = require("./config/middleware/isAuthenticated");
// require("./routes/user.js");
app.use(passport.initialize());
app.use(passport.session());
app.use(authCheck);
//PASSPORT

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',

        database: 'tropical_inventory'

    });
};

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Calamigos2015',
        database: 'tropical_inventory'
    });
};

connection.connect();

global.db = connection;
var PORT = process.env.PORT || 8080;


// all environments
// app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 120000000 }
}))

// development only

app.get('/', routes.index); //call for main index page
app.get('/signup', user_controller.signUp); //call for signup page
app.post('/signup', user_controller.signUp); //call for signup post 
app.get('/login', routes.index); //call for login page
app.post('/login', user_controller.loginUser); //call for login post
app.get('/home/dashboard', user_controller.dashboard); //call for dashboard page after login
app.get('/home/logout', user_controller.logOutUser); //call for logout
// // app.get('/home/profile',user.profile);//to render users profile
app.get('/home/stockcontrol', user_controller.stockcontrol);
app.put('/api/stockcontrol', stockControl);
// app.get('/home/inventory', user.inventory);
// app.get('/home/orders', user.orders);
// app.get('/home/api/inventory', api.api_inventory);

//THIS NOW UPDATES THE COLUMN TOTAL when you click 
app.put('/api/receiveorders', receiveOrders)


function receiveOrders(res, req) {

    const ordersid = res.body.ordersid
    console.log('ordersid', ordersid)
    const ordersquantity = parseInt(res.body.ordersquantity)
    const ordersmonth = res.body.ordersmonth
    const ordersday = res.body.ordersday
    const ordersyear = res.body.ordersyear

    db.Inventory
        .findOne({
            where: {
                product_code: ordersid
            },
        })
        .then(function(data) {
            console.log('data', data.dataValues)
            const product = data.dataValues
            const total = product.total;
            // console.log(typeof product[locationFrom],typeof product[locationTo], typeof amount)

            db.Inventory
                .update({

                        total: total + ordersquantity
                    }, // [locationFrom]: product[locationFrom] - amount,  

                    { where: { product_code: ordersid } }
                )
                .then(function(update) {
                    console.log('update', update)
                })
                .catch(function(err) {
                    console.log('error', err)
                })
        })
}

app.put('/api/sendorders', sendOrders)

function sendOrders(res, req) {

    const ordersid = res.body.ordersid
    const ordersquantity = parseInt(res.body.ordersquantity)
    const ordersmonth = res.body.ordersmonth
    const ordersday = res.body.ordersday
    const ordersyear = res.body.ordersyear

    db.Inventory
        .findOne({
            where: {
                product_code: ordersid
            },
        })
        .then(function(data) {
            // console.log(data)
            const product = data.dataValues
            const total = product.total;
            // console.log(typeof product[locationFrom],typeof product[locationTo], typeof amount)

            db.Inventory
                .update({

                        total: total - ordersquantity
                    }, // [locationFrom]: product[locationFrom] - amount,  

                    { where: { product_code: ordersid } }
                )
                .then(function(update) {
                    console.log('update', update)
                })
                .catch(function(err) {
                    console.log('error', err)
                })
        })
}


app.post("/api/createUser", function(req, res) {

    db.User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mob_no: req.body.mob_no,
            user_name: req.body.user_name,
            password: req.body.password,
            position: req.body.position

        }).then(function(dbUser) {

            res.json(dbUser);
        })
        .catch(function(err) {
            res.json(err);
        });
});


//start of create user
// app.post('/api/createUser', createUser)

// function stockControl(res, req) {
//     console.log('res CU', res.body)
//                 const first_name =res.body.first_name
//                 const last_name = res.body.last_name
//                 const mob_no = res.body.mob_no
//                 const user_name = res.body.user_name
//                 const password = res.body.password
//                 const position = res.body.position

//     db.Inventory
//         .findOne({
//             where: {
//                 product_code: name
//             },
//         })
//         .then(function(data) {
//             // console.log(data)
//             const product = data.dataValues
//             console.log(typeof product[locationFrom], typeof product[locationTo], typeof amount)

//             db.Inventory
//                 .update({
//                     [locationFrom]: product[locationFrom] - amount,
//                     [locationTo]: product[locationTo] + amount


//                 }, { where: { product_code: name} })
//                 .then(function(update) {
//                     console.log('update', update)
//                 })
//                 .catch(function(err) {
//                     console.log('error', err)
//                 })
//         })

//     }




function stockControl(res, req) {
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

    // db.Inventory
    // .findOne({
    //     where: {
    //         product_code: name2
    //     },
    // })
    // .then(function(data) {
    //     // console.log(data)
    //     const product = data.dataValues
    //     console.log(typeof product[locationFrom], typeof product[locationTo], typeof amount2)

    //     db.Inventory
    //         .update({
    //             [locationFrom]: product[locationFrom] - amount2,
    //             [locationTo]: product[locationTo] + amount2,


    //         }, { where: { product_code: name2

    //          } })
    //         .then(function(update) {
    //             console.log('update', update)
    //         })
    //         .catch(function(err) {
    //             console.log('error', err)
    //         })
    // })
// }

app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));
require("./routes/api-routes.js")(app);

db.sequelize.sync({}).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
//Middleware
// app.listen(8080)