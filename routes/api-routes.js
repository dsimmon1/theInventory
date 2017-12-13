// Requiring models
var db = require("../models");

var total = 0;

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("home/api/inventory", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Inventory.findAll({}).then(function(dbInventory) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbInventory);
    });
  });

    app.get("home/api/dashboard", function(req, res) {
        // findAll returns all entries in a specific 
       db.Inventory.findAll({
            where: {
                id: [2, 4]

            },
        }).then(function(data) {
            res.json(data);
        });
        

        db.Inventory.findAll({
            where: {
                quantity: {
                    $lte: 80,
                }
            }
        }).then(function(data) {
            res.json(data);
        });

        db.Inventory.findAll({}).then(function(data) {
          res.json(data);  
         

          console.log("this may work " + data[1].quantity); 

          for (var i = 0; i < data.length; i++) {
            total += parseFloat(data[i].quantity);
             
          }
          console.log(total);
        });
    });
};