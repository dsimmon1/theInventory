var db = require("../models");

module.exports = function(app) {

app.post("/ordera", function(req, res) {

  db.History.create({
    product_name: product_name,
    quantity: quantity,
    date: date
  }).then(function (result) {
    res.json(result);
  });
});

app.put("/orders", function(req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    db.Inventory.update({
    	quantity: req.body.quantity
      }, {
      	where: {
        id: req.body.name
      }
    }).then(function (result) {
      res.json(result);
    });
    // req.body.id and return the result to the user using res.json
  });
};