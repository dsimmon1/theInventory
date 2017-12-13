$(document).ready(function() {

// var inventoryContainer = $(".container");
// var columnSelect = $("")
// var url = window.location.search;
// var product_code;

// console.log(Inventory);

// Inventory.findAll({
//     where:{id: id},
//     attributes: ['product_code', 'description', 'SF_Box', 'dimension', 'quantity', 'total']

// console.log(data);
// res.render('inventory-view-all', {data: data})
// });


// function getItems(product_code) {
//     product_code = product_code || "";
//     if (product_code) {
//         product_code = "/?product_code=" + product_code;
//     }
//     $.get("/api/inventory" + product_code, function(data) {
//         console.log("product_code", data);
//         product_code = data;
//         if (!product_code || !product_code.length) {
//             displayEmpty(product_code);
//         }
//         else {
//             // isolate data here
//         }
//     });
// }

var inventory; 

function listInventory() {

        $.get("/api/inventory", function (data) {
            console.lo("items: " + data);
            inventory = data;
             // product_code.val(data.product_code),
             // description.val(data.description),
             // SF_Box.val(data.SF_Box),
             // dimension.val(data.dimension),
             // quantity.val(data.quantity),
             // total.val(data.total)
        });
   
    } 
listInventory()


  $("#item-search").on("click", function() {

  // save the character they typed into the character-search input
  var searchedItem = $("#item-search").val().trim();

  // replace any spaces between that character with no space
  // (effectively deleting the spaces). Make the string lowercase
  searchedItem = searchedItem.replace(/\s+/g, "").toLowerCase();

  // run an AJAX GET-request for our servers api,
  // including the user's character in the url
   $.get("/api/inventory-view-all" + searchedItem, function(data) {
    // log the data to our console
    console.log(data);
    //empty to well-section before adding new content
    $(".search-content").empty();
    // if the data is not there, then return an error message
    if (!data) {
      $(".search-content").append("<h2>Item not found.</h2>");
    }
    // otherwise
    else {
      // append the character name
      $(".search-content").append("<h3>Product Code:" + data.product_code + "</h3>");
      // the role
      $(".search-content").append("<h3>Description: " + data.description + "</h3>");
      // the age
      $(".search-content").append("<h3>SF Box: " + data.SF_Box + "</h3>");
      // and the force points
      $(".search-content").append("<h3>Dimension: " + data.dimension + "</h3>");

      $(".search-content").append("<h3>Quantity: " + data.quantity + "</h3>");

      $(".search-content").append("<h3>Total: " + data.total + "</h3>");
    }

  });

});

// });