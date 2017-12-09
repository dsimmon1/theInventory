<<<<<<< HEAD
var db = require("../models");

module.exports = function(app) {

app.get("/api/dashboard", function (req, res) {

	db.Inventory.findAll({
		where: {
			id: {
				[Op.or]: [{a: 5}, {a: 6}]
			},
			attributes: {
				["description", "quantity"]
			},
			},
	}).then(function(result) {
		res.json(result)
	});

});

=======

var db = require("../models");


module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/dashboard", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Inventory.findAll({
    	where: {
    		id: {
    		[Op.or]: [{a: 5}, {a: 6}]
    	},
    		attributes: {
    			["description", "quantity"]
    		},
    	},
    }).then(function(res) {
      // We have access to the todos as an argument inside of the callback function
      res.json(res);
    });
  });
>>>>>>> c62d58c014fb55d1f01eec9d6318fbb92bc5bca5

};