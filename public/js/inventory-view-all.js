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

        $.get("/home/api/inventory", function(data) {
            console.log("items: " + data);
            inventory = data;
        }).done(function(inventorydata) {
            for (var i = 0; i < inventorydata.length; i++) {
                $("#inventory-table").append("<tr><td>" + inventorydata[i].product_code + "</td><td>" + inventorydata[i].description + "</td><td>" + inventorydata[i].SF_Box + "</td><td>" + inventorydata[i].dimension + "</td><td>" + inventorydata[i].quantity + "</td><td>" + inventorydata[i].wh2 + "</td><td>" + inventorydata[i].wh3 + "</td><td>" + inventorydata[i].total + "</td><td>" + inventorydata[i].location + "</td></tr>");

            }
        })
    };

    listInventory()


    $("#item-search").on("click", function() {

        var searchedItem = $("#item-search").val().trim();

        searchedItem = searchedItem.replace(/\s+/g, "").toLowerCase();

        $.get("/api/inventory-view-all/" + searchedItem, function(data) {
            console.log(data);
            $(".search-content").empty();
            if (!data) {
                $(".search-content").append("<h2>Item not found.</h2>");
            }
      
            else {
                $(".search-content").append("<h3>Product Code:" + data.product_code + "</h3>");
                $(".search-content").append("<h3>Description: " + data.description + "</h3>");
                $(".search-content").append("<h3>SF Box: " + data.SF_Box + "</h3>");
                $(".search-content").append("<h3>Dimension: " + data.dimension + "</h3>");
                $(".search-content").append("<h3>Quantity: " + data.quantity + "</h3>");
                $(".search-content").append("<h3>Total: " + data.total + "</h3>");
            }

        });

    });

});