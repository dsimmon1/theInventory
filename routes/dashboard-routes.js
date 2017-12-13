
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


