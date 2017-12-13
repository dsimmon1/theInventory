$(document).ready(function() {
  // Getting references to our form and input
  var productID = $(".product-id");
  var quantityInput = $(".quantity");
  var month = $(".month");
  var date = $(".date");
  var year = $(".year");
  // Our new orders will go inside the orderContainer
  var orderContainer = $(".order-container");
  // Adding event listeners for receive and send items
  $(orderForm).on("submit", ".receive", handleReceiveOrder);
  $(orderForm).on("submit", ".send", handleSendOrder);

  // Our initial orders array
  var orderHistory = [];

  function handleReceiveOrder(event) {
    event.preventDefault();
    // Wont submit the order if we are missing product-id, quantity month , date and year
    if (!productID.val().trim() || !quantityInput.val().trim() || !month.val()  || !date.val()  || !year.val()) {
      return;
    }
    else {
      receiveOrder();
    }
  }

  function handleSendOrder(event) {
    event.preventDefault();
     // Wont submit the order if we are missing product-id, quantity month , date and year
    if (!productID.val().trim() || !quantityInput.val().trim() || !month.val()  || !date.val()  || !year.val()) {
      return;
    }
    else {
      sendOrder();
    }
  } 

  // This function increase the quantity in our database
  function receiveOrder(quantityInput) {
    $.ajax({
      method: "PUT",
      url: "/orders",
      data: orderHistory
    }).then(function() {
     var newQuantity = quantity.val(data.quantity) - quantityInput;
    }).done(createNewRow);
  }

  // This function decrease the quantity in our database
  function sendOrder(quantityInput) {
    $.ajax({
      method: "PUT",
      url: "/orders",
      data: orderHistory
    }).done(createNewRow);
  }

// This function constructs an orderHistory-item row
  function createNewRow(orderHistory) {
  $(".order-container").append( "<li class='list-group-item order-item'>" + orderHistory.productID +" "+ orderHistory.quantityInput + " "+ orderHistory.month + " " + orderHistory.date + " " + orderHistory.year + "</li>")


  }


  });