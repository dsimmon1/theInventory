$(document).ready(function() {

// add new user

$("#btn-signup").on("click", function(event) {
  event.preventDefault();


  var newUser = {
    firstName: $("#first_name").val().trim(),
    lastName: $("#last_name").val().trim(),
    mobileNumber: $("#mob_no").val().trim(),
    userName: $("#user_name").val().trim(),
    password: $("#password").val().trim(),
    position: $("#position").val().trim()
  };

  // send an AJAX POST-request with jQuery
  $.post("/api/signup", newUser)
    // on success, run this callback
    .done(function(data) {
      // log the data we found
      console.log(data);
      alert("Adding employee...");
    });

  // empty each input box by replacing the value with an empty string
  $("#first_name").val("");
  $("#last_name").val("");
  $("#mob_no").val("");
  $("#user_name").val("");
  $("#password").val("");
  $("#position").val("");

});
	//---------------------------------------------signup page call------------------------------------------------------
// exports.signup = function(req, res){
//    message = '';
//    if(req.method == "POST"){
//       var post  = req.body;
//       var name= post.user_name;
//       var pass= post.password;
//       var fname= post.first_name;
//       var lname= post.last_name;
//       var mob= post.mob_no;
//       var pos= post.position;

//       var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`, `position`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + pos + "')";

//       var query = db.query(sql, function(err, result) {

//          message = "Succesful! Your account has been created.";
//          res.render('signup.ejs',{message: message});
//       });

//    } else {
//       res.render('signup');
//    }
// };
 
//-----------------------------------------------login page call------------------------------------------------------
// $("#btn-login").on("click", function(event) {
// 	event.preventDefault();

// 	var
// })

// exports.login = function(req, res){
//    var message = '';
//    var sess = req.session; 

//    if(req.method == "POST"){
//       var post  = req.body;
//       var name= post.user_name;
//       var pass= post.password;
     
//       var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
//       db.query(sql, function(err, results){      
//          if(results.length){
//             req.session.userId = results[0].id;
//             req.session.user = results[0];
//             console.log(results[0].id);
//             res.redirect('/home/dashboard');
//          }
//          else{
//             message = 'Wrong Credentials.';
//             res.render('index.ejs',{message: message});
//          }
                 
//       });
//    } else {
//       res.render('index.ejs',{message: message});
//    }
           
// };
// //-----------------------------------------------dashboard page functionality----------------------------------------------
           
// exports.dashboard = function(req, res, next){
           
//    var user =  req.session.user,
//    userId = req.session.userId;
//    console.log('ddd='+userId);
//    if(userId == null){
//       res.redirect("/login");
//       return;
//    }

//    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

//    db.query(sql, function(err, results){
//       res.render('dashboard.ejs', {user:user});    
//    });       
// };

// //-----------------------------------------------orders page functionality----------------------------------------------
           
// exports.orders = function(req, res){

//    var userId = req.session.userId;
//    if(userId == null){
//       res.redirect("/login");
//       return;
//    }

//    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";          
//    db.query(sql, function(err, result){  
//       res.render('orders.ejs',{data:result});
//    });
// };

// //-----------------------------------------------inventory page functionality----------------------------------------------
           
// exports.inventory = function(req, res){

//    var userId = req.session.userId;
//    if(userId == null){
//       res.redirect("/login");
//       return;
//    }

//    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";          
//    db.query(sql, function(err, result){  
//       res.render('inventory.ejs',{data:result});
//    });
// };


// //-----------------------------------------------stockcontrol page functionality----------------------------------------------
           
// exports.stockcontrol = function(req, res){

//    var userId = req.session.userId;
//    if(userId == null){
//       res.redirect("/login");
//       return;
//    }

//    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";          
//    db.query(sql, function(err, result){  
//       res.render('stockcontrol.ejs',{data:result});
//    });
// };
// //------------------------------------logout functionality----------------------------------------------
// exports.logout=function(req,res){
//    req.session.destroy(function(err) {
//       res.redirect("/login");
//    })
// };
// //--------------------------------render user details after login--------------------------------
// exports.profile = function(req, res){

//    var userId = req.session.userId;
//    if(userId == null){
//       res.redirect("/login");
//       return;
//    }

//    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";          
//    db.query(sql, function(err, result){  
//       res.render('profile.ejs',{data:result});
//    });
// };
// //---------------------------------edit users details after login----------------------------------
// exports.editprofile=function(req,res){
//    var userId = req.session.userId;
//    if(userId == null){
//       res.redirect("/login");
//       return;
//    }

//    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
//    db.query(sql, function(err, results){
//       res.render('edit_profile.ejs',{data:results});
//    });
// };